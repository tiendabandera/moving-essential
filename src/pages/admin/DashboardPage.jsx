import { useOutletContext } from "react-router-dom";

const DashboardPage = () => {
  const { userInfo } = useOutletContext();

  return <div>DashboardPage</div>;
};

export default DashboardPage;
