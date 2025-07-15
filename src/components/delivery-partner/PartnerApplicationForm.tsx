import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Heart, User, Mail, Phone, MapPin, Clock, Car, Users } from 'lucide-react';

interface FormData {
  partnerType: string;
  contactName: string;
  organizationName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  experience: string;
  availability: string[];
  transportation: string;
  motivation: string;
  reference1Name: string;
  reference1Email: string;
  reference1Phone: string;
  reference2Name: string;
  reference2Email: string;
  reference2Phone: string;
  agreeTerms: boolean;
  agreeBackground: boolean;
}

const PartnerApplicationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    partnerType: '',
    contactName: '',
    organizationName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    experience: '',
    availability: [],
    transportation: '',
    motivation: '',
    reference1Name: '',
    reference1Email: '',
    reference1Phone: '',
    reference2Name: '',
    reference2Email: '',
    reference2Phone: '',
    agreeTerms: false,
    agreeBackground: false,
  });

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvailabilityChange = (availability: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      availability: checked
        ? [...prev.availability, availability]
        : prev.availability.filter(a => a !== availability)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.contactName || !formData.email || !formData.phone || !formData.partnerType) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.agreeTerms || !formData.agreeBackground) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the terms and background check.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Application Submitted! 🎉",
        description: "Thank you! We'll review your application and contact you within 3–5 business days.",
        variant: "default"
      });

      // Reset form
      setFormData({
        partnerType: '',
        contactName: '',
        organizationName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        experience: '',
        availability: [],
        transportation: '',
        motivation: '',
        reference1Name: '',
        reference1Email: '',
        reference1Phone: '',
        reference2Name: '',
        reference2Email: '',
        reference2Phone: '',
        agreeTerms: false,
        agreeBackground: false,
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="partner-form" className="py-20 bg-gradient-to-br from-warm-white to-soft-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-premium-lg font-poppins mb-4 text-high-contrast">
            Partner Application Form
          </h2>
          <p className="text-lg text-medium-contrast max-w-2xl mx-auto">
            Join our mission to spread kindness. Fill out this form to become a verified delivery partner.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Part 1: Partnership Info */}
            <Card className="glass-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl text-high-contrast">
                  <Users className="w-5 h-5 text-pink-500" />
                  <span>Partnership Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="partnerType" className="text-medium-contrast font-semibold">
                    Partner Type *
                  </Label>
                  <Select value={formData.partnerType} onValueChange={(value) => handleInputChange('partnerType', value)}>
                    <SelectTrigger className="mt-2 focus-ring">
                      <SelectValue placeholder="Select partner type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual Volunteer</SelectItem>
                      <SelectItem value="ngo">NGO/Organization</SelectItem>
                      <SelectItem value="school">School/College Group</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Part 2: Contact Information */}
            <Card className="glass-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl text-high-contrast">
                  <User className="w-5 h-5 text-blue-500" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactName" className="text-medium-contrast font-semibold">
                    Contact Person Name *
                  </Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    className="mt-2 focus-ring"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="organizationName" className="text-medium-contrast font-semibold">
                    Organization/Company Name
                  </Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    className="mt-2 focus-ring"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-medium-contrast font-semibold">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-2 focus-ring"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-medium-contrast font-semibold">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-2 focus-ring"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="address" className="text-medium-contrast font-semibold">
                    Address/Service Area
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-2 focus-ring"
                    placeholder="Street address or service area"
                  />
                </div>

                <div>
                  <Label htmlFor="city" className="text-medium-contrast font-semibold">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="mt-2 focus-ring"
                    placeholder="Your city"
                  />
                </div>

                <div>
                  <Label htmlFor="zipCode" className="text-medium-contrast font-semibold">
                    Zip Code
                  </Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="mt-2 focus-ring"
                    placeholder="12345"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Part 3: Experience & Availability */}
            <Card className="glass-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl text-high-contrast">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span>Experience & Availability</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-medium-contrast font-semibold">
                    Previous Volunteer Experience
                  </Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger className="mt-2 focus-ring">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first-time">First Time</SelectItem>
                      <SelectItem value="some">Some Experience</SelectItem>
                      <SelectItem value="regular">Regular Volunteer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-medium-contrast font-semibold mb-3 block">
                    Availability (Select all that apply)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Weekdays', 'Weekends', 'Morning', 'Afternoon', 'Evening'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={formData.availability.includes(option)}
                          onCheckedChange={(checked) => handleAvailabilityChange(option, checked as boolean)}
                        />
                        <Label htmlFor={option} className="text-sm text-medium-contrast">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-medium-contrast font-semibold">
                    Transportation Method
                  </Label>
                  <Select value={formData.transportation} onValueChange={(value) => handleInputChange('transportation', value)}>
                    <SelectTrigger className="mt-2 focus-ring">
                      <SelectValue placeholder="How will you deliver?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="bike">Bike</SelectItem>
                      <SelectItem value="foot">On Foot</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Part 4: Motivation */}
            <Card className="glass-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl text-high-contrast">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>Your Motivation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="motivation" className="text-medium-contrast font-semibold">
                    Why do you want to become a delivery partner? *
                  </Label>
                  <Textarea
                    id="motivation"
                    value={formData.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    className="mt-2 focus-ring min-h-32"
                    placeholder="Share your motivation and what drives you to help others..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Part 5: References */}
            <Card className="glass-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl text-high-contrast">
                  <Mail className="w-5 h-5 text-purple-500" />
                  <span>References (Optional)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-medium-contrast">
                  Please provide 2 people who can vouch for your character (optional but recommended).
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-medium-contrast">Reference 1</h4>
                    <Input
                      placeholder="Name"
                      value={formData.reference1Name}
                      onChange={(e) => handleInputChange('reference1Name', e.target.value)}
                      className="focus-ring"
                    />
                    <Input
                      placeholder="Email"
                      type="email"
                      value={formData.reference1Email}
                      onChange={(e) => handleInputChange('reference1Email', e.target.value)}
                      className="focus-ring"
                    />
                    <Input
                      placeholder="Phone"
                      type="tel"
                      value={formData.reference1Phone}
                      onChange={(e) => handleInputChange('reference1Phone', e.target.value)}
                      className="focus-ring"
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-medium-contrast">Reference 2</h4>
                    <Input
                      placeholder="Name"
                      value={formData.reference2Name}
                      onChange={(e) => handleInputChange('reference2Name', e.target.value)}
                      className="focus-ring"
                    />
                    <Input
                      placeholder="Email"
                      type="email"
                      value={formData.reference2Email}
                      onChange={(e) => handleInputChange('reference2Email', e.target.value)}
                      className="focus-ring"
                    />
                    <Input
                      placeholder="Phone"
                      type="tel"
                      value={formData.reference2Phone}
                      onChange={(e) => handleInputChange('reference2Phone', e.target.value)}
                      className="focus-ring"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Part 6: Legal & Consent */}
            <Card className="glass-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl text-high-contrast">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span>Legal & Consent</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="agreeTerms" className="text-medium-contrast leading-relaxed">
                    I agree to the terms and conditions of the KindCart Delivery Partner Program. *
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeBackground"
                    checked={formData.agreeBackground}
                    onCheckedChange={(checked) => handleInputChange('agreeBackground', checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="agreeBackground" className="text-medium-contrast leading-relaxed">
                    I consent to a background verification check. *
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="gradient-peach-lavender text-white hover:scale-105 transition-all duration-300 rounded-full px-12 py-6 text-lg font-bold shadow-lg btn-heart-beat"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PartnerApplicationForm;