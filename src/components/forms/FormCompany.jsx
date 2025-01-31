import { useEffect, useState } from "react";
import Input from "../Input";
import Select from "../Select";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { useAuth } from "@/context/AuthContext";
import {
  fedTaxClass,
  rateTypes,
  states,
} from "@/constants/sidebar.routes.company.data";
import SelectWithSearch from "../SelectWithSearch";
import TextArea from "../TextArea";
const FormCompany = ({ userInfo }) => {
  const [submitForm, setSubmitForm] = useState(false);
  const [errorsForm, setErrorsForm] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [zipcodes, setZipcodes] = useState([]);

  const {
    createCompanyInstance,
    createUserInstance,
    setUser,
    setUserInfo,
    getZipcodes,
  } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      company: {
        company_name: "",
        phone: "",
        business_type_id: "",
        zipcode: "",
        city_id: "",
        state: "",
      },
    },
  });

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
    };

    if (userInfo) {
      reset({
        name: userInfo.name || "",
        email: userInfo.email || "",
        company: {
          company_name: userInfo.company?.company_name || "",
          phone: userInfo.company?.phone || "",
          business_type_id: userInfo.company?.business_type_id || "",
          zipcode: userInfo.company?.zipcode || "",
          city_id: userInfo.company?.city_id || "",
          state: userInfo.company?.state || "",
          address: userInfo.company?.address || "",
        },
        service: {
          fed_tax_class: userInfo.service?.fed_tax_class || "",
          slogan: userInfo.service?.slogan || "",
          rate_type_id: userInfo.service?.rate_type_id || "",
          long_description: userInfo.service?.long_description || "",
        },
      });

      getFirstZipcode(userInfo.company?.zipcode || "");
    }
  }, [userInfo, reset, getZipcodes]);

  const inputsUser = [
    {
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Enter your full name",
      label: "First/Last name",
      isInput: true,
      isRequired: true,
      isReadOnly: false,
    },
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      label: "Email",
      isInput: true,
      isRequired: true,
      isReadOnly: true,
    },
  ];

  const inputCompany = [
    {
      id: "company_name",
      name: "company.company_name",
      type: "text",
      placeholder: "Enter your company name",
      label: "Company name",
      isInput: true,
      isRequired: true,
      isReadOnly: false,
    },
    {
      id: "phone",
      name: "company.phone",
      type: "text",
      placeholder: "Enter your phone",
      label: "Phone",
      isInput: true,
      isRequired: true,
      isReadOnly: false,
    },
    {
      id: "business_type_id",
      name: "company.business_type_id",
      placeholder: "Enter your business type",
      label: "Business type",
      isInput: false,
      isRequired: true,
      isReadOnly: true,
      options: [
        { value: 1, label: "Residential/Local Moving" },
        { value: 2, label: "Real Estate" },
      ],
    },
    {
      id: "state",
      name: "company.state",
      type: "text",
      placeholder: "Enter your state",
      label: "State",
      isInput: false,
      withSearch: true,
      isRequired: true,
      isReadOnly: false,
      options: states,
    },
    {
      id: "zipcode",
      name: "company.zipcode",
      type: "number",
      placeholder: "Enter your zipcode",
      label: "Zipcode",
      isInput: true,
      isRequired: true,
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
      id: "city_id",
      name: "company.city_id",
      type: "text",
      placeholder: "Enter your city",
      label: "City",
      isInput: false,
      isRequired: true,
      isReadOnly: false,
      options: zipcodes,
    },
    {
      id: "address",
      name: "company.address",
      type: "text",
      placeholder: "Enter your address",
      label: "Address",
      isInput: true,
      isRequired: true,
      isReadOnly: false,
    },
    {
      id: "fed_tax_class",
      name: "service.fed_tax_class",
      type: "text",
      placeholder: "Select fed. tax classification",
      label: "Federal tax classification",
      isInput: false,
      isRequired: true,
      isReadOnly: false,
      options: fedTaxClass,
    },
    {
      id: "slogan",
      name: "service.slogan",
      type: "text",
      placeholder: "Enter your slogan",
      label: "Slogan",
      isInput: true,
      isRequired: true,
      isReadOnly: false,
    },
    {
      id: "rate_type_id",
      name: "service.rate_type_id",
      type: "text",
      placeholder: "How do you charge?",
      label: "How do you charge?",
      isInput: false,
      isRequired: true,
      isReadOnly: false,
      options: rateTypes,
    },
  ];

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true); // Deshabilitar el botón

    const companyInstance = createCompanyInstance({
      companyInfo: values.company,
      serviceInfo: values.service,
    });
    const res = await companyInstance.update(userInfo.company.id);

    if (res.error) {
      setErrorsForm([res.error.message]);
      setTimeout(() => {
        setErrorsForm([]);
      }, 5000);
      return;
    }

    renderUserInfo(values); // Renderizar los datos actualizados

    setSubmitForm(true);
    setTimeout(() => {
      setSubmitForm(false);
    }, 3000);

    setIsSubmitting(false);
    return;
  });

  const renderUserInfo = async (values) => {
    const userInstance = createUserInstance(values);
    await userInstance.update();

    setUser((prevUser) => ({
      ...prevUser,
      user_metadata: {
        ...prevUser.user_metadata,
        name: values.name,
        company_name: values.company.company_name,
      },
    }));

    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      name: values.name,
      company: {
        id: userInfo.company.id,
        ...values.company,
      },
      service: {
        ...values.service,
      },
    }));
  };

  return (
    <div className="">
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 lg:grid-cols-2">
          {inputsUser.map((input) => {
            if (input.isInput) {
              return (
                <div key={input.id}>
                  <label htmlFor={input.id} className="text-sm font-medium">
                    {input.label}
                    {input.isRequired && " *"}
                  </label>
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
                  />
                </div>
              );
            }
          })}
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
          <div className="xl:col-span-2 lg:col-span-2">
            <label
              htmlFor="service.long_description"
              className="text-sm font-medium"
            >
              Long description *
            </label>
            <TextArea
              id="service.long_description"
              label="Long description"
              name="service.long_description"
              placeholder="Enter your long description"
              readOnly={false}
              register={register}
              required={true}
              errors={errors}
            />
          </div>
        </div>
        <div className="mt-7">
          <Button
            orange
            type="submit"
            className={"w-full 2xl:w-1/5 xl:w-1/4 lg:w-1/6"}
          >
            {isSubmitting ? "Updating..." : "Update info"}
          </Button>
        </div>
        <div className="text-center 2xl:text-left lg:text-left">
          {submitForm && (
            <span className="text-red-500 text-xs font-semibold">
              Updated successfully
            </span>
          )}
          {errorsForm.map((error, i) => (
            <div key={i} className="first-letter:uppercase">
              <span className="text-red-500 text-xs font-semibold">
                {error}
              </span>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default FormCompany;
