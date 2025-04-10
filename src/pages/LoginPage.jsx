import FormLogin from "../components/forms/FormLogin";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, isAuthenticated, errors: loginErrors, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const params = new URLSearchParams(window.location.search);
      const encodedRedirect = params.get("redirect");

      // Si existe, tratamos de decodificarlo con Base64
      if (encodedRedirect) {
        try {
          const redirectUrl = atob(encodedRedirect);
          // Si la URL decodificada es válida, redirigimos a ella
          window.location.href = redirectUrl;
        } catch (error) {
          console.error("Error al decodificar redirect:", error);
          // En caso de error, redirigimos al dashboard por defecto según el rol
          window.location.href = `/${user.user_metadata.role}/dashboard`;
        }
      } else {
        // Si no viene redirect, redireccionamos al dashboard según rol
        window.location.href = `/${user.user_metadata.role}/dashboard`;
      }
    }
  }, [isAuthenticated, user]);

  const onSubmit = handleSubmit(async (values) => {
    login(values);
  });

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <form onSubmit={onSubmit} className="w-11/12 max-w-[700px]">
          <FormLogin
            register={register}
            errors={errors}
            loginErrors={loginErrors}
          />
        </form>
      </div>
      <div className="hidden lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="w-3/5">
          <img
            src="https://static.wixstatic.com/media/02498f_f941359eb14b4e439d5cbedafd5fdddb~mv2.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
