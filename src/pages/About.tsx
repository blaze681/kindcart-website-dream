
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Star, Award, Users, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const milestones = [
    { year: '2023', event: 'KindCart founded by Grade 3 students', icon: Heart },
    { year: '2023', event: 'First 50 donations collected', icon: Star },
    { year: '2024', event: 'Reached 500+ children helped', icon: Users },
    { year: '2024', event: 'Expanded to 15+ cities', icon: MapPin }
  ];

  const values = [
    {
      title: 'Compassion',
      description: 'We lead with empathy and understanding for those in need.',
      emoji: '💝',
      color: 'gradient-peach-lavender'
    },
    {
      title: 'Community',
      description: 'Together we create stronger, more caring neighborhoods.',
      emoji: '🤝',
      color: 'gradient-sky-mint'
    },
    {
      title: 'Kindness',
      description: 'Every small act of kindness creates ripples of positive change.',
      emoji: '✨',
      color: 'gradient-peach-lavender'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Story of <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">Kindness</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              What started as a simple idea in a Grade 3 classroom has grown into a movement of compassion, 
              connecting generous hearts with children who need our support.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">How KindCart Began</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="animate-fade-in-left">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">A Classroom Full of Big Hearts</h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  In September 2023, a group of 8-year-old students in Grade 3 noticed something that broke their hearts. 
                  Some of their classmates came to school without proper supplies, others had no snacks for lunch, 
                  and a few had never experienced a proper birthday celebration.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Instead of just feeling sad, these remarkable children decided to take action. They approached 
                  their teacher with a simple but powerful idea: "What if we could help our friends by sharing what we have?"
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 gradient-peach-lavender rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" fill="currentColor" />
                  </div>
                  <span className="text-lg font-medium text-gray-700">And so, KindCart was born.</span>
                </div>
              </div>
              <div className="text-center animate-fade-in-right">
                <div className="bg-purple-50 rounded-3xl p-8">
                  <div className="text-8xl mb-4">🏫</div>
                  <div className="text-6xl mb-4">👨‍🏫👧🏽👦🏼👶🏻</div>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                    <p className="text-lg font-medium mb-2">"We saw our friends needed help, so we decided to help them."</p>
                    <div className="text-sm opacity-90">- Sarah, Age 8, Co-founder</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-500 animate-fade-in-left">
                <CardContent className="p-8">
                  <div className="w-16 h-16 gradient-peach-lavender rounded-full flex items-center justify-center mb-6">
                    <Heart className="w-8 h-8 text-white" fill="currentColor" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To create a world where every child feels valued, supported, and loved by connecting generous 
                    hearts with those who need our care. We believe that even the smallest hands can make the 
                    biggest difference in someone's life.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-500 animate-fade-in-right">
                <CardContent className="p-8">
                  <div className="w-16 h-16 gradient-sky-mint rounded-full flex items-center justify-center mb-6">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    A future where no child goes without basic necessities, where kindness is contagious, 
                    and where children everywhere understand the power they have to create positive change 
                    in their communities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do at KindCart
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="group border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-6">{value.emoji}</div>
                  <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600">Major milestones in our mission to spread kindness</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-6 animate-fade-in-left"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 gradient-peach-lavender rounded-full flex items-center justify-center">
                      <milestone.icon className="w-8 h-8 text-white" fill="currentColor" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl font-bold text-purple-600">{milestone.year}</span>
                        <span className="text-lg text-gray-700">{milestone.event}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-6">
              Join Our Mission of Kindness
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Every donation, no matter how small, creates a ripple of positive change. 
              Together, we can continue to gift smiles across the land.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/donate"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                Start Donating
              </a>
              <a 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 border border-white/30 text-white rounded-full font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                <Users className="w-5 h-5 mr-2" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
