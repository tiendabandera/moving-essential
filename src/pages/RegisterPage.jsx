import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import FormRegister from "../components/forms/FormRegister";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, isAuthenticated, errors: registerErrors, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate(`/${user.user_metadata.role}/dashboard`);
    //if (isAuthenticated) console.log(user.user_metadata.role);
    //console.log(user);
  }, [isAuthenticated, navigate, user]);

  const onSubmit = handleSubmit(async (values) => {
    signIn(values);
  });

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <form onSubmit={onSubmit} className="w-11/12 max-w-[700px]">
          <FormRegister
            register={register}
            errors={errors}
            registerErrors={registerErrors}
          />
        </form>
      </div>
      <div className="hidden lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="w-3/5">
          <img
            src="https://static.wixstatic.com/media/02498f_7d51d987d2d6499697fcf17352d8602e~mv2.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
