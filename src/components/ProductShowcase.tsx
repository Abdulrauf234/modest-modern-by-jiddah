import React from 'react';
import { Eye, ShoppingBag, Heart } from 'lucide-react';
import type { Product } from '../types';

interface ProductShowcaseProps {
  products: Product[];
  category: 'Kitchen Essentials' | 'Modern Gadgets';
  subCategories: string[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  products,
  category,
  subCategories,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}) => {
  const [activeSubCategory, setActiveSubCategory] = React.useState<string>('All');

  const filteredProducts = products.filter(p => {
    if (p.category !== category || p.isArchived) return false;
    if (activeSubCategory !== 'All' && p.subCategory !== activeSubCategory) return false;
    return true;
  });

  const categoryId = category.toLowerCase().includes('kitchen') ? 'kitchen' : 'gadgets';

  return (
    <section id={categoryId} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            {category === 'Kitchen Essentials' ? 'Culinary Excellence' : 'Contemporary Tech'}
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#2C2C2C]">
            {category}
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto"></div>
          <p className="text-gray-600 text-sm sm:text-base font-light">
            Explore our curated selection of high-performance items crafted for modern homes.
          </p>
        </div>

        {/* Sub-category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          <button
            onClick={() => setActiveSubCategory('All')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeSubCategory === 'All'
                ? 'bg-[#D4AF37] text-white shadow-md'
                : 'bg-[#F8F6F2] text-[#2C2C2C] hover:bg-gray-200'
            }`}
          >
            All {category}
          </button>
          {subCategories.map(sub => (
            <button
              key={sub}
              onClick={() => setActiveSubCategory(sub)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeSubCategory === sub
                  ? 'bg-[#D4AF37] text-white shadow-md'
                  : 'bg-[#F8F6F2] text-[#2C2C2C] hover:bg-gray-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="group bg-[#F8F6F2]/50 rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left"
              >
                {/* Image Container with Badges & Hover Actions */}
                <div className="relative aspect-square overflow-hidden bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {product.isBestSeller && (
                      <span className="bg-[#D4AF37] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        Best Seller
                      </span>
                    )}
                    {product.isNew && (
                      <span className="bg-[#2C2C2C] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        New Arrival
                      </span>
                    )}
                    {product.discountPrice && (
                      <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        Sale
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm hover:bg-white text-gray-700 hover:text-red-500 transition-colors z-10 cursor-pointer"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Quick Actions Hover Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3 backdrop-blur-[2px]">
                    <button
                      onClick={() => onQuickView(product)}
                      className="p-3 bg-white text-[#2C2C2C] rounded-full hover:bg-[#D4AF37] hover:text-white transition-all transform hover:scale-110 shadow-lg cursor-pointer"
                      title="Quick View"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="p-3 bg-[#D4AF37] text-white rounded-full hover:bg-[#AA8B22] transition-all transform hover:scale-110 shadow-lg cursor-pointer"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1">
                      {product.subCategory || product.category}
                    </p>
                    <h3 className="font-playfair text-lg font-bold text-[#2C2C2C] line-clamp-1 group-hover:text-[#D4AF37] transition-colors mb-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-light line-clamp-2 mb-4 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between">
                    <div>
                      {product.discountPrice ? (
                        <div className="flex items-baseline space-x-2">
                          <span className="font-playfair text-lg font-bold text-[#2C2C2C]">
                            ₦{product.discountPrice.toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            ₦{product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-playfair text-lg font-bold text-[#2C2C2C]">
                          ₦{product.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onQuickView(product)}
                      className="px-4 py-1.5 rounded-full border border-[#D4AF37] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-white transition-all cursor-pointer"
                    >
                      View Product
                    </button>
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
