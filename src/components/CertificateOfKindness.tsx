
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, Download, Printer, Star, Award, Share2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';

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
  const handleDownload = () => {
    const element = document.getElementById('certificate-content');
    if (element) {
      const opt = {
        margin: 0.5,
        filename: `KindCart_Certificate_${userName.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true 
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'landscape' 
        }
      };
      
      html2pdf().set(opt).from(element).save();
    }
  };

  const handlePrint = () => {
    const element = document.getElementById('certificate-content');
    if (element) {
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
              @media print {
                body { padding: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            ${element.outerHTML}
          </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      }
    }
  };

  const handleShare = () => {
    const shareText = `🎉 I just became a Kindness Hero by donating ${donationType} through KindCart! Join me in spreading kindness and making a difference in children's lives. #KindnessHero #KindCart #SpreadKindness`;
    
    if (navigator.share) {
      navigator.share({
        title: 'I\'m a Kindness Hero!',
        text: shareText,
        url: window.location.origin
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Share message copied to clipboard!');
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl bg-white border-0 shadow-2xl rounded-3xl p-0 overflow-hidden">
        {/* Confetti Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                fontSize: `${12 + Math.random() * 8}px`
              }}
            >
              {['🎉', '✨', '🌟', '💫', '⭐', '🎊', '🎈'][Math.floor(Math.random() * 7)]}
            </div>
          ))}
        </div>

        <div className="relative bg-gradient-to-br from-warm-white via-peach/10 to-lilac/10 p-8">
          {/* Header */}
          <DialogHeader className="text-center mb-6">
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
            <DialogTitle className="text-3xl font-fredoka text-amber-800 mb-4">
              Congratulations, {userName}! 🎉
            </DialogTitle>
            <p className="text-xl font-baloo text-slate-700">
              You are now a <span className="text-purple-600 font-bold">Kindness Hero!</span>
            </p>
            <p className="text-lg text-slate-600 mt-2">Here's your Certificate of Kindness!</p>
          </DialogHeader>

          {/* Certificate Content for PDF Generation */}
          <div 
            id="certificate-content"
            className="bg-white rounded-3xl mx-auto max-w-4xl shadow-2xl"
            style={{
              width: '1056px',
              height: '816px',
              background: 'linear-gradient(135deg, #FFFAF0, #F0F8FF)',
              border: '12px solid',
              borderImage: 'linear-gradient(135deg, #FFB6C1, #E6E6FA, #FFE4E1, #F0FFFF) 1',
              position: 'relative'
            }}
          >
            {/* Decorative Stars */}
            <div className="absolute top-6 left-8 text-3xl text-yellow-400">⭐</div>
            <div className="absolute top-8 right-12 text-2xl text-yellow-300">✨</div>
            <div className="absolute bottom-8 left-8 text-2xl text-yellow-400">🌟</div>
            <div className="absolute bottom-6 right-8 text-3xl text-yellow-300">💫</div>

            <div className="p-16 text-center h-full flex flex-col justify-center">
              <h1 className="text-6xl font-bold text-amber-800 mb-8" style={{ fontFamily: 'Fredoka, cursive' }}>
                Certificate of Kindness
              </h1>
              
              <div className="text-8xl mb-8">🏆</div>
              
              <h2 className="text-4xl font-bold text-slate-700 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Kindness Hero Award
              </h2>
              
              <div className="space-y-6 mb-8">
                <p className="text-2xl text-slate-600" style={{ fontFamily: 'Nunito, sans-serif' }}>This is to certify that</p>
                <p className="text-5xl font-bold text-purple-600 underline decoration-wavy" style={{ fontFamily: 'Baloo 2, cursive' }}>
                  {userName}
                </p>
                <p className="text-2xl text-slate-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  has demonstrated extraordinary kindness by donating
                </p>
                <p className="text-3xl font-semibold text-amber-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {donationType}
                </p>
                <p className="text-xl text-slate-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  on {donationDate}
                </p>
              </div>

              <div className="mb-8">
                <div className="text-7xl mb-4">🥇</div>
                <p className="text-2xl font-bold text-purple-600">KINDNESS HERO</p>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
                  <span className="text-3xl font-bold text-pink-500" style={{ fontFamily: 'Baloo 2, cursive' }}>KindCart</span>
                </div>
                <p className="text-lg text-slate-500 italic">Spreading Kindness, One Gift at a Time</p>
              </div>

              <div className="text-lg text-slate-500 italic" style={{ fontFamily: 'Nunito, sans-serif' }}>
                <p>Certified by KindCart Founders</p>
                <p>Saanvi, Krisha & Vivaan 👧👦👧</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              onClick={handleDownload}
              className="flex-1 max-w-xs gradient-peach-lilac text-white py-4 px-8 rounded-2xl text-lg font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF
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
              onClick={handleShare}
              variant="outline"
              className="flex-1 max-w-xs border-2 border-green-300 text-green-700 py-4 px-8 rounded-2xl text-lg font-semibold hover:bg-green-50 transition-all duration-300"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Achievement
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
