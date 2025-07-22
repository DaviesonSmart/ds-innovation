import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// Add product to Firestore
export const addProductToFirebase = async (product) => {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      ...product,
      createdAt: serverTimestamp(),
    });
    console.log("✅ Product added with ID:", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("❌ Error adding product:", e);
    throw e;
  }
};

// Fetch all products from Firestore
export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
};
