import { useAuth } from "@/context/AuthContext";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Button from "./Button";
import {
  dataGeneral,
  dataLeads,
  dataReviews,
} from "@/constants/sidebar.routes.admin.data";
import SidebarItems from "./SidebarItems";
import { roles } from "@/constants";

const SidebarRoutesUser = () => {
  const yeard = new Date().getFullYear();
  const { logout, user } = useAuth();

  const submitLogout = () => logout();

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="p-2 md:p-6">
          <p className="text-slate-500 mb-2">General</p>
          {dataGeneral(user?.user_metadata.role).map((item) => (
            <SidebarItems key={item.label} {...item} />
          ))}
        </div>
        {user?.user_metadata.role === roles.admin && (
          <>
            <Separator />
            <div className="p-2 md:p-6">
              <p className="text-slate-500 mb-2">Leads</p>
              {dataLeads.map((item) => (
                <SidebarItems key={item.label} {...item} />
              ))}
            </div>
            <Separator />
            <div className="p-2 md:p-6">
              <p className="text-slate-500 mb-2">Reviews</p>
              {dataReviews.map((item) => (
                <SidebarItems key={item.label} {...item} />
              ))}
            </div>
          </>
        )}
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

export default SidebarRoutesUser;
