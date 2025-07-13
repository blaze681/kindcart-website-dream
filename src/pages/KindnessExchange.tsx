
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Heart, MapPin, Clock, User, Plus, Package, HandHeart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AddDonationModal from '@/components/AddDonationModal';
import AddRequestModal from '@/components/AddRequestModal';
import RequestItemModal from '@/components/RequestItemModal';
import DonateItemModal from '@/components/DonateItemModal';

interface DonationItem {
  id: string;
  title: string;
  description: string;
  category: string;
  location?: string;
  donorName: string;
  donorId: string;
  status: 'available' | 'claimed' | 'pending';
  imageUrl?: string;
  createdAt: string;
  urgency?: 'low' | 'medium' | 'high';
}

interface NeedRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  childAge?: number;
  reason: string;
  requesterName: string;
  requesterId: string;
  isAnonymous: boolean;
  status: 'open' | 'matched' | 'fulfilled';
  urgency: 'low' | 'medium' | 'high';
  createdAt: string;
}

const CATEGORIES = [
  'Education', 'Clothing', 'Toys', 'Books', 'Electronics', 
  'Food', 'Healthcare', 'Sports', 'Art Supplies', 'Other'
];

const KindnessExchange = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('donations');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUrgency, setSelectedUrgency] = useState('all');
  const [donations, setDonations] = useState<DonationItem[]>([]);
  const [requests, setRequests] = useState<NeedRequest[]>([]);
  const [showAddDonation, setShowAddDonation] = useState(false);
  const [showAddRequest, setShowAddRequest] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DonationItem | NeedRequest | null>(null);
  const [modalType, setModalType] = useState<'request' | 'donate' | null>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedDonations = localStorage.getItem('kindcart_donations');
    const savedRequests = localStorage.getItem('kindcart_requests');
    
    if (savedDonations) {
      setDonations(JSON.parse(savedDonations));
    } else {
      // Mock initial donations
      const mockDonations: DonationItem[] = [
        {
          id: '1',
          title: 'School Backpack',
          description: 'Brand new school backpack with multiple compartments, perfect for elementary school kids.',
          category: 'Education',
          location: 'Downtown',
          donorName: 'Sarah M.',
          donorId: 'donor1',
          status: 'available',
          createdAt: new Date().toISOString(),
          urgency: 'medium'
        },
        {
          id: '2',
          title: 'Winter Jacket Size 8',
          description: 'Warm winter jacket, size 8, in excellent condition. Perfect for keeping kids warm.',
          category: 'Clothing',
          location: 'North Side',
          donorName: 'Mike R.',
          donorId: 'donor2',
          status: 'available',
          createdAt: new Date().toISOString(),
          urgency: 'high'
        }
      ];
      setDonations(mockDonations);
      localStorage.setItem('kindcart_donations', JSON.stringify(mockDonations));
    }
    
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    } else {
      // Mock initial requests
      const mockRequests: NeedRequest[] = [
        {
          id: '1',
          title: 'Art Supplies for Creative Child',
          description: 'Looking for crayons, markers, and drawing paper for my 7-year-old who loves to draw.',
          category: 'Art Supplies',
          childAge: 7,
          reason: 'My daughter has shown incredible artistic talent and would love to explore her creativity further.',
          requesterName: 'Anna L.',
          requesterId: 'requester1',
          isAnonymous: false,
          status: 'open',
          urgency: 'low',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Soccer Cleats Size 5',
          description: 'Need soccer cleats for my son to join the local youth league.',
          category: 'Sports',
          childAge: 10,
          reason: 'My son wants to join the soccer team but we need proper equipment.',
          requesterName: 'Anonymous',
          requesterId: 'requester2',
          isAnonymous: true,
          status: 'open',
          urgency: 'medium',
          createdAt: new Date().toISOString()
        }
      ];
      setRequests(mockRequests);
      localStorage.setItem('kindcart_requests', JSON.stringify(mockRequests));
    }
  }, []);

  // Filter functions
  const filteredDonations = donations.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesUrgency = selectedUrgency === 'all' || item.urgency === selectedUrgency;
    const isAvailable = item.status === 'available';
    
    return matchesSearch && matchesCategory && matchesUrgency && isAvailable;
  });

  const filteredRequests = requests.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesUrgency = selectedUrgency === 'all' || item.urgency === selectedUrgency;
    const isOpen = item.status === 'open';
    
    return matchesSearch && matchesCategory && matchesUrgency && isOpen;
  });

  const handleAddDonation = (donationData: Omit<DonationItem, 'id' | 'donorId' | 'donorName' | 'createdAt' | 'status'>) => {
    if (!user) return;
    
    const newDonation: DonationItem = {
      ...donationData,
      id: Date.now().toString(),
      donorId: user.id,
      donorName: `${user.name.split(' ')[0]} ${user.name.split(' ')[1]?.[0] || ''}.`,
      status: 'available',
      createdAt: new Date().toISOString()
    };
    
    const updatedDonations = [...donations, newDonation];
    setDonations(updatedDonations);
    localStorage.setItem('kindcart_donations', JSON.stringify(updatedDonations));
    
    toast({
      title: "Donation Added!",
      description: "Your item has been listed in the Kindness Exchange."
    });
  };

  const handleAddRequest = (requestData: Omit<NeedRequest, 'id' | 'requesterId' | 'requesterName' | 'createdAt' | 'status'>) => {
    if (!user) return;
    
    const newRequest: NeedRequest = {
      ...requestData,
      id: Date.now().toString(),
      requesterId: user.id,
      requesterName: requestData.isAnonymous ? 'Anonymous' : `${user.name.split(' ')[0]} ${user.name.split(' ')[1]?.[0] || ''}.`,
      status: 'open',
      createdAt: new Date().toISOString()
    };
    
    const updatedRequests = [...requests, newRequest];
    setRequests(updatedRequests);
    localStorage.setItem('kindcart_requests', JSON.stringify(updatedRequests));
    
    toast({
      title: "Request Added!",
      description: "Your request has been posted in the Kindness Exchange."
    });
  };

  const handleRequestItem = (item: DonationItem, requestData: any) => {
    // Update item status to pending
    const updatedDonations = donations.map(d => 
      d.id === item.id ? { ...d, status: 'pending' as const } : d
    );
    setDonations(updatedDonations);
    localStorage.setItem('kindcart_donations', JSON.stringify(updatedDonations));
    
    toast({
      title: "Request Sent!",
      description: "The donor has been notified of your request."
    });
  };

  const handleDonateToRequest = (request: NeedRequest, donationData: any) => {
    // Update request status to matched
    const updatedRequests = requests.map(r => 
      r.id === request.id ? { ...r, status: 'matched' as const } : r
    );
    setRequests(updatedRequests);
    localStorage.setItem('kindcart_requests', JSON.stringify(updatedRequests));
    
    toast({
      title: "Match Made!",
      description: "You've been connected with the requester."
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openRequestModal = (item: DonationItem) => {
    setSelectedItem(item);
    setModalType('request');
  };

  const openDonateModal = (item: NeedRequest) => {
    setSelectedItem(item);
    setModalType('donate');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-6 text-center">
            <Heart className="w-16 h-16 mx-auto mb-6 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Join the Kindness Exchange</h1>
            <p className="text-xl text-gray-600 mb-8">Please log in to access the marketplace</p>
            <Button 
              onClick={() => window.location.href = '/login'}
              className="gradient-peach-lavender text-white"
            >
              Login to Continue
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              <Heart className="inline w-10 h-10 mr-3 text-purple-600" />
              Kindness Exchange
            </h1>
            <p className="text-xl text-gray-600">
              Connect hearts, share kindness - A marketplace for giving
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="donations" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Items Available
                </TabsTrigger>
                <TabsTrigger value="requests" className="flex items-center gap-2">
                  <HandHeart className="w-4 h-4" />
                  Requests
                </TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowAddDonation(true)}
                  className="gradient-peach-lavender text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Donation
                </Button>
                <Button 
                  onClick={() => setShowAddRequest(true)}
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Request
                </Button>
              </div>
            </div>

            <TabsContent value="donations">
              {filteredDonations.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No donations available</h3>
                  <p className="text-gray-500">Be the first to share something with the community!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDonations.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <Badge className={getUrgencyColor(item.urgency || 'low')}>
                            {item.urgency || 'low'}
                          </Badge>
                        </div>
                        <Badge variant="secondary">{item.category}</Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{item.donorName}</span>
                        </div>
                        {item.location && (
                          <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{item.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 mb-4">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <Button 
                          onClick={() => openRequestModal(item)}
                          className="w-full gradient-sky-mint text-white"
                          disabled={item.donorId === user?.id}
                        >
                          {item.donorId === user?.id ? 'Your Donation' : 'Request This Item'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="requests">
              {filteredRequests.length === 0 ? (
                <div className="text-center py-16">
                  <HandHeart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No requests posted</h3>
                  <p className="text-gray-500">Help someone in need by posting the first request!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRequests.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <Badge className={getUrgencyColor(item.urgency)}>
                            {item.urgency}
                          </Badge>
                        </div>
                        <Badge variant="secondary">{item.category}</Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        {item.childAge && (
                          <p className="text-sm text-purple-600 mb-2">For child aged {item.childAge}</p>
                        )}
                        <p className="text-sm text-gray-700 mb-4 italic">"{item.reason}"</p>
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{item.requesterName}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <Button 
                          onClick={() => openDonateModal(item)}
                          className="w-full gradient-peach-lavender text-white"
                          disabled={item.requesterId === user?.id}
                        >
                          {item.requesterId === user?.id ? 'Your Request' : 'Donate This Item'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />

      {/* Modals */}
      <AddDonationModal
        isOpen={showAddDonation}
        onClose={() => setShowAddDonation(false)}
        onSubmit={handleAddDonation}
        categories={CATEGORIES}
      />

      <AddRequestModal
        isOpen={showAddRequest}
        onClose={() => setShowAddRequest(false)}
        onSubmit={handleAddRequest}
        categories={CATEGORIES}
      />

      {modalType === 'request' && selectedItem && (
        <RequestItemModal
          isOpen={true}
          onClose={() => {
            setModalType(null);
            setSelectedItem(null);
          }}
          item={selectedItem as DonationItem}
          onSubmit={handleRequestItem}
        />
      )}

      {modalType === 'donate' && selectedItem && (
        <DonateItemModal
          isOpen={true}
          onClose={() => {
            setModalType(null);
            setSelectedItem(null);
          }}
          request={selectedItem as NeedRequest}
          onSubmit={handleDonateToRequest}
        />
      )}
    </div>
  );
};

export default KindnessExchange;
