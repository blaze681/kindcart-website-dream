
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, Gift } from 'lucide-react';

interface DonationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  selectedItems: string[];
  onMakeAnotherDonation: () => void;
  onShowCertificate?: () => void;
  isFirstDonation?: boolean;
}

const DonationSuccessModal: React.FC<DonationSuccessModalProps> = ({
  isOpen,
  onClose,
  userName,
  selectedItems,
  onMakeAnotherDonation,
  onShowCertificate,
  isFirstDonation = false
}) => {
  const itemNames = selectedItems.map(id => {
    const itemMap: { [key: string]: string } = {
      'school-supplies': 'School Supplies',
      'clothes': 'Clothes',
      'toys': 'Toys',
      'snacks': 'Snacks',
      'birthday-kit': 'Birthday Kit'
    };
    return itemMap[id] || id;
  }).join(', ');

  useEffect(() => {
    if (isOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white border-0 shadow-2xl rounded-3xl p-12 text-center">
        <div className="flex flex-col items-center space-y-8">
          {/* Animated Heart Icon */}
          <div className="relative">
            <Heart 
              className="w-24 h-24 text-red-500 animate-heart-pulse" 
              fill="currentColor"
            />
            <div className="absolute inset-0 w-24 h-24 rounded-full bg-red-100 animate-ping opacity-30"></div>
          </div>

          {/* Success Message */}
          <DialogHeader className="space-y-6">
            <DialogTitle className="text-4xl font-bold font-baloo gradient-peach-lavender bg-clip-text text-transparent">
              Thank You, {userName}! 💝
            </DialogTitle>
            <div className="space-y-4">
              <p className="text-xl text-gray-800 font-nunito leading-relaxed font-medium">
                Your gift of <span className="font-semibold text-purple-600">{itemNames}</span> will brighten a child's day!
              </p>
              <div className="flex items-center justify-center space-x-2 text-lg text-gray-700">
                <Gift className="w-6 h-6 text-pink-500" />
                <span className="font-medium">Your kindness makes a difference</span>
                <Gift className="w-6 h-6 text-pink-500" />
              </div>
            </div>
          </DialogHeader>

          {/* First Donation Special Message */}
          {isFirstDonation && (
            <div className="bg-gradient-to-r from-yellow-50 to-pink-50 p-6 rounded-2xl border-2 border-yellow-200">
              <p className="text-lg font-semibold text-amber-700 mb-3">🎉 Special Achievement Unlocked!</p>
              <p className="text-gray-700 font-medium">This is your first donation - you're now a Kindness Hero!</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
            {isFirstDonation && onShowCertificate && (
              <Button
                onClick={onShowCertificate}
                className="flex-1 gradient-peach-lavender text-white py-4 px-6 rounded-2xl text-lg font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                🎓 Get Your Certificate!
              </Button>
            )}
            <Button
              onClick={onMakeAnotherDonation}
              className="flex-1 gradient-peach-lavender text-white py-4 px-6 rounded-2xl text-lg font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg"
            >
              <Heart className="w-5 h-5 mr-2" fill="currentColor" />
              Make Another Donation
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-800 py-4 px-6 rounded-2xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300 font-medium"
            >
              Close
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 left-4 text-4xl animate-sparkle opacity-60">✨</div>
          <div className="absolute top-8 right-8 text-3xl animate-sparkle opacity-40" style={{ animationDelay: '0.5s' }}>🌟</div>
          <div className="absolute bottom-4 left-8 text-3xl animate-sparkle opacity-50" style={{ animationDelay: '1s' }}>💫</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationSuccessModal;
