import type { Product, Review, HomepageConfig, Inquiry } from './types';

export const initialProducts: Product[] = [
  // Kitchen Essentials
  {
    id: 'k1',
    name: 'Royale 12-Piece Gold Trim Cookware Set',
    category: 'Kitchen Essentials',
    subCategory: 'Pots',
    price: 349.99,
    discountPrice: 299.99,
    description: 'Ultra-durable non-stick granite cookware set with heat-resistant gold plated handles and tempered glass lids.',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 25,
    sku: 'KIT-ROY-01',
    isBestSeller: true,
    isFeatured: true,
    tags: ['cookware', 'kitchen', 'gold', 'granite']
  },
  {
    id: 'k2',
    name: 'Precision Damascus Steel Knife Set with Block',
    category: 'Kitchen Essentials',
    subCategory: 'Knife Sets',
    price: 189.99,
    description: 'High-carbon Japanese steel knives paired with an acrylic gold stand for chef-grade performance.',
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 14,
    sku: 'KIT-KNF-02',
    isNew: true,
    isFeatured: true,
    tags: ['knives', 'chef', 'damascus']
  },
  {
    id: 'k3',
    name: 'Empress Ceramic Gold Rim Dinnerware (24 Pcs)',
    category: 'Kitchen Essentials',
    subCategory: 'Plates',
    price: 220.00,
    discountPrice: 195.00,
    description: 'Handcrafted luxury porcelain set finished with a brushed gold rim, perfect for high-end dining.',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 8,
    sku: 'KIT-PLT-03',
    isSale: true,
    isFeatured: true,
    tags: ['plates', 'ceramic', 'dinnerware']
  },
  {
    id: 'k4',
    name: 'Aesthetic Hermetic Glass Container Collection',
    category: 'Kitchen Essentials',
    subCategory: 'Storage Containers',
    price: 85.00,
    description: 'Airtight borosilicate glass jars topped with natural bamboo and brass lids for pristine kitchen organization.',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 30,
    sku: 'KIT-STR-04',
    tags: ['storage', 'glass', 'pantry']
  },

  // Abayas
  {
    id: 'a1',
    name: 'The Emerald Luxe Velvet Satin Abaya',
    category: 'Abayas',
    subCategory: 'Luxury Abayas',
    price: 280.00,
    discountPrice: 245.00,
    description: 'Hand-beaded gold embroidery along the sleeves and hemline, tailored from premium Japanese silk velvet.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 10,
    sku: 'ABY-EMR-01',
    isBestSeller: true,
    isFeatured: true,
    tags: ['abaya', 'luxury', 'velvet', 'embroidery']
  },
  {
    id: 'a2',
    name: 'Minimalist Sand Dune Flowing Everyday Abaya',
    category: 'Abayas',
    subCategory: 'Everyday Abayas',
    price: 140.00,
    description: 'Lightweight breathable Nida fabric designed for effortlessly chic daily wear with hidden pockets.',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 20,
    sku: 'ABY-SND-02',
    isNew: true,
    isFeatured: true,
    tags: ['everyday', 'nida', 'modest']
  },
  {
    id: 'a3',
    name: 'Royal Midnight Gold Sequin Gala Abaya',
    category: 'Abayas',
    subCategory: 'Occasion Wear',
    price: 320.00,
    description: 'Floor-length statement evening abaya draped with handcrafted gold sequin accent trim.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 5,
    sku: 'ABY-ROY-03',
    isFeatured: true,
    tags: ['occasion', 'gala', 'sequin']
  },

  // Modern Gadgets
  {
    id: 'g1',
    name: 'Aura Luxe Smart Active Watch with Gold Mesh Band',
    category: 'Modern Gadgets',
    subCategory: 'Smart Watches',
    price: 199.99,
    discountPrice: 169.99,
    description: 'AMOLED display smart watch featuring health monitoring, long-battery lifespan, and metallic champagne strap.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 18,
    sku: 'GDT-WCH-01',
    isBestSeller: true,
    isFeatured: true,
    tags: ['smartwatch', 'tech', 'gadgets']
  },
  {
    id: 'g2',
    name: 'Harmonix ANC Wireless Earbuds with Gold Case',
    category: 'Modern Gadgets',
    subCategory: 'Earbuds',
    price: 129.00,
    description: 'Active Noise Canceling true wireless earbuds providing hi-fi spatial audio and wireless charging.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 40,
    sku: 'GDT-EAR-02',
    isFeatured: true,
    tags: ['audio', 'earbuds', 'wireless']
  },
  {
    id: 'g3',
    name: 'Titanium 20,000mAh Ultra-Fast MagSafe Power Bank',
    category: 'Modern Gadgets',
    subCategory: 'Power Banks',
    price: 89.99,
    description: 'Slimline magnetic wireless power bank with digital percentage output screen.',
    image: 'https://images.unsplash.com/photo-1609592424074-1296c0953a81?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1609592424074-1296c0953a81?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 22,
    sku: 'GDT-PWR-03',
    tags: ['magsafe', 'powerbank', 'charging']
  }
];

export const initialReviews: Review[] = [
  {
    id: 'r1',
    name: 'Amina Al-Mansoor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'The quality exceeded my expectations. Everything feels premium and the packaging was luxurious!',
    date: '2026-07-20',
    approved: true,
    featured: true
  },
  {
    id: 'r2',
    name: 'Fatima Zahrani',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'My abaya arrived beautifully packaged with gold ribbons. I will definitely order again.',
    date: '2026-07-15',
    approved: true,
    featured: true
  },
  {
    id: 'r3',
    name: 'Zainab Ibrahim',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'The kitchen utensils are incredibly durable and add such an elegant touch to my dining table.',
    date: '2026-07-10',
    approved: true,
    featured: true
  }
];

export const initialHomepageConfig: HomepageConfig = {
  heroHeadline: 'Elevating Everyday Living with Style & Elegance',
  heroSubheading: 'Discover premium kitchen essentials, elegant abayas, and modern gadgets carefully selected to complement your lifestyle.',
  heroImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
  aboutTitle: 'About Modest & Modern By Jiaddah',
  aboutMission: 'To provide elegant abayas, quality kitchen essentials, and modern gadgets that blend modesty, functionality, and contemporary living while delivering exceptional customer satisfaction.',
  aboutVision: 'To become a trusted lifestyle brand known for quality, elegance, affordability, and excellent customer service.',
  aboutImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
  showBenefits: true,
  showKitchen: true,
  showAbayas: true,
  showGadgets: true,
  showTestimonials: true
};

export const initialInquiries: Inquiry[] = [
  {
    id: 'inq-1',
    name: 'Suhaila Tariq',
    email: 'suhaila@example.com',
    phone: '+234 803 123 4567',
    message: 'Hello, do you ship internationally to the UAE and UK?',
    date: '2026-07-28',
    read: false,
    replied: false
  }
];
