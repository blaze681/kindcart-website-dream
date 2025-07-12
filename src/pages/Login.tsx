
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Mail, Lock, Eye, EyeOff, Sparkles, Star } from 'lucide-react';
import FloatingElements from '@/components/FloatingElements';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const inspirationalQuotes = [
    "A small gift from you can bring a big smile to someone ✨",
    "Kindness is the language children understand best 💝",
    "Together, we can make every child's day brighter 🌟",
    "Your generosity creates ripples of joy 🌊"
  ];

  const [currentQuote] = useState(inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-premium-hero relative overflow-hidden">
      <FloatingElements />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Inspirational Content */}
          <div className="hidden lg:block space-y-8">
            <div className="glass-card rounded-3xl p-8 hover-lift">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 gradient-peach-lilac rounded-full flex items-center justify-center animate-glow-pulse">
                      <Heart className="w-12 h-12 text-white animate-heart-pulse" fill="currentColor" />
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <Star className="w-6 h-6 text-yellow-400 animate-sparkle" fill="currentColor" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-premium-lg text-white font-baloo">
                    Welcome to <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">KindCart</span>
                  </h2>
                  <p className="text-xl text-white/90 font-quicksand leading-relaxed">
                    {currentQuote}
                  </p>
                </div>

                <div className="flex justify-center space-x-4 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white animate-counter">500+</div>
                    <div className="text-white/80 font-quicksand">Children Helped</div>
                  </div>
                  <div className="w-px bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white animate-counter">1000+</div>
                    <div className="text-white/80 font-quicksand">Gifts Delivered</div>
                  </div>
                  <div className="w-px bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white animate-counter">15+</div>
                    <div className="text-white/80 font-quicksand">Cities Reached</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Founders Section */}
            <div className="glass-card rounded-3xl p-6 hover-lift">
              <div className="text-center">
                <p className="text-white/90 font-quicksand mb-4">Started by three amazing Grade 3 students:</p>
                <div className="flex justify-center space-x-6">
                  <div className="text-center">
                    <div className="w-16 h-16 gradient-soft-peach rounded-full flex items-center justify-center mb-2 animate-soft-bounce">
                      <span className="text-2xl">👧🏽</span>
                    </div>
                    <p className="text-white font-medium font-baloo">Saanvi</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 gradient-soft-mint rounded-full flex items-center justify-center mb-2 animate-soft-bounce" style={{ animationDelay: '0.2s' }}>
                      <span className="text-2xl">👧🏻</span>
                    </div>
                    <p className="text-white font-medium font-baloo">Krisha</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 gradient-soft-blue rounded-full flex items-center justify-center mb-2 animate-soft-bounce" style={{ animationDelay: '0.4s' }}>
                      <span className="text-2xl">👦🏼</span>
                    </div>
                    <p className="text-white font-medium font-baloo">Vivaan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
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
                <CardTitle className="text-premium-md text-white font-baloo mb-2">Welcome Back!</CardTitle>
                <p className="text-white/80 font-quicksand">Sign in to continue spreading kindness</p>
                
                <div className="flex justify-center mt-4">
                  <Sparkles className="w-6 h-6 text-yellow-300 animate-sparkle" />
                </div>
              </CardHeader>
              
              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 rounded-2xl bg-red-100/20 border border-red-300/30 text-red-100 text-sm font-quicksand backdrop-blur-sm">
                      {error}
                    </div>
                  )}
                  
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
                        placeholder="Enter your password"
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
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 gradient-peach-lilac text-white font-semibold rounded-2xl hover-lift btn-heart-beat font-quicksand text-lg shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Heart className="w-5 h-5" fill="currentColor" />
                        <span>Sign In</span>
                      </div>
                    )}
                  </Button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-white/80 font-quicksand">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-yellow-300 hover:text-yellow-200 font-medium underline decoration-wavy underline-offset-2 transition-colors">
                      Join our kindness community
                    </Link>
                  </p>
                </div>

                <div className="mt-6 p-4 bg-blue-100/10 rounded-2xl backdrop-blur-sm border border-blue-300/20">
                  <p className="text-xs text-blue-200 font-medium mb-3 font-quicksand text-center">Demo Credentials:</p>
                  <div className="space-y-1 text-xs text-blue-100/90 font-quicksand">
                    <p><span className="font-medium">Admin:</span> admin@kindcart.org / password123</p>
                    <p><span className="font-medium">User:</span> john@example.com / password123</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
