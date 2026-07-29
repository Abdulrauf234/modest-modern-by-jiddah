import React from 'react';
import { Sparkles, ArrowRight, Award, Truck, ShieldCheck, Star } from 'lucide-react';
import type { HomepageConfig } from '../types';

interface HeroSectionProps {
  config: HomepageConfig;
  onExplore: () => void;
  onShopCollection: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onExplore,
  onShopCollection
}) => {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center bg-[#FFFFFF] overflow-hidden">
      
      {/* Decorative Gold Glow Orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full filter blur-3xl pointer-events-none -translate-x-1/2"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#F4E8C1]/30 rounded-full filter blur-3xl pointer-events-none translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Luxe Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F8F6F2] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Modern Luxury & Grace</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2C2C2C] leading-tight tracking-tight">
              {config.heroHeadline}
            </h1>

            {/* Gold Accent Line */}
            <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-[#F4E8C1] rounded-full"></div>

            {/* Subheading */}
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
              {config.heroSubheading}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onShopCollection}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#AA8B22] text-white font-semibold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:brightness-105 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExplore}
                className="px-8 py-4 rounded-full border-2 border-[#D4AF37] text-[#2C2C2C] font-semibold text-sm uppercase tracking-wider hover:bg-[#F8F6F2] transition-colors flex items-center justify-center cursor-pointer"
              >
                Explore Products
              </button>
            </div>

            {/* Trust Signals */}
            <div className="pt-8 border-t border-gray-100 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="font-playfair text-2xl font-bold text-[#2C2C2C]">100%</p>
                <p className="text-xs text-gray-500 font-medium">Authentic & Pure</p>
              </div>
              <div>
                <p className="font-playfair text-2xl font-bold text-[#2C2C2C]">5,000+</p>
                <p className="text-xs text-gray-500 font-medium">Happy Clients</p>
              </div>
              <div>
                <div className="flex items-center text-[#D4AF37] space-x-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-gray-500 font-medium">5-Star Excellence</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Arrangement with Floating Cards */}
          <div className="lg:col-span-5 relative">
            
            {/* Background Decorative Frame */}
            <div className="absolute inset-0 rounded-3xl border-2 border-[#D4AF37]/20 transform rotate-3 scale-95 pointer-events-none"></div>

            {/* Main Featured Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={config.heroImage}
                alt="Modest & Modern By Jiaddah Luxury Hero Showcase"
                className="w-full h-[480px] sm:h-[540px] object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* Floating Card 1: Premium Quality */}
            <div className="absolute -top-6 -left-6 sm:-left-8 glass-card p-3.5 rounded-2xl shadow-xl flex items-center space-x-3 border border-[#D4AF37]/40">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-white flex items-center justify-center shadow-md">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#2C2C2C]">Premium Quality</p>
                <p className="text-[10px] text-gray-500">Hand-picked luxury</p>
              </div>
            </div>

            {/* Floating Card 2: Fast Delivery */}
            <div className="absolute top-1/2 -right-4 sm:-right-8 glass-card p-3.5 rounded-2xl shadow-xl flex items-center space-x-3 border border-[#D4AF37]/40">
              <div className="w-10 h-10 rounded-full bg-[#2C2C2C] text-white flex items-center justify-center shadow-md">
                <Truck className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#2C2C2C]">Fast Delivery</p>
                <p className="text-[10px] text-gray-500">Nationwide Express</p>
              </div>
            </div>

            {/* Floating Card 3: Trusted Products */}
            <div className="absolute -bottom-6 left-8 glass-card p-3.5 rounded-2xl shadow-xl flex items-center space-x-3 border border-[#D4AF37]/40">
              <div className="w-10 h-10 rounded-full bg-[#F4E8C1] text-[#2C2C2C] flex items-center justify-center shadow-md">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#2C2C2C]">Trusted Brand</p>
                <p className="text-[10px] text-gray-500">100% Satisfaction</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
