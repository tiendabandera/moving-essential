import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { Menu, Search } from "lucide-react";
import SidebarRoutesCompany from "../SidebarRoutesCompany";

const NavbarCompany = () => {
  const { user, userInfo } = useAuth();

  return (
    <nav className="flex items-center px-1 gap-x-4 md:px-6 justify-between w-full bg-background border-b h-20">
      <div className="block xl:hidden">
        <Sheet>
          <SheetTrigger className="flex items-center">
            <Menu strokeWidth={2} className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle />
              <SheetDescription />
            </SheetHeader>
            <SidebarRoutesCompany />
          </SheetContent>
        </Sheet>
      </div>
      <div className="relative w-[300px]">
        <Input placeholder="Search..." className="rounded-lg" />
        <Search strokeWidth={1} className="absolute top-2 right-2 w-5 h-5" />
      </div>
      <div className="hidden md:flex items-center gap-x-2">
        <p className="text-base font-medium">
          {user.user_metadata.realtor_name || user.user_metadata.company_name}
        </p>
        <img
          src={
            userInfo
              ? userInfo.company.images[0]
              : "/assets/img/user-not-found.png"
          }
          alt="profile"
          className="size-8 object-cover rounded-full"
        />
      </div>
    </nav>
  );
};

export default NavbarCompany;
