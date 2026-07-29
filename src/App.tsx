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
import { initialProducts, initialReviews, initialHomepageConfig, initialInquiries } from './mockData';
import { loadAllData, saveProducts, saveReviews, saveConfig, saveInquiries } from './lib/dataService';

export function App() {
  // App View Mode
  const [currentView, setCurrentView] = React.useState<'storefront' | 'admin-login' | 'admin-dashboard'>('storefront');

  // Loading state while Firestore data is being fetched
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  // Persistent App State — starts with defaults, replaced by Firestore data on mount
  const [products, setProducts] = React.useState<Product[]>(initialProducts);
  const [reviews, setReviews] = React.useState<Review[]>(initialReviews);
  const [inquiries, setInquiries] = React.useState<Inquiry[]>(initialInquiries);
  const [homepageConfig, setHomepageConfig] = React.useState<HomepageConfig>(initialHomepageConfig);

  // Cart & Wishlist
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [wishlistIds, setWishlistIds] = React.useState<string[]>([]);

  // Modals
  const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = React.useState(false);

  // Track whether data has been loaded so save effects don't fire on initial setState
  const [isLoaded, setIsLoaded] = React.useState(false);

  // ── Load data from Firestore on mount ──────────────────────────────────────
  React.useEffect(() => {
    loadAllData()
      .then(({ products: p, reviews: r, config: c, inquiries: i }) => {
        setProducts(p);
        setReviews(r);
        setHomepageConfig(c);
        setInquiries(i);
        setIsLoading(false);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to load store data from Firestore:', err);
        setLoadError('Could not connect to the database. Using local fallback.');
        setIsLoading(false);
        setIsLoaded(true);
      });
  }, []);

  // ── Sync state changes back to storage/Firestore (only after load) ─────────
  React.useEffect(() => {
    if (!isLoaded) return;
    saveProducts(products).catch(console.error);
  }, [products, isLoaded]);

  React.useEffect(() => {
    if (!isLoaded) return;
    saveReviews(reviews).catch(console.error);
  }, [reviews, isLoaded]);

  React.useEffect(() => {
    if (!isLoaded) return;
    saveInquiries(inquiries).catch(console.error);
  }, [inquiries, isLoaded]);

  React.useEffect(() => {
    if (!isLoaded) return;
    saveConfig(homepageConfig).catch(console.error);
  }, [homepageConfig, isLoaded]);

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
    const orderItemsText = cart
      .map(
        i =>
          `• ${i.product.name} (x${i.quantity}) - ₦${((i.product.discountPrice || i.product.price) * i.quantity).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`
      )
      .join('\n');

    const total = cart
      .reduce((sum, i) => sum + (i.product.discountPrice || i.product.price) * i.quantity, 0)
      .toLocaleString('en-NG', { minimumFractionDigits: 2 });

    const message = encodeURIComponent(
      `Hello Modest & Modern By Jiaddah, I would like to place an order:\n\n${orderItemsText}\n\nTotal: ₦${total}`
    );
    const whatsappUrl = `https://wa.me/2348000000000?text=${message}`;

    // Try window.open first; fallback to location redirect to bypass mobile popup blockers
    const win = window.open(whatsappUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }
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
      {isLoading && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#2C2C2C]/90 text-white text-xs px-4 py-2 rounded-full shadow-2xl backdrop-blur-md flex items-center space-x-2 border border-[#D4AF37]/40 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping"></div>
          <span>Syncing latest store updates...</span>
        </div>
      )}
      {loadError && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-red-900/90 text-white text-xs px-4 py-2 rounded-full shadow-2xl backdrop-blur-md flex items-center space-x-2 border border-red-500/40">
          <span>{loadError}</span>
        </div>
      )}

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
