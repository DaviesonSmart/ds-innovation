// src/components/AdminRoute.jsx
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem("smarttech-loggedin") === "true";
  const userData = localStorage.getItem("smarttech-user");

  let user = null;
  try {
    user = JSON.parse(userData);
  } catch {
    user = null;
  }

  if (!isLoggedIn || !user || user.role?.toLowerCase() !== "admin") {
    // Clear bad data
    localStorage.removeItem("smarttech-loggedin");
    localStorage.removeItem("smarttech-user");

    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
