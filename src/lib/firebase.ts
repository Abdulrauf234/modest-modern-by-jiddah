import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ─────────────────────────────────────────────────────────────────────────────
// Fill in your Firebase config values in the .env file at the project root.
// Get them from: Firebase Console → Project Settings → Your Apps → Web App
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA7b3iySq7-2VZgs59Z-sNQcOuIP4WZ5mQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "modest-modern.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "modest-modern",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "modest-modern.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "45108480347",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:45108480347:web:725f8eb8ef94e40d6af27e",
};

const app = initializeApp(firebaseConfig);

/** Shared Firestore database instance used across the whole app */
export const db = getFirestore(app);
