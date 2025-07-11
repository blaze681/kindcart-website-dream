
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Gift, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 bg-white/20 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-12 h-12 bg-white/15 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-white/25 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in-left">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-pink-600" fill="currentColor" />
              <span className="text-sm font-medium text-gray-700">Started by Grade 3 children</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Big hearts,
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                small hands
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Gifting smiles across the land, one kind donation at a time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                asChild 
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-50 hover:scale-105 transition-all duration-300 rounded-full px-8 py-4 text-lg font-semibold shadow-xl"
              >
                <Link to="/donate" className="flex items-center space-x-2">
                  <Gift className="w-5 h-5" />
                  <span>Donate Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-full px-8 py-4 text-lg font-semibold backdrop-blur-sm"
              >
                <Link to="/donate?tab=get-help" className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Get Help</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="relative animate-fade-in-right">
            <div className="relative mx-auto max-w-md lg:max-w-lg">
              {/* Main illustration placeholder */}
              <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 animate-float">
                <div className="text-8xl text-center mb-4">🎁</div>
                <div className="text-6xl text-center mb-4">👶🏻👧🏽👦🏼</div>
                <div className="text-center text-white font-medium">
                  Children helping children
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 animate-pulse-gentle">
                <Heart className="w-6 h-6 text-yellow-600" fill="currentColor" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-pink-400 rounded-full p-3 animate-pulse-gentle" style={{ animationDelay: '1s' }}>
                <Gift className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          {[
            { number: '500+', label: 'Children Helped' },
            { number: '1000+', label: 'Gifts Donated' },
            { number: '15+', label: 'Cities Reached' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 animate-counter" style={{ animationDelay: `${index * 0.2}s` }}>
                {stat.number}
              </div>
              <div className="text-white/80 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
