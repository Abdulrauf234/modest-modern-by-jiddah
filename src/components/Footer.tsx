import React from 'react';
import { PhoneCall, Mail, ArrowUp, Lock } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onNavigateToAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onNavigateToAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-[#D4AF37]/20 pt-16 pb-12 relative text-center md:text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4 flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={scrollToTop}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F4E8C1] flex items-center justify-center text-white font-playfair font-bold text-xl shadow-md border border-white">
                M
              </div>
              <div className="text-left">
                <span className="font-playfair text-xl font-bold tracking-tight text-[#2C2C2C] block leading-none">
                  Modest & Modern
                </span>
                <span className="font-poppins text-[10px] tracking-widest text-[#D4AF37] uppercase font-semibold block">
                  By Jiaddah
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-sm font-light max-w-sm leading-relaxed">
              Elevating everyday living with style and elegance. Curating premium kitchenware, modest luxury abayas, and contemporary gadgets.
            </p>

            <div className="flex items-center space-x-3 pt-2 justify-center md:justify-start">
              <a href="https://wa.me/2348000000000" className="p-2 rounded-full bg-[#F8F6F2] text-[#2C2C2C] hover:bg-[#D4AF37] hover:text-white transition-colors">
                <PhoneCall className="w-4 h-4" />
              </a>
              <a href="mailto:contact@jiaddah.com" className="p-2 rounded-full bg-[#F8F6F2] text-[#2C2C2C] hover:bg-[#D4AF37] hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3 flex flex-col items-center md:items-start">
            <h4 className="font-playfair text-base font-bold text-[#2C2C2C] uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="w-8 h-0.5 bg-[#D4AF37]"></div>
            <ul className="space-y-2 text-sm text-gray-600 font-light">
              <li><button onClick={() => onNavigateSection('hero')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">Home</button></li>
              <li><button onClick={() => onNavigateSection('kitchen')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">Kitchen Essentials</button></li>
              <li><button onClick={() => onNavigateSection('abayas')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">Abaya Collection</button></li>
              <li><button onClick={() => onNavigateSection('gadgets')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">Modern Gadgets</button></li>
              <li><button onClick={() => onNavigateSection('about')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">About Us</button></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-3 flex flex-col items-center md:items-start">
            <h4 className="font-playfair text-base font-bold text-[#2C2C2C] uppercase tracking-wider">
              Customer Care
            </h4>
            <div className="w-8 h-0.5 bg-[#D4AF37]"></div>
            <ul className="space-y-2 text-sm text-gray-600 font-light">
              <li><a href="#faq" className="hover:text-[#D4AF37] transition-colors">FAQs</a></li>
              <li><a href="#shipping" className="hover:text-[#D4AF37] transition-colors">Shipping & Delivery</a></li>
              <li><a href="#returns" className="hover:text-[#D4AF37] transition-colors">Returns & Exchange</a></li>
              <li><a href="#privacy" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Incognito Portal */}
          <div className="space-y-3 flex flex-col items-center md:items-start">
            <h4 className="font-playfair text-base font-bold text-[#2C2C2C] uppercase tracking-wider">
              Boutique Info
            </h4>
            <div className="w-8 h-0.5 bg-[#D4AF37]"></div>
            <p className="text-xs text-gray-600 font-light">
              Lagos, Nigeria & International Worldwide Shipping
            </p>
            <p className="text-xs text-[#D4AF37] font-semibold">
              WhatsApp: +234 800 000 0000
            </p>

            <div className="pt-2">
              <button
                onClick={onNavigateToAdmin}
                className="p-2 text-gray-400 hover:text-[#D4AF37] transition-colors rounded-full hover:bg-black/5 cursor-pointer inline-flex items-center space-x-1"
                title="Admin Concierge"
              >
                <Lock className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-light">
          <p>© 2026 Modest & Modern By Jiaddah. All Rights Reserved.</p>
          <button
            onClick={scrollToTop}
            className="mt-4 sm:mt-0 flex items-center space-x-1 text-[#D4AF37] hover:underline cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
