import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  const link =
    "https://static.wixstatic.com/media/6cac47_e1b2ef37b22241878a44a64fbf6962c4~mv2.png";

  return (
    <div
      className="min-h-20 h-20 flex items-center px-6 border-b cursor-pointer gap-x-2"
      onClick={() => navigate("/")}
    >
      <img src={link} alt="Moving Essential" className="w-7 h-7" />
      <h1 className="text-xl font-bold">Moving Essential</h1>
    </div>
  );
};

export default Logo;
