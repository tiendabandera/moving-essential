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
}) => {
  const classes = `flex h-9 w-full rounded-md border border-slate-200 
  px-3 py-1 text-base shadow-sm transition-colors 
  file:border-0 file:bg-transparent file:text-sm file:font-medium 
  file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none 
  focus-visible:ring-1 focus-visible:ring-slate-950 
  disabled:cursor-not-allowed 
  disabled:opacity-50 md:text-sm ${className || ""} ${
    readOnly ? "cursor-not-allowed bg-slate-400/20" : "bg-transparent"
  }`;

  const handleError = (errors) => {
    const error =
      errors?.[name] ||
      errors?.company?.[name.split(".")[1]] ||
      errors?.service?.[name.split(".")[1]];

    return error?.message || `${label} is required`;
  };

  return (
    <div>
      <input
        id={id}
        name={name} // Identificador del campo
        type={type ?? "text"}
        placeholder={placeholder ?? ""}
        className={classes}
        readOnly={readOnly}
        {...(register ? register(name, { required, ...validations }) : {})}
        onChange={onChange}
      />
      {(errors?.[name] ||
        errors?.company?.[name.split(".")[1]] ||
        errors?.service?.[name.split(".")[1]]) && (
        <span className="text-red-500 text-xs font-semibold">
          {handleError(errors)}
        </span>
      )}
    </div>
  );
};

export default Input;
