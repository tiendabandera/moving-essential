import { useEffect, useState } from "react";
import { profileRequest } from "../api/auth";
import { useAuth } from "../context/AuthContext";

//const res = await profileRequest();
const ProfilePage = () => {
  const { profile } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log("Fetching user profile...");
        const res = await profileRequest();
        console.log("Profile data received:", res.data);
        setUser(res.data); // Guarda los datos del usuario en el estado
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false); // Indica que la carga terminó
      }
    };

    fetchUserProfile();
  }, [profile, setUser, setIsLoading]);

  return <div>ProfilePage</div>;
};

export default ProfilePage;
