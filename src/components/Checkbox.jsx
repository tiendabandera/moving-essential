import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useController } from "react-hook-form";

const Checkbox = ({ name, options, control }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const toggleType = (typeId) => {
    if (typeId !== "all") {
      const newSelected = selectedTypes.includes(typeId)
        ? selectedTypes.filter((id) => id !== typeId)
        : [...selectedTypes, typeId];

      setSelectedTypes(newSelected);
    } else {
      selectedTypes.includes("all")
        ? setSelectedTypes([])
        : setSelectedTypes(options.map((homeType) => homeType.value));
    }
  };

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: "Select at least one home type" },
  });

  // Inicializa selectedTypes con value al montar el componente
  useEffect(() => {
    if (value && value.length > 0 && selectedTypes.length === 0) {
      setSelectedTypes(value);
    }
  }, [value]);

  useEffect(() => {
    onChange(selectedTypes);
  }, [selectedTypes]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value?.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleType(option.value)}
              className={cn(
                "cursor-pointer relative flex items-center px-4 py-2 rounded-full text-sm transition-all duration-200",
                "border hover:border-primary/50",
                "focus:outline-hidden focus:ring-2 focus:ring-primary/20",
                isSelected
                  ? "border-primary/70 bg-primary/5 text-primary font-medium"
                  : "border-border bg-background text-muted-foreground"
              )}
            >
              <span
                className={cn(
                  "transition-opacity",
                  isSelected ? "mr-2" : "mr-0"
                )}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
              </span>
              {option.label}
            </button>
          );
        })}
      </div>
      {error && (
        <span className="text-red-500 text-xs font-semibold">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default Checkbox;
