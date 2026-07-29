import React from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { Review } from '../types';

interface TestimonialsSectionProps {
  reviews: Review[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ reviews }) => {
  const activeReviews = reviews.filter(r => r.approved && r.featured);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (activeReviews.length || 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + activeReviews.length) % (activeReviews.length || 1));
  };

  React.useEffect(() => {
    if (activeReviews.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, activeReviews.length]);

  if (activeReviews.length === 0) return null;

  const currentReview = activeReviews[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Real Experiences
          </span>
          <h2 className="font-playfair text-4xl font-extrabold text-[#2C2C2C]">
            Client Testimonials
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto"></div>
          <p className="text-gray-600 text-sm font-light">
            Read what our esteemed clientele have to say about our product quality and service.
          </p>
        </div>

        {/* Carousel Card Container */}
        <div className="max-w-3xl mx-auto relative">
          
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#D4AF37]/30 shadow-xl text-center relative overflow-hidden">
            
            {/* Background Quote Icon */}
            <Quote className="absolute top-6 right-6 w-24 h-24 text-[#D4AF37]/10 pointer-events-none" />

            {/* Customer Photo */}
            <div className="w-20 h-20 rounded-full mx-auto mb-6 overflow-hidden border-2 border-[#D4AF37] shadow-md p-1 bg-white">
              <img
                src={currentReview.avatar}
                alt={currentReview.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Rating */}
            <div className="flex justify-center space-x-1 mb-6 text-[#D4AF37]">
              {[...Array(currentReview.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            {/* Comment */}
            <blockquote className="font-playfair text-xl sm:text-2xl text-[#2C2C2C] font-medium leading-relaxed mb-6 italic">
              "{currentReview.comment}"
            </blockquote>

            {/* Name & Date */}
            <div>
              <p className="font-bold text-base text-[#2C2C2C]">
                {currentReview.name}
              </p>
              <p className="text-xs text-[#D4AF37] uppercase font-semibold tracking-wider">
                Verified Customer • {currentReview.date}
              </p>
            </div>

          </div>

          {/* Carousel Controls */}
          {activeReviews.length > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-white border border-[#D4AF37]/30 text-[#2C2C2C] hover:bg-[#D4AF37] hover:text-white transition-colors shadow-sm cursor-pointer"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex space-x-2">
                {activeReviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-white border border-[#D4AF37]/30 text-[#2C2C2C] hover:bg-[#D4AF37] hover:text-white transition-colors shadow-sm cursor-pointer"
                aria-label="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
