import React from 'react';
import { Target, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import type { HomepageConfig } from '../types';

interface AboutSectionProps {
  config: HomepageConfig;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ config }) => {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Lifestyle Showcase Image */}
          <div className="lg:col-span-5 relative">
            
            {/* Gold Frame Border Accent */}
            <div className="absolute -inset-4 border-2 border-[#D4AF37]/30 rounded-3xl transform -rotate-2 pointer-events-none"></div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={config.aboutImage}
                alt="Modest & Modern By Jiaddah Story"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>

            {/* Badge */}
            <div className="absolute -bottom-6 -right-4 bg-gradient-to-tr from-[#D4AF37] to-[#AA8B22] text-white p-6 rounded-2xl shadow-xl text-center">
              <p className="font-playfair text-3xl font-bold">100%</p>
              <p className="text-[11px] uppercase tracking-widest font-semibold">Premium Craft</p>
            </div>
          </div>

          {/* Right: Narrative, Mission & Vision */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            <div className="space-y-3 flex flex-col items-center lg:items-start">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Essence & Heritage</span>
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl font-extrabold text-[#2C2C2C]">
                {config.aboutTitle}
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#F4E8C1] mx-auto lg:mx-0"></div>
            </div>

            <p className="text-gray-600 text-base font-light leading-relaxed">
              At <strong className="font-semibold text-[#2C2C2C]">Modest & Modern By Jiaddah</strong>, we curate sophisticated lifestyle products that bridge contemporary aesthetics with timeless modesty. From luxury abayas that radiate feminine grace to high-caliber cookware and innovative smart gadgets, every piece in our boutique is chosen to elevate everyday living.
            </p>

            {/* Gold Divider */}
            <div className="flex items-center space-x-4 my-6 w-full">
              <div className="h-px bg-[#D4AF37]/30 flex-1"></div>
              <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
              <div className="h-px bg-[#D4AF37]/30 flex-1"></div>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              
              {/* Mission Card */}
              <div className="p-6 rounded-2xl bg-[#F8F6F2] border border-[#D4AF37]/20 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-white flex items-center justify-center mb-4 shadow-sm">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-[#2C2C2C] mb-2">
                  Our Mission
                </h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  {config.aboutMission}
                </p>
              </div>

              {/* Vision Card */}
              <div className="p-6 rounded-2xl bg-[#F8F6F2] border border-[#D4AF37]/20 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="w-10 h-10 rounded-full bg-[#2C2C2C] text-[#D4AF37] flex items-center justify-center mb-4 shadow-sm">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-[#2C2C2C] mb-2">
                  Our Vision
                </h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  {config.aboutVision}
                </p>
              </div>

            </div>

            {/* Brand Values */}
            <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-4 w-full">
              {['Uncompromising Quality', 'Modest Sophistication', 'Exceptional Customer Care'].map((val) => (
                <div key={val} className="flex items-center space-x-2 text-xs text-[#2C2C2C] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>{val}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
