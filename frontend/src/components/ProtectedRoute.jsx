import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({ children, role }) => {

  const { user, loading } = useAuthStore();

  // ⭐ WAIT until auth check finishes
  if (loading) {
    return <div>Checking authentication...</div>;
  }

  // not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
