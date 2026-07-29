import React from 'react';
import { ShoppingBag, Search, PhoneCall, X, Lock } from 'lucide-react';
import type { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onNavigateToAdmin: () => void;
  onNavigateSection: (sectionId: string) => void;
  wishlistCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onOpenSearch,
  onNavigateToAdmin,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', target: 'hero' },
    { name: 'Kitchen', target: 'kitchen' },
    { name: 'Abayas', target: 'abayas' },
    { name: 'Gadgets', target: 'gadgets' },
    { name: 'About', target: 'about' },
    { name: 'Testimonials', target: 'testimonials' },
    { name: 'Contact', target: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-[#D4AF37]/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigateSection('hero')}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F4E8C1] flex items-center justify-center text-white font-playfair font-bold text-xl shadow-md border border-white">
              M
            </div>
            <div>
              <span className="font-playfair text-xl font-bold tracking-tight text-[#2C2C2C] block leading-none">
                Modest & Modern
              </span>
              <span className="font-poppins text-[10px] tracking-widest text-[#D4AF37] uppercase font-semibold block">
                By Jiaddah
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links - Added right margin for generous spacing before actions */}
          <nav className="hidden lg:flex items-center space-x-8 mr-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => onNavigateSection(link.target)}
                className="text-sm font-medium text-[#2C2C2C] hover:text-[#D4AF37] transition-colors relative group py-1 cursor-pointer"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#2C2C2C] hover:text-[#D4AF37] transition-colors rounded-full hover:bg-black/5 cursor-pointer"
              aria-label="Search Products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#2C2C2C] hover:text-[#D4AF37] transition-colors rounded-full hover:bg-black/5 cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#D4AF37] text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* WhatsApp Direct Connect */}
            <a
              href="https://wa.me/2348000000000?text=Hello%20Modest%20%26%20Modern%20By%20Jiaddah,%20I%20would%20like%20to%20inquire%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 border border-[#D4AF37] text-[#D4AF37] rounded-full text-xs font-medium hover:bg-[#D4AF37] hover:text-white transition-all shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Gold Shop Now CTA */}
            <button
              onClick={() => onNavigateSection('kitchen')}
              className="hidden sm:inline-flex px-5 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA8B22] text-white text-xs uppercase tracking-wider font-semibold shadow-md hover:shadow-lg hover:brightness-105 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Shop Now
            </button>

            {/* Incognito Lock Icon for Discrete Admin Portal */}
            <button
              onClick={onNavigateToAdmin}
              className="p-2 text-gray-400 hover:text-[#D4AF37] transition-colors rounded-full hover:bg-black/5 cursor-pointer"
              title="Admin Security Concierge"
              aria-label="Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#2C2C2C] focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : (
                <div className="space-y-1.5">
                  <span className="block w-6 h-0.5 bg-[#2C2C2C]"></span>
                  <span className="block w-6 h-0.5 bg-[#D4AF37]"></span>
                  <span className="block w-4 h-0.5 bg-[#2C2C2C]"></span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-[#D4AF37]/20 px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  onNavigateSection(link.target);
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 text-base font-medium text-[#2C2C2C] hover:text-[#D4AF37] border-b border-gray-100"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-2.5 border border-[#D4AF37] text-[#D4AF37] rounded-full text-sm font-medium"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact via WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  onNavigateSection('kitchen');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA8B22] text-white text-sm font-semibold uppercase tracking-wider"
              >
                Shop Collection Now
              </button>
              <button
                onClick={() => {
                  onNavigateToAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 flex items-center justify-center space-x-1.5 text-center text-xs text-gray-400 hover:text-[#D4AF37]"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
