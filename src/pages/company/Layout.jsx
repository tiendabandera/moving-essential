import NavbarCompany from "@/components/desing/NavbarCompany";
import SidebarCompany from "@/components/SidebarCompany";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { profile, userInfo } = useAuth();

  useEffect(() => {
    profile();
  }, []);

  /* if (!userInfo) {
    return <div>Loading company information...</div>;
  } */

  return (
    <div className="flex w-full h-full">
      <div className="hidden xl:block w-80 h-full xl:fixed">
        <SidebarCompany />
      </div>
      <div className="w-full xl:ml-80">
        <NavbarCompany />
        <div className="p-6 bg-[#f8f8f8]">
          <Outlet context={{ userInfo }} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
