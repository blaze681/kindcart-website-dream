
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Gift, Heart, Book, Shirt, Gamepad2, Apple, PartyPopper, Send, Users, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Donate = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const defaultTab = urlParams.get('tab') === 'get-help' ? 'get-help' : 'donate';
  
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [donationMessage, setDonationMessage] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });

  const [helpRequest, setHelpRequest] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    need: '',
    description: '',
    urgency: 'normal'
  });

  const donationItems = [
    { id: 'school-supplies', name: 'School Supplies', icon: Book, description: 'Notebooks, pens, pencils, erasers', emoji: '📚' },
    { id: 'clothes', name: 'Clothes', icon: Shirt, description: 'Clean, good condition clothing', emoji: '👕' },
    { id: 'toys', name: 'Toys', icon: Gamepad2, description: 'Educational and fun toys', emoji: '🧸' },
    { id: 'snacks', name: 'Snacks', icon: Apple, description: 'Healthy snacks and treats', emoji: '🍎' },
    { id: 'birthday-kit', name: 'Birthday Kit', icon: PartyPopper, description: 'Cake, decorations, small gifts', emoji: '🎂' }
  ];

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Donation submitted:', { selectedItems, donationMessage, donorInfo });
    alert('Thank you for your generous donation! We\'ll contact you soon with pickup details.');
  };

  const handleHelpRequest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Help request submitted:', helpRequest);
    alert('Your request has been received! We\'ll review it and get back to you within 24 hours.');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Make a <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">Difference</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Every donation creates a smile. Every request for help connects us to someone who needs our kindness.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-6">
          <Tabs defaultValue={defaultTab} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-12 bg-white shadow-lg rounded-full p-2">
              <TabsTrigger 
                value="donate" 
                className="rounded-full py-4 text-lg font-semibold data-[state=active]:gradient-peach-lavender data-[state=active]:text-white"
              >
                <Gift className="w-5 h-5 mr-2" />
                I Want to Donate
              </TabsTrigger>
              <TabsTrigger 
                value="get-help" 
                className="rounded-full py-4 text-lg font-semibold data-[state=active]:gradient-sky-mint data-[state=active]:text-white"
              >
                <Users className="w-5 h-5 mr-2" />
                I Need Help
              </TabsTrigger>
            </TabsList>

            {/* Donation Tab */}
            <TabsContent value="donate" className="animate-fade-in-up">
              <Card className="border-0 shadow-xl">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
                    Choose What to Donate
                  </CardTitle>
                  <p className="text-lg text-gray-600">
                    Select the items you'd like to donate and we'll arrange the rest
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDonationSubmit} className="space-y-8">
                    {/* Item Selection */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {donationItems.map((item) => (
                        <Card
                          key={item.id}
                          className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                            selectedItems.includes(item.id)
                              ? 'ring-4 ring-purple-300 bg-purple-50'
                              : 'hover:shadow-lg'
                          }`}
                          onClick={() => toggleItem(item.id)}
                        >
                          <CardContent className="p-6 text-center">
                            <div className="text-4xl mb-3">{item.emoji}</div>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                              selectedItems.includes(item.id) ? 'gradient-peach-lavender' : 'bg-gray-100'
                            }`}>
                              <item.icon className={`w-6 h-6 ${
                                selectedItems.includes(item.id) ? 'text-white' : 'text-gray-600'
                              }`} />
                            </div>
                            <h3 className="font-semibold mb-2">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Donation Message */}
                    <div className="space-y-4">
                      <Label htmlFor="message" className="text-lg font-semibold">
                        Add a Kind Message (Optional)
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Write a heartfelt message for the child who will receive your donation..."
                        value={donationMessage}
                        onChange={(e) => setDonationMessage(e.target.value)}
                        className="min-h-[100px] rounded-xl border-gray-200 focus:ring-purple-300"
                      />
                    </div>

                    {/* Donor Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Label htmlFor="donor-name" className="text-lg font-semibold">Your Name</Label>
                        <Input
                          id="donor-name"
                          placeholder="Full Name"
                          value={donorInfo.name}
                          onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                          className="rounded-xl border-gray-200 focus:ring-purple-300"
                          required
                        />
                      </div>
                      <div className="space-y-4">
                        <Label htmlFor="donor-email" className="text-lg font-semibold">Email</Label>
                        <Input
                          id="donor-email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={donorInfo.email}
                          onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                          className="rounded-xl border-gray-200 focus:ring-purple-300"
                          required
                        />
                      </div>
                      <div className="space-y-4">
                        <Label htmlFor="donor-phone" className="text-lg font-semibold">Phone Number</Label>
                        <Input
                          id="donor-phone"
                          placeholder="(555) 123-4567"
                          value={donorInfo.phone}
                          onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                          className="rounded-xl border-gray-200 focus:ring-purple-300"
                          required
                        />
                      </div>
                      <div className="space-y-4">
                        <Label htmlFor="donor-location" className="text-lg font-semibold">Location</Label>
                        <Input
                          id="donor-location"
                          placeholder="City, State"
                          value={donorInfo.location}
                          onChange={(e) => setDonorInfo({...donorInfo, location: e.target.value})}
                          className="rounded-xl border-gray-200 focus:ring-purple-300"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full gradient-peach-lavender text-white rounded-full py-4 text-lg font-semibold hover:scale-105 transition-transform duration-300"
                      disabled={selectedItems.length === 0}
                    >
                      <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                      Submit Donation
                      <Send className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Get Help Tab */}
            <TabsContent value="get-help" className="animate-fade-in-up">
              <Card className="border-0 shadow-xl">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
                    Request Help
                  </CardTitle>
                  <p className="text-lg text-gray-600">
                    Tell us how we can help you or your child. We're here to support you.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleHelpRequest} className="space-y-8">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Label htmlFor="help-name" className="text-lg font-semibold">Name</Label>
                        <Input
                          id="help-name"
                          placeholder="Full Name"
                          value={helpRequest.name}
                          onChange={(e) => setHelpRequest({...helpRequest, name: e.target.value})}
                          className="rounded-xl border-gray-200 focus:ring-blue-300"
                          required
                        />
                      </div>
                      <div className="space-y-4">
                        <Label htmlFor="help-email" className="text-lg font-semibold">Email</Label>
                        <Input
                          id="help-email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={helpRequest.email}
                          onChange={(e) => setHelpRequest({...helpRequest, email: e.target.value})}
                          className="rounded-xl border-gray-200 focus:ring-blue-300"
                          required
                        />
                      </div>
                      <div className="space-y-4">
                        <Label htmlFor="help-phone" className="text-lg font-semibold">Phone Number</Label>
                        <Input
                          id="help-phone"
                          placeholder="(555) 123-4567"
                          value={helpRequest.phone}
                          onChange={(e) => setHelpRequest({...helpRequest, phone: e.target.value})}
                          className="rounded-xl border-gray-200 focus:ring-blue-300"
                          required
                        />
                      </div>
                      <div className="space-y-4">
                        <Label htmlFor="help-location" className="text-lg font-semibold">Location</Label>
                        <Input
                          id="help-location"
                          placeholder="City, State"
                          value={helpRequest.location}
                          onChange={(e) => setHelpRequest({...helpRequest, location: e.target.value})}
                          className="rounded-xl border-gray-200 focus:ring-blue-300"
                          required
                        />
                      </div>
                    </div>

                    {/* What do you need */}
                    <div className="space-y-4">
                      <Label htmlFor="need" className="text-lg font-semibold">What do you need help with?</Label>
                      <select
                        id="need"
                        value={helpRequest.need}
                        onChange={(e) => setHelpRequest({...helpRequest, need: e.target.value})}
                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="school-supplies">School Supplies</option>
                        <option value="clothes">Clothing</option>
                        <option value="toys">Toys</option>
                        <option value="snacks">Food/Snacks</option>
                        <option value="birthday-kit">Birthday Kit</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                      <Label htmlFor="description" className="text-lg font-semibold">
                        Tell us more about your situation
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Please describe your current situation and how we can best help you..."
                        value={helpRequest.description}
                        onChange={(e) => setHelpRequest({...helpRequest, description: e.target.value})}
                        className="min-h-[120px] rounded-xl border-gray-200 focus:ring-blue-300"
                        required
                      />
                    </div>

                    {/* Urgency */}
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">How urgent is this request?</Label>
                      <div className="flex space-x-4">
                        {[
                          { value: 'low', label: 'Not urgent', color: 'bg-green-100 text-green-700' },
                          { value: 'normal', label: 'Normal', color: 'bg-yellow-100 text-yellow-700' },
                          { value: 'high', label: 'Urgent', color: 'bg-red-100 text-red-700' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="urgency"
                              value={option.value}
                              checked={helpRequest.urgency === option.value}
                              onChange={(e) => setHelpRequest({...helpRequest, urgency: e.target.value})}
                              className="sr-only"
                            />
                            <div className={`px-4 py-2 rounded-full transition-colors ${
                              helpRequest.urgency === option.value 
                                ? option.color 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {option.label}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full gradient-sky-mint text-white rounded-full py-4 text-lg font-semibold hover:scale-105 transition-transform duration-300"
                    >
                      <HelpCircle className="w-5 h-5 mr-2" />
                      Submit Request
                      <Send className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;
