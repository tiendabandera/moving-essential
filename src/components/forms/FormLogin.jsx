import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AuthWithGoogle from "../AuthWithGoogle";
import ForgotPassword from "../ForgotPassword";

export default function FormLogin({ register, errors, loginErrors }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [showErrors, setShowErrors] = useState({
    email: false,
    password: false,
  });
  const handleFieldError = (fieldName) => {
    if (errors[fieldName]) {
      setShowErrors((prevState) => ({
        ...prevState,
        [fieldName]: true,
      }));
      setTimeout(() => {
        setShowErrors((prevState) => ({
          ...prevState,
          [fieldName]: false,
        }));
      }, 5000); // 5 segundos
    }
  };

  return (
    <>
      <div className=" bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
        <h1 className="text-3xl font-semibold">Welcome Back</h1>
        <p className="font-medium text-lg text-gray-500 mt-4">
          Welcome back! Please enter your details
        </p>
        <div className="mt-8">
          <div className="mt-2">
            {loginErrors.map((error, i) => (
              <div key={i} className="bg-red-500 p-2 text-white rounded-xl">
                {error}
              </div>
            ))}
          </div>
          <div className="mt-2">
            <label htmlFor="email" className="text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full border-2 border-gray-200 rounded-xl p-3 mt-1 bg-transparent"
              {...register("email", { required: true })}
              onBlur={() => handleFieldError("email")}
            />
            {showErrors.email && errors.email && (
              <span className="text-red-500 font-medium text-sm">
                Email is required
              </span>
            )}
          </div>
          <div className="mt-2">
            <label htmlFor="password" className="text-lg font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full border-2 border-gray-200 rounded-xl p-3 mt-1 bg-transparent"
              {...register("password", { required: true })}
              onBlur={() => handleFieldError("password")}
            />
            {showErrors.password && errors.password && (
              <span className="text-red-500 font-medium text-sm">
                Password is required
              </span>
            )}
          </div>
          <div className="mt-2 flex flex-row-reverse">
            <button
              type="button"
              className="font-medium text-base text-orange-600"
              onClick={() => setOpen(true)}
            >
              Forgot password ?
            </button>
          </div>
          <div className="mt-8 flex flex-col gap-y-4">
            <button
              className="active:scale-[.95] active:duration-75 hover:scale-[1.02] ease-in-out transition-all py-3 text-white bg-orange-500 rounded-xl"
              type="submit"
            >
              Sign in
            </button>
            <AuthWithGoogle title={"Sign in with Google"} />
          </div>
          <div className="mt-8 flex justify-center items-center gap-x-2">
            <span className="font-medium text-base">
              Don`t have an account ?
            </span>
            <button
              className="font-medium text-base text-orange-600"
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
      {open && <ForgotPassword isOpen={open} onClose={setOpen} />}
    </>
  );
}

FormLogin.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  loginErrors: PropTypes.array.isRequired,
};
