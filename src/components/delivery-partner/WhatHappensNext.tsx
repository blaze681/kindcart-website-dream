import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Search, Monitor, Package, Truck, CheckCircle } from 'lucide-react';

const WhatHappensNext = () => {
  const steps = [
    {
      icon: FileText,
      title: 'Application Review',
      description: '3–5 days',
      detail: 'Our team carefully reviews your application and motivation.',
      status: 'pending',
      color: 'bg-gradient-to-br from-blue-400 to-blue-600'
    },
    {
      icon: Search,
      title: 'Background Check',
      description: 'Verification process',
      detail: 'Quick and secure background verification for safety.',
      status: 'pending',
      color: 'bg-gradient-to-br from-purple-400 to-purple-600'
    },
    {
      icon: Monitor,
      title: 'Virtual Orientation',
      description: 'Online training',
      detail: 'Learn about our mission, delivery process, and safety protocols.',
      status: 'pending',
      color: 'bg-gradient-to-br from-green-400 to-green-600'
    },
    {
      icon: Package,
      title: 'Welcome Kit + ID Badge',
      description: 'Official partner kit',
      detail: 'Receive your delivery bag, ID badge, and starter materials.',
      status: 'pending',
      color: 'bg-gradient-to-br from-orange-400 to-orange-600'
    },
    {
      icon: Truck,
      title: 'Start Delivering Smiles!',
      description: 'Begin your journey',
      detail: 'Start making a difference in children\'s lives across your community.',
      status: 'ready',
      color: 'bg-gradient-to-br from-pink-400 to-pink-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-soft-gray to-warm-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-premium-lg font-poppins mb-4 text-high-contrast">
            What Happens Next?
          </h2>
          <p className="text-lg text-medium-contrast max-w-2xl mx-auto">
            Here's your journey from application to becoming an official KindCart delivery partner.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 via-green-400 via-orange-400 to-pink-400 rounded-full" />
              
              <div className="grid grid-cols-5 gap-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="text-center">
                      {/* Icon Circle */}
                      <div className="relative mx-auto mb-6">
                        <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center shadow-lg relative z-10 animate-gentle-float`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        {step.status === 'ready' && (
                          <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 animate-heart-pulse">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      
                      {/* Content Card */}
                      <Card className="glass-card border-0 shadow-lg hover-lift h-full">
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg text-high-contrast mb-2">
                            {step.title}
                          </h3>
                          <p className="text-pink-600 font-semibold mb-3">
                            {step.description}
                          </p>
                          <p className="text-medium-contrast text-sm leading-relaxed">
                            {step.detail}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <div className={`${step.color} w-12 h-12 rounded-full flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {step.status === 'ready' && (
                      <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {index < steps.length - 1 && (
                      <div className="absolute top-12 left-6 w-0.5 h-16 bg-gradient-to-b from-gray-300 to-transparent" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <Card className="glass-card border-0 shadow-lg flex-1">
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg text-high-contrast mb-1">
                        {step.title}
                      </h3>
                      <p className="text-pink-600 font-semibold mb-2 text-sm">
                        {step.description}
                      </p>
                      <p className="text-medium-contrast text-sm leading-relaxed">
                        {step.detail}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 max-w-2xl mx-auto glass-card">
            <h3 className="text-2xl font-bold text-high-contrast mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-medium-contrast mb-6">
              Join hundreds of volunteers who have already delivered over 10,000 smiles to children in need.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-medium-contrast">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-heart-pulse" />
                <span>Fast Approval</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-heart-pulse" />
                <span>Flexible Schedule</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-heart-pulse" />
                <span>Community Impact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatHappensNext;