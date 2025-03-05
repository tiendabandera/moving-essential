import { Link, useNavigate } from "react-router-dom";
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

import { House, Menu, Power, UserRound } from "lucide-react";
import CustomIcon from "./design/CustomIcon";

function Header() {
  const [scrolled, setScrolled] = useState(false);

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
  const { isAuthenticated, logout, user } = useAuth();
  const submitLogout = () => logout();
  const navigate = useNavigate();

  return (
    <header className={`pt-[4.65rem] lg:pt-[4rem] overflow-hidden`}>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-color-1/90 backdrop-blur-xs" : "bg-color-1"
        }`}
      >
        <div className="flex items-center py-2 px-5 lg:px-7">
          <Link className="block w-[12rem] xl:mr-8" to="/">
            <img
              src="/assets/img/logo-blanco.png"
              width={50}
              height={50}
              alt="Moving Essential"
            />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer flex items-center gap-3 ml-auto bg-white rounded-full px-3 py-2 ring-1 ring-white">
                <Menu className="size-5" />
                <img
                  src={
                    user?.profile_picture || "/assets/img/user-not-found.png"
                  }
                  className="size-7 rounded-full"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-normal w-56 mr-5 lg:mr-7">
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
    </header>
  );
}

export default Header;
