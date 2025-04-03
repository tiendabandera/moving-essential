import { supabase } from "@/api/auth";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useController, useForm } from "react-hook-form";

const SearchPlaceId = ({
  id,
  label,
  name,
  options = [],
  className,
  readOnly,
  placeholder,
  control = null,
  onOptionChange, // Nueva prop opcional
  required,
}) => {
  const classes = `w-full h-9 bg-white border border-slate-200 rounded-md shadow-xs ${
    className || ""
  } ${readOnly ? "pointer-events-none bg-slate-400/20" : "bg-transparent"}`;

  const [places, setPlaces] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Si no se pasa un control, creamos uno interno con useForm.
  // Así siempre tendremos un control válido para useController.
  const internalForm = useForm({ defaultValues: { [name]: "" } });
  const effectiveControl = control || internalForm.control;

  // useController se llama siempre con un control válido.
  const { field, fieldState } = useController({
    name,
    control: effectiveControl,
    rules: { required: required ? `${label} is required` : false },
  });

  // Si ya tenemos un control, obtenemos el valor del campo
  const selectedOption = places.find((opt) => opt.value === field.value);

  // Search place id
  const searchPlaceId = async (input) => {
    let timeout = null;

    const value = input.target.value;

    setSearchTerm(value);
    setIsOpen(true);

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(async () => {
      if (value.length > 3) {
        const response = await supabase.functions.invoke("findPlaces", {
          body: value,
        });

        if (response.error) return setPlaces([]);

        const places = JSON.parse(response.data);

        places.length > 0 && setPlaces(places);
      }
    }, 800);
  };

  // Abrir la lista desplegable
  const handleInputClick = () => {
    setIsOpen(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Manejar el clic de una opción
  const handleOptionClick = (optionValue) => {
    field.onChange(optionValue.value); // Se actualiza el valor usando field.onChange (ya sea el de React Hook Form o el interno)
    if (onOptionChange) {
      onOptionChange(optionValue); // Llamamos a la función externa si existe
    }
    setSearchTerm("");
    setIsOpen(false);
  };

  // Cerrar la lista desplegable
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Si options cambian, actualizamos places
  useEffect(() => {
    setPlaces(options);
  }, [options]);

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
            autoComplete="off"
            onChange={(e) => searchPlaceId(e)}
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
            {places.length > 0 ? (
              places.map((option) => (
                <li
                  key={option.value}
                  onClick={() =>
                    handleOptionClick({
                      value: option.value,
                      label: option.label,
                    })
                  }
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

export default SearchPlaceId;
