import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({ children, role }) => {

  const { user } = useAuthStore();

  // not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
