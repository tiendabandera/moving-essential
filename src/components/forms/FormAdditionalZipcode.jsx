import { states } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import SelectWithSearch from "../SelectWithSearch";
import Select from "../Select";
import Input from "../Input";

const FormAdditionalZipcode = ({
  userInfo,
  register,
  errors,
  control,
  reset,
}) => {
  const [zipcodes, setZipcodes] = useState([]);
  const { getZipcodes } = useAuth();

  const searchZipcode = async (input) => {
    try {
      const zipcode = input.target.value;

      if (zipcode.length < 3 || zipcode.length > 5) {
        setZipcodes([]);
        return;
      }

      const zipcodes = await getZipcodes(zipcode);

      if (zipcodes.length === 0) {
        setZipcodes([]);
        return;
      }

      const formattedZipcodes = zipcodes.map((zipcode) => ({
        value: zipcode.id,
        label: zipcode.name,
        //label: `${zipcode.zipcodes[0]} - ${zipcode.name}, ${zipcode.state_id}`, Utilizar para la busqueda en el home
      }));

      setZipcodes(formattedZipcodes);
    } catch (error) {
      console.error("Error al cargar los códigos postales:", error);
    }
  };

  useEffect(() => {
    const getFirstZipcode = async (zipcode) => {
      const zipcodes = await getZipcodes(zipcode);
      if (zipcodes.length === 0) {
        setZipcodes([]);
        return;
      }

      const formattedZipcodes = zipcodes.map((zipcode) => ({
        value: zipcode.id,
        label: zipcode.name,
      }));

      setZipcodes(formattedZipcodes);

      reset((prevValues) => ({
        ...prevValues,
        company: {
          ...prevValues.company,
          city_id: userInfo.company?.city_id || "",
        },
      }));
    };

    if (userInfo && userInfo.company) {
      getFirstZipcode(userInfo.company.zipcode_2);
    }
  }, [getZipcodes]);

  const inputCompany = [
    {
      id: "state_2",
      name: "company.state_2",
      type: "text",
      placeholder: "Enter your state",
      label: "State",
      isInput: false,
      withSearch: true,
      isRequired: false,
      isReadOnly: false,
      options: states,
    },
    {
      id: "zipcode_2",
      name: "company.zipcode_2",
      type: "number",
      placeholder: "Enter your zipcode",
      label: "Zipcode",
      isInput: true,
      isRequired: false,
      isReadOnly: false,
      onChange: searchZipcode,
      validations: {
        pattern: {
          value: /^[0-9]{5}$/, // Expresión regular para validar exactamente 5 dígitos
          message: "Zipcode must be exactly 5 digits",
        },
      },
    },
    {
      id: "city_2_id",
      name: "company.city_2_id",
      type: "text",
      placeholder: "Enter your city",
      label: "City",
      isInput: false,
      isRequired: false,
      isReadOnly: false,
      options: zipcodes,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {inputCompany.map((input) => {
        return (
          <div key={input.id}>
            <label htmlFor={input.id} className="text-sm font-medium">
              {input.label}
              {input.isRequired && " *"}
            </label>
            {input.isInput ? (
              <Input
                id={input.id}
                label={input.label}
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                readOnly={input.isReadOnly}
                register={register}
                required={input.isRequired}
                errors={errors}
                onChange={input.onChange}
                validations={input.validations}
              />
            ) : input.withSearch ? (
              <SelectWithSearch
                id={input.id}
                label={input.label}
                name={input.name}
                readOnly={input.isReadOnly}
                options={input.options}
                required={input.isRequired}
                placeholder={input.placeholder}
                control={control}
              />
            ) : (
              <Select
                id={input.id}
                label={input.label}
                name={input.name}
                readOnly={input.isReadOnly}
                options={input.options}
                required={input.isRequired}
                placeholder={input.placeholder}
                control={control}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FormAdditionalZipcode;
