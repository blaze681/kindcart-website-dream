
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Gift, Users, MapPin, Calendar, Star, Plus } from 'lucide-react';

interface Donation {
  id: string;
  item: string;
  category: string;
  status: 'pending' | 'approved' | 'delivered';
  date: string;
  recipient?: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    // Load user's donations from localStorage
    const savedDonations = localStorage.getItem(`donations_${user?.id}`);
    if (savedDonations) {
      setDonations(JSON.parse(savedDonations));
    } else {
      // Mock some initial donations for demo
      const mockDonations: Donation[] = [
        {
          id: '1',
          item: 'School Supplies Set',
          category: 'Education',
          status: 'delivered',
          date: '2024-01-15',
          recipient: 'Emma, Age 8'
        },
        {
          id: '2',
          item: 'Winter Jacket',
          category: 'Clothing',
          status: 'approved',
          date: '2024-01-20'
        },
        {
          id: '3',
          item: 'Birthday Party Kit',
          category: 'Special Occasions',
          status: 'pending',
          date: '2024-01-25'
        }
      ];
      setDonations(mockDonations);
      localStorage.setItem(`donations_${user?.id}`, JSON.stringify(mockDonations));
    }
  }, [user?.id]);

  const stats = [
    { 
      icon: Gift, 
      value: donations.length, 
      label: 'Total Donations', 
      color: 'gradient-peach-lavender' 
    },
    { 
      icon: Heart, 
      value: donations.filter(d => d.status === 'delivered').length, 
      label: 'Delivered', 
      color: 'gradient-sky-mint' 
    },
    { 
      icon: Users, 
      value: donations.filter(d => d.recipient).length, 
      label: 'Children Helped', 
      color: 'gradient-peach-lavender' 
    },
    { 
      icon: Star, 
      value: donations.filter(d => d.status === 'delivered').length * 2, 
      label: 'Impact Points', 
      color: 'gradient-sky-mint' 
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50';
      case 'approved': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for spreading kindness with KindCart
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                      <p className="text-gray-600 text-sm">{stat.label}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Donations */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-gray-800">Your Donations</CardTitle>
                  <Button 
                    className="gradient-peach-lavender text-white"
                    onClick={() => window.location.href = '/donate'}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Donation
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {donations.map((donation) => (
                      <div key={donation.id} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">{donation.item}</h3>
                          <p className="text-gray-600 text-sm mb-2">{donation.category}</p>
                          {donation.recipient && (
                            <p className="text-purple-600 text-sm font-medium">
                              Delivered to {donation.recipient}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                            {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                          </span>
                          <p className="text-gray-500 text-xs mt-1">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {new Date(donation.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full gradient-peach-lavender text-white"
                    onClick={() => window.location.href = '/donate'}
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Make a Donation
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = '/impact'}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    View Impact
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = '/contact'}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Get Help
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg gradient-peach-lavender text-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Heart className="w-12 h-12 mx-auto mb-4" fill="currentColor" />
                    <h3 className="text-xl font-bold mb-2">Impact Milestone!</h3>
                    <p className="text-white/90 mb-4">
                      You've helped {donations.filter(d => d.recipient).length} children so far!
                    </p>
                    <Button 
                      className="bg-white text-purple-600 hover:bg-gray-50"
                      onClick={() => window.location.href = '/impact'}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
