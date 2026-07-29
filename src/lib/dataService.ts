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

/**
 * Reads all four documents from Firestore in parallel.
 * If any document doesn't exist yet, it seeds it with the default data.
 */
export async function loadAllData(): Promise<StoreData> {
  const [productsSnap, reviewsSnap, configSnap, inquiriesSnap] = await Promise.all([
    getDoc(doc(db, COL, 'products')),
    getDoc(doc(db, COL, 'reviews')),
    getDoc(doc(db, COL, 'config')),
    getDoc(doc(db, COL, 'inquiries')),
  ]);

  const seedOps: Promise<void>[] = [];

  // Products
  let products: Product[];
  if (productsSnap.exists()) {
    products = (productsSnap.data().items ?? []) as Product[];
  } else {
    products = initialProducts;
    seedOps.push(setDoc(doc(db, COL, 'products'), { items: initialProducts }));
  }

  // Reviews
  let reviews: Review[];
  if (reviewsSnap.exists()) {
    reviews = (reviewsSnap.data().items ?? []) as Review[];
  } else {
    reviews = initialReviews;
    seedOps.push(setDoc(doc(db, COL, 'reviews'), { items: initialReviews }));
  }

  // Homepage Config
  let config: HomepageConfig;
  if (configSnap.exists()) {
    config = configSnap.data() as HomepageConfig;
  } else {
    config = initialHomepageConfig;
    seedOps.push(setDoc(doc(db, COL, 'config'), initialHomepageConfig));
  }

  // Inquiries
  let inquiries: Inquiry[];
  if (inquiriesSnap.exists()) {
    inquiries = (inquiriesSnap.data().items ?? []) as Inquiry[];
  } else {
    inquiries = initialInquiries;
    seedOps.push(setDoc(doc(db, COL, 'inquiries'), { items: initialInquiries }));
  }

  // Fire-and-forget seed writes (don't block the UI)
  if (seedOps.length > 0) {
    Promise.all(seedOps).catch(console.error);
  }

  return { products, reviews, config, inquiries };
}

// ─── Save ─────────────────────────────────────────────────────────────────────

export async function saveProducts(products: Product[]): Promise<void> {
  await setDoc(doc(db, COL, 'products'), { items: products });
}

export async function saveReviews(reviews: Review[]): Promise<void> {
  await setDoc(doc(db, COL, 'reviews'), { items: reviews });
}

export async function saveConfig(config: HomepageConfig): Promise<void> {
  await setDoc(doc(db, COL, 'config'), config);
}

export async function saveInquiries(inquiries: Inquiry[]): Promise<void> {
  await setDoc(doc(db, COL, 'inquiries'), { items: inquiries });
}
