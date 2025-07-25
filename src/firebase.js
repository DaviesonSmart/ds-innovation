// src/firebase.js

// Import the functions you need from Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyyDkEXTqEUIhNgl6LFBkw7UaIleEzhn8",
  authDomain: "smarttech-collections.firebaseapp.com",
  projectId: "smarttech-collections",
  storageBucket: "smarttech-collections.firebasestorage.app",
  messagingSenderId: "593838965502",
  appId: "1:593838965502:web:5cb0295b010e0e6901dbaf",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
