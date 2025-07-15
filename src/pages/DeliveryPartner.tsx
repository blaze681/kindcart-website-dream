import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DeliveryPartnerHero from '@/components/delivery-partner/DeliveryPartnerHero';
import PartnerApplicationForm from '@/components/delivery-partner/PartnerApplicationForm';
import WhatHappensNext from '@/components/delivery-partner/WhatHappensNext';
import PartnerStories from '@/components/delivery-partner/PartnerStories';

const DeliveryPartner = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <DeliveryPartnerHero />
        <PartnerApplicationForm />
        <WhatHappensNext />
        <PartnerStories />
      </main>
      <Footer />
    </div>
  );
};

export default DeliveryPartner;