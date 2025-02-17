import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useController } from "react-hook-form";

const Select = ({
  id,
  label,
  name,
  options,
  className,
  readOnly,
  placeholder,
  control,
}) => {
  const classes = `cursor-pointer text-left flex items-center justify-between option-hover appearance-none h-9 w-full rounded-md border border-slate-200 px-3 
  py-1 text-base md:text-sm shadow-xs transition-colors placeholder:text-slate-500 
  focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-slate-950 
  ${className || ""}
  ${readOnly ? "pointer-events-none bg-slate-400/20" : "bg-transparent"}`;

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: `${label} is required` },
  });

  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    if (options.length === 0) {
      onChange(null, { shouldValidate: true });
    }
  }, [options, onChange]);

  return (
    <div className="relative w-full">
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={classes}
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          strokeWidth={1}
          color="#000000"
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer text-sm ${
                  option.value === value
                    ? "bg-blue-50 text-color-1"
                    : "text-gray-900 hover:bg-blue-50 hover:text-color-1"
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && (
        <span className="text-red-500 text-xs font-semibold">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default Select;
