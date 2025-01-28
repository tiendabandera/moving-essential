import { useEffect, useState } from "react";
import Input from "../Input";
import Select from "../Select";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { useAuth } from "@/context/AuthContext";
const FormCompany = ({ userInfo }) => {
  const [submitForm, setSubmitForm] = useState(false);
  const [errorsForm, setErrorsForm] = useState([]);

  const { createCompanyInstance, createUserInstance, setUser, setUserInfo } =
    useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      company: {
        company_name: "",
        phone: "",
        business_type_id: "",
      },
    },
  });

  useEffect(() => {
    if (userInfo) {
      reset({
        name: userInfo.name || "",
        email: userInfo.email || "",
        company: {
          company_name: userInfo.company?.company_name || "",
          phone: userInfo.company?.phone || "",
          business_type_id: userInfo.company?.business_type_id || "",
        },
      });
    }
  }, [userInfo, reset]);

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
      isReadOnly: false,
      options: [
        { value: 1, label: "Residential/Local Moving" },
        { value: 2, label: "Real Estate" },
      ],
    },
  ];

  const onSubmit = handleSubmit(async (values) => {
    const companyInstance = createCompanyInstance(values.company);
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
    }));
  };

  return (
    <div className="">
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
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
                  {errors?.[input.name] && (
                    <span className="text-red-500 text-xs font-semibold">
                      {input.label} is required
                    </span>
                  )}
                </div>
              );
            }
            return null;
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
                  />
                ) : (
                  <Select
                    id={input.id}
                    name={input.name}
                    readOnly={input.isReadOnly}
                    options={input.options}
                    register={register}
                  />
                )}
                {errors.company?.[input.name.split(".")[1]] && (
                  <span className="text-red-500 text-xs font-semibold">
                    {input.label} is required
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-7">
          <Button
            orange
            type="submit"
            className={"w-full 2xl:w-1/5 xl:w-1/4 lg:w-1/6"}
          >
            Update info
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
