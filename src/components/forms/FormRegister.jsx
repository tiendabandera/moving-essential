import { useNavigate } from "react-router-dom";
import AuthWithGoogle from "../AuthWithGoogle";
import Input from "../Input";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

export default function FormRegister({ register, errors, isSubmitting }) {
  const inputs = [
    {
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Enter your full name",
      label: "Full name",
      isInput: true,
      isRequired: true,
      isReadOnly: false,
      validations: {},
    },
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      label: "Email",
      isInput: true,
      isRequired: true,
      isReadOnly: false,
      validations: {},
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      label: "Password",
      isInput: true,
      isRequired: true,
      isReadOnly: false,
      validations: {},
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="px-10 py-20">
      <div className="flex flex-col gap-2">
        <h4 className="text-xl font-semibold text-gray-900">Welcome to</h4>
        <h3 className="bold-40 lg:bold-64 tracking-tight text-pretty text-color-1">
          Moving Essential
        </h3>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4">
        {inputs.map((input) => {
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
        })}
      </div>
      <div className="mt-8 w-full flex flex-col gap-2">
        <Button
          disabled={isSubmitting}
          className="w-full bg-color-1 border border-color-1 rounded-lg hover:bg-transparent hover:text-color-1"
        >
          {isSubmitting && <LoaderCircle className="animate-spin" />} Sign up
        </Button>
        <AuthWithGoogle title={"Sign up with Google"} />
      </div>
      <div className="mt-4 w-full flex gap-2 items-center justify-center">
        <p className="text-sm font-medium">I already have an account.</p>
        <Button
          type="button"
          variant="link"
          className="w-fit text-color-1 px-0"
          onClick={() => navigate("/login")}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}
