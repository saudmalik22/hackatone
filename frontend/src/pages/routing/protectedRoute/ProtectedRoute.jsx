import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {
   const isAuthenticated = Boolean(localStorage.getItem("token"));
  return isAuthenticated ? children : <Navigate to="/login" />
}
