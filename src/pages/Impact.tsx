
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Users, Gift, MapPin, Star, Smile } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Impact = () => {
  const [counters, setCounters] = useState({
    donations: 0,
    children: 0,
    cities: 0,
    smiles: 0
  });

  const targetValues = {
    donations: 1250,
    children: 520,
    cities: 18,
    smiles: 1500
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setCounters(prev => ({
        donations: Math.min(prev.donations + Math.ceil(targetValues.donations / steps), targetValues.donations),
        children: Math.min(prev.children + Math.ceil(targetValues.children / steps), targetValues.children),
        cities: Math.min(prev.cities + Math.ceil(targetValues.cities / steps), targetValues.cities),
        smiles: Math.min(prev.smiles + Math.ceil(targetValues.smiles / steps), targetValues.smiles)
      }));
    }, stepDuration);

    setTimeout(() => clearInterval(timer), duration);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { 
      icon: Gift, 
      value: counters.donations, 
      label: 'Total Donations', 
      description: 'Items donated by generous hearts',
      color: 'gradient-peach-lavender',
      emoji: '🎁'
    },
    { 
      icon: Users, 
      value: counters.children, 
      label: 'Children Helped', 
      description: 'Young lives touched by kindness',
      color: 'gradient-sky-mint',
      emoji: '👶🏻'
    },
    { 
      icon: MapPin, 
      value: counters.cities, 
      label: 'Cities Reached', 
      description: 'Communities spreading kindness',
      color: 'gradient-peach-lavender',
      emoji: '🏙️'
    },
    { 
      icon: Smile, 
      value: counters.smiles, 
      label: 'Smiles Created', 
      description: 'Moments of joy and happiness',
      color: 'gradient-sky-mint',
      emoji: '😊'
    }
  ];

  const testimonials = [
    {
      name: 'Maria, Age 9',
      location: 'Chicago, IL',
      message: 'I got a beautiful birthday kit from KindCart! It was the best birthday ever. Thank you for making me feel special! 🎂',
      emoji: '🎉'
    },
    {
      name: 'Parent - Jennifer',
      location: 'Austin, TX',
      message: 'KindCart helped my daughter get school supplies when we were struggling. The kind message from the donor made us both cry happy tears.',
      emoji: '💝'
    },
    {
      name: 'Teacher - Ms. Rodriguez',
      location: 'Phoenix, AZ',
      message: 'Three of my students received donations through KindCart. Seeing their faces light up was priceless. This organization is pure magic.',
      emoji: '✨'
    },
    {
      name: 'David, Age 7',
      location: 'Miami, FL',
      message: 'I got new crayons and a notebook! Now I can draw pictures for my mom and write stories. Thank you KindCart friends! 🖍️',
      emoji: '🎨'
    }
  ];

  const milestones = [
    { month: 'Sept 2023', achievement: 'KindCart Founded', description: 'Grade 3 students start the initiative' },
    { month: 'Oct 2023', achievement: '50 Donations', description: 'First milestone reached' },
    { month: 'Dec 2023', achievement: '100 Children Helped', description: 'Expanding our reach' },
    { month: 'Mar 2024', achievement: '500 Donations', description: 'Growing community support' },
    { month: 'Jun 2024', achievement: '15 Cities', description: 'Multi-state presence' },
    { month: 'Nov 2024', achievement: '1000+ Donations', description: 'Major milestone achieved' }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">Impact</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Every number tells a story of kindness. Every statistic represents a child whose day was brightened by your generosity.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <Card 
                key={index}
                className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">{stat.emoji}</div>
                  <div className={`w-20 h-20 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-800 mb-2 animate-counter">
                    {stat.value.toLocaleString()}+
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{stat.label}</h3>
                  <p className="text-gray-600 text-sm">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Voices of Joy</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from the children, parents, and teachers whose lives have been touched by KindCart
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{testimonial.emoji}</div>
                    <div className="flex-1">
                      <blockquote className="text-lg text-gray-700 mb-4 leading-relaxed italic">
                        "{testimonial.message}"
                      </blockquote>
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 gradient-peach-lavender rounded-full flex items-center justify-center">
                          <Heart className="w-5 h-5 text-white" fill="currentColor" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{testimonial.name}</div>
                          <div className="text-gray-600 text-sm">{testimonial.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Growth Journey</h2>
            <p className="text-xl text-gray-600">Major milestones on our mission to spread kindness</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-300 to-purple-300" />
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div 
                    key={index}
                    className="relative flex items-center animate-fade-in-left"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full border-4 border-white shadow-lg" />
                    <div className="ml-20 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-purple-600">{milestone.month}</span>
                        <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.achievement}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Placeholder */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Moments of Joy</h2>
            <p className="text-xl text-gray-600">Capturing the smiles we've created together</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <Card 
                key={index}
                className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="h-64 gradient-peach-lavender flex items-center justify-center text-white text-8xl">
                    {['📚', '🎁', '👶🏻', '🎂', '🧸', '❤️'][index]}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {['School Supplies Donation', 'Birthday Celebration', 'Happy Recipients', 'Special Moments', 'Toy Distribution', 'Community Love'][index]}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Creating lasting memories and spreading joy throughout our communities.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-6">
              Be Part of Our Growing Impact
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Every donation adds to these numbers. Every act of kindness creates another smile. 
              Join us in making an even bigger difference in children's lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/donate"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <Gift className="w-5 h-5 mr-2" />
                Donate Now
              </a>
              <a 
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 border border-white/30 text-white rounded-full font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                Learn Our Story
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Impact;
