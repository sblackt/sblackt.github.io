import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

// Initialize Firestore
export const db = getFirestore(app);

// Add error handling for development
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase initialized with project:', firebaseConfig.projectId);
}

export default app; 