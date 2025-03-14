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
import SidebarRoutesUser from "../SidebarRoutesUser";

const NavbarUser = () => {
  const { user, userInfo } = useAuth();

  console.log(user);

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
            <SidebarRoutesUser />
          </SheetContent>
        </Sheet>
      </div>
      <div className="relative w-[300px]">
        <Input placeholder="Search..." className="rounded-lg" />
        <Search strokeWidth={1} className="absolute top-2 right-2 w-5 h-5" />
      </div>
      <div className="hidden md:flex items-center gap-x-2">
        <p className="text-base font-medium">{user.user_metadata.name}</p>
        <img
          src={user?.profile_picture || "/assets/img/user-not-found.png"}
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </nav>
  );
};

export default NavbarUser;
