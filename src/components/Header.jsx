import ButtonGradient from "../assets/svg/ButtonGradiant";

import Button from "./Button";
import { navigation, roles } from "../constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HamburgerMenu } from "./design/Header";
import MenuSvg from "../assets/svg/MenuSvg";
import { useAuth } from "../context/AuthContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button as ButtonShadcn } from "./ui/button";
import { ChevronDown } from "lucide-react";
import CustomIcon from "./design/CustomIcon";

function Header() {
  const pathname = useLocation().pathname;
  const [openNavigation, setOpenNavigation] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  const toggleNavigation = () => setOpenNavigation(!openNavigation);
  const submitLogout = () => logout();

  const navigate = useNavigate();

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[6.25rem] overflow-hidden">
        <div
          className={`fixed top-0 left-0 w-full z-50 border-b border-n-6  lg:bg-n-8/90 lg:backdrop-blur-xs ${
            openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-xs"
          }`}
        >
          <div className="flex items-center py-2 px-5 lg:px-7 ">
            <Link className="block w-[12rem] xl:mr-8" to="/">
              <img
                src="https://static.wixstatic.com/media/6cac47_e1b2ef37b22241878a44a64fbf6962c4~mv2.png"
                width={50}
                height={50}
                alt="Moving Essential"
              />
            </Link>
            {
              <nav
                className={`${
                  openNavigation ? "flex" : "hidden"
                } fixed top-[4.55rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
              >
                <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
                  {navigation
                    .filter((item) => {
                      if (isAuthenticated) return item.visibleIsAuthenticated;
                      return item;
                    })
                    .map((item) =>
                      item.options ? (
                        /* <Link
                          to={item.url}
                          key={item.id}
                          className={`block relative text-2xl uppercase text-n-1 px-4 py-2 transition-colors hover:text-color-1 ${
                            item.onlyMobile ? "lg:hidden" : ""
                          } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                            item.url === pathname
                              ? "z-2 lg:text-color-1"
                              : "lg:text-n-1"
                          } lg:leading-5 xl:px-12`}
                        >
                          {item.title}
                        </Link> */
                        <DropdownMenu key={item.id}>
                          <DropdownMenuTrigger asChild>
                            <ButtonShadcn
                              variant="ghost"
                              className={`text-white text-2xl font-light mb-4 lg:mb-0 lg:font-semibold lg:text-xs hover:bg-transparent uppercase hover:text-color-1 active:outline-none ${
                                item.onlyMobile ? "lg:hidden" : ""
                              }`}
                            >
                              {item.title}
                              <ChevronDown className="h-4 w-4" />
                            </ButtonShadcn>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="p-4 rounded-2xl">
                            {item.options.map((option) => (
                              <DropdownMenuItem
                                key={option.id}
                                className="cursor-pointer font-medium p-4 rounded-xl"
                                onSelect={() => navigate(option.url)}
                              >
                                <div className="flex items-center gap-4 justify-between">
                                  <CustomIcon icon={option.icon} />
                                  <div className="flex flex-col font-semibold">
                                    {option.title}
                                    <span className="font-extralight">
                                      {option.description}
                                    </span>
                                  </div>
                                </div>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <Link
                          to={item.url}
                          key={item.id}
                          className={`block relative text-2xl uppercase text-n-1 px-4 py-2 transition-colors hover:text-color-1 ${
                            item.onlyMobile ? "lg:hidden" : ""
                          } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                            item.url === pathname
                              ? "z-2 lg:text-color-1"
                              : "lg:text-n-1"
                          } lg:leading-5 xl:px-12`}
                        >
                          {item.title}
                        </Link>
                      )
                    )}
                  {isAuthenticated && (
                    <>
                      <a
                        href={`/${user.user_metadata.role}/dashboard`}
                        className="block relative text-2xl uppercase text-n-1 px-6 py-6 transition-colors hover:text-color-1 lg:hidden md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold"
                      >
                        Profile
                      </a>
                    </>
                  )}
                </div>
                <HamburgerMenu />
              </nav>
            }
            {isAuthenticated ? (
              <>
                <Link
                  to={`/${user.user_metadata.role}/dashboard`}
                  className="hidden mr-8 text-xs font-semibold text-n-1 uppercase transition-colors hover:text-color-1 lg:block"
                >
                  Wellcome{" "}
                  {user.user_metadata.role === roles.company
                    ? user.user_metadata.realtor_name ||
                      user.user_metadata.company_name
                    : user.user_metadata.name}
                </Link>
                <div className="hidden lg:flex">
                  <Button onClick={submitLogout}>Logout</Button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to={"/join"}
                  className={`hidden mr-8 text-xs font-semibold ${
                    pathname === "/join" ? "text-color-1" : "text-n-1"
                  }  uppercase transition-colors hover:text-color-1 lg:block`}
                >
                  Join Us
                </Link>
                <div className="hidden lg:flex">
                  <Button href="/login">Login</Button>
                </div>
              </>
            )}

            <Button
              className="ml-auto lg:hidden"
              px="px-3"
              onClick={toggleNavigation}
            >
              <MenuSvg openNavigation={openNavigation} />
            </Button>
          </div>
        </div>
      </div>
      <ButtonGradient />
    </>
  );
}

export default Header;
