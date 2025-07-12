
import React from 'react';
import { Heart, Star, Sparkles, Gift } from 'lucide-react';

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Hearts */}
      <div className="absolute top-20 left-10 animate-gentle-float opacity-30">
        <Heart className="w-8 h-8 text-peach animate-heart-pulse" fill="currentColor" />
      </div>
      
      <div className="absolute top-40 right-20 animate-gentle-float opacity-25" style={{ animationDelay: '2s' }}>
        <Star className="w-6 h-6 text-baby-blue animate-sparkle" fill="currentColor" />
      </div>
      
      <div className="absolute bottom-40 left-20 animate-gentle-float opacity-35" style={{ animationDelay: '4s' }}>
        <Sparkles className="w-10 h-10 text-lilac animate-sparkle" />
      </div>
      
      <div className="absolute bottom-20 right-10 animate-gentle-float opacity-30" style={{ animationDelay: '1s' }}>
        <Gift className="w-7 h-7 text-mint animate-soft-bounce" />
      </div>

      {/* Additional floating shapes */}
      <div className="absolute top-32 right-40 w-4 h-4 bg-peach rounded-full animate-gentle-float opacity-40" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-32 left-40 w-6 h-6 bg-baby-blue rounded-full animate-gentle-float opacity-35" style={{ animationDelay: '5s' }} />
      <div className="absolute top-60 left-1/3 w-3 h-3 bg-lilac rounded-full animate-gentle-float opacity-45" style={{ animationDelay: '2.5s' }} />
      <div className="absolute bottom-60 right-1/3 w-5 h-5 bg-mint rounded-full animate-gentle-float opacity-30" style={{ animationDelay: '1.5s' }} />
    </div>
  );
};

export default FloatingElements;
