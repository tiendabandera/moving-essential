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

import {
  CircleUser,
  House,
  Menu,
  Power,
  User,
  UserRound,
  X,
} from "lucide-react";
import CustomIcon from "./design/CustomIcon";

import { Separator } from "./ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openNavigation, setOpenNavigation] = useState(false);

  const { isAuthenticated, logout, user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

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
      <div className="pt-[4.75rem] lg:pt-[6.25rem] overflow-hidden">
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
            <nav
              className={`${
                openNavigation ? "flex flex-col items-center pt-8" : "hidden"
              } fixed top-[4.53rem] left-0 right-0 bottom-0 bg-gray-100 sm:hidden`}
            >
              <div className="w-full relative z-2 flex flex-col items-center justify-center px-8 gap-6 font-medium">
                <div className="w-full flex flex-col items-center justify-center gap-4">
                  <Link className="w-full py-2">
                    <div className="flex gap-4 items-center">
                      <CircleUser className="size-6" strokeWidth={1.5} />
                      <p>Profile</p>
                    </div>
                  </Link>
                </div>
                <Separator className="bg-gray-400" />
                <div className="w-full flex flex-col items-center justify-center gap-2">
                  <Link className="w-full py-2">Services</Link>
                  <Link className="w-full py-2">Blog</Link>
                  <Link className="w-full py-2">FAQs</Link>
                  <Link className="w-full py-2">Tips & Tricks</Link>
                </div>
                <Separator className="bg-gray-400" />
                <div className="w-full flex flex-col items-center justify-center gap-4 pt-4">
                  {isAuthenticated ? (
                    <Button
                      className="w-full text-center text-red-600 p-4 rounded-lg ring-1 ring-red-600 bg-transparent"
                      onClick={() => {
                        toggleNavigation();
                        submitLogout();
                      }}
                    >
                      Sign out
                    </Button>
                  ) : (
                    <div className="w-full flex flex-col gap-2">
                      <Link
                        className="w-full text-center p-2 rounded-lg ring-1 ring-black"
                        to={"/login"}
                      >
                        Login
                      </Link>
                      <Link
                        className="w-full text-center p-2 rounded-lg ring-1 ring-black"
                        to={"/register"}
                      >
                        Sign up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </nav>
            <div className="cursor-pointer flex items-center gap-3 ml-auto bg-white rounded-full px-3 py-2 ring-1 ring-white relative">
              <div
                className="hidden sm:block rounded-full absolute top-0 left-0 w-full h-full"
                onClick={() => setOpen((prev) => !prev)}
              ></div>
              <div
                className="block sm:hidden rounded-full absolute top-0 left-0 w-full h-full"
                onClick={toggleNavigation}
              ></div>
              {/* <Menu className="size-5" /> */}
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
                src={user?.profile_picture || "/assets/img/user-not-found.png"}
                className="size-7 rounded-full"
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
                  <DropdownMenuItem className="cursor-pointer">
                    Blog
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    FAQs
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
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
    </>
  );

  // return (
  //   <header className={`pt-[4.65rem] lg:pt-[4rem] overflow-hidden`}>
  //     <div
  //       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
  //         scrolled ? "bg-color-1/90 backdrop-blur-xs" : "bg-color-1"
  //       }`}
  //     >
  //       <div className="flex items-center py-2 px-5 lg:px-7">
  //         <Link className="block w-[12rem] xl:mr-8" to="/">
  //           <img
  //             src="/assets/img/logo-blanco.png"
  //             width={50}
  //             height={50}
  //             alt="Moving Essential"
  //           />
  //         </Link>
  //         <div className="cursor-pointer flex items-center gap-3 ml-auto bg-white rounded-full px-3 py-2 ring-1 ring-white relative">
  //           <div
  //             className="hidden sm:block bg-black/50 rounded-full absolute top-0 left-0 w-full h-full"
  //             onClick={() => setOpen((prev) => !prev)}
  //           ></div>
  //           <div
  //             className="block sm:hidden bg-red-600/50 rounded-full absolute top-0 left-0 w-full h-full"
  //             onClick={toggleNavigation}
  //           ></div>
  //           <Menu className="size-5" />
  //           <img
  //             src={user?.profile_picture || "/assets/img/user-not-found.png"}
  //             className="size-7 rounded-full"
  //           />
  //         </div>
  //         <nav
  //           className={`${
  //             openNavigation ? "flex" : "hidden"
  //           } fixed top-[4.55rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent z-100`}
  //         >
  //           <div className="absolute inset-0 pointer-events-none lg:hidden">
  //             <div className="absolute inset-0 opacity-[.03]">
  //               <img
  //                 className="w-full h-full object-cover"
  //                 src="https://static.wixstatic.com/media/6cac47_e1b2ef37b22241878a44a64fbf6962c4~mv2.png"
  //                 width={688}
  //                 height={953}
  //                 alt="Background"
  //               />
  //             </div>
  //           </div>
  //         </nav>
  //         <DropdownMenu open={open} onOpenChange={setOpen}>
  //           {/* <DropdownMenuTrigger asChild>
  //             <div className="cursor-pointer flex items-center gap-3 ml-auto bg-white rounded-full px-3 py-2 ring-1 ring-white">
  //               <Menu className="size-5" />
  //               <img
  //                 src={
  //                   user?.profile_picture || "/assets/img/user-not-found.png"
  //                 }
  //                 className="size-7 rounded-full"
  //               />
  //             </div>
  //           </DropdownMenuTrigger> */}
  //           <DropdownMenuTrigger />

  //           <DropdownMenuContent className="font-normal w-56 mt-5 mr-5 lg:mr-7">
  //             {isAuthenticated ? (
  //               <DropdownMenuGroup>
  //                 <DropdownMenuItem
  //                   className="cursor-pointer"
  //                   onSelect={() =>
  //                     navigate(`/${user.user_metadata.role}/dashboard`)
  //                   }
  //                 >
  //                   Profile
  //                 </DropdownMenuItem>
  //                 <DropdownMenuItem
  //                   className="cursor-pointer text-red-600 hover:!text-red-600"
  //                   onSelect={submitLogout}
  //                 >
  //                   Sign out
  //                   <Power strokeWidth={2} className="size-4 ml-auto" />
  //                 </DropdownMenuItem>
  //               </DropdownMenuGroup>
  //             ) : (
  //               <DropdownMenuItem
  //                 className="cursor-pointer"
  //                 onSelect={() => navigate("/join")}
  //               >
  //                 Join Us!
  //               </DropdownMenuItem>
  //             )}
  //             <DropdownMenuSeparator />
  //             <DropdownMenuGroup>
  //               <DropdownMenuSub>
  //                 <DropdownMenuSubTrigger className="cursor-pointer">
  //                   Services
  //                 </DropdownMenuSubTrigger>
  //                 <DropdownMenuPortal>
  //                   <DropdownMenuSubContent>
  //                     <DropdownMenuItem
  //                       className="cursor-pointer font-medium p-4 rounded-xl"
  //                       onSelect={() => navigate("local-moving/compare")}
  //                     >
  //                       <div className="flex items-center gap-4 justify-between">
  //                         <CustomIcon icon={House} />
  //                         <div className="flex flex-col font-semibold">
  //                           Residential/Local Moving
  //                           <span className="font-extralight">
  //                             Compare now Residential/Local moving
  //                           </span>
  //                         </div>
  //                       </div>
  //                     </DropdownMenuItem>
  //                     <DropdownMenuItem
  //                       className="cursor-pointer font-medium p-4 rounded-xl"
  //                       onSelect={() => navigate("/realtors/compare")}
  //                     >
  //                       <div className="flex items-center gap-4 justify-between">
  //                         <CustomIcon icon={UserRound} />
  //                         <div className="flex flex-col font-semibold">
  //                           Realtors
  //                           <span className="font-extralight">
  //                             Compare now Realtors
  //                           </span>
  //                         </div>
  //                       </div>
  //                     </DropdownMenuItem>
  //                   </DropdownMenuSubContent>
  //                 </DropdownMenuPortal>
  //               </DropdownMenuSub>
  //               <DropdownMenuItem className="cursor-pointer">
  //                 Blog
  //               </DropdownMenuItem>
  //               <DropdownMenuItem className="cursor-pointer">
  //                 FAQs
  //               </DropdownMenuItem>
  //               <DropdownMenuItem className="cursor-pointer">
  //                 Tips & Tricks
  //               </DropdownMenuItem>
  //             </DropdownMenuGroup>
  //             {!isAuthenticated && (
  //               <DropdownMenuGroup>
  //                 <DropdownMenuSeparator />
  //                 <DropdownMenuItem
  //                   className="cursor-pointer"
  //                   onSelect={() => navigate("/login")}
  //                 >
  //                   Login
  //                 </DropdownMenuItem>
  //                 <DropdownMenuItem
  //                   className="cursor-pointer"
  //                   onSelect={() => navigate("/register")}
  //                 >
  //                   Sign up
  //                 </DropdownMenuItem>
  //               </DropdownMenuGroup>
  //             )}
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       </div>
  //     </div>
  //   </header>
  // );
}

export default Header;
