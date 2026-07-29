import React from 'react';
import { Eye, Sparkles, Heart } from 'lucide-react';
import type { Product } from '../types';

interface AbayasGalleryProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
}

export const AbayasGallery: React.FC<AbayasGalleryProps> = ({
  products,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}) => {
  const [activeTab, setActiveTab] = React.useState<string>('All');

  const abayaProducts = products.filter(p => p.category === 'Abayas' && !p.isArchived);

  const categories = ['All', 'Everyday Abayas', 'Luxury Abayas', 'Occasion Wear'];

  const filteredAbayas = activeTab === 'All'
    ? abayaProducts
    : abayaProducts.filter(p => p.subCategory === activeTab);

  return (
    <section id="abayas" className="py-24 bg-[#F8F6F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center justify-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Feminine Modesty & Elegance</span>
          </span>
          <h2 className="font-playfair text-4xl sm:text-5xl font-extrabold text-[#2C2C2C]">
            The Abaya Collection
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#F4E8C1] mx-auto"></div>
          <p className="text-gray-600 text-sm sm:text-base font-light">
            Designed for the modern woman who values modesty, grace, and timeless high-end luxury.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === cat
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA8B22] text-white shadow-lg scale-105'
                  : 'bg-white text-[#2C2C2C] border border-[#D4AF37]/30 hover:border-[#D4AF37]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Masonry Layout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAbayas.map((abaya, idx) => {
            const isWishlisted = wishlistIds.includes(abaya.id);
            return (
              <div
                key={abaya.id}
                className={`group relative rounded-3xl overflow-hidden shadow-lg border-2 border-transparent hover:border-[#D4AF37] transition-all duration-500 bg-white text-left ${
                  idx % 3 === 1 ? 'lg:translate-y-4' : ''
                }`}
              >
                {/* Image Container with Zoom */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={abaya.image}
                    alt={abaya.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist(abaya.id)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-md shadow-md text-gray-700 hover:text-red-500 transition-colors z-10 cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#D4AF37] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-md">
                      {abaya.subCategory || 'Abaya'}
                    </span>
                  </div>

                  {/* Hover Quick View Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button
                      onClick={() => onQuickView(abaya)}
                      className="px-6 py-3 rounded-full bg-white/95 text-[#2C2C2C] text-xs font-bold uppercase tracking-wider shadow-2xl hover:bg-[#D4AF37] hover:text-white transition-all transform group-hover:scale-105 flex items-center space-x-2 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Bottom Image Details Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10 space-y-2">
                    <h3 className="font-playfair text-xl font-bold tracking-wide leading-snug">
                      {abaya.name}
                    </h3>
                    <p className="text-xs text-gray-200 line-clamp-2 font-light">
                      {abaya.description}
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="font-playfair text-lg font-bold text-[#F4E8C1]">
                        ${abaya.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => onAddToCart(abaya)}
                        className="px-4 py-1.5 rounded-full bg-[#D4AF37] text-white text-xs font-semibold uppercase tracking-wider hover:brightness-110 shadow-sm cursor-pointer"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
