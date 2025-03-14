import Button from "@/components/Button";
import CustomIcon from "@/components/design/CustomIcon";
import Input from "@/components/Input";
import InputUploadImage from "@/components/InputUploadImage";
import { useAuth } from "@/context/AuthContext";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";

const DashboardPage = () => {
  const { userInfo } = useOutletContext();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorsForm, setErrorsForm] = useState([]);

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
      profile_picture: "",
    },
  });

  useEffect(() => {
    if (userInfo) {
      reset({
        name: userInfo.name || "",
        email: userInfo.email || "",
        profile_picture: user.profile_picture || "",
      });
    }
  }, [userInfo, reset]);

  const onSubmit = handleSubmit((values) => {
    console.log(values);
    setIsSubmitting(true); // Deshabilitar el botón de submit
  });

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

  return (
    <div>
      <h2 className="text-2xl mb-4 font-normal">Dashboard</h2>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 mt-10 gap-y-10 xl:grid-cols-3 md:gap-x-10">
          <div className="col-span-2">
            <div className="shadow-xs bg-background rounded-lg p-5">
              <div className="flex gap-x-2 items-center">
                <CustomIcon icon={Info} />
                <h3 className="font-medium">Personal information</h3>
              </div>
              <div className="mt-7 pb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {inputsUser.map((input) => {
                  if (input.isInput) {
                    return (
                      <div key={input.id}>
                        <label
                          htmlFor={input.id}
                          className="text-sm font-medium"
                        >
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
              </div>
              <div>
                <div className="w-full mx-auto xs:w-[50%] xs:mx-0 sm:w-[30%] lg:w-[20%]">
                  <InputUploadImage
                    id="profile_picture"
                    name="profile_picture"
                    placeholder="Upload profile pic"
                    errors={errors}
                    required={true}
                    control={control}
                  />
                </div>
              </div>
              <div>
                <div className="mt-10 w-full md:w-[30%]">
                  <Button
                    orange
                    type="submit"
                    className={"w-full"}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 xl:col-span-1"></div>
        </div>
      </form>
    </div>
  );
};

export default DashboardPage;
