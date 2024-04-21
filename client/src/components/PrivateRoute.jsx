import { useAuth } from "../contexts/JWTAuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading,isAuthenticated } = useAuth();

  return !loading && user && isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;