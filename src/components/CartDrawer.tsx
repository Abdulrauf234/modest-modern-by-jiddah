import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckoutWhatsApp: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutWhatsApp
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.product.discountPrice || item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-left">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#F8F6F2]">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="font-playfair text-xl font-bold text-[#2C2C2C]">
                Your Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-[#2C2C2C] rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F8F6F2] text-[#D4AF37] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-playfair text-lg font-bold text-[#2C2C2C]">Your bag is empty</p>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Explore our luxury abayas, kitchenware, and modern gadgets to start shopping.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-white text-xs uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = item.product.discountPrice || item.product.price;
                return (
                  <div
                    key={item.product.id}
                    className="flex space-x-4 p-4 rounded-2xl bg-[#F8F6F2]/60 border border-gray-100 items-center justify-between"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover border border-white"
                    />

                    <div className="flex-1">
                      <h4 className="font-playfair text-sm font-bold text-[#2C2C2C] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-[#D4AF37] font-semibold">
                        ₦{itemPrice.toFixed(2)}
                      </p>

                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs text-gray-600 hover:border-[#D4AF37] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#2C2C2C]">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs text-gray-600 hover:border-[#D4AF37] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-playfair text-sm font-bold text-[#2C2C2C]">
                        ₦{(itemPrice * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors mt-2 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-[#F8F6F2] space-y-4">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-[#2C2C2C]">Estimated Subtotal</span>
                <span className="font-playfair text-xl text-[#2C2C2C]">₦{subtotal.toFixed(2)}</span>
              </div>

              <p className="text-[11px] text-gray-500 font-light">
                Taxes and shipping calculated at checkout via WhatsApp Concierge.
              </p>

              <button
                onClick={onCheckoutWhatsApp}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#AA8B22] text-white text-xs uppercase tracking-widest font-bold shadow-lg hover:shadow-xl hover:brightness-105 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Checkout via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-1 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>100% Secure Direct Ordering</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
