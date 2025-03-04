import { useForm } from "react-hook-form";
import Input from "../Input";
import TextArea from "../TextArea";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const FormGetQuote = ({ className, company }) => {
  const classes = `w-full flex flex-col gap-6 items-center justify-center p-10 border border-gray-200 rounded-xl shadow-2xl ${
    className || ""
  }`;

  const { createCompanyInstance } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputs = [
    {
      id: "fullname",
      name: "fullname",
      type: "text",
      placeholder: "Enter your full name",
      label: "Full name",
      isInput: true,
      required: true,
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
      required: true,
      isReadOnly: false,
      validations: {},
    },
    {
      id: "phone",
      name: "phone",
      type: "number",
      placeholder: "Enter your phone",
      label: "Phone",
      isInput: true,
      required: false,
      isReadOnly: false,
      validations: {},
    },
  ];

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);

    const companyInstance = createCompanyInstance({
      company,
      data: values,
      templateId: 1,
    });

    const res = await companyInstance.createQuote();

    if (!res.error) {
      setIsSubmitting(false);
      reset();
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className={classes}>
        <h3 className="font-semibold text-color-1 text-3xl">Get a Quote</h3>
        <div className="w-full grid grid-cols-1 gap-3">
          {inputs.map((input) => (
            <div key={input.id}>
              <label htmlFor={input.id} className="text-sm font-medium">
                {input.label}
                {input.required && " *"}
              </label>
              <Input {...input} register={register} errors={errors} />
            </div>
          ))}
          <div>
            <label htmlFor="message" className="text-sm font-medium">
              Message *
            </label>
            <TextArea
              id="message"
              label="Message"
              name="message"
              placeholder="Type your message here..."
              readOnly={false}
              register={register}
              required={true}
              errors={errors}
              className={"h-40"}
            />
          </div>
        </div>
        <div className="w-full">
          <Button
            className="w-full bg-color-1 border border-color-1 rounded-md hover:bg-transparent hover:text-color-1"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="animate-spin" />}
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormGetQuote;
