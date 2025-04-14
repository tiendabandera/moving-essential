import { supabase } from "@/api/auth";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Section from "@/components/Section";
import TextArea from "@/components/TextArea";
import { Building, Loader2, Mail, Phone } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

const inputs = [
  {
    id: "full_name",
    name: "full_name",
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
    isReadOnly: false,
  },
  {
    id: "phone",
    name: "phone",
    type: "text",
    placeholder: "Enter your phone",
    label: "Phone",
    isInput: true,
    isRequired: true,
    isReadOnly: false,
  },
];

const ContactPage = () => {
  const [isSubmitting, startTransition] = useTransition();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    startTransition(async () => {
      await supabase.functions.invoke("sendEmailToCompany", {
        body: {
          data: {
            ...values,
          },
          emails: ["info@movingessential.com"],
          templateId: 38,
        },
      });

      return reset();
    });
  });

  return (
    <div>
      <title>Contact - Moving Essential</title>
      <div className="relative isolate bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 border-r border-gray-200 lg:w-1/2">
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 size-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
                >
                  <defs>
                    <pattern
                      x="100%"
                      y={-1}
                      id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                      width={200}
                      height={200}
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M130 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                  </defs>
                  <rect
                    fill="white"
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                  />
                  <svg
                    x="100%"
                    y={-1}
                    className="overflow-visible fill-gray-50"
                  >
                    <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                  </svg>
                  <rect
                    fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                  />
                </svg>
              </div>
              <Section>
                <h1 className="bold-52 lg:bold-88 text-gray-900 tracking-tight text-pretty">
                  Contact Us
                </h1>
                <p className="mt-6 text-base/7 text-gray-600">
                  Have a question, suggestion, or just want to say hi? We’re
                  here to help. Fill out the form or reach out to us directly —
                  we’ll get back to you as soon as possible. We’d love to hear
                  from you!
                </p>
                <dl className="mt-10 space-y-4 text-sm/7 text-gray-600">
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Address</span>
                      <Building
                        aria-hidden="true"
                        className="h-7 w-6 text-gray-400"
                      />
                    </dt>
                    <dd>
                      5489 NW 27th St
                      <br />
                      Margate, FL 33063
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Telephone</span>
                      <Phone
                        aria-hidden="true"
                        className="h-7 w-6 text-gray-400"
                      />
                    </dt>
                    <dd>
                      <a
                        href="tel:+1 (772) 777-5229"
                        className="hover:text-gray-900"
                      >
                        +1 (772) 777-5229
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Email</span>
                      <Mail
                        aria-hidden="true"
                        className="h-7 w-6 text-gray-400"
                      />
                    </dt>
                    <dd>
                      <a
                        href="mailto:
info@movingessential.com"
                        className="hover:text-gray-900"
                      >
                        info@movingessential.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </Section>
            </div>
          </div>
          <form
            onSubmit={onSubmit}
            className="px-6  pb-24 sm:pb-32 lg:px-8 lg:py-48"
          >
            <Section className={"gap-6"}>
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
              <div className="xl:col-span-2 lg:col-span-2 md:col-span-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message *
                </label>
                <TextArea
                  id="message"
                  label="Message"
                  name="message"
                  placeholder="Enter your message"
                  readOnly={false}
                  register={register}
                  required={true}
                  errors={errors}
                  className={"h-40"}
                />
              </div>
              <div className="flex justify-end">
                <Button orange type="submit">
                  {isSubmitting && <Loader2 className="animate-spin" />}Submit
                </Button>
              </div>
            </Section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
