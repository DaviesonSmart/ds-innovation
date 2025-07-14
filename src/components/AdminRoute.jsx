// src/components/AdminRoute.jsx
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem("smarttech-loggedin") === "true";
  const user = JSON.parse(localStorage.getItem("smarttech-user"));

  if (!isLoggedIn || !user || user.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
