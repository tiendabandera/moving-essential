import { useForm } from "react-hook-form";
import Input from "../Input";
import TextArea from "../TextArea";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2, Share2 } from "lucide-react";

const FormReview = ({ className }) => {
  const classes = `w-full flex flex-col gap-6 items-center justify-center p-10 border border-gray-200 rounded-xl shadow-2xl ${
    className || ""
  }`;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputs = [
    {
      id: "origin",
      name: "origin",
      type: "text",
      placeholder: "Origin",
      label: "Origin",
      isInput: true,
      required: true,
      isReadOnly: false,
      validations: {},
    },
    {
      id: "destination",
      name: "destination",
      type: "text",
      placeholder: "Destination",
      label: "Destination",
      isInput: true,
      required: true,
      isReadOnly: false,
      validations: {},
    },
    {
      id: "quoted_price",
      name: "quoted_price",
      type: "number",
      placeholder: "Quoted Price",
      label: "Quoted Price",
      isInput: true,
      required: true,
      isReadOnly: false,
      validations: {},
    },
    {
      id: "actual_price",
      name: "actual_price",
      type: "number",
      placeholder: "Actual Price",
      label: "Actual Price",
      isInput: true,
      required: true,
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
      full_name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    console.log(values);

    setTimeout(() => {
      setIsSubmitting(false);
      reset();
    }, 3000);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className={classes}>
        <Button
          className="w-full bg-black border border-black rounded-md hover:bg-transparent hover:text-black"
          type="button"
        >
          <Share2 className="!hover:bg-black" color="#fff" />
          Get more reviews
        </Button>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
          {inputs.map((input) => (
            <div key={input.id}>
              <label htmlFor={input.id} className="text-sm font-medium">
                {input.label}
                {input.required && " *"}
              </label>
              <Input {...input} register={register} errors={errors} />
            </div>
          ))}
          <div className="lg:col-span-2">
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

export default FormReview;
