import { Check, CirclePlus, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import SelectWithSearch from "./SelectWithSearch";
import { states } from "@/constants";

const FilterSectionCompanies = ({ onFilterChange }) => {
  const options = [
    {
      field: "company_name",
      label: "Company name",
    },
    {
      field: "city",
      label: "City",
    },
    {
      field: "zipcode",
      label: "Zipcode",
    },
    {
      field: "state",
      label: "State",
    },
  ];

  const pricingOptions = [
    {
      field: "rate_type_id",
      type: 1,
      label: "Hourly rate",
    },
    {
      field: "rate_type_id",
      type: 2,
      label: "Flat rate",
    },
    {
      field: "rate_type_id",
      type: 3,
      label: "Both",
    },
  ];

  const [filterType, setFilterType] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(null);
  const [disabledInput, setDisabledInput] = useState(false); // Estado para deshabilitar el input
  const [hiddenInput, setHiddenInput] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setValue(inputValue);
    }, 500);

    // Limpiar el temporizador si el usuario sigue escribiendo
    return () => clearTimeout(delayDebounce);
  }, [inputValue]); // Se ejecuta cada vez que cambia el inputValue

  useEffect(() => {
    if ((value !== null && filterType.field) || disabledInput === true)
      onFilterChange(value, filterType);
  }, [value, disabledInput]);

  useEffect(() => {
    switch (filterType.field) {
      case "rate_type_id":
        onFilterChange(value, filterType);
        setDisabledInput(true);
        setHiddenInput(true);
        break;

      case "state":
        setHiddenInput(true);
        break;

      default:
        setHiddenInput(false);
        setDisabledInput(false);
        break;
    }
  }, [filterType]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="bold-40 text-transparent bg-clip-text bg-gradient-to-r from-color-1 via-yellow-500 to-orange-200">
          Choose Your Mover
        </h1>
        <p className="text-justify regular-16 text-gray-50 max-w-2xl">
          Enjoy a smooth and stress-free move by choosing the right moving
          company. We make this process easy by connecting you with top-rated
          movers based on likes and reviews.
        </p>
      </div>
      <div className="lg:w-fit flex flex-col sm:flex-row gap-2 p-3 rounded-2xl shadow-up-down">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-fit justify-start border-gray-300 border-dashed rounded-2xl"
            >
              <CirclePlus className="h-4 w-4" />
              Filter
              {filterType.label && (
                <span className="bg-gray-200 px-2 py-[2px] rounded-md">
                  {filterType.label}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              {options.map((option) => (
                <DropdownMenuItem
                  key={option.field}
                  textValue={option.field}
                  onSelect={(e) => {
                    setValue("");
                    setInputValue("");
                    const currentValue = e.target.textContent;

                    if (filterType.label && filterType.label === currentValue) {
                      setFilterType({});
                    } else {
                      setFilterType(
                        options.find((option) => option.label === currentValue)
                      );
                    }
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      filterType?.label == option.label
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </DropdownMenuItem>
              ))}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Pricing type</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {pricingOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.label}
                        textValue={option.field}
                        onSelect={(e) => {
                          setValue("");
                          setInputValue("");
                          setDisabledInput(true);
                          const currentValue = e.target.textContent;

                          if (
                            filterType.label &&
                            filterType.label === currentValue
                          ) {
                            setFilterType({});
                          } else {
                            setFilterType(
                              pricingOptions.find(
                                (option) => option.label === currentValue
                              )
                            );
                          }
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            filterType?.label == option.label
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="justify-center font-medium text-red-600"
              onSelect={() => {
                //setFilterType("");
                setValue("");
                setInputValue("");
                setFilterType({
                  field: "all",
                  label: "All",
                });
              }}
            >
              <Trash className="h-4 w-4" /> Clear filter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <input
          type="text"
          placeholder="Filter company..."
          className={`w-full lg:w-[500px] h-9 rounded-2xl border border-slate-200 px-3 py-1 text-base shadow-xs transition-colors placeholder:text-slate-500 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
            hiddenInput ? "hidden" : "block"
          }`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={disabledInput}
        />

        {hiddenInput && (
          <SelectWithSearch
            id="state"
            label="state"
            name="state"
            readOnly={false}
            options={states}
            required={false}
            placeholder="Select state"
            className={"!rounded-2xl"}
            onOptionChange={(selectedValue) => {
              setValue(selectedValue);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FilterSectionCompanies;
