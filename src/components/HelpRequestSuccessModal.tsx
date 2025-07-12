
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HelpRequestSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const HelpRequestSuccessModal: React.FC<HelpRequestSuccessModalProps> = ({
  isOpen,
  onClose,
  userName
}) => {
  const navigate = useNavigate();

  const handleViewRequests = () => {
    onClose();
    navigate('/dashboard');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl bg-white border-0 shadow-2xl rounded-3xl p-10 text-center">
        <div className="flex flex-col items-center space-y-6">
          {/* Success Icon */}
          <div className="relative">
            <CheckCircle className="w-20 h-20 text-green-500 animate-gentle-float" />
            <div className="absolute inset-0 w-20 h-20 rounded-full bg-green-100 animate-ping opacity-20"></div>
          </div>

          {/* Success Message */}
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-3xl font-bold font-baloo gradient-sky-mint bg-clip-text text-transparent">
              Request Sent Successfully! 🙏
            </DialogTitle>
            <div className="space-y-3">
              <p className="text-lg text-gray-700 font-nunito leading-relaxed">
                Thank you, <span className="font-semibold text-blue-600">{userName}</span>! 
                Your request has been sent to our community of kind donors.
              </p>
              <p className="text-base text-gray-600">
                We'll connect you with someone who can help soon. Thank you for your trust! 💙
              </p>
            </div>
          </DialogHeader>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button
              onClick={handleViewRequests}
              className="flex-1 gradient-sky-mint text-white py-3 px-6 rounded-2xl text-base font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg"
            >
              <Users className="w-5 h-5 mr-2" />
              View My Requests
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-2xl text-base font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Close
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-6 left-6 text-2xl animate-sparkle opacity-50">🌟</div>
          <div className="absolute top-4 right-4 text-3xl animate-sparkle opacity-40" style={{ animationDelay: '0.7s' }}>✨</div>
          <div className="absolute bottom-6 right-6 text-2xl animate-sparkle opacity-60" style={{ animationDelay: '1.2s' }}>💫</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpRequestSuccessModal;
