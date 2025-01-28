import { ChevronDown } from "lucide-react";

const Select = ({
  id,
  name,
  options,
  className,
  readOnly,
  placeholder,
  register,
  required,
  errors,
}) => {
  const classes = `option-hover appearance-none h-9 w-full rounded-md border border-slate-200 px-3 
  py-1 text-base md:text-sm shadow-sm transition-colors placeholder:text-slate-500 
  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 
  ${className || ""}
  ${readOnly ? "pointer-events-none bg-slate-400/20" : "bg-transparent"}`;

  return (
    <div className="relative w-full">
      <select
        name={name}
        id={id}
        aria-placeholder={placeholder}
        className={classes}
        defaultValue=""
        {...(register ? register(name, { required }) : {})}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        strokeWidth={1}
        className="absolute top-2 right-2 w-5 h-5"
        color="#000000"
      />
    </div>
  );
};

export default Select;
