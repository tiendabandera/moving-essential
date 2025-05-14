import { useEffect, useState } from "react";

const Input = ({
  id,
  name,
  label,
  type,
  className,
  readOnly,
  placeholder,
  register,
  required,
  errors,
  onChange,
  validations,
  onFocus,
  isSubmitting,
  autoComplete = "on",
}) => {
  const classes = `flex h-9 w-full rounded-md border border-slate-200 
  px-3 py-1 text-base shadow-xs transition-colors 
  file:border-0 file:bg-transparent file:text-sm file:font-medium 
  file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-hidden 
  focus-visible:ring-1 focus-visible:ring-slate-950 
  disabled:cursor-not-allowed 
  disabled:opacity-50 md:text-sm ${className || ""} ${
    readOnly ? "cursor-not-allowed bg-slate-400/20" : "bg-transparent"
  }`;

  /* const handleError = (errors) => {
    const error =
      errors?.[name] ||
      errors?.company?.[name.split(".")[1]] ||
      errors?.service?.[name.split(".")[1]];

    return error?.message || `${label} is required`;
  }; */

  const [error, setError] = useState(null);

  const handleError = (errors) => {
    const error =
      errors?.[name] ||
      name.split(".").reduce((acc, key) => acc?.[key], errors);

    if (error) return error?.message || `${label} is required`;

    return null;
  };

  useEffect(() => {
    setError(null);

    if (Object.keys(errors).length > 0) {
      const text = handleError(errors);
      setError(text);
      return;
    }
  }, [errors, isSubmitting]);

  return (
    <div>
      <input
        id={id}
        name={name} // Identificador del campo
        autoComplete={autoComplete}
        type={type ?? "text"}
        placeholder={placeholder ?? ""}
        className={classes}
        readOnly={readOnly}
        {...(register ? register(name, { required, ...validations }) : {})}
        onChange={onChange}
        onFocus={onFocus}
      />
      {/* {(errors?.[name] ||
        errors?.company?.[name.split(".")[1]] ||
        errors?.service?.[name.split(".")[1]]) && (
        <span className="text-red-500 text-xs font-semibold">
          {handleError(errors)}
        </span>
      )} */}
      {isSubmitting !== undefined && error ? (
        <span className="text-red-500 text-xs font-semibold">{error}</span>
      ) : (
        (errors?.[name] ||
          errors?.company?.[name.split(".")[1]] ||
          errors?.service?.[name.split(".")[1]]) && (
          <span className="text-red-500 text-xs font-semibold">
            {handleError(errors)}
          </span>
        )
      )}
    </div>
  );
};

export default Input;
