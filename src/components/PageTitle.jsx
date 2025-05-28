import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const PageTitleManager = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const titles = {
      "/": "Home - Moving Essential",
      "/login": "Login - Moving Essential",
      "/register": "Register - Moving Essential",
      "/join": "Join a Company - Moving Essential",
      "/authorization": "Unauthorized - Moving Essential",
      "/profile": "Profile - Moving Essential",
      "/user/dashboard": "Dashboard - Moving Essential",
      "/company/dashboard": "Dashboard - Moving Essential",
      "/company/data": "Data - Moving Essential",
      "/company/notifications": "Notifications - Moving Essential",
      "/landing/user": "Landing Users - Moving Essential",
      "/landing/movers": "Landing Movers  - Moving Essential",
      "/landing/realtors": "Landing Realtors  - Moving Essential",
    };

    const title = titles[location.pathname] || "Moving Essential";
    document.title = title;
  }, [location]);

  useEffect(() => {
    // Eliminar la barra final solo si no es la raíz y no tiene query o hash
    if (
      location.pathname.length > 1 &&
      location.pathname.endsWith("/") &&
      !location.search &&
      !location.hash
    ) {
      navigate(location.pathname.slice(0, -1), { replace: true });
    }
  }, [location, navigate]);

  return null; // Este componente no renderiza nada
};
