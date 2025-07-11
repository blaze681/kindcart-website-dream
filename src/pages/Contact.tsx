
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, Heart, MessageCircle, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for reaching out! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'hello@kindcart.org',
      description: 'Send us a message anytime',
      color: 'gradient-peach-lavender'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+1 (555) 123-KIND',
      description: 'Mon-Fri, 9AM-5PM EST',
      color: 'gradient-sky-mint'
    },
    {
      icon: MapPin,
      title: 'Our Reach',
      value: 'Nationwide',
      description: 'Spreading kindness everywhere',
      color: 'gradient-peach-lavender'
    }
  ];

  const contactTypes = [
    { value: 'general', label: 'General Question', emoji: '💬' },
    { value: 'donation', label: 'About Donations', emoji: '🎁' },
    { value: 'help', label: 'Need Help', emoji: '🤝' },
    { value: 'volunteer', label: 'Volunteer', emoji: '🌟' },
    { value: 'partnership', label: 'Partnership', emoji: '🤝' },
    { value: 'media', label: 'Media Inquiry', emoji: '📰' }
  ];

  const faqs = [
    {
      question: 'How do I donate items?',
      answer: 'Simply go to our Donate page, select the items you want to donate, fill out your information, and we\'ll contact you to arrange pickup or drop-off.'
    },
    {
      question: 'Who can request help?',
      answer: 'Any child or family in need can request help through our platform. We review all requests to ensure they reach those who need support most.'
    },
    {
      question: 'Is KindCart really run by children?',
      answer: 'Yes! KindCart was founded by Grade 3 students and continues to be led by young people with adult guidance and supervision.'
    },
    {
      question: 'How do you ensure donations reach the right children?',
      answer: 'We work with schools, community centers, and local organizations to identify children in need and ensure donations are distributed fairly and safely.'
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
              Get in <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Have questions? Want to help? Need support? We'd love to hear from you! 
              Our team is here to help spread more kindness together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {contactInfo.map((info, index) => (
              <Card 
                key={index}
                className="group border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{info.title}</h3>
                  <p className="text-lg text-purple-600 font-semibold mb-2">{info.value}</p>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form & Info Grid */}
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="border-0 shadow-xl animate-fade-in-left">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
                  <MessageCircle className="w-8 h-8 mr-3 text-purple-600" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="rounded-xl border-gray-200 focus:ring-purple-300"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="rounded-xl border-gray-200 focus:ring-purple-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">What is this about?</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {contactTypes.map((type) => (
                        <label key={type.value} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="type"
                            value={type.value}
                            checked={formData.type === type.value}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            className="sr-only"
                          />
                          <div className={`px-3 py-2 rounded-lg text-xs text-center w-full transition-colors ${
                            formData.type === type.value 
                              ? 'gradient-peach-lavender text-white' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}>
                            <div className="mb-1">{type.emoji}</div>
                            <div>{type.label}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-semibold">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief subject line"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="rounded-xl border-gray-200 focus:ring-purple-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-semibold">Your Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you or how you'd like to help us spread kindness..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="min-h-[120px] rounded-xl border-gray-200 focus:ring-purple-300"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full gradient-peach-lavender text-white rounded-full py-3 text-lg font-semibold hover:scale-105 transition-transform duration-300"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                    <Heart className="w-5 h-5 ml-2" fill="currentColor" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <div className="animate-fade-in-right">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                <Users className="w-8 h-8 mr-3 text-purple-600" />
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card 
                    key={index}
                    className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">{faq.question}</h3>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Response Time Info */}
              <Card className="mt-8 border-0 bg-purple-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-sky-mint rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Quick Response</h3>
                      <p className="text-gray-600 text-sm">
                        We typically respond to all messages within 24 hours. 
                        Urgent requests are prioritized and handled even faster!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join Our Mission?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Whether you want to donate, volunteer, or need our help, we're here to make it happen. 
              Together, we can create more smiles and spread more kindness.
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
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 border border-white/30 text-white rounded-full font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                <Users className="w-5 h-5 mr-2" />
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
