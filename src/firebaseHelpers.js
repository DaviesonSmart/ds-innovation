// src/firebaseHelpers.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export const addProductToFirebase = async (product) => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    console.log("Product added with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding product:", e);
  }
};

// src/firebaseHelpers.js (add this inside the same file)

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

