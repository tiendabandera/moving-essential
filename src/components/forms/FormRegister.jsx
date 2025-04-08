import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AuthWithGoogle from "../AuthWithGoogle";

export default function FormRegister({ register, errors, registerErrors }) {
  const navigate = useNavigate();

  const [showErrors, setShowErrors] = useState({
    name: false,
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
    <div className=" bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
      <p className="h4 font-medium text-gray-700 mt-4">Welcome to</p>
      <h1 className="h1 font-semibold text-color-1">Moving Essential</h1>
      <div className="mt-8">
        <div className="mt-2">
          {registerErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white rounded-xl">
              {error}
            </div>
          ))}
        </div>
        <div className="mt-2">
          <label htmlFor="name" className="text-lg font-medium">
            Full name
          </label>
          <input
            id="name"
            placeholder="Enter your full name"
            className="w-full border-2 border-gray-200 rounded-xl p-3 mt-1 bg-transparent"
            {...register("name", { required: true })}
            onBlur={() => handleFieldError("name")}
          />
          {showErrors.name && errors.name && (
            <span className="text-red-500 font-medium text-sm">
              Name is required
            </span>
          )}
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
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            className="active:scale-[.95] active:duration-75 hover:scale-[1.02] ease-in-out transition-all py-3 text-white bg-color-1 rounded-xl"
            type="submit"
          >
            Sign up
          </button>
          <AuthWithGoogle title={"Sign up whith Google"} />
        </div>
        <div className="mt-8 flex justify-center items-center gap-x-2">
          <span className="font-medium text-base">
            I already have an account
          </span>
          <button
            className="font-medium text-base text-color-1"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

FormRegister.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  registerErrors: PropTypes.array.isRequired,
};
