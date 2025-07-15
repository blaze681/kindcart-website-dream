import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Truck, Gift } from 'lucide-react';

const DeliveryPartnerHero = () => {
  const scrollToForm = () => {
    document.getElementById('partner-form')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-premium-hero" />
      <div className="floating-shapes" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Content */}
          <div className="flex-1 w-full">
            <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Heart className="w-4 h-4 text-pink-600 animate-heart-pulse" fill="currentColor" />
                <span className="text-sm font-medium text-gray-700">Join Our Mission</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold mb-6 text-high-contrast leading-tight">
                Become a KindCart{' '}
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent block lg:inline">
                  Delivery Partner
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-medium-contrast mb-8 font-nunito leading-relaxed max-w-xl mx-auto lg:mx-0">
                Help us deliver hope, one gift at a time. Join our community of compassionate volunteers 
                and make a meaningful difference in children's lives across your community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={scrollToForm}
                  size="lg"
                  className="gradient-peach-lavender text-white hover:scale-105 transition-all duration-300 rounded-full px-8 py-6 text-lg font-semibold shadow-lg btn-heart-beat"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Apply Now
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-gray-700 hover:bg-white/20 rounded-full px-8 py-6 text-lg font-semibold"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right Illustration */}
          <div className="flex-1 relative">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 glass-card animate-gentle-float">
              <div className="relative z-10">
                {/* Delivery Person Illustration */}
                <div className="bg-gradient-to-br from-peach to-lilac rounded-2xl p-8 mb-6">
                  <div className="flex items-center justify-center">
                    <div className="bg-white/20 rounded-full p-6">
                      <Truck className="w-16 h-16 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Happy Child Receiving */}
                <div className="bg-gradient-to-br from-baby-blue to-mint rounded-2xl p-6">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="bg-white/20 rounded-full p-4">
                      <Gift className="w-12 h-12 text-white" />
                    </div>
                    <div className="bg-white/20 rounded-full p-4">
                      <Heart className="w-12 h-12 text-white animate-heart-pulse" fill="currentColor" />
                    </div>
                  </div>
                  <p className="text-center text-white font-semibold mt-4">
                    Delivering Joy & Hope
                  </p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 animate-sparkle">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-pink-400 rounded-full p-3 animate-soft-bounce">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryPartnerHero;