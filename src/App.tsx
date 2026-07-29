import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BenefitsSection } from './components/BenefitsSection';
import { ProductShowcase } from './components/ProductShowcase';
import { AbayasGallery } from './components/AbayasGallery';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { StoreModals } from './components/StoreModals';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';

import type { Product, Review, Inquiry, HomepageConfig, CartItem } from './types';
import {
  initialProducts,
  initialReviews,
  initialHomepageConfig,
  initialInquiries
} from './mockData';

export function App() {
  // App View Mode
  const [currentView, setCurrentView] = React.useState<'storefront' | 'admin-login' | 'admin-dashboard'>('storefront');

  // Persistent App State
  const [products, setProducts] = React.useState<Product[]>(() => {
    const saved = localStorage.getItem('mmj_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [reviews, setReviews] = React.useState<Review[]>(() => {
    const saved = localStorage.getItem('mmj_reviews');
    return saved ? JSON.parse(saved) : initialReviews;
  });

  const [inquiries, setInquiries] = React.useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('mmj_inquiries');
    return saved ? JSON.parse(saved) : initialInquiries;
  });

  const [homepageConfig, setHomepageConfig] = React.useState<HomepageConfig>(() => {
    const saved = localStorage.getItem('mmj_cms');
    return saved ? JSON.parse(saved) : initialHomepageConfig;
  });

  // Cart & Wishlist
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [wishlistIds, setWishlistIds] = React.useState<string[]>([]);

  // Modals
  const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = React.useState(false);

  // Sync state to local storage
  React.useEffect(() => {
    localStorage.setItem('mmj_products', JSON.stringify(products));
  }, [products]);

  React.useEffect(() => {
    localStorage.setItem('mmj_reviews', JSON.stringify(reviews));
  }, [reviews]);

  React.useEffect(() => {
    localStorage.setItem('mmj_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  React.useEffect(() => {
    localStorage.setItem('mmj_cms', JSON.stringify(homepageConfig));
  }, [homepageConfig]);

  // Cart Actions
  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart(prevCart =>
      prevCart
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleAddInquiry = (newInquiry: Omit<Inquiry, 'id' | 'date' | 'read' | 'replied'>) => {
    const item: Inquiry = {
      ...newInquiry,
      id: 'inq-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      read: false,
      replied: false
    };
    setInquiries([item, ...inquiries]);
  };

  const handleCheckoutWhatsApp = () => {
    const orderLines = cart.map(
      i => `• ${i.product.name} (x${i.quantity}) - $${((i.product.discountPrice || i.product.price) * i.quantity).toFixed(2)}`
    ).join('%0A');

    const total = cart.reduce(
      (sum, i) => sum + (i.product.discountPrice || i.product.price) * i.quantity,
      0
    ).toFixed(2);

    const message = `Hello%20Modest%20%26%20Modern%20By%20Jiaddah,%20I%20would%20like%20to%20place%20an%20order:%0A%0A${orderLines}%0A%0ATotal:%20$${total}`;
    window.open(`https://wa.me/2348000000000?text=${message}`, '_blank');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render Admin Navigation
  if (currentView === 'admin-login') {
    return (
      <AdminLogin
        onLoginSuccess={() => setCurrentView('admin-dashboard')}
        onBackToStorefront={() => setCurrentView('storefront')}
      />
    );
  }

  if (currentView === 'admin-dashboard') {
    return (
      <AdminDashboard
        products={products}
        reviews={reviews}
        inquiries={inquiries}
        homepageConfig={homepageConfig}
        onUpdateProducts={setProducts}
        onUpdateReviews={setReviews}
        onUpdateInquiries={setInquiries}
        onUpdateHomepageConfig={setHomepageConfig}
        onLogout={() => setCurrentView('admin-login')}
        onBackToStorefront={() => setCurrentView('storefront')}
      />
    );
  }

  // Public Storefront View
  return (
    <div className="min-h-screen bg-[#F8F6F2] relative font-poppins selection:bg-[#D4AF37] selection:text-white">
      
      {/* Navigation */}
      <Navbar
        cart={cart}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onNavigateToAdmin={() => setCurrentView('admin-login')}
        onNavigateSection={scrollToSection}
        wishlistCount={wishlistIds.length}
      />

      {/* Hero Section */}
      <HeroSection
        config={homepageConfig}
        onExplore={() => scrollToSection('kitchen')}
        onShopCollection={() => scrollToSection('abayas')}
      />

      {/* Benefits Section */}
      {homepageConfig.showBenefits && <BenefitsSection />}

      {/* Kitchen Essentials Showcase */}
      {homepageConfig.showKitchen && (
        <ProductShowcase
          products={products}
          category="Kitchen Essentials"
          subCategories={['Pots', 'Knife Sets', 'Plates', 'Storage Containers', 'Cutlery', 'Cooking Tools']}
          onQuickView={setQuickViewProduct}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />
      )}

      {/* Abayas Gallery */}
      {homepageConfig.showAbayas && (
        <AbayasGallery
          products={products}
          onQuickView={setQuickViewProduct}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />
      )}

      {/* Modern Gadgets Showcase */}
      {homepageConfig.showGadgets && (
        <ProductShowcase
          products={products}
          category="Modern Gadgets"
          subCategories={['Smart Watches', 'Power Banks', 'Bluetooth Speakers', 'Earbuds', 'Phone Accessories', 'Small Home Gadgets']}
          onQuickView={setQuickViewProduct}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />
      )}

      {/* About Section */}
      <AboutSection config={homepageConfig} />

      {/* Testimonials Carousel */}
      {homepageConfig.showTestimonials && <TestimonialsSection reviews={reviews} />}

      {/* Contact Section */}
      <ContactSection onAddInquiry={handleAddInquiry} />

      {/* Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onNavigateToAdmin={() => setCurrentView('admin-login')}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckoutWhatsApp={handleCheckoutWhatsApp}
      />

      {/* Store Modals */}
      <StoreModals
        quickViewProduct={quickViewProduct}
        onCloseQuickView={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        searchOpen={searchOpen}
        onCloseSearch={() => setSearchOpen(false)}
        products={products}
      />

    </div>
  );
}

export default App;
