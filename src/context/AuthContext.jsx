import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../api/auth";
import { Company } from "./CompanyContext";
import { User } from "./UserContext";
//import Cookies from "js-cookie";
import { decodeJWT } from "@/constants";
import { toast } from "@/hooks/use-toast";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [userInfo, setUserInfo] = useState(null);
  const [optionActiveCompany, setOptionActiveCompany] = useState(false); // Opciones del nav de company
  const [uploading, setUploading] = useState([]);
  const [errorToast, setErrorToast] = useState(null);

  /* INSTANCES
  _________________________________________ */
  const createCompanyInstance = (data) => {
    if (!data) {
      console.error("No data provided for Company instance");
      return null;
    }
    return new Company(data, setErrorToast);
  };

  const createUserInstance = (data) => {
    if (!data) {
      console.error("No data provided for User instance");
      return null;
    }
    return new User(data);
  };

  /* FUNCTIONS
  _________________________________________ */

  const signIn = async (data) => {
    const user = new User({ ...data, role: "user" });
    const res = await user.create();

    if (res.error) {
      setError([res.error]);
      return;
    }

    const resAuth = await user.login();
    setUser(resAuth.data.user);
    setIsAuthenticated(true);
  };

  const login = async (data) => {
    try {
      const user = new User(data);
      const res = await user.login();
      if (res.error) {
        setError([res.error.message]);
        return;
      }

      const jwt = res.data.session.access_token;
      const decoded = decodeJWT(jwt);

      setUser({
        ...res.data.session.user,
        user_metadata: {
          ...res.data.session.user.user_metadata,
          profile_picture:
            decoded.profile_picture ||
            res.data.session.user.user_metadata.profile_picture,
        },
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    /* try {
      await logoutRequest();
      setIsAuthenticated(false);
      setUser(null);
      localStorage.clear();
    } catch (error) {
      setError(error.response.data.message);
    } */
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
  };

  const signupCompany = async (data) => {
    const { name, email, password, company, service, images } = data;

    const userInstance = new User({
      name,
      email,
      password,
      role: "company",
      company_name: company.company_name,
      realtor_name: company.business_type_id === 2 ? name : null,
    });

    // CREATE USER
    const resUser = await userInstance.create();

    if (resUser.error) {
      setError([resUser.error]);
      return;
    }

    // UPLOAD IMAGE
    const setupUpload = {
      countImages: company.business_type_id === 1 ? 6 : 7,
      bucketName:
        company.business_type_id === 1 ? "company_images" : "realtor_images",
    };

    //const countImages = company.business_type_id === 1 ? 6 : 7;
    const resImages = [];

    for (let i = 1; i <= setupUpload.countImages; i++) {
      if (!images[`img_${i}`]) continue;

      const image = images[`img_${i}`];
      const res = await uploadImages(
        `${resUser.id}/img_${i}`,
        image,
        setupUpload.bucketName
      );

      if (res) resImages.push(res);
    }

    if (resImages.length > 0) company[`images`] = resImages;

    // CREATE COMPANY
    const companyInstance = new Company({
      ...company,
      user_id: resUser.id,
      email: email,
    });

    const resCompany = await companyInstance.create();

    if (!resCompany.data && resCompany.error) {
      setError([resCompany.error.message]);
      return;
    }

    // CREATE SERVICE (LOCAL MOVING OR REALTOR)
    await companyInstance.createService(company.business_type_id, {
      ...service,
      company_id: resCompany.data[0].id,
    });

    // LOGIN
    login({ email, password });
  };

  const profile = async () => {
    const { error, data } = await createUserInstance(user).getUser();

    if (data && !error) {
      const userInfo = {
        name: data.user.user_metadata.name,
        email: data.user.email,
      };

      if (user.user_metadata.role === "company") {
        const data = await createCompanyInstance(user).getInfo();
        if (data) {
          userInfo.company = data.companyInfo;
          userInfo.service = data.serviceInfo;
        }
      }

      setUserInfo(userInfo);

      return userInfo;
    } else {
      localStorage.clear();
      setIsAuthenticated(false);
      setUser(null);

      return null;
    }
  };

  const getZipcodes = async (value) => {
    const { data } = await supabase
      .from("cities")
      .select("*")
      .or(`zipcodes.cs.{${value}}, zipcodes_text.ilike.${value}%`)
      .limit(10);
    return data;
  };

  const getZipcodesByCity = async (value) => {
    const { data } = await supabase
      .from("cities")
      .select("*")
      .ilike("name", `${value}%`)
      .limit(10);
    return data;
  };

  const uploadImages = async (fileName, fileData, bucketName) => {
    setUploading((prev) => [...prev, fileData.id]);

    const res = await supabase.storage
      .from(bucketName)
      .upload(fileName, fileData.file, {
        upsert: true,
        cacheControl: "3600",
      });

    if (res.error) {
      setError([res.error.message]);
      return false;
    }

    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(res.data.path);

    setUploading((prev) => prev.filter((id) => id !== fileData.id));

    const updatedUrl = `${data.publicUrl}?t=${Date.now()}`;
    return updatedUrl;
  };

  /* HOOKS
  _________________________________________ */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        /* const res = await supabase.auth.getUser(); // Espera que se resuelva la promesa

        if (res.data.user) {
          setUser(res.data.user);
          setIsAuthenticated(true);
        } */
        const session = await supabase.auth.getSession();

        if (session.data.session && session.data.session.user) {
          const jwt = session.data.session.access_token;
          const decoded = decodeJWT(jwt);

          setUser({
            ...session.data.session.user,
            user_metadata: {
              ...session.data.session.user.user_metadata,
              profile_picture:
                decoded.profile_picture ||
                session.data.session.user.user_metadata.profile_picture,
              role: decoded.user_role,
            },
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setError([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    if (errorToast) {
      toast({
        title: "Error",
        description: errorToast,
        variant: "destructive",
      });
    }
  }, [errorToast]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        login,
        user,
        setUser,
        isAuthenticated,
        isLoading,
        errors,
        logout,
        signupCompany,
        profile,
        userInfo,
        setUserInfo,
        createCompanyInstance,
        createUserInstance,
        optionActiveCompany,
        setOptionActiveCompany,
        getZipcodes,
        getZipcodesByCity,
        uploadImages,
        uploading,
        setUploading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
