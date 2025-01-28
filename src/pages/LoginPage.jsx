import FormLogin from "../components/forms/FormLogin";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, isAuthenticated, errors: loginErrors, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate(`/${user.user_metadata.role}/dashboard`);
  }, [isAuthenticated, navigate, user]);

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
