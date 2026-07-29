import React from 'react';
import { X, Search, ShoppingBag, Heart, Star } from 'lucide-react';
import type { Product } from '../types';

interface ModalsProps {
  quickViewProduct: Product | null;
  onCloseQuickView: () => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  searchOpen: boolean;
  onCloseSearch: () => void;
  products: Product[];
}

export const StoreModals: React.FC<ModalsProps> = ({
  quickViewProduct,
  onCloseQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  searchOpen,
  onCloseSearch,
  products
}) => {
  const [query, setQuery] = React.useState('');

  const searchResults = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <>
      {/* Quick View Product Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#D4AF37]/30 relative text-left">
            <button
              onClick={onCloseQuickView}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
                {quickViewProduct.isBestSeller && (
                  <span className="absolute top-4 left-4 bg-[#D4AF37] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                    Best Seller
                  </span>
                )}
              </div>

              <div className="p-8 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                    {quickViewProduct.category} • {quickViewProduct.subCategory || 'Boutique Collection'}
                  </span>
                  <h3 className="font-playfair text-2xl font-bold text-[#2C2C2C] mt-1 mb-2">
                    {quickViewProduct.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">(4.9 rating)</span>
                  </div>

                  <div className="flex items-baseline space-x-3 mb-4">
                    {quickViewProduct.discountPrice ? (
                      <>
                        <span className="font-playfair text-2xl font-bold text-[#2C2C2C]">
                          ₦{quickViewProduct.discountPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ₦{quickViewProduct.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="font-playfair text-2xl font-bold text-[#2C2C2C]">
                        ₦{quickViewProduct.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 font-light leading-relaxed mb-4">
                    {quickViewProduct.description}
                  </p>

                  <div className="text-xs space-y-1 text-gray-500 border-t border-gray-100 pt-4">
                    <p><span className="font-semibold text-[#2C2C2C]">SKU:</span> {quickViewProduct.sku}</p>
                    <p><span className="font-semibold text-[#2C2C2C]">Availability:</span> {quickViewProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      onAddToCart(quickViewProduct);
                      onCloseQuickView();
                    }}
                    className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA8B22] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-105 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => onToggleWishlist(quickViewProduct.id)}
                    className="p-3.5 rounded-full border border-gray-300 hover:border-[#D4AF37] text-gray-700 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 sm:p-8 flex flex-col text-left">
          <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col">
            <div className="flex justify-between items-center pb-6">
              <span className="font-playfair text-xl text-white font-bold">Search Catalog</span>
              <button
                onClick={onCloseSearch}
                className="p-2 text-white hover:text-[#D4AF37] rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative mb-8">
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search abayas, cookware, smart watches, earbuds..."
                className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-[#D4AF37]/50 text-white placeholder-gray-400 font-playfair text-lg sm:text-2xl focus:outline-none focus:border-[#D4AF37]"
              />
              <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#D4AF37]" />
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              {query && searchResults.length === 0 ? (
                <p className="text-gray-400 text-center py-12 font-light">
                  No luxury items matched "{query}". Try searching for 'abaya', 'knife', or 'watch'.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onCloseSearch();
                      }}
                      className="bg-white/10 rounded-2xl p-4 border border-white/10 flex space-x-4 hover:border-[#D4AF37] transition-all cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <span className="text-[10px] uppercase font-bold text-[#D4AF37]">{item.category}</span>
                        <h4 className="font-playfair text-white text-sm font-bold line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-gray-300 font-semibold mt-1">₦{item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
