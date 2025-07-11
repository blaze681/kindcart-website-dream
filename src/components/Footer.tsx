
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    'Quick Links': [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
      { name: 'Donate', path: '/donate' },
      { name: 'Impact', path: '/impact' }
    ],
    'Get Involved': [
      { name: 'Make a Donation', path: '/donate' },
      { name: 'Request Help', path: '/donate?tab=get-help' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Share Our Story', path: '/about' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  return (
    <footer className="bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-white/10 rounded-full">
                <Heart className="w-8 h-8 text-pink-400" fill="currentColor" />
              </div>
              <span className="text-3xl font-bold">KindCart</span>
            </Link>
            <p className="text-purple-200 text-lg mb-6 max-w-md">
              Started by Grade 3 children, KindCart connects generous hearts with those in need. 
              Every small donation creates big smiles and lasting hope.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-pink-400" />
                <span className="text-purple-200">hello@kindcart.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-pink-400" />
                <span className="text-purple-200">+1 (555) 123-KIND</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-pink-400" />
                <span className="text-purple-200">Spreading kindness nationwide</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xl font-semibold mb-6">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-purple-200 hover:text-white transition-colors duration-300 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div>
              <h4 className="text-xl font-semibold mb-4">Follow Our Journey</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 hover:scale-110 transform"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <h4 className="text-xl font-semibold mb-4">Spread Kindness</h4>
              <p className="text-purple-200 mb-4">Share our mission with friends and family</p>
              <div className="flex items-center justify-center md:justify-end space-x-2">
                <Heart className="w-5 h-5 text-pink-400 animate-pulse" fill="currentColor" />
                <span className="text-purple-200">Made with love by children</span>
                <Heart className="w-5 h-5 text-pink-400 animate-pulse" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-purple-200">
            © 2024 KindCart. A children's initiative spreading kindness one donation at a time.
          </p>
          <p className="text-purple-300 text-sm mt-2">
            "Big hearts, small hands — gifting smiles across the land."
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
