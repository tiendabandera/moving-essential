import Logo from "./desing/Logo";
import SidebarRoutesCompany from "./SidebarRoutesCompany";

const SidebarCompany = () => {
  return (
    <div className="h-screen">
      <div className="h-full flex flex-col border-r">
        <Logo />
        <SidebarRoutesCompany />
      </div>
    </div>
  );
};

export default SidebarCompany;
