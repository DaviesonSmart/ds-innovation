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
