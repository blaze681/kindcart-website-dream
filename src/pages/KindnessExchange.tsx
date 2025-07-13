
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Heart, Gift, Users, MapPin, Calendar, Plus, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AddDonationModal from '@/components/exchange/AddDonationModal';
import AddRequestModal from '@/components/exchange/AddRequestModal';
import InteractionModal from '@/components/exchange/InteractionModal';

interface ExchangeItem {
  id: string;
  type: 'donation' | 'request';
  title: string;
  description: string;
  category: string;
  image?: string;
  userName: string;
  userId: string;
  location?: string;
  status: 'available' | 'pending' | 'claimed';
  dateCreated: string;
  matchedWith?: string;
  responses: Array<{
    id: string;
    userName: string;
    userId: string;
    message: string;
    email: string;
    date: string;
  }>;
}

const KindnessExchange = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<ExchangeItem[]>([]);
  const [showAddDonation, setShowAddDonation] = useState(false);
  const [showAddRequest, setShowAddRequest] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ExchangeItem | null>(null);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [interactionType, setInteractionType] = useState<'request' | 'donate'>('request');

  useEffect(() => {
    // Load exchange items from localStorage
    const savedItems = localStorage.getItem('kindness_exchange_items');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      // Add some demo data
      const demoItems: ExchangeItem[] = [
        {
          id: '1',
          type: 'donation',
          title: 'School Supplies Set',
          description: 'Complete set with notebooks, pencils, erasers, and rulers. Perfect for elementary students.',
          category: 'Education',
          userName: 'Sarah M.',
          userId: 'user1',
          location: 'Downtown Area',
          status: 'available',
          dateCreated: '2024-01-15',
          responses: []
        },
        {
          id: '2',
          type: 'request',
          title: 'Winter Jacket (Size 8-10)',
          description: 'Looking for a warm winter jacket for my daughter. Any color is fine.',
          category: 'Clothing',
          userName: 'Maria L.',
          userId: 'user2',
          location: 'North Side',
          status: 'available',
          dateCreated: '2024-01-18',
          responses: []
        },
        {
          id: '3',
          type: 'donation',
          title: 'Birthday Party Decorations',
          description: 'Balloons, banners, and party hats. Used once, in great condition.',
          category: 'Special Occasions',
          userName: 'David K.',
          userId: 'user3',
          status: 'pending',
          dateCreated: '2024-01-20',
          responses: []
        }
      ];
      setItems(demoItems);
      localStorage.setItem('kindness_exchange_items', JSON.stringify(demoItems));
    }
  }, []);

  const saveItems = (updatedItems: ExchangeItem[]) => {
    setItems(updatedItems);
    localStorage.setItem('kindness_exchange_items', JSON.stringify(updatedItems));
  };

  const handleAddItem = (newItem: Omit<ExchangeItem, 'id' | 'userId' | 'userName' | 'dateCreated' | 'responses'>) => {
    if (!user) return;

    const item: ExchangeItem = {
      ...newItem,
      id: Date.now().toString(),
      userId: user.id,
      userName: `${user.name.split(' ')[0]} ${user.name.split(' ')[1]?.[0] || ''}.`,
      dateCreated: new Date().toISOString(),
      responses: []
    };

    const updatedItems = [...items, item];
    saveItems(updatedItems);
    
    toast({
      title: "Posted Successfully!",
      description: `Your ${newItem.type} has been added to the exchange.`
    });
  };

  const handleInteraction = (item: ExchangeItem, type: 'request' | 'donate') => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to interact with listings.",
        variant: "destructive"
      });
      return;
    }

    if (item.userId === user.id) {
      toast({
        title: "Cannot Interact",
        description: "You cannot interact with your own listings.",
        variant: "destructive"
      });
      return;
    }

    setSelectedItem(item);
    setInteractionType(type);
    setShowInteractionModal(true);
  };

  const handleSubmitInteraction = (message: string, email: string) => {
    if (!selectedItem || !user) return;

    const response = {
      id: Date.now().toString(),
      userName: `${user.name.split(' ')[0]} ${user.name.split(' ')[1]?.[0] || ''}.`,
      userId: user.id,
      message,
      email,
      date: new Date().toISOString()
    };

    const updatedItems = items.map(item => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          status: 'pending' as const,
          responses: [...item.responses, response]
        };
      }
      return item;
    });

    saveItems(updatedItems);
    setShowInteractionModal(false);
    setSelectedItem(null);

    toast({
      title: "Response Sent!",
      description: "Your message has been sent to the poster. They will contact you soon."
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'claimed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const donations = items.filter(item => item.type === 'donation');
  const requests = items.filter(item => item.type === 'request');

  const ItemCard = ({ item }: { item: ExchangeItem }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300 bg-white border-0 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-semibold text-gray-800 leading-tight">
            {item.title}
          </CardTitle>
          <Badge className={`${getStatusColor(item.status)} text-xs font-medium`}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mb-3">{item.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="font-medium">{item.userName}</span>
          {item.location && (
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {item.location}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(item.dateCreated).toLocaleDateString()}
          </div>
          <div className="flex gap-2">
            {item.responses.length > 0 && (
              <div className="flex items-center text-xs text-blue-600">
                <MessageCircle className="w-3 h-3 mr-1" />
                {item.responses.length}
              </div>
            )}
            {item.status === 'available' && (
              <Button
                size="sm"
                onClick={() => handleInteraction(item, item.type === 'donation' ? 'request' : 'donate')}
                className="gradient-peach-lavender text-white"
              >
                {item.type === 'donation' ? 'Request Item' : 'Donate Item'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EmptyState = ({ type }: { type: 'donations' | 'requests' }) => (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-6 gradient-peach-lavender rounded-full flex items-center justify-center">
        <Heart className="w-12 h-12 text-white" fill="currentColor" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        No {type} yet
      </h3>
      <p className="text-gray-600 mb-6">
        Be the first to {type === 'donations' ? 'donate an item' : 'request help'}!
      </p>
      <Button
        onClick={() => type === 'donations' ? setShowAddDonation(true) : setShowAddRequest(true)}
        className="gradient-peach-lavender text-white"
      >
        <Plus className="w-4 h-4 mr-2" />
        {type === 'donations' ? 'Add Donation' : 'Add Request'}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Kindness Exchange 💝
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with your community to share resources and spread kindness. 
              Give what you can, request what you need.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center p-6 border-0 shadow-lg">
              <Gift className="w-8 h-8 mx-auto mb-3 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-800">{donations.length}</h3>
              <p className="text-gray-600">Items Available</p>
            </Card>
            <Card className="text-center p-6 border-0 shadow-lg">
              <Users className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-800">{requests.length}</h3>
              <p className="text-gray-600">Help Requests</p>
            </Card>
            <Card className="text-center p-6 border-0 shadow-lg">
              <Heart className="w-8 h-8 mx-auto mb-3 text-pink-600" fill="currentColor" />
              <h3 className="text-2xl font-bold text-gray-800">
                {items.filter(i => i.status === 'claimed').length}
              </h3>
              <p className="text-gray-600">Successful Matches</p>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="donations" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <TabsList className="grid w-full sm:w-auto grid-cols-2">
                <TabsTrigger value="donations" className="flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  Donations ({donations.length})
                </TabsTrigger>
                <TabsTrigger value="requests" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Requests ({requests.length})
                </TabsTrigger>
              </TabsList>

              {user && (
                <div className="flex gap-3">
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
              )}
            </div>

            <TabsContent value="donations" className="mt-0">
              {donations.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {donations.map(item => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <EmptyState type="donations" />
              )}
            </TabsContent>

            <TabsContent value="requests" className="mt-0">
              {requests.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {requests.map(item => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <EmptyState type="requests" />
              )}
            </TabsContent>
          </Tabs>

          {!user && (
            <div className="mt-12 text-center p-8 bg-white rounded-lg shadow-lg">
              <Heart className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Join the Kindness Exchange!
              </h3>
              <p className="text-gray-600 mb-6">
                Sign up to start donating items or requesting help from the community.
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = '/register'}
                  className="gradient-peach-lavender text-white"
                >
                  Sign Up
                </Button>
                <Button
                  onClick={() => window.location.href = '/login'}
                  variant="outline"
                >
                  Log In
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Modals */}
      <AddDonationModal
        open={showAddDonation}
        onOpenChange={setShowAddDonation}
        onSubmit={(data) => handleAddItem({ ...data, type: 'donation', status: 'available' })}
      />

      <AddRequestModal
        open={showAddRequest}
        onOpenChange={setShowAddRequest}
        onSubmit={(data) => handleAddItem({ ...data, type: 'request', status: 'available' })}
      />

      <InteractionModal
        open={showInteractionModal}
        onOpenChange={setShowInteractionModal}
        item={selectedItem}
        type={interactionType}
        onSubmit={handleSubmitInteraction}
      />
    </div>
  );
};

export default KindnessExchange;
