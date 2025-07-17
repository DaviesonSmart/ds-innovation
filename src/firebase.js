// src/firebase.js

// Import the functions you need from Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyyDkEXTqEUIhNgl6LFBkw7UaIleEzhn8",
  authDomain: "smarttech-collections.firebaseapp.com",
  projectId: "smarttech-collections",
  storageBucket: "smarttech-collections.firebasestorage.app",
  messagingSenderId: "593838965502",
  appId: "1:593838965502:web:5cb0295b010e0e6901dbaf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (for database)
const db = getFirestore(app);

// Export it so we can use it in other files
export { db };
