import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

declare global {
  interface Window {
    FIREBASE_APPCHECK_DEBUG_TOKEN?: string | boolean;
  }
}

// Your Firebase configuration
// Replace these with your actual Firebase project config from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyD3giFeU-zkVUx36U4D2YGAM-_vtP15aho",
    authDomain: "the-meeple-planner.firebaseapp.com",
    projectId: "the-meeple-planner",
    storageBucket: "the-meeple-planner.firebasestorage.app",
    messagingSenderId: "435277919251",
    appId: "1:435277919251:web:4cfb2ec26e5c55a5007be6",
    measurementId: "G-9VPCFFFP7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize App Check with reCAPTCHA Enterprise
const appCheckSiteKey =
  process.env.REACT_APP_FIREBASE_APPCHECK_SITE_KEY || '6LfFryQsAAAAADqdLut-1om_HfsZYq1zYno5HRiq';

const shouldUseDebugToken =
  process.env.NODE_ENV !== 'production' ||
  process.env.REACT_APP_FIREBASE_APPCHECK_DEBUG === 'true';

if (typeof window !== 'undefined') {
  if (shouldUseDebugToken) {
    window.FIREBASE_APPCHECK_DEBUG_TOKEN =
      process.env.REACT_APP_FIREBASE_APPCHECK_DEBUG_TOKEN || true;
  }

  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(appCheckSiteKey),
      isTokenAutoRefreshEnabled: true
    });
  } catch (error) {
    console.error('Failed to initialize Firebase App Check', error);
  }
}

// Initialize Firestore
export const db = getFirestore(app);

// Add error handling for development
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase initialized with project:', firebaseConfig.projectId);
}

export default app; 
