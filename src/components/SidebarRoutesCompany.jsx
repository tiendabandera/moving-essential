import { useAuth } from "@/context/AuthContext";
import {
  dataGeneral,
  dataMembership,
} from "../constants/sidebar.routes.company.data";
import Button from "./Button";
import SidebarItems from "./SidebarItems";
import { Separator } from "@/components/ui/separator";

const SidebarRoutesCompany = () => {
  const yeard = new Date().getFullYear();
  const { logout } = useAuth();

  const submitLogout = () => logout();

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="p-2 md:p-6">
          <p className="text-slate-500 mb-2">General</p>
          {dataGeneral.map((item) => (
            <SidebarItems key={item.label} {...item} />
          ))}
        </div>

        <Separator />

        <div className="p-2 md:p-6">
          <p className="text-slate-500 mb-2">Memberships</p>
          {dataMembership.map((item) => (
            <SidebarItems key={item.label} {...item} />
          ))}
        </div>
      </div>
      <div>
        <div className="text-center p-6">
          <Button orange className="w-full" onClick={submitLogout}>
            Logout
          </Button>
        </div>
        <Separator />
        <footer className="mt-3 p-3 text-center">
          <p className="text-sm">{yeard}. All rights reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default SidebarRoutesCompany;
