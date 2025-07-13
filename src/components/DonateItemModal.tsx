
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

interface DonateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: {
    id: string;
    title: string;
    description: string;
    reason: string;
    requesterName: string;
    childAge?: number;
  };
  onSubmit: (request: any, data: {
    name: string;
    email: string;
    message: string;
    contactInfo: string;
  }) => void;
}

const DonateItemModal = ({ isOpen, onClose, request, onSubmit }: DonateItemModalProps) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    message: '',
    contactInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    onSubmit(request, formData);
    
    // Reset form
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      message: '',
      contactInfo: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Donate: {request.title}</DialogTitle>
          <p className="text-sm text-gray-600">
            Requested by: {request.requesterName}
            {request.childAge && ` (for child aged ${request.childAge})`}
          </p>
        </DialogHeader>
        
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <p className="text-sm text-gray-700 italic">"{request.reason}"</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Let them know about your donation..."
              required
            />
          </div>
          
          <div>
            <Label htmlFor="contactInfo">Preferred Contact Method</Label>
            <Input
              id="contactInfo"
              value={formData.contactInfo}
              onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: e.target.value }))}
              placeholder="Phone, email, etc."
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-peach-lavender text-white">
              Offer Donation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DonateItemModal;
