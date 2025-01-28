import { useState } from "react";
import PropTypes from "prop-types";
import { SlArrowDown } from "react-icons/sl";

export default function FormJoin({ register, errors, registerErrors }) {
  const [showErrors, setShowErrors] = useState({
    name: false,
    company_name: null,
    email: false,
    password: false,
    phone: false,
    business_type_id: false,
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
    <div className=" bg-white px-10 py-5 rounded-3xl border-2 border-gray-100">
      <div className="mt-8">
        <div className="mt-2">
          {registerErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white rounded-xl mb-1">
              {error}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-2">
          <div className="">
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
          <div className="">
            <label htmlFor="name" className="text-lg font-medium">
              Company name
            </label>
            <input
              id="company_name"
              placeholder="Enter your company name"
              className="w-full border-2 border-gray-200 rounded-xl p-3 mt-1 bg-transparent"
              {...register("company_name")}
              onBlur={() =>
                handleFieldError("company_name", { required: true })
              }
            />
            {showErrors.company_name && errors.company_name && (
              <span className="text-red-500 font-medium text-sm">
                Company name is required
              </span>
            )}
          </div>
          <div className="">
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
          <div className="">
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
          <div className="">
            <label htmlFor="password" className="text-lg font-medium">
              Phone
            </label>
            <input
              type="number"
              id="phone"
              placeholder="Enter your phone"
              className="w-full border-2 border-gray-200 rounded-xl p-3 mt-1 bg-transparent"
              {...register("phone", { required: true })}
              onBlur={() => handleFieldError("phone")}
            />
            {showErrors.phone && errors.phone && (
              <span className="text-red-500 font-medium text-sm">
                Phone is required
              </span>
            )}
          </div>
          <div>
            <label htmlFor="business_type_id" className="text-lg font-medium">
              Business type
            </label>
            <div className="grid grid-cols-1 mt-1">
              <select
                id="business_type_id"
                name="business_type_id"
                placeholder="Select your business type"
                className="appearance-none col-start-1 row-start-1 border-2 border-gray-200 rounded-xl p-3 bg-transparent"
                {...register("business_type_id", { required: true })}
              >
                <option value={1}>Residential/Local Moving</option>
                <option value={2}>Real Estate</option>
              </select>
              <SlArrowDown
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </div>
            {showErrors.business_type_id && errors.business_type_id && (
              <span className="text-red-500 font-medium text-sm">
                Business type is required
              </span>
            )}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            className="active:scale-[.95] active:duration-75 hover:scale-[1.02] ease-in-out transition-all py-3 text-white bg-color-1 rounded-xl"
            type="submit"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

FormJoin.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  registerErrors: PropTypes.array.isRequired,
};
