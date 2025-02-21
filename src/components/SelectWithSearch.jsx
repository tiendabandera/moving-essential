import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useController, useForm } from "react-hook-form";

const SelectWithSearch = ({
  id,
  label,
  name,
  options,
  className,
  readOnly,
  placeholder,
  control = null,
  onOptionChange, // Nueva prop opcional
}) => {
  const classes = `w-full h-9 bg-white border border-slate-200 rounded-md shadow-xs ${
    className || ""
  } ${readOnly ? "pointer-events-none bg-slate-400/20" : "bg-transparent"}`;

  /* const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: `${label} is required` },
  }); */

  // Si no se pasa un control, creamos uno interno con useForm.
  // Así siempre tendremos un control válido para useController.
  const internalForm = useForm({ defaultValues: { [name]: "" } });
  const effectiveControl = control || internalForm.control;

  // useController se llama siempre con un control válido.
  const { field, fieldState } = useController({
    name,
    control: effectiveControl,
    rules: { required: `${label} is required` },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === field.value);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputClick = () => {
    setIsOpen(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleOptionClick = (optionValue) => {
    field.onChange(optionValue); // Se actualiza el valor usando field.onChange (ya sea el de React Hook Form o el interno)
    if (onOptionChange) {
      onOptionChange(optionValue); // Llamamos a la función externa si existe
    }
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div onClick={handleInputClick} className={classes}>
        <div className="flex items-center px-3 py-1 md:p-2">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            id={id}
            ref={inputRef}
            type="text"
            value={
              isOpen ? searchTerm : selectedOption ? selectedOption.label : ""
            }
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="w-full text-base md:text-sm bg-transparent border-none focus:outline-hidden text-gray-900 placeholder-gray-500"
          />
          <ChevronDown
            strokeWidth={1}
            color="#000000"
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul className="py-1 max-h-60 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className={`px-4 py-2 cursor-pointer text-sm ${
                    option.value === field.value
                      ? "bg-blue-50 text-color-1"
                      : "text-gray-900 hover:bg-blue-50 hover:text-color-1"
                  }`}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
      {fieldState.error && (
        <span className="text-red-500 text-xs font-semibold">
          {fieldState.error.message}
        </span>
      )}
    </div>
  );
};

export default SelectWithSearch;
