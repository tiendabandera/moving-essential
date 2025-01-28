import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const DashboardPage = () => {
  const { profile, userInfo } = useAuth();

  useEffect(() => {
    profile();
  }, []);

  if (!userInfo) {
    //console.log(userInfo);
    // Mostrar un indicador de carga si userInfo aún no está disponible
    return <div>Loading user information...</div>;
  }

  console.log(userInfo);

  return (
    <div>
      <h1>Welcome, {userInfo.name}!</h1>
      <p>Email: {userInfo.email}</p>
      {/* Agrega más contenido dependiendo de la información del usuario */}
    </div>
  );
};

export default DashboardPage;
