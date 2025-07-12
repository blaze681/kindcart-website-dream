
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Gift, Users, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FloatingElements from '@/components/FloatingElements';

const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const rotatingWords = ['Kindness', 'Joy', 'Hope', 'Love'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-premium-hero">
      <FloatingElements />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center space-x-3 glass-card rounded-full px-6 py-3 mb-6 hover-lift">
              <Heart className="w-5 h-5 text-pink-600 animate-heart-pulse" fill="currentColor" />
              <span className="text-sm font-medium text-gray-700 font-quicksand">Started by Grade 3 children</span>
              <Sparkles className="w-4 h-4 text-yellow-500 animate-sparkle" />
            </div>
            
            <div className="space-y-6">
              <h1 className="text-premium-xl font-baloo text-white leading-tight">
                Big hearts,
                <br />
                <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-glow-pulse">
                  small hands
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-white/95 font-quicksand leading-relaxed">
                A small gift from{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent font-semibold">
                    {rotatingWords[currentWord]}
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-300 to-pink-300 transform origin-left animate-pulse"></div>
                </span>
                {' '}can bring a big smile to someone ✨
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
              <Button 
                asChild 
                size="lg"
                className="group glass-card-darker border-white/30 text-white hover:bg-white/20 hover-lift btn-heart-beat rounded-2xl px-8 py-6 text-lg font-semibold font-quicksand shadow-2xl"
              >
                <Link to="/donate" className="flex items-center space-x-3">
                  <Gift className="w-6 h-6 group-hover:animate-soft-bounce" />
                  <span>Donate Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="group bg-white/10 border-white/30 text-white hover:bg-white/20 hover-lift btn-bounce rounded-2xl px-8 py-6 text-lg font-semibold font-quicksand backdrop-blur-sm shadow-xl"
              >
                <Link to="/donate?tab=get-help" className="flex items-center space-x-3">
                  <Users className="w-6 h-6 group-hover:animate-soft-bounce" />
                  <span>Get Help</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Enhanced Illustration */}
          <div className="relative">
            <div className="relative mx-auto max-w-lg">
              {/* Main illustration card */}
              <div className="relative glass-card rounded-3xl p-12 hover-lift neuro-shadow">
                <div className="text-center space-y-6">
                  <div className="text-8xl mb-6 animate-soft-bounce">🎁</div>
                  <div className="flex justify-center space-x-4 text-6xl mb-6">
                    <span className="animate-gentle-float">👶🏻</span>
                    <span className="animate-gentle-float" style={{ animationDelay: '1s' }}>👧🏽</span>
                    <span className="animate-gentle-float" style={{ animationDelay: '2s' }}>👦🏼</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white font-baloo text-xl font-semibold">
                      Children helping children
                    </p>
                    <p className="text-white/80 font-quicksand">
                      Saanvi, Krisha & Vivaan
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 gradient-soft-peach rounded-full flex items-center justify-center animate-soft-bounce shadow-lg">
                <Heart className="w-8 h-8 text-white animate-heart-pulse" fill="currentColor" />
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-16 h-16 gradient-soft-mint rounded-full flex items-center justify-center animate-soft-bounce shadow-lg" style={{ animationDelay: '1s' }}>
                <Gift className="w-8 h-8 text-white" />
              </div>
              
              <div className="absolute top-1/2 -left-12 w-12 h-12 gradient-soft-blue rounded-full flex items-center justify-center animate-gentle-float">
                <Star className="w-6 h-6 text-white animate-sparkle" fill="currentColor" />
              </div>
              
              <div className="absolute top-1/4 -right-8 w-10 h-10 gradient-soft-lilac rounded-full flex items-center justify-center animate-gentle-float" style={{ animationDelay: '2s' }}>
                <Sparkles className="w-5 h-5 text-white animate-sparkle" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: '500+', label: 'Children Helped', icon: Users, delay: '0s' },
            { number: '1000+', label: 'Gifts Donated', icon: Gift, delay: '0.2s' },
            { number: '15+', label: 'Cities Reached', icon: Heart, delay: '0.4s' }
          ].map((stat, index) => (
            <div key={index} className="text-center glass-card rounded-3xl p-8 hover-lift" style={{ animationDelay: stat.delay }}>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 gradient-peach-lilac rounded-full flex items-center justify-center animate-soft-bounce" style={{ animationDelay: stat.delay }}>
                  <stat.icon className="w-8 h-8 text-white" fill="currentColor" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-baloo font-bold text-white mb-2 animate-counter" style={{ animationDelay: stat.delay }}>
                {stat.number}
              </div>
              <div className="text-white/90 font-quicksand font-medium text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 glass-card rounded-full flex justify-center border-white/30">
          <div className="w-2 h-4 bg-gradient-to-b from-white to-transparent rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
