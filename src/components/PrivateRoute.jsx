import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("smarttech-loggedin") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
