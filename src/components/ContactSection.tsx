import React from 'react';
import { PhoneCall, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import type { Inquiry } from '../types';

interface ContactSectionProps {
  onAddInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'read' | 'replied'>) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onAddInquiry }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    onAddInquiry(formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 bg-[#F8F6F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Get In Touch
          </span>
          <h2 className="font-playfair text-4xl font-extrabold text-[#2C2C2C]">
            Contact Modest & Modern By Jiaddah
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto"></div>
          <p className="text-gray-600 text-sm font-light">
            Have questions about custom orders, sizing, or kitchen collections? We are here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#D4AF37]/20 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-[#2C2C2C]">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Your message has been delivered. Our concierge team will reply to your email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2C2C] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Amina Al-Mansoor"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2C2C] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. amina@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-sm transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2C2C] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+234 800 000 0000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2C2C] mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How may we serve you today?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-sm transition-all"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#AA8B22] text-white text-xs uppercase tracking-widest font-bold shadow-lg hover:shadow-xl hover:brightness-105 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Information & Embedded Map Placeholder */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            <div className="bg-white rounded-3xl p-8 border border-[#D4AF37]/20 shadow-xl space-y-6">
              <h3 className="font-playfair text-2xl font-bold text-[#2C2C2C]">
                Direct Channels
              </h3>

              <div className="space-y-4">
                <a
                  href="https://wa.me/2348000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-3 rounded-xl hover:bg-[#F8F6F2] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2C2C2C]">WhatsApp Concierge</p>
                    <p className="text-xs text-gray-500">+234 800 000 0000</p>
                  </div>
                </a>

                <a
                  href="mailto:contact@jiaddah.com"
                  className="flex items-center space-x-4 p-3 rounded-xl hover:bg-[#F8F6F2] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-white flex items-center justify-center shadow-md">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2C2C2C]">Email Support</p>
                    <p className="text-xs text-gray-500">contact@jiaddah.com</p>
                  </div>
                </a>

                <div className="flex items-center space-x-4 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-[#2C2C2C] text-[#D4AF37] flex items-center justify-center shadow-md">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2C2C2C]">Boutique Address</p>
                    <p className="text-xs text-gray-500">Jiaddah Luxury Suite, Victoria Island, Lagos</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Embedded Google Map Placeholder */}
            <div className="rounded-3xl overflow-hidden shadow-xl border-2 border-[#D4AF37]/30 h-52 relative bg-gray-200">
              <iframe
                title="Modest & Modern Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.727763617304!2d3.4215283147703816!3d6.428055595349272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53280e4d221%3A0x88cd2e7ec45b7365!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1689999999999!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
