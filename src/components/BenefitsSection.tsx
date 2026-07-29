import React from 'react';
import { Sparkles, Truck, ShieldCheck, HeartHandshake } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Crafted with unmatched elegance, premium materials, and meticulous attention to detail.'
    },
    {
      icon: Truck,
      title: 'Nationwide Delivery',
      description: 'Fast, secure, and carefully packaged doorstep shipping across the entire country.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      description: 'Seamless checkout experience powered by industry-standard encrypted channels.'
    },
    {
      icon: HeartHandshake,
      title: 'Trusted Customer Support',
      description: 'Dedicated support team ready to assist with custom orders and inquiries via WhatsApp.'
    }
  ];

  return (
    <section className="py-16 bg-[#F8F6F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-[#D4AF37]/20 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group text-center flex flex-col items-center"
              >
                {/* Gold Circle Icon Container */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F4E8C1] p-0.5 shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <IconComponent className="w-7 h-7 text-[#D4AF37] group-hover:text-[#AA8B22] transition-colors" />
                  </div>
                </div>

                <h3 className="font-playfair text-xl font-bold text-[#2C2C2C] mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
