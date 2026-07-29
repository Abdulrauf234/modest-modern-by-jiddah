export interface Product {
  id: string;
  name: string;
  category: 'Kitchen Essentials' | 'Modern Gadgets' | 'Abayas';
  subCategory?: string;
  price: number;
  discountPrice?: number;
  description: string;
  image: string;
  images: string[];
  stock: number;
  sku: string;
  brand?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isSale?: boolean;
  isArchived?: boolean;
  specifications?: Record<string, string>;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  parentCategory: 'Kitchen Essentials' | 'Modern Gadgets' | 'Abayas' | 'All';
  image?: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  approved: boolean;
  featured: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  read: boolean;
  replied: boolean;
}

export interface HomepageConfig {
  heroHeadline: string;
  heroSubheading: string;
  heroImage: string;
  aboutTitle: string;
  aboutMission: string;
  aboutVision: string;
  aboutImage: string;
  showBenefits: boolean;
  showKitchen: boolean;
  showAbayas: boolean;
  showGadgets: boolean;
  showTestimonials: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
