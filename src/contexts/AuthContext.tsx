
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import CryptoJS from 'crypto-js';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  donationCount?: number;
  createdAt: string;
  lastLogin: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  incrementDonationCount: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

interface StoredUser extends User {
  passwordHash: string;
}

interface LoginAttempt {
  email: string;
  attempts: number;
  lastAttempt: number;
  blockedUntil?: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Security constants
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const PASSWORD_MIN_LENGTH = 8;
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

// Helper functions
const hashPassword = (password: string, salt: string): string => {
  return CryptoJS.PBKDF2(password, salt, {
    keySize: 256/32,
    iterations: 10000
  }).toString();
};

const generateSalt = (): string => {
  return CryptoJS.lib.WordArray.random(128/8).toString();
};

const validatePassword = (password: string): string[] => {
  const errors: string[] = [];
  if (password.length < PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long`);
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  return errors;
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load stored users and login attempts
  const getStoredUsers = (): StoredUser[] => {
    try {
      const users = localStorage.getItem('kindcart_users');
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  };

  const saveStoredUsers = (users: StoredUser[]) => {
    localStorage.setItem('kindcart_users', JSON.stringify(users));
  };

  const getLoginAttempts = (): LoginAttempt[] => {
    try {
      const attempts = localStorage.getItem('kindcart_login_attempts');
      return attempts ? JSON.parse(attempts) : [];
    } catch {
      return [];
    }
  };

  const saveLoginAttempts = (attempts: LoginAttempt[]) => {
    localStorage.setItem('kindcart_login_attempts', JSON.stringify(attempts));
  };

  const isAccountLocked = (email: string): boolean => {
    const attempts = getLoginAttempts();
    const userAttempts = attempts.find(a => a.email === email.toLowerCase());
    
    if (!userAttempts) return false;
    
    if (userAttempts.blockedUntil && userAttempts.blockedUntil > Date.now()) {
      return true;
    }
    
    return userAttempts.attempts >= MAX_LOGIN_ATTEMPTS;
  };

  const recordLoginAttempt = (email: string, success: boolean) => {
    const attempts = getLoginAttempts();
    const normalizedEmail = email.toLowerCase();
    const existingIndex = attempts.findIndex(a => a.email === normalizedEmail);
    
    if (success) {
      // Remove login attempts on successful login
      if (existingIndex !== -1) {
        attempts.splice(existingIndex, 1);
      }
    } else {
      // Record failed attempt
      if (existingIndex !== -1) {
        attempts[existingIndex].attempts += 1;
        attempts[existingIndex].lastAttempt = Date.now();
        
        if (attempts[existingIndex].attempts >= MAX_LOGIN_ATTEMPTS) {
          attempts[existingIndex].blockedUntil = Date.now() + LOCKOUT_DURATION;
        }
      } else {
        attempts.push({
          email: normalizedEmail,
          attempts: 1,
          lastAttempt: Date.now()
        });
      }
    }
    
    saveLoginAttempts(attempts);
  };

  useEffect(() => {
    // Check for existing session
    const savedSession = localStorage.getItem('kindcart_session');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        if (session.expiresAt > Date.now()) {
          const users = getStoredUsers();
          const foundUser = users.find(u => u.id === session.userId);
          if (foundUser) {
            const { passwordHash, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
          }
        } else {
          localStorage.removeItem('kindcart_session');
        }
      } catch {
        localStorage.removeItem('kindcart_session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const normalizedEmail = email.trim().toLowerCase();
      
      // Check if account is locked
      if (isAccountLocked(normalizedEmail)) {
        toast({
          title: "Account Temporarily Locked",
          description: "Too many failed login attempts. Please try again in 15 minutes.",
          variant: "destructive"
        });
        setIsLoading(false);
        return false;
      }

      if (!isValidEmail(normalizedEmail)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive"
        });
        setIsLoading(false);
        return false;
      }

      const users = getStoredUsers();
      const foundUser = users.find(u => u.email.toLowerCase() === normalizedEmail);
      
      if (!foundUser) {
        recordLoginAttempt(normalizedEmail, false);
        toast({
          title: "Login Failed",
          description: "Invalid email or password.",
          variant: "destructive"
        });
        setIsLoading(false);
        return false;
      }

      // Verify password
      const [storedHash, salt] = foundUser.passwordHash.split(':');
      const providedHash = hashPassword(password.trim(), salt);
      
      if (providedHash !== storedHash) {
        recordLoginAttempt(normalizedEmail, false);
        toast({
          title: "Login Failed",
          description: "Invalid email or password.",
          variant: "destructive"
        });
        setIsLoading(false);
        return false;
      }

      // Successful login
      recordLoginAttempt(normalizedEmail, true);
      
      // Update last login
      const updatedUser = { ...foundUser, lastLogin: new Date().toISOString() };
      const userIndex = users.findIndex(u => u.id === foundUser.id);
      users[userIndex] = updatedUser;
      saveStoredUsers(users);

      // Create session
      const session = {
        userId: foundUser.id,
        expiresAt: Date.now() + SESSION_DURATION
      };
      localStorage.setItem('kindcart_session', JSON.stringify(session));

      const { passwordHash, ...userWithoutPassword } = updatedUser;
      setUser(userWithoutPassword);
      
      toast({
        title: "Welcome back!",
        description: `Good to see you again, ${foundUser.name}.`
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const normalizedEmail = email.trim().toLowerCase();
      const trimmedName = name.trim();

      // Validation
      if (!trimmedName || trimmedName.length < 2) {
        toast({
          title: "Invalid Name",
          description: "Name must be at least 2 characters long.",
          variant: "destructive"
        });
        setIsLoading(false);
        return false;
      }

      if (!isValidEmail(normalizedEmail)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive"
        });
        setIsLoading(false);
        return false;
      }

      const passwordErrors = validatePassword(password);
      if (passwordErrors.length > 0) {
        toast({
          title: "Password Requirements Not Met",
          description: passwordErrors.join('. '),
          variant: "destructive"
        });
        setIsLoading(false);
        return false;
      }

      const users = getStoredUsers();
      
      // Check if user already exists
      if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
        toast({
          title: "Account Already Exists",
          description: "An account with this email address already exists.",
          variant: "destructive"
        });
        setIsLoading(false);
        return false;
      }

      // Hash password
      const salt = generateSalt();
      const passwordHash = hashPassword(password, salt);
      
      const newUser: StoredUser = {
        id: Date.now().toString(),
        name: trimmedName,
        email: normalizedEmail,
        role: 'user',
        donationCount: 0,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        passwordHash: `${passwordHash}:${salt}`
      };
      
      users.push(newUser);
      saveStoredUsers(users);

      // Create session
      const session = {
        userId: newUser.id,
        expiresAt: Date.now() + SESSION_DURATION
      };
      localStorage.setItem('kindcart_session', JSON.stringify(session));

      const { passwordHash: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      
      toast({
        title: "Welcome to KindCart!",
        description: "Your account has been created successfully."
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
      return false;
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    // Simulate password reset (frontend-only limitation)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const normalizedEmail = email.trim().toLowerCase();
    const users = getStoredUsers();
    const userExists = users.some(u => u.email.toLowerCase() === normalizedEmail);
    
    if (userExists) {
      toast({
        title: "Password Reset Simulated",
        description: "In a real app, a password reset email would be sent. For demo purposes, you can continue with existing credentials.",
      });
    } else {
      toast({
        title: "Email Not Found",
        description: "No account found with this email address.",
        variant: "destructive"
      });
    }
    
    return userExists;
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const users = getStoredUsers();
      const foundUser = users.find(u => u.id === user.id);
      
      if (!foundUser) return false;
      
      // Verify current password
      const [storedHash, salt] = foundUser.passwordHash.split(':');
      const currentHash = hashPassword(currentPassword, salt);
      
      if (currentHash !== storedHash) {
        toast({
          title: "Current Password Incorrect",
          description: "Please enter your current password correctly.",
          variant: "destructive"
        });
        return false;
      }
      
      const passwordErrors = validatePassword(newPassword);
      if (passwordErrors.length > 0) {
        toast({
          title: "Password Requirements Not Met",
          description: passwordErrors.join('. '),
          variant: "destructive"
        });
        return false;
      }
      
      // Update password
      const newSalt = generateSalt();
      const newPasswordHash = hashPassword(newPassword, newSalt);
      
      const userIndex = users.findIndex(u => u.id === user.id);
      users[userIndex].passwordHash = `${newPasswordHash}:${newSalt}`;
      saveStoredUsers(users);
      
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully."
      });
      
      return true;
    } catch (error) {
      console.error('Change password error:', error);
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const incrementDonationCount = () => {
    if (user) {
      const updatedUser = { ...user, donationCount: (user.donationCount || 0) + 1 };
      setUser(updatedUser);
      
      // Update stored user data
      const users = getStoredUsers();
      const userIndex = users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], donationCount: updatedUser.donationCount };
        saveStoredUsers(users);
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kindcart_session');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoading,
      incrementDonationCount,
      resetPassword,
      changePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};
