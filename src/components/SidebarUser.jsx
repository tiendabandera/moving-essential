import Logo from "./design/Logo";
import SidebarRoutesUser from "./SidebarRoutesUser";

const SidebarUser = () => {
  return (
    <div className="h-screen">
      <div className="h-full flex flex-col border-r">
        <Logo />
        <SidebarRoutesUser />
      </div>
    </div>
  );
};

export default SidebarUser;
