import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { House, Menu, Power, UserRound, X } from "lucide-react";
import CustomIcon from "./design/CustomIcon";

import { AnimatePresence, motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { Separator } from "./ui/separator";
import Button from "./Button";
import { navigation } from "@/constants";
import SidebarItems from "./SidebarItems";
import Notifications from "./Notifications";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openNavigation, setOpenNavigation] = useState(false);

  const { isAuthenticated, logout, user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const yeard = new Date().getFullYear();

  const toggleNavigation = () => setOpenNavigation(!openNavigation);
  const submitLogout = () => logout();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cierra el menú cuando la ruta cambia
  useEffect(() => {
    setOpenNavigation(false);
  }, [location.pathname]);

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[4.53rem] overflow-hidden bg-color-1">
        <div
          className={`fixed top-0 left-0 w-full z-50 border-b border-color-1 bg-color-1 transition-all duration-300 ${
            openNavigation
              ? "bg-color-1"
              : scrolled
              ? "bg-color-1/90 backdrop-blur-xs"
              : "bg-color-1"
          }`}
        >
          <div className="flex items-center py-2 px-5 lg:px-7 ">
            <Link className="block w-[12rem] xl:mr-8" to="/">
              <img
                src="/assets/img/logo-blanco.png"
                width={50}
                height={50}
                alt="Moving Essential"
              />
            </Link>
            <div className="ml-auto">
              {isAuthenticated && user.user_metadata.role === "company" && (
                <Notifications user={user} />
              )}
            </div>
            <div className="cursor-pointer flex items-center gap-3 ml-3 bg-white rounded-full px-3 py-2 ring-1 ring-white relative">
              <div
                className="hidden sm:block rounded-full absolute top-0 left-0 w-full h-full"
                onClick={() => setOpen((prev) => !prev)}
              ></div>
              <div
                className="block sm:hidden rounded-full absolute top-0 left-0 w-full h-full"
                onClick={toggleNavigation}
              ></div>
              <AnimatePresence mode="wait">
                {openNavigation ? (
                  <motion.div
                    key="x-icon"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="size-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu-icon"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="size-5" />
                  </motion.div>
                )}
              </AnimatePresence>
              <img
                src={
                  user?.user_metadata.profile_picture ||
                  "/assets/img/user-not-found.png"
                }
                className="size-7 rounded-full object-cover"
              />
            </div>
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger />
              <DropdownMenuContent className="font-normal w-56 mt-5 mr-5 lg:mr-7">
                {isAuthenticated ? (
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() =>
                        navigate(`/${user.user_metadata.role}/dashboard`)
                      }
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 hover:!text-red-600"
                      onSelect={submitLogout}
                    >
                      Sign out
                      <Power strokeWidth={2} className="size-4 ml-auto" />
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                ) : (
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={() => navigate("/join")}
                  >
                    Join Us!
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="cursor-pointer">
                      Services
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem
                          className="cursor-pointer font-medium p-4 rounded-xl"
                          onSelect={() => navigate("local-moving/compare")}
                        >
                          <div className="flex items-center gap-4 justify-between">
                            <CustomIcon icon={House} />
                            <div className="flex flex-col font-semibold">
                              Residential/Local Moving
                              <span className="font-extralight">
                                Compare now Residential/Local moving
                              </span>
                            </div>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer font-medium p-4 rounded-xl"
                          onSelect={() => navigate("/realtors/compare")}
                        >
                          <div className="flex items-center gap-4 justify-between">
                            <CustomIcon icon={UserRound} />
                            <div className="flex flex-col font-semibold">
                              Realtors
                              <span className="font-extralight">
                                Compare now Realtors
                              </span>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={() =>
                      window.open("https://blog.movingessential.com/", "_blank")
                    }
                  >
                    Blog
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => navigate("/faqs")}
                    className="cursor-pointer"
                  >
                    FAQs
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => navigate("/tips")}
                    className="cursor-pointer"
                  >
                    Tips & Tricks
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {!isAuthenticated && (
                  <DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => navigate("/login")}
                    >
                      Login
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => navigate("/register")}
                    >
                      Sign up
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <Sheet open={openNavigation} onOpenChange={setOpenNavigation}>
        <SheetTrigger />
        <SheetContent>
          <SheetHeader>
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>
          <div className="flex flex-col h-screen">
            <div>
              {isAuthenticated ? (
                <div className="p-2 md:p-6">
                  <p className="text-slate-500 mb-2">My account</p>
                  {navigation.profile.map((item) => (
                    <SidebarItems
                      key={item.label}
                      {...item}
                      href={`/${user?.user_metadata.role}/dashboard`}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-2 md:p-6">
                  <p className="text-slate-500 mb-2">Sign up</p>
                  {navigation.signup.map((item) => (
                    <SidebarItems key={item.label} {...item} />
                  ))}
                </div>
              )}
              <Separator />
              <div className="p-2 md:p-6">
                <p className="text-slate-500 mb-2">General</p>
                {navigation.main.map((item) => (
                  <SidebarItems key={item.label} {...item} />
                ))}
              </div>
            </div>
            <div>
              <div className="text-center p-6">
                {isAuthenticated ? (
                  <Button
                    orange
                    className="w-full"
                    onClick={() => {
                      toggleNavigation();
                      submitLogout();
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    orange
                    className="w-full"
                    onClick={() => {
                      toggleNavigation();
                      navigate("/login");
                    }}
                  >
                    Login
                  </Button>
                )}
              </div>
              <Separator />
              <footer className="mt-3 p-3 text-center">
                <p className="text-sm">{yeard}. All rights reserved</p>
              </footer>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Header;
