
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

interface RequestItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    title: string;
    description: string;
    donorName: string;
  };
  onSubmit: (item: any, data: {
    name: string;
    email: string;
    reason: string;
    contactInfo: string;
  }) => void;
}

const RequestItemModal = ({ isOpen, onClose, item, onSubmit }: RequestItemModalProps) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    reason: '',
    contactInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.reason) return;
    
    onSubmit(item, formData);
    
    // Reset form
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      reason: '',
      contactInfo: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request: {item.title}</DialogTitle>
          <p className="text-sm text-gray-600">From: {item.donorName}</p>
        </DialogHeader>
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
            <Label htmlFor="reason">Why do you need this item? *</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              placeholder="Share your story..."
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
            <Button type="submit" className="gradient-sky-mint text-white">
              Send Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestItemModal;
