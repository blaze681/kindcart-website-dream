
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  donationCount?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  incrementDonationCount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('kindcart_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock users database with proper password checking
      const mockUsers = [
        { id: '1', name: 'Admin User', email: 'admin@kindcart.org', role: 'admin' as const, password: 'password123', donationCount: 0 },
        { id: '2', name: 'John Doe', email: 'john@example.com', role: 'user' as const, password: 'password123', donationCount: 0 },
        { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'user' as const, password: 'password123', donationCount: 0 }
      ];
      
      // Trim whitespace and convert to lowercase for email comparison
      const normalizedEmail = email.trim().toLowerCase();
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === normalizedEmail);
      
      if (foundUser && password.trim() === foundUser.password) {
        // Remove password from user object before saving
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('kindcart_user', JSON.stringify(userWithoutPassword));
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Mock registration logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: 'user',
        donationCount: 0
      };
      
      setUser(newUser);
      localStorage.setItem('kindcart_user', JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const incrementDonationCount = () => {
    if (user) {
      const updatedUser = { ...user, donationCount: (user.donationCount || 0) + 1 };
      setUser(updatedUser);
      localStorage.setItem('kindcart_user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kindcart_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoading,
      incrementDonationCount
    }}>
      {children}
    </AuthContext.Provider>
  );
};
