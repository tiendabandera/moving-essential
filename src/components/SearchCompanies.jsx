import { useAuth } from "@/context/AuthContext";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SearchCompanies = ({ service }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [valueInput, setValueInput] = useState("");
  const [zipcodes, setZipcodes] = useState([]);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const { getZipcodes, getZipcodesByCity } = useAuth();

  const searchZipcode = async (input) => {
    try {
      setValueInput(input.target.value);
      const zipcode = input.target.value;

      if (zipcode.length > 2) {
        const isNumber = !isNaN(zipcode);
        const zipcodes = isNumber
          ? await getZipcodes(zipcode)
          : await getZipcodesByCity(zipcode);

        if (zipcodes.length === 0) {
          setZipcodes([]);
          return;
        }

        const formattedZipcodes = zipcodes.map((zipcode) => ({
          value: zipcode.id,
          label: isNumber
            ? `${zipcode.zipcodes[0]} - ${zipcode.name}, ${zipcode.state_id}`
            : `${zipcode.name}, ${zipcode.state_id}`,
        }));

        setZipcodes(formattedZipcodes);
      } else {
        setZipcodes([]);
        setValue(null);
        //setValueInput("");
      }
    } catch (error) {
      console.error("Error al cargar los códigos postales:", error);
    }
  };

  const handleOptionClick = (option) => {
    setValue(option.value);
    setValueInput(option.label);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!value) setZipcodes([]);

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  const compareZipcode = () => {
    if (value) {
      console.log(service);
      console.log(`Comparando códigos postales: ${value}`);
    }
  };

  return (
    <div className="relative w-full lg:w-1/2" ref={dropdownRef}>
      <div className="flex gap-2 shadow-md bg-background rounded-full py-2 px-6 border border-gray-200 justify-between">
        <input
          type="text"
          placeholder="Enter ZIP Code or City"
          className="w-full focus-visible:outline-hidden text-base md:text-sm"
          onChange={(e) => searchZipcode(e)}
          onFocus={() => setIsOpen(true)}
          ref={inputRef}
          value={valueInput}
        />
        <div className="w-11 h-10 bg-color-1 p-2 rounded-full cursor-pointer flex items-center justify-center">
          <Search
            strokeWidth={2}
            color="#FFFFFF"
            className="w-5 h-5"
            onClick={compareZipcode}
          />
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul className="py-1 max-h-60 overflow-auto">
            {zipcodes.length > 0 ? (
              zipcodes.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleOptionClick(option)}
                  className={`px-4 py-2 cursor-pointer text-sm ${
                    option.value === value
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
    </div>
  );
};

export default SearchCompanies;
