import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarItems = ({ label, icon: Icon, href, options }) => {
  const location = useLocation();
  const activePath = options ? false : location.pathname === href;

  const [optionActive, setOptionActive] = useState(false);
  //const [activePath, setActivePath] = useState(location.pathname === href);

  useEffect(() => {
    setOptionActive(
      options && options.some((option) => option.href === location.pathname)
    ); // Cambia el estado para cerrar cualquier div con opciones
  }, [location.pathname, options]);

  return !options ? (
    <Link
      to={href}
      onClick={() => {
        setOptionActive(false); // Cambia el estado para cerrar cualquier div con opciones
      }}
      className={cn(
        `flex gap-x-2 mt-2 text-sm items-center hover:bg-slate-300/20 p-2 rounded-lg cursor-pointer`,
        activePath && "bg-slate-400/20"
      )}
    >
      <Icon strokeWidth={1} className="w-5 h-5" />
      {label}
    </Link>
  ) : (
    <div>
      <Link
        onClick={() => setOptionActive(!optionActive)}
        className={cn(
          `flex mt-2 justify-between text-sm  p-2 rounded-t-lg cursor-pointer`,
          optionActive
            ? "bg-slate-300/20 hover:rounded-t-lg"
            : "hover:bg-slate-300/20 hover:rounded-lg"
        )}
      >
        <div className="flex gap-x-2 items-center">
          <Icon strokeWidth={1} className="w-5 h-5" />
          {label}
        </div>
        <div>
          {optionActive ? (
            <ChevronDown strokeWidth={1} className="w-5 h-5" />
          ) : (
            <ChevronRight strokeWidth={1} className="w-5 h-5" />
          )}
        </div>
      </Link>
      <div
        className={cn(
          `"hidden flex-col bg-slate-300/20 rounded-b-lg"`,
          optionActive ? "flex" : "hidden"
        )}
      >
        {options.map((option) => (
          <Link
            key={option.label}
            to={option.href}
            className={cn(
              `flex gap-x-2 pl-28 text-sm hover:bg-slate-300/20 p-2 cursor-pointer`,
              location.pathname === option.href && "bg-slate-400/20"
            )}
          >
            <div className="w-5 h-5"></div>
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarItems;
