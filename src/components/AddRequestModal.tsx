
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface AddRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    category: string;
    childAge?: number;
    reason: string;
    urgency: 'low' | 'medium' | 'high';
    isAnonymous: boolean;
  }) => void;
  categories: string[];
}

const AddRequestModal = ({ isOpen, onClose, onSubmit, categories }: AddRequestModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    childAge: '',
    reason: '',
    urgency: 'medium' as 'low' | 'medium' | 'high',
    isAnonymous: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category || !formData.reason) return;
    
    onSubmit({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      childAge: formData.childAge ? parseInt(formData.childAge) : undefined,
      reason: formData.reason,
      urgency: formData.urgency,
      isAnonymous: formData.isAnonymous
    });
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      childAge: '',
      reason: '',
      urgency: 'medium',
      isAnonymous: false
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Need Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">What do you need? *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Winter Jacket for 8-year-old"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Provide more details about what you need"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="childAge">Child's Age (Optional)</Label>
            <Input
              id="childAge"
              type="number"
              value={formData.childAge}
              onChange={(e) => setFormData(prev => ({ ...prev, childAge: e.target.value }))}
              placeholder="Age in years"
              min="0"
              max="18"
            />
          </div>
          
          <div>
            <Label htmlFor="reason">Reason/Story *</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              placeholder="Share a brief story about why this is needed"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="urgency">Urgency</Label>
            <Select value={formData.urgency} onValueChange={(value: 'low' | 'medium' | 'high') => setFormData(prev => ({ ...prev, urgency: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={formData.isAnonymous}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isAnonymous: checked as boolean }))}
            />
            <Label htmlFor="anonymous">Post anonymously</Label>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-sky-mint text-white">
              Post Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRequestModal;
