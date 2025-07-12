
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, Download, Printer, Star, Award } from 'lucide-react';

interface CertificateOfKindnessProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  donationType: string;
  donationDate: string;
}

const CertificateOfKindness: React.FC<CertificateOfKindnessProps> = ({
  isOpen,
  onClose,
  userName,
  donationType,
  donationDate
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a new window with the certificate for printing/saving as PDF
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Certificate of Kindness - ${userName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Nunito:wght@300;400;500;600;700;800;900&family=Quicksand:wght@300;400;500;600;700&family=Baloo+2:wght@400;500;600;700;800&family=Fredoka:wght@300;400;500;600;700&display=swap');
            body { font-family: 'Nunito', sans-serif; margin: 0; padding: 20px; background: white; }
            .certificate { 
              max-width: 800px; 
              margin: 0 auto; 
              padding: 40px; 
              border: 8px solid;
              border-image: linear-gradient(135deg, #FFB6C1, #E6E6FA, #FFE4E1, #F0FFFF) 1;
              background: linear-gradient(135deg, #FFFAF0, #F0F8FF);
              text-align: center;
              position: relative;
            }
            .header { font-family: 'Fredoka', cursive; font-size: 48px; color: #8B4513; margin-bottom: 20px; }
            .badge { font-size: 72px; margin: 20px 0; }
            .title { font-family: 'Poppins', sans-serif; font-size: 36px; font-weight: 700; color: #2F4F4F; margin: 20px 0; }
            .name { font-family: 'Baloo 2', cursive; font-size: 42px; color: #B8860B; margin: 15px 0; text-decoration: underline; }
            .details { font-size: 18px; color: #333; margin: 15px 0; line-height: 1.6; }
            .signature { font-size: 16px; color: #666; margin-top: 40px; font-style: italic; }
            .stars { position: absolute; color: #FFD700; }
            .star1 { top: 20px; left: 50px; font-size: 24px; }
            .star2 { top: 30px; right: 60px; font-size: 20px; }
            .star3 { bottom: 40px; left: 40px; font-size: 18px; }
            .star4 { bottom: 50px; right: 50px; font-size: 22px; }
            .logo { font-family: 'Baloo 2', cursive; font-size: 24px; color: #FF69B4; margin: 20px 0; }
            .tagline { font-size: 14px; color: #666; font-style: italic; }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="stars star1">⭐</div>
            <div class="stars star2">✨</div>
            <div class="stars star3">🌟</div>
            <div class="stars star4">💫</div>
            
            <div class="header">Certificate of Kindness</div>
            <div class="badge">🏆</div>
            
            <div class="title">Kindness Hero Award</div>
            
            <div style="margin: 30px 0;">
              <div style="font-size: 20px; color: #333; margin-bottom: 10px;">This is to certify that</div>
              <div class="name">${userName}</div>
              <div style="font-size: 20px; color: #333; margin: 10px 0;">has demonstrated extraordinary kindness by donating</div>
              <div style="font-size: 24px; color: #8B4513; font-weight: 600; margin: 10px 0;">${donationType}</div>
              <div style="font-size: 18px; color: #333; margin: 10px 0;">on ${donationDate}</div>
            </div>
            
            <div style="margin: 40px 0;">
              <div style="font-size: 60px; margin: 20px 0;">🥇</div>
              <div style="font-size: 20px; color: #B8860B; font-weight: 600;">KINDNESS HERO</div>
            </div>
            
            <div class="logo">
              ❤️ KindCart
              <div class="tagline">Spreading Kindness, One Gift at a Time</div>
            </div>
            
            <div class="signature">
              Certified by KindCart Founders<br>
              Saanvi, Krisha & Vivaan 👧👦👧
            </div>
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-white border-0 shadow-2xl rounded-3xl p-0 overflow-hidden">
        {/* Confetti Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${12 + Math.random() * 8}px`
              }}
            >
              {['🎉', '✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>

        <div className="relative bg-gradient-to-br from-warm-white via-peach/10 to-lilac/10 p-12">
          {/* Header */}
          <DialogHeader className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 gradient-peach-lilac rounded-full flex items-center justify-center animate-glow-pulse">
                  <Award className="w-10 h-10 text-white" fill="currentColor" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Star className="w-8 h-8 text-yellow-400 animate-sparkle" fill="currentColor" />
                </div>
              </div>
            </div>
            <DialogTitle className="text-4xl font-fredoka text-amber-800 mb-4">
              Congratulations, {userName}! 🎉
            </DialogTitle>
            <p className="text-2xl font-baloo text-slate-700">
              You are now a <span className="text-purple-600 font-bold">Kindness Hero!</span>
            </p>
            <p className="text-lg text-slate-600 mt-2">Here's your Certificate of Kindness!</p>
          </DialogHeader>

          {/* Certificate Preview */}
          <div className="bg-white rounded-3xl p-8 border-8 border-transparent bg-gradient-to-r from-peach via-lilac to-mint bg-clip-border shadow-2xl mb-8">
            <div className="bg-white rounded-2xl p-8 text-center relative overflow-hidden">
              {/* Decorative Stars */}
              <div className="absolute top-4 left-4 text-2xl text-yellow-400 animate-sparkle">⭐</div>
              <div className="absolute top-6 right-6 text-xl text-yellow-300 animate-sparkle" style={{ animationDelay: '0.5s' }}>✨</div>
              <div className="absolute bottom-6 left-6 text-lg text-yellow-400 animate-sparkle" style={{ animationDelay: '1s' }}>🌟</div>
              <div className="absolute bottom-4 right-4 text-xl text-yellow-300 animate-sparkle" style={{ animationDelay: '1.5s' }}>💫</div>

              <h1 className="text-4xl font-fredoka text-amber-800 mb-6">Certificate of Kindness</h1>
              <div className="text-6xl mb-6">🏆</div>
              
              <h2 className="text-3xl font-poppins font-bold text-slate-700 mb-6">Kindness Hero Award</h2>
              
              <div className="space-y-4 mb-8">
                <p className="text-lg text-slate-600">This is to certify that</p>
                <p className="text-3xl font-baloo text-purple-600 font-bold underline decoration-wavy">{userName}</p>
                <p className="text-lg text-slate-600">has demonstrated extraordinary kindness by donating</p>
                <p className="text-2xl font-poppins font-semibold text-amber-700">{donationType}</p>
                <p className="text-base text-slate-600">on {donationDate}</p>
              </div>

              <div className="mb-8">
                <div className="text-5xl mb-4">🥇</div>
                <p className="text-xl font-bold text-purple-600">KINDNESS HERO</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
                  <span className="text-2xl font-baloo text-pink-500">KindCart</span>
                </div>
                <p className="text-sm text-slate-500 italic">Spreading Kindness, One Gift at a Time</p>
              </div>

              <div className="text-sm text-slate-500 italic">
                <p>Certified by KindCart Founders</p>
                <p>Saanvi, Krisha & Vivaan 👧👦👧</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleDownload}
              className="flex-1 max-w-xs gradient-peach-lilac text-white py-4 px-8 rounded-2xl text-lg font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Certificate
            </Button>
            <Button
              onClick={handlePrint}
              variant="outline"
              className="flex-1 max-w-xs border-2 border-purple-300 text-purple-700 py-4 px-8 rounded-2xl text-lg font-semibold hover:bg-purple-50 transition-all duration-300"
            >
              <Printer className="w-5 h-5 mr-2" />
              Print Certificate
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 max-w-xs border-2 border-gray-300 text-gray-700 py-4 px-8 rounded-2xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateOfKindness;
