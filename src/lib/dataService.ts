/**
 * dataService.ts
 * ──────────────
 * All Firestore read/write operations for the MMJ store.
 *
 * Data is stored in the "mmjStore" Firestore collection with four documents:
 *   mmjStore/products   → { items: Product[] }
 *   mmjStore/reviews    → { items: Review[] }
 *   mmjStore/config     → HomepageConfig (flat fields)
 *   mmjStore/inquiries  → { items: Inquiry[] }
 *
 * On the very first load (empty database), each document is seeded with the
 * local initial data from mockData.ts so the storefront is never blank.
 */

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import {
  initialProducts,
  initialReviews,
  initialHomepageConfig,
  initialInquiries,
} from '../mockData';
import type { Product, Review, HomepageConfig, Inquiry } from '../types';

const COL = 'mmjStore';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface StoreData {
  products: Product[];
  reviews: Review[];
  config: HomepageConfig;
  inquiries: Inquiry[];
}

// ─── Load ─────────────────────────────────────────────────────────────────────

const LOCAL_KEY_PRODUCTS = 'mmj_store_products';
const LOCAL_KEY_REVIEWS = 'mmj_store_reviews';
const LOCAL_KEY_CONFIG = 'mmj_store_config';
const LOCAL_KEY_INQUIRIES = 'mmj_store_inquiries';

/**
 * Reads all four documents from Firestore (or LocalStorage fallback).
 */
export async function loadAllData(): Promise<StoreData> {
  // Check local cache first for fastest load and offline support
  const localProducts = localStorage.getItem(LOCAL_KEY_PRODUCTS);
  const localReviews = localStorage.getItem(LOCAL_KEY_REVIEWS);
  const localConfig = localStorage.getItem(LOCAL_KEY_CONFIG);
  const localInquiries = localStorage.getItem(LOCAL_KEY_INQUIRIES);

  try {
    const [productsSnap, reviewsSnap, configSnap, inquiriesSnap] = await Promise.all([
      getDoc(doc(db, COL, 'products')),
      getDoc(doc(db, COL, 'reviews')),
      getDoc(doc(db, COL, 'config')),
      getDoc(doc(db, COL, 'inquiries')),
    ]);

    const seedOps: Promise<void>[] = [];

    // Products: prioritize local saved changes first if available
    let products: Product[];
    if (localProducts) {
      products = JSON.parse(localProducts);
    } else if (productsSnap.exists() && productsSnap.data().items?.length > 0) {
      products = productsSnap.data().items as Product[];
    } else {
      products = initialProducts;
      seedOps.push(setDoc(doc(db, COL, 'products'), { items: initialProducts }));
    }

    // Reviews
    let reviews: Review[];
    if (localReviews) {
      reviews = JSON.parse(localReviews);
    } else if (reviewsSnap.exists()) {
      reviews = (reviewsSnap.data().items ?? []) as Review[];
    } else {
      reviews = initialReviews;
      seedOps.push(setDoc(doc(db, COL, 'reviews'), { items: initialReviews }));
    }

    // Homepage Config
    let config: HomepageConfig;
    if (localConfig) {
      config = JSON.parse(localConfig);
    } else if (configSnap.exists()) {
      config = configSnap.data() as HomepageConfig;
    } else {
      config = initialHomepageConfig;
      seedOps.push(setDoc(doc(db, COL, 'config'), initialHomepageConfig));
    }

    // Inquiries
    let inquiries: Inquiry[];
    if (localInquiries) {
      inquiries = JSON.parse(localInquiries);
    } else if (inquiriesSnap.exists()) {
      inquiries = (inquiriesSnap.data().items ?? []) as Inquiry[];
    } else {
      inquiries = initialInquiries;
      seedOps.push(setDoc(doc(db, COL, 'inquiries'), { items: initialInquiries }));
    }

    if (seedOps.length > 0) {
      Promise.all(seedOps).catch(console.error);
    }

    // Only write to localStorage if there was nothing there yet (first ever load)
    // Do NOT overwrite saved local edits from the admin with Firestore defaults
    if (!localProducts) localStorage.setItem(LOCAL_KEY_PRODUCTS, JSON.stringify(products));
    if (!localReviews) localStorage.setItem(LOCAL_KEY_REVIEWS, JSON.stringify(reviews));
    if (!localConfig) localStorage.setItem(LOCAL_KEY_CONFIG, JSON.stringify(config));
    if (!localInquiries) localStorage.setItem(LOCAL_KEY_INQUIRIES, JSON.stringify(inquiries));

    return { products, reviews, config, inquiries };
  } catch (err) {
    console.warn('Firestore load error, falling back to LocalStorage:', err);
    return {
      products: localProducts ? JSON.parse(localProducts) : initialProducts,
      reviews: localReviews ? JSON.parse(localReviews) : initialReviews,
      config: localConfig ? JSON.parse(localConfig) : initialHomepageConfig,
      inquiries: localInquiries ? JSON.parse(localInquiries) : initialInquiries
    };
  }
}

// ─── Save ─────────────────────────────────────────────────────────────────────

export async function saveProducts(products: Product[]): Promise<void> {
  localStorage.setItem(LOCAL_KEY_PRODUCTS, JSON.stringify(products));
  try {
    await setDoc(doc(db, COL, 'products'), { items: products });
  } catch (err) {
    console.warn('Could not sync products to Firestore DB directly (will persist locally):', err);
  }
}

export async function saveReviews(reviews: Review[]): Promise<void> {
  localStorage.setItem(LOCAL_KEY_REVIEWS, JSON.stringify(reviews));
  try {
    await setDoc(doc(db, COL, 'reviews'), { items: reviews });
  } catch (err) {
    console.warn('Could not sync reviews to Firestore DB:', err);
  }
}

export async function saveConfig(config: HomepageConfig): Promise<void> {
  localStorage.setItem(LOCAL_KEY_CONFIG, JSON.stringify(config));
  try {
    await setDoc(doc(db, COL, 'config'), config);
  } catch (err) {
    console.warn('Could not sync config to Firestore DB:', err);
  }
}

export async function saveInquiries(inquiries: Inquiry[]): Promise<void> {
  localStorage.setItem(LOCAL_KEY_INQUIRIES, JSON.stringify(inquiries));
  try {
    await setDoc(doc(db, COL, 'inquiries'), { items: inquiries });
  } catch (err) {
    console.warn('Could not sync inquiries to Firestore DB:', err);
  }
}
