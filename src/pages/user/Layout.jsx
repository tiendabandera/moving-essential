import NavbarUser from "@/components/design/NavbarUser";
import SidebarUser from "@/components/SidebarUser";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { profile, userInfo } = useAuth();

  useEffect(() => {
    profile();
  }, []);

  return (
    <div className="flex w-full h-full">
      <div className="hidden xl:block w-80 h-full xl:fixed">
        <SidebarUser />
      </div>
      <div className="w-full xl:ml-80">
        <NavbarUser />
        <div className="p-6 bg-[#f8f8f8]">
          <Outlet context={{ userInfo }} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
