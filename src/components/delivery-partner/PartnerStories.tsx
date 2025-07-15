import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, Quote, Heart } from 'lucide-react';

const PartnerStories = () => {
  const stories = [
    {
      name: 'Sarah Johnson',
      role: 'Individual Volunteer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b4e0?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      story: 'Being a KindCart delivery partner has been the most rewarding experience. Seeing the joy on children\'s faces when I deliver their gifts is absolutely priceless. I\'ve made over 50 deliveries and each one fills my heart with purpose.',
      stat: '50+ Deliveries',
      joinDate: '6 months ago'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Weekend Warrior',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      story: 'As a father myself, I understand how important it is for children to feel loved and remembered. KindCart gives me the opportunity to spread that love to families who need it most. The organization is incredibly well-run and supportive.',
      stat: '75+ Deliveries',
      joinDate: '1 year ago'
    },
    {
      name: 'Emily Chen',
      role: 'University Group Leader',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      story: 'I lead a group of 12 students from our university. We do group deliveries every weekend and it has brought our team so much closer while making a real impact. The kids always ask if we\'re coming back!',
      stat: '120+ Group Deliveries',
      joinDate: '8 months ago'
    },
    {
      name: 'David Thompson',
      role: 'Corporate Volunteer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      story: 'Our company partnered with KindCart for our volunteer initiative. It\'s amazing how much joy we can bring to families while building stronger team bonds. The process is seamless and the impact is immediate.',
      stat: '35+ Company Deliveries',
      joinDate: '4 months ago'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-peach via-lilac to-baby-blue">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Heart className="w-4 h-4 text-pink-600 animate-heart-pulse" fill="currentColor" />
            <span className="text-sm font-medium text-gray-700">Partner Stories</span>
          </div>
          
          <h2 className="text-premium-lg font-poppins mb-4 text-high-contrast">
            Hear from Our Amazing{' '}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Delivery Partners
            </span>
          </h2>
          <p className="text-lg text-medium-contrast max-w-2xl mx-auto">
            Real stories from real volunteers who are making a difference in their communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {stories.map((story, index) => (
            <Card key={index} className="glass-card border-0 shadow-xl hover-lift relative overflow-hidden">
              {/* Background Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-16 h-16 text-gray-600" />
              </div>
              
              <CardContent className="p-8 relative z-10">
                {/* Header */}
                <div className="flex items-start space-x-4 mb-6">
                  <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                    <AvatarImage src={story.image} alt={story.name} />
                    <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-600 text-white font-bold">
                      {story.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-high-contrast">
                      {story.name}
                    </h3>
                    <p className="text-purple-600 font-semibold text-sm mb-2">
                      {story.role}
                    </p>
                    <div className="flex items-center space-x-1">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Story */}
                <blockquote className="text-medium-contrast leading-relaxed mb-6 italic">
                  "{story.story}"
                </blockquote>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="flex items-center space-x-2">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-full p-1">
                      <Heart className="w-3 h-3 text-white" fill="currentColor" />
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {story.stat}
                    </span>
                  </div>
                  <span className="text-xs text-medium-contrast">
                    Joined {story.joinDate}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto glass-card">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="w-6 h-6 text-pink-500 animate-heart-pulse" fill="currentColor" />
              <h3 className="text-2xl font-bold text-high-contrast">
                Your Story Could Be Next
              </h3>
              <Heart className="w-6 h-6 text-purple-500 animate-heart-pulse" fill="currentColor" />
            </div>
            <p className="text-medium-contrast text-lg mb-6">
              Join our community of amazing volunteers and start creating your own impact story today.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-high-contrast mb-1">500+</div>
                <div className="text-sm text-medium-contrast">Active Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-high-contrast mb-1">10K+</div>
                <div className="text-sm text-medium-contrast">Gifts Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-high-contrast mb-1">50+</div>
                <div className="text-sm text-medium-contrast">Cities Served</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerStories;