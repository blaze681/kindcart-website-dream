
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Mail, Lock, User, Eye, EyeOff, Sparkles, Gift, Users, Check, X } from 'lucide-react';
import FloatingElements from '@/components/FloatingElements';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password)
    };
  };

  const passwordValidation = validatePassword(password);
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPasswordValid) return;
    if (!passwordsMatch) return;
    
    const success = await register(name, email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-premium-hero relative overflow-hidden">
      <FloatingElements />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Join Community Content */}
          <div className="hidden lg:block space-y-8">
            <div className="glass-card rounded-3xl p-8 hover-lift">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 gradient-baby-mint rounded-full flex items-center justify-center animate-glow-pulse">
                      <Users className="w-12 h-12 text-white animate-soft-bounce" />
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <Gift className="w-6 h-6 text-yellow-400 animate-sparkle" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-premium-lg text-white font-baloo">
                    Join Our <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">Kindness Community</span>
                  </h2>
                  <p className="text-xl text-white/90 font-quicksand leading-relaxed">
                    Be part of a movement that brings smiles to children across the world 🌟
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center">
                    <div className="w-16 h-16 gradient-soft-peach rounded-2xl flex items-center justify-center mb-3 mx-auto">
                      <Gift className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-semibold font-baloo mb-1">Donate Gifts</h3>
                    <p className="text-white/70 text-sm font-quicksand">Share toys, books, and essentials</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 gradient-soft-mint rounded-2xl flex items-center justify-center mb-3 mx-auto">
                      <Heart className="w-8 h-8 text-white" fill="currentColor" />
                    </div>
                    <h3 className="text-white font-semibold font-baloo mb-1">Spread Love</h3>
                    <p className="text-white/70 text-sm font-quicksand">Make a child's day brighter</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Role Selection Preview */}
            <div className="glass-card rounded-3xl p-6 hover-lift">
              <div className="text-center mb-4">
                <p className="text-white/90 font-quicksand">Choose how you want to help:</p>
              </div>
              <div className="flex justify-center space-x-4">
                <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-all">
                  <div className="w-12 h-12 gradient-soft-peach rounded-full flex items-center justify-center mb-2 mx-auto">
                    <Heart className="w-6 h-6 text-white" fill="currentColor" />
                  </div>
                  <p className="text-white text-sm font-baloo">Donor</p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-all">
                  <div className="w-12 h-12 gradient-soft-mint rounded-full flex items-center justify-center mb-2 mx-auto">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white text-sm font-baloo">Volunteer</p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-all">
                  <div className="w-12 h-12 gradient-soft-blue rounded-full flex items-center justify-center mb-2 mx-auto">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white text-sm font-baloo">Recipient</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full max-w-md mx-auto">
            {/* Logo */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center space-x-3 group">
                <div className="p-4 rounded-full gradient-peach-lilac group-hover:scale-110 transition-transform duration-300 hover-glow">
                  <Heart className="w-10 h-10 text-white animate-heart-pulse" fill="currentColor" />
                </div>
                <span className="text-premium-lg bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent font-baloo">
                  KindCart
                </span>
              </Link>
            </div>

            <Card className="glass-card-darker border-white/20 shadow-2xl rounded-3xl overflow-hidden hover-lift">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-premium-md text-white font-baloo mb-2">Join KindCart!</CardTitle>
                <p className="text-white/80 font-quicksand">Create your account to start spreading kindness</p>
                
                <div className="flex justify-center mt-4">
                  <Sparkles className="w-6 h-6 text-yellow-300 animate-sparkle" />
                </div>
              </CardHeader>
              
              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-white font-medium font-quicksand">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-4 h-5 w-5 text-white/60" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl backdrop-blur-sm focus:bg-white/15 focus:border-white/40 transition-all duration-300 hover:bg-white/15"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-white font-medium font-quicksand">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-4 h-5 w-5 text-white/60" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl backdrop-blur-sm focus:bg-white/15 focus:border-white/40 transition-all duration-300 hover:bg-white/15"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-white font-medium font-quicksand">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-4 h-5 w-5 text-white/60" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-12 pr-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl backdrop-blur-sm focus:bg-white/15 focus:border-white/40 transition-all duration-300 hover:bg-white/15"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-4 text-white/60 hover:text-white/90 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    
                    {/* Password Requirements */}
                    {password && (
                      <div className="mt-3 p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                        <p className="text-white/90 text-sm font-quicksand mb-2">Password Requirements:</p>
                        <div className="space-y-1">
                          {[
                            { key: 'length', label: 'At least 8 characters' },
                            { key: 'uppercase', label: 'One uppercase letter' },
                            { key: 'lowercase', label: 'One lowercase letter' },
                            { key: 'number', label: 'One number' }
                          ].map(({ key, label }) => (
                            <div key={key} className="flex items-center space-x-2">
                              {passwordValidation[key as keyof typeof passwordValidation] ? (
                                <Check className="w-4 h-4 text-green-400" />
                              ) : (
                                <X className="w-4 h-4 text-red-400" />
                              )}
                              <span className={`text-sm font-quicksand ${
                                passwordValidation[key as keyof typeof passwordValidation] 
                                  ? 'text-green-300' 
                                  : 'text-white/70'
                              }`}>
                                {label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="confirmPassword" className="text-white font-medium font-quicksand">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-4 h-5 w-5 text-white/60" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl backdrop-blur-sm focus:bg-white/15 focus:border-white/40 transition-all duration-300 hover:bg-white/15"
                        required
                      />
                    </div>
                    {confirmPassword && (
                      <div className="flex items-center space-x-2 mt-2">
                        {passwordsMatch ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <X className="w-4 h-4 text-red-400" />
                        )}
                        <span className={`text-sm font-quicksand ${
                          passwordsMatch ? 'text-green-300' : 'text-red-300'
                        }`}>
                          {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                        </span>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 gradient-peach-lilac text-white font-semibold rounded-2xl hover-lift btn-heart-beat font-quicksand text-lg shadow-lg"
                    disabled={isLoading || !isPasswordValid || !passwordsMatch}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Heart className="w-5 h-5" fill="currentColor" />
                        <span>Join the Community</span>
                      </div>
                    )}
                  </Button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-white/80 font-quicksand">
                    Already spreading kindness with us?{' '}
                    <Link to="/login" className="text-yellow-300 hover:text-yellow-200 font-medium underline decoration-wavy underline-offset-2 transition-colors">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
