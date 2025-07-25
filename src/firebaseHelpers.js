// src/firebaseHelpers.js

import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

// 🔐 Register
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// 🔓 Login
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// 🚪 Logout
export const logoutUser = () => {
  return signOut(auth);
};

// 🔁 Reset Password
export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// 🛒 Example: Add product
export const addProductToDB = async (productData) => {
  const docRef = await addDoc(collection(db, "products"), productData);
  return docRef.id;
};

// ✅ Fetch all products from Firestore
export const fetchProducts = async () => {
  const productsRef = collection(db, "products");
  const querySnapshot = await getDocs(productsRef);

  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
};
