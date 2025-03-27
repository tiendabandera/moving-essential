import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  // const location = useLocation();

  // const premiumFeatures = [
  //   "/company/leads/phone-pool",
  //   "/company/crm/integrations",
  // ];

  if (isLoading) return <p>Cargando...</p>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(user.user_metadata.role))
    return <Navigate to="/authorization" replace />;

  // Verificar si el usuario tiene acceso a las funciones premium
  // if (
  //   premiumFeatures.includes(location.pathname) &&
  //   ((userInfo?.company.premium_features &&
  //     !userInfo?.company.premium_features.is_active) ||
  //     !userInfo?.company.premium_features)
  // ) {
  //   return <Navigate to="/company/membership-premium-features" replace />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
