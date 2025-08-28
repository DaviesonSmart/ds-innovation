// src/seedAdmin.js
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseHelpers"; // adjust if your firebase config path is different

async function seedAdmin() {
  try {
    const adminId = "admin123"; // you can choose any fixed ID for admin

    await setDoc(doc(db, "users", adminId), {
      name: "admin",
      email: "admin@gmail.com",
      password: "619619", // ⚠️ not secure, better to hash or only use Auth
      role: "admin",
    });

    console.log("✅ Admin user seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
  }
}

seedAdmin();
