
import React from 'react';
import { BookOpen, Users, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'What to Donate',
      description: 'School supplies, clothes, toys, snacks, and special birthday kits to bring joy to children in need.',
      emoji: '📚'
    },
    {
      icon: Users,
      title: 'Who We Help',
      description: 'Children from underprivileged communities who need support with education and basic necessities.',
      emoji: '🤝'
    },
    {
      icon: Sparkles,
      title: 'How It Works',
      description: 'Simple donation process: choose what to give, add a kind message, and we handle the rest with love.',
      emoji: '✨'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            What is <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">KindCart?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            KindCart is a heartfelt initiative started by Grade 3 students who believe that even the smallest hands can make the biggest difference. We collect donations to help children in need across our communities.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-500 border-0 bg-white/70 backdrop-blur-sm hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="text-6xl mb-4">{feature.emoji}</div>
                  <div className="w-16 h-16 gradient-peach-lavender rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our Beautiful Beginning
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                It all started in a Grade 3 classroom when our young founders noticed that some of their classmates didn't have the same school supplies, snacks, or birthday celebrations that others enjoyed.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                With hearts full of compassion and determination, they decided to create KindCart - a platform where children could help other children by sharing what they have.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 gradient-sky-mint rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-medium text-gray-700">Every donation creates a smile</span>
              </div>
            </div>
            <div className="relative">
              <div className="text-center">
                <div className="text-8xl mb-4">👨‍🏫</div>
                <div className="text-6xl mb-4">👧🏽👦🏼👶🏻</div>
                <div className="bg-gradient-to-r from-yellow-400 to-pink-400 rounded-2xl p-6 text-white font-medium">
                  "We wanted to help our friends feel happy and included"
                  <div className="text-sm mt-2 opacity-90">- Grade 3 Founders</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
