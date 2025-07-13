import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DonationSuccessModal from '@/components/DonationSuccessModal';
import HelpRequestSuccessModal from '@/components/HelpRequestSuccessModal';
import CertificateOfKindness from '@/components/CertificateOfKindness';
import { Gift, Heart, Book, Shirt, Gamepad2, Apple, PartyPopper, Send, Users, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

const Donate = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const defaultTab = urlParams.get('tab') === 'get-help' ? 'get-help' : 'donate';
  const { user } = useAuth();
  
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

  // Modal states
  const [showDonationSuccess, setShowDonationSuccess] = useState(false);
  const [showHelpRequestSuccess, setShowHelpRequestSuccess] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  // Form validation states
  const [donationErrors, setDonationErrors] = useState<{[key: string]: string}>({});
  const [helpErrors, setHelpErrors] = useState<{[key: string]: string}>({});

  // Certificate data
  const [certificateData, setCertificateData] = useState({
    userName: '',
    donationType: '',
    donationDate: ''
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
    // Clear validation error when user selects items
    if (donationErrors.items) {
      setDonationErrors(prev => ({ ...prev, items: '' }));
    }
  };

  const validateDonationForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (selectedItems.length === 0) {
      errors.items = 'Please select at least one item to donate';
    }
    if (!donorInfo.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!donorInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(donorInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!donorInfo.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    if (!donorInfo.location.trim()) {
      errors.location = 'Location is required';
    }

    setDonationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateHelpForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!helpRequest.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!helpRequest.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(helpRequest.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!helpRequest.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    if (!helpRequest.location.trim()) {
      errors.location = 'Location is required';
    }
    if (!helpRequest.need) {
      errors.need = 'Please select what you need help with';
    }
    if (!helpRequest.description.trim()) {
      errors.description = 'Please describe your situation';
    }

    setHelpErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetDonationForm = () => {
    setSelectedItems([]);
    setDonationMessage('');
    setDonorInfo({
      name: '',
      email: '',
      phone: '',
      location: ''
    });
    setDonationErrors({});
  };

  const resetHelpForm = () => {
    setHelpRequest({
      name: '',
      email: '',
      phone: '',
      location: '',
      need: '',
      description: '',
      urgency: 'normal'
    });
    setHelpErrors({});
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateDonationForm()) {
      return;
    }

    console.log('Donation submitted:', { selectedItems, donationMessage, donorInfo });
    
    // Prepare certificate data
    const donationType = selectedItems.map(id => {
      const itemMap: { [key: string]: string } = {
        'school-supplies': 'School Supplies',
        'clothes': 'Clothes',
        'toys': 'Toys',
        'snacks': 'Snacks',
        'birthday-kit': 'Birthday Kit'
      };
      return itemMap[id] || id;
    }).join(', ');

    setCertificateData({
      userName: donorInfo.name || user?.name || 'Kind Friend',
      donationType,
      donationDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    });
    
    // Show success modal
    setShowDonationSuccess(true);
  };

  const handleHelpRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateHelpForm()) {
      return;
    }

    console.log('Help request submitted:', helpRequest);
    
    // Show success modal and reset form
    setShowHelpRequestSuccess(true);
    resetHelpForm();
  };

  const handleMakeAnotherDonation = () => {
    setShowDonationSuccess(false);
    resetDonationForm();
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowCertificate = () => {
    setShowDonationSuccess(false);
    setShowCertificate(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-white to-soft-gray">
      <Header />
      
      <section className="pt-32 pb-24 gradient-premium-hero relative overflow-hidden">
        <div className="floating-shapes"></div>
        <div className="container mx-auto px-8">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-premium-xl font-bold text-white mb-8 font-baloo leading-tight">
              Make a <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">Difference</span>
            </h1>
            <p className="text-xl text-white/95 leading-relaxed font-nunito max-w-2xl mx-auto">
              Every donation creates a smile. Every request for help connects us to someone who needs our kindness.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white to-soft-gray">
        <div className="container mx-auto px-8">
          <Tabs defaultValue={defaultTab} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-16 bg-white shadow-xl rounded-full p-3 border-0">
              <TabsTrigger 
                value="donate" 
                className="rounded-full py-5 px-8 text-lg font-semibold transition-all duration-300 data-[state=active]:gradient-peach-lavender data-[state=active]:text-white data-[state=active]:shadow-lg hover:scale-105"
              >
                <Gift className="w-6 h-6 mr-3" />
                I Want to Donate
              </TabsTrigger>
              <TabsTrigger 
                value="get-help" 
                className="rounded-full py-5 px-8 text-lg font-semibold transition-all duration-300 data-[state=active]:gradient-sky-mint data-[state=active]:text-white data-[state=active]:shadow-lg hover:scale-105"
              >
                <Users className="w-6 h-6 mr-3" />
                I Need Help
              </TabsTrigger>
            </TabsList>

            {/* Donation Tab */}
            <TabsContent value="donate" className="animate-fade-in-up">
              <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="text-center pb-12 bg-gradient-to-br from-peach/20 to-lilac/20">
                  <CardTitle className="text-4xl font-bold text-gray-800 mb-6 font-baloo">
                    Choose What to Donate
                  </CardTitle>
                  <p className="text-xl text-gray-600 font-nunito max-w-2xl mx-auto leading-relaxed">
                    Select the items you'd like to donate and we'll arrange the rest
                  </p>
                </CardHeader>
                <CardContent className="p-12">
                  <form onSubmit={handleDonationSubmit} className="space-y-12">
                    {/* Item Selection with error handling */}
                    <div className="space-y-6">
                      {donationErrors.items && (
                        <div className="text-red-600 text-center font-medium bg-red-50 p-4 rounded-xl">
                          {donationErrors.items}
                        </div>
                      )}
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {donationItems.map((item) => (
                          <Card
                            key={item.id}
                            className={`cursor-pointer transition-all duration-300 hover:scale-105 hover-lift ${
                              selectedItems.includes(item.id)
                                ? 'ring-4 ring-purple-300 bg-purple-50 shadow-xl'
                                : 'hover:shadow-xl border-gray-200'
                            }`}
                            onClick={() => toggleItem(item.id)}
                          >
                            <CardContent className="p-8 text-center">
                              <div className="text-5xl mb-4 animate-gentle-float">{item.emoji}</div>
                              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${
                                selectedItems.includes(item.id) 
                                  ? 'gradient-peach-lavender shadow-lg' 
                                  : 'bg-gray-100 hover:bg-gray-200'
                              }`}>
                                <item.icon className={`w-8 h-8 ${
                                  selectedItems.includes(item.id) ? 'text-white' : 'text-gray-600'
                                }`} />
                              </div>
                              <h3 className="font-bold text-lg mb-3 font-nunito">{item.name}</h3>
                              <p className="text-sm text-gray-600 font-nunito leading-relaxed">{item.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Donation Message */}
                    <div className="space-y-4">
                      <Label htmlFor="message" className="text-xl font-semibold text-gray-800 block mb-2">
                        Add a Kind Message (Optional)
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Write a heartfelt message for the child who will receive your donation..."
                        value={donationMessage}
                        onChange={(e) => setDonationMessage(e.target.value)}
                        className="min-h-[120px] rounded-2xl border-gray-200 focus:ring-purple-300 focus:border-purple-300 text-base p-6 font-nunito"
                      />
                    </div>

                    {/* Donor Information with validation */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="donor-name" className="text-lg font-semibold text-gray-800 block mb-2">
                          Your Name *
                        </Label>
                        <Input
                          id="donor-name"
                          placeholder="Enter your full name"
                          value={donorInfo.name}
                          onChange={(e) => {
                            setDonorInfo({...donorInfo, name: e.target.value});
                            if (donationErrors.name) setDonationErrors(prev => ({...prev, name: ''}));
                          }}
                          className={`rounded-2xl border-2 p-4 text-base font-nunito focus:ring-purple-300 transition-all duration-200 ${
                            donationErrors.name ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-purple-300'
                          }`}
                        />
                        {donationErrors.name && (
                          <p className="text-red-600 text-sm mt-1">{donationErrors.name}</p>
                        )}
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="donor-email" className="text-lg font-semibold text-gray-800 block mb-2">
                          Email Address *
                        </Label>
                        <Input
                          id="donor-email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={donorInfo.email}
                          onChange={(e) => {
                            setDonorInfo({...donorInfo, email: e.target.value});
                            if (donationErrors.email) setDonationErrors(prev => ({...prev, email: ''}));
                          }}
                          className={`rounded-2xl border-2 p-4 text-base font-nunito focus:ring-purple-300 transition-all duration-200 ${
                            donationErrors.email ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-purple-300'
                          }`}
                        />
                        {donationErrors.email && (
                          <p className="text-red-600 text-sm mt-1">{donationErrors.email}</p>
                        )}
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="donor-phone" className="text-lg font-semibold text-gray-800 block mb-2">
                          Phone Number *
                        </Label>
                        <Input
                          id="donor-phone"
                          placeholder="(555) 123-4567"
                          value={donorInfo.phone}
                          onChange={(e) => {
                            setDonorInfo({...donorInfo, phone: e.target.value});
                            if (donationErrors.phone) setDonationErrors(prev => ({...prev, phone: ''}));
                          }}
                          className={`rounded-2xl border-2 p-4 text-base font-nunito focus:ring-purple-300 transition-all duration-200 ${
                            donationErrors.phone ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-purple-300'
                          }`}
                        />
                        {donationErrors.phone && (
                          <p className="text-red-600 text-sm mt-1">{donationErrors.phone}</p>
                        )}
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="donor-location" className="text-lg font-semibold text-gray-800 block mb-2">
                          Location *
                        </Label>
                        <Input
                          id="donor-location"
                          placeholder="City, State"
                          value={donorInfo.location}
                          onChange={(e) => {
                            setDonorInfo({...donorInfo, location: e.target.value});
                            if (donationErrors.location) setDonationErrors(prev => ({...prev, location: ''}));
                          }}
                          className={`rounded-2xl border-2 p-4 text-base font-nunito focus:ring-purple-300 transition-all duration-200 ${
                            donationErrors.location ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-purple-300'
                          }`}
                        />
                        {donationErrors.location && (
                          <p className="text-red-600 text-sm mt-1">{donationErrors.location}</p>
                        )}
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full gradient-peach-lavender text-white rounded-full py-6 text-xl font-bold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl btn-heart-beat"
                    >
                      <Heart className="w-6 h-6 mr-3" fill="currentColor" />
                      Donate Now
                      <Send className="w-6 h-6 ml-3" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="get-help" className="animate-fade-in-up">
              <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="text-center pb-12 bg-gradient-to-br from-baby-blue/20 to-mint/20">
                  <CardTitle className="text-4xl font-bold text-gray-800 mb-6 font-baloo">
                    Request Help
                  </CardTitle>
                  <p className="text-xl text-gray-600 font-nunito max-w-2xl mx-auto leading-relaxed">
                    Tell us how we can help you or your child. We're here to support you.
                  </p>
                </CardHeader>
                <CardContent className="p-12">
                  <form onSubmit={handleHelpRequest} className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="help-name" className="text-lg font-semibold text-gray-800 block mb-2">
                          Your Name *
                        </Label>
                        <Input
                          id="help-name"
                          placeholder="Enter your full name"
                          value={helpRequest.name}
                          onChange={(e) => {
                            setHelpRequest({...helpRequest, name: e.target.value});
                            if (helpErrors.name) setHelpErrors(prev => ({...prev, name: ''}));
                          }}
                          className={`rounded-2xl border-2 p-4 text-base font-nunito focus:ring-blue-300 transition-all duration-200 ${
                            helpErrors.name ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-blue-300'
                          }`}
                        />
                        {helpErrors.name && (
                          <p className="text-red-600 text-sm mt-1">{helpErrors.name}</p>
                        )}
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="help-email" className="text-lg font-semibold text-gray-800 block mb-2">
                          Email Address *
                        </Label>
                        <Input
                          id="help-email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={helpRequest.email}
                          onChange={(e) => {
                            setHelpRequest({...helpRequest, email: e.target.value});
                            if (helpErrors.email) setHelpErrors(prev => ({...prev, email: ''}));
                          }}
                          className={`rounded-2xl border-2 p-4 text-base font-nunito focus:ring-blue-300 transition-all duration-200 ${
                            helpErrors.email ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-blue-300'
                          }`}
                        />
                        {helpErrors.email && (
                          <p className="text-red-600 text-sm mt-1">{helpErrors.email}</p>
                        )}
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="help-phone" className="text-lg font-semibold text-gray-800 block mb-2">
                          Phone Number *
                        </Label>
                        <Input
                          id="help-phone"
                          placeholder="(555) 123-4567"
                          value={helpRequest.phone}
                          onChange={(e) => {
                            setHelpRequest({...helpRequest, phone: e.target.value});
                            if (helpErrors.phone) setHelpErrors(prev => ({...prev, phone: ''}));
                          }}
                          className={`rounded-2xl border-2 p-4 text-base font-nunito focus:ring-blue-300 transition-all duration-200 ${
                            helpErrors.phone ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-blue-300'
                          }`}
                        />
                        {helpErrors.phone && (
                          <p className="text-red-600 text-sm mt-1">{helpErrors.phone}</p>
                        )}
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="help-location" className="text-lg font-semibold text-gray-800 block mb-2">
                          Location *
                        </Label>
                        <Input
                          id="help-location"
                          placeholder="City, State"
                          value={helpRequest.location}
                          onChange={(e) => {
                            setHelpRequest({...helpRequest, location: e.target.value});
                            if (helpErrors.location) setHelpErrors(prev => ({...prev, location: ''}));
                          }}
                          className={`rounded-2xl border-2 p-4 text-base font-nunito focus:ring-blue-300 transition-all duration-200 ${
                            helpErrors.location ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-blue-300'
                          }`}
                        />
                        {helpErrors.location && (
                          <p className="text-red-600 text-sm mt-1">{helpErrors.location}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="need" className="text-lg font-semibold text-gray-800 block mb-2">
                        What do you need help with? *
                      </Label>
                      <select
                        id="need"
                        value={helpRequest.need}
                        onChange={(e) => {
                          setHelpRequest({...helpRequest, need: e.target.value});
                          if (helpErrors.need) setHelpErrors(prev => ({...prev, need: ''}));
                        }}
                        className={`w-full p-4 rounded-2xl border-2 text-base font-nunito focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                          helpErrors.need ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-blue-300'
                        }`}
                      >
                        <option value="">Select what you need</option>
                        <option value="school-supplies">School Supplies</option>
                        <option value="clothes">Clothing</option>
                        <option value="toys">Toys</option>
                        <option value="snacks">Food/Snacks</option>
                        <option value="birthday-kit">Birthday Kit</option>
                        <option value="other">Other</option>
                      </select>
                      {helpErrors.need && (
                        <p className="text-red-600 text-sm mt-1">{helpErrors.need}</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="description" className="text-lg font-semibold text-gray-800 block mb-2">
                        Tell us more about your situation *
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Please describe your current situation and how we can best help you..."
                        value={helpRequest.description}
                        onChange={(e) => {
                          setHelpRequest({...helpRequest, description: e.target.value});
                          if (helpErrors.description) setHelpErrors(prev => ({...prev, description: ''}));
                        }}
                        className={`min-h-[140px] rounded-2xl border-2 p-4 text-base font-nunito focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                          helpErrors.description ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-blue-300'
                        }`}
                      />
                      {helpErrors.description && (
                        <p className="text-red-600 text-sm mt-1">{helpErrors.description}</p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-semibold text-gray-800 block mb-2">
                        How urgent is this request?
                      </Label>
                      <div className="flex flex-wrap gap-4">
                        {[
                          { value: 'low', label: 'Not urgent', color: 'bg-green-100 text-green-700 border-green-200' },
                          { value: 'normal', label: 'Normal', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
                          { value: 'high', label: 'Urgent', color: 'bg-red-100 text-red-700 border-red-200' }
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
                            <div className={`px-6 py-3 rounded-full transition-all duration-200 border-2 font-medium ${
                              helpRequest.urgency === option.value 
                                ? option.color + ' scale-105 shadow-md'
                                : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-150'
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
                      className="w-full gradient-sky-mint text-white rounded-full py-6 text-xl font-bold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl btn-heart-beat"
                    >
                      <HelpCircle className="w-6 h-6 mr-3" />
                      Submit Request
                      <Send className="w-6 h-6 ml-3" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Success Modals */}
      <DonationSuccessModal
        isOpen={showDonationSuccess}
        onClose={() => setShowDonationSuccess(false)}
        userName={donorInfo.name || user?.name || 'Friend'}
        selectedItems={selectedItems}
        onMakeAnotherDonation={handleMakeAnotherDonation}
        onShowCertificate={handleShowCertificate}
      />

      <HelpRequestSuccessModal
        isOpen={showHelpRequestSuccess}
        onClose={() => setShowHelpRequestSuccess(false)}
        userName={helpRequest.name || 'Friend'}
      />

      <CertificateOfKindness
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        userName={certificateData.userName}
        donationType={certificateData.donationType}
        donationDate={certificateData.donationDate}
      />

      <Footer />
    </div>
  );
};

export default Donate;
