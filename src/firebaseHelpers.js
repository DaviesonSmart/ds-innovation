// src/firebaseHelpers.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDyyDkEXTqEUIhNgl6LFBkw7UaIleEzhn8",
  authDomain: "smarttech-collections.firebaseapp.com",
  projectId: "smarttech-collections",
  storageBucket: "smarttech-collections.appspot.com", // stays in config but unused now
  messagingSenderId: "593838965502",
  appId: "1:593838965502:web:5cb0295b010e0e6901dbaf",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Set persistence for local storage
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Persistence error:", error);
});

export { auth, db };

// ----------------- AUTH HELPERS -----------------
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// ----------------- PRODUCT HELPERS -----------------
export const addProductToDB = async (productData) => {
  const docRef = await addDoc(collection(db, "products"), productData);
  return docRef.id;
};

export const fetchProducts = async () => {
  const productsRef = collection(db, "products");
  const querySnapshot = await getDocs(productsRef);

  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
};
