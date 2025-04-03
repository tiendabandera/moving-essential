import NavbarCompany from "@/components/design/NavbarCompany";
import SidebarCompany from "@/components/SidebarCompany";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const premiumFeatures = [
  "/company/leads/phone-pool",
  "/company/crm/integrations",
  "/company/listings",
];

const Layout = () => {
  const { profile, userInfo } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    profile();
  }, []);

  // Verificar si el usuario tiene acceso a las funciones premium
  useEffect(() => {
    if (
      userInfo &&
      !userInfo?.company.has_premium_features &&
      premiumFeatures.includes(location.pathname)
    ) {
      navigate("/company/membership-premium-features");
    }
  }, [location.pathname]);

  return (
    <div className="flex w-full h-full">
      <div className="hidden xl:block w-80 h-full xl:fixed">
        <SidebarCompany />
      </div>
      <div className="w-full xl:ml-80">
        <NavbarCompany />
        <div className="p-6 bg-[#f8f8f8]">
          {userInfo && <Outlet context={{ userInfo }} />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
