
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Heart, Gift, Users } from 'lucide-react';

interface InteractionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: {
    id: string;
    title: string;
    description: string;
    userName: string;
    type: 'donation' | 'request';
  } | null;
  type: 'request' | 'donate';
  onSubmit: (message: string, email: string) => void;
}

const InteractionModal = ({ open, onOpenChange, item, type, onSubmit }: InteractionModalProps) => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !email.trim()) {
      return;
    }

    onSubmit(message.trim(), email.trim());
    setMessage('');
    setEmail('');
  };

  const handleClose = () => {
    setMessage('');
    setEmail('');
    onOpenChange(false);
  };

  if (!item) return null;

  const isRequestingDonation = type === 'request' && item.type === 'donation';
  const isDonatingToRequest = type === 'donate' && item.type === 'request';

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            {isRequestingDonation ? (
              <>
                <Heart className="w-6 h-6 text-pink-600" />
                Request Item
              </>
            ) : (
              <>
                <Gift className="w-6 h-6 text-purple-600" />
                Offer Donation
              </>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
          <p className="text-gray-600 text-sm mb-2">{item.description}</p>
          <p className="text-xs text-gray-500">Posted by {item.userName}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Your Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">
              We'll share this with the poster so they can contact you.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              {isRequestingDonation ? 'Why do you need this item?' : 'What can you offer?'} *
            </Label>
            <Textarea
              id="message"
              placeholder={
                isRequestingDonation 
                  ? "Tell them why this item would be helpful for you or your family..."
                  : "Describe what you have available that might help with their request..."
              }
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-blue-900 mb-1">Next Steps</h5>
                <p className="text-sm text-blue-800">
                  After you submit, the poster will receive your message and contact information. 
                  They'll reach out to you directly to arrange the {isRequestingDonation ? 'pickup' : 'delivery'}.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 gradient-peach-lavender text-white"
              disabled={!message.trim() || !email.trim()}
            >
              {isRequestingDonation ? 'Send Request' : 'Offer Help'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InteractionModal;
