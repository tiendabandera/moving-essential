import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <p>Cargando...</p>;

  if (!isAuthenticated)
    return <Navigate to={`/login?redirect=${window.location.href}`} replace />;

  if (roles && !roles.includes(user.user_metadata.role))
    return <Navigate to="/authorization" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
