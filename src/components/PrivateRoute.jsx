import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser, authReady } = useAuth();

  if (!authReady) {
    return <div>Checking login status...</div>; // You can replace this with a loader/spinner
  }

  return currentUser ? children : <Navigate to="/login" />;
}
