import Button from "@/components/Button";
import Section from "@/components/Section";
import { Building2, ChartNoAxesCombined, Image } from "lucide-react";
import CustomIcon from "@/components/design/CustomIcon";
import FormJoinCompany from "@/components/forms/FormJoinCompany";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import InputUploadImage from "@/components/InputUploadImage";
import BentoCard from "@/components/design/BentoCard";
import { LogoCluster } from "@/components/design/LogoCluster";
import { LogoTimeline } from "@/components/design/LogoTimeline";
import { Checkbox } from "@/components/ui/checkbox";

const steps = [
  {
    title: "Create your profile",
    description:
      "Sign up below and tell us about your company, address, phone number, service offered, and certifications.",
  },
  {
    title: "Client Portal",
    description:
      "Once approved, you will receive an email from client services. You will be able to log into your dashboard.",
  },
  {
    title: "Marketing Campaigns",
    description:
      "Through our client portal, you will be able to communicate with us any questions or concerns you may have.",
  },
  {
    title: "Get Qualified Business",
    description:
      "We ensure all moving requests are verified using email & phone verification services.",
  },
];

const JoinCompanyPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [terms, setTerms] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      company: {
        company_name: "",
        phone: "",
        business_type_id: 1,
        zipcode: "",
        city_id: "",
        state: "",
        address: "",
        facebook_link: "",
        instagram_link: "",
        twitter_link: "",
        linkedin_link: "",
        youtube_link: "",
        tiktok_link: "",
      },
      service: {
        fed_tax_class: "",
        slogan: "",
        rate_type_id: "",
        long_description: "",
      },
      images: {
        img_1: "",
        img_2: "",
        img_3: "",
        img_4: "",
        img_5: "",
        img_6: "",
        img_7: "",
      },
    },
  });

  const {
    isAuthenticated,
    user,
    signupCompany,
    errors: registerErrors,
  } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    if (!terms) {
      toast({
        title: "Terms and Conditions",
        description: "Please accept the terms and conditions.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true); // Deshabilitar el botón
    try {
      await signupCompany(values);
    } catch (error) {
      console.error("Error signing up company:", error);
    } finally {
      setIsSubmitting(false); // Rehabilitar el botón
    }
  });

  useEffect(() => {
    if (isAuthenticated) navigate(`/${user.user_metadata.role}/dashboard`);

    if (registerErrors.length > 0) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: registerErrors[0],
        variant: "destructive",
      });
    }
  }, [isAuthenticated, user, navigate, registerErrors, toast]);

  const handleScroll = () => {
    const section = document.getElementById("form-join-company");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onChangeTerms = () => {
    setTerms(!terms);
  };

  return (
    <div>
      <Section className={"lg:pt-10"}>
        <div className="bg-white">
          <div className="relative isolate overflow-hidden bg-linear-to-b from-indigo-100/20 rounded-tr-4xl">
            <div className="pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 ">
              <div className="px-6 lg:px-0">
                <div className="max-w-lg">
                  <div className="sm:mt-10">
                    <span className="inline-flex space-x-6 rounded-full bg-color-1/10 px-3 py-1 text-sm/6 font-semibold text-color-1 ring-1 ring-color-1/10 ring-inset">
                      What&apos;s new
                    </span>
                  </div>
                  <h1 className="mt-6 bold-52 lg:bold-88 tracking-tight text-pretty text-gray-900">
                    Learn How to Increase Your Business.
                  </h1>
                  <p className="mt-6 text-base/7 text-gray-600">
                    Get more clients and visibility for your moving company!
                    Moving Essential connects you with customers looking for
                    your services, helping you grow and get hired more often.
                  </p>
                  <Button
                    orange
                    onClick={handleScroll}
                    className={"mt-10 md:w-fit"}
                  >
                    Join Now
                  </Button>
                </div>
              </div>
              <div className="mt-20 lg:mt-0">
                <div
                  className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white ring-1 shadow-xl shadow-indigo-600/10 ring-indigo-50 md:-mr-20 lg:-mr-36"
                  aria-hidden="true"
                />
                <div className="shadow-lg md:rounded-3xl">
                  <div className="bg-color-1 [clip-path:inset(0)] md:[clip-path:inset(0_round_var(--radius-3xl))]">
                    <div
                      className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-white ring-inset md:ml-20 lg:ml-36"
                      aria-hidden="true"
                    />
                    <div className="relative px-6 pt-8 sm:pt-16 md:pr-0 md:pl-16">
                      <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                        <img
                          src="/assets/img/login.png"
                          alt="Join Us Residential/Local Moving"
                        />
                      </div>
                      <div className="hidden flex-col items-center p-3 sm:flex absolute right-[60%] top-[10%] rounded-2xl animate-float bg-linear-to-br from-yellow-200 from-15% to-amber-500 to-80% shadow-lg shadow-amber-500/60">
                        <img
                          src="/assets/img/medal.png"
                          alt="Quality Service"
                          className="size-20"
                        />
                        <p className="font-medium text-sm text-white">
                          Quality Service
                        </p>
                      </div>
                      <div className="hidden flex-col items-center size-20 sm:flex absolute right-[10%] bottom-[30%] rounded-full animate-float bg-linear-to-br from-red-200 from-10% to-red-500 to-80% shadow-inner shadow-red-500 ">
                        <img
                          src="/assets/img/cohete.png"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="hidden flex-col gap-3 p-3 sm:flex absolute right-[70%] bottom-[25%] animate-float bg-white/40 rounded-2xl">
                        <div className="flex gap-2 items-end">
                          <p className="font-medium text-sm leading-none">
                            Growth
                          </p>
                          <ChartNoAxesCombined className="size-5" />
                        </div>
                        <img
                          src="/assets/img/grafica-3.png"
                          className="size-40 rounded-2xl lg:rounded-xl lg:size-20 xl:size-40"
                        />
                      </div>
                      <div
                        className="pointer-events-none absolute inset-0 ring-1 ring-black/10 ring-inset md:rounded-3xl"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32" />
          </div>
        </div>
      </Section>
      <Section className={"gap-4"} classNameParent={"-mt-20"}>
        <div>
          <span className="inline-flex space-x-6 rounded-full bg-color-1/10 px-3 py-1 text-sm/6 font-semibold text-color-1 ring-1 ring-color-1/10 ring-inset">
            Next steps
          </span>
        </div>
        <div className="max-w-[600px]">
          <h2 className="bold-40 lg:bold-64">
            Follow these steps and <span className="text-color-1">Join Us</span>
          </h2>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {steps.map((item) => (
            <div key={item.title}>
              <div className="flex items-center text-xl font-semibold text-gray-900">
                <svg
                  viewBox="0 0 4 4"
                  aria-hidden="true"
                  className="mr-4 size-1 flex-none"
                >
                  <circle r={2} cx={2} cy={2} fill="currentColor" />
                </svg>
                {item.title}
                <div
                  aria-hidden="true"
                  className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                />
              </div>
              <p className="mt-1 text-sm/7 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section className={"gap-4"}>
        <div>
          <span className="inline-flex space-x-6 rounded-full bg-color-1/10 px-3 py-1 text-sm/6 font-semibold text-color-1 ring-1 ring-color-1/10 ring-inset">
            Advantages Signing Up
          </span>
        </div>
        <div className="mt-5 mb-10 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:grid-rows-2">
          <BentoCard
            title="Free to list, unlimited growth potential"
            description="Moving Essential allows businesses to list their services for free, ensuring access to a platform that connects you with a wide audience of potential customers. By joining at no cost, you can showcase your services, gain visibility, and benefit from high-quality leads—all designed to help you grow your business efficiently and effectively."
            graphic={
              <div className="h-80 w-full bg-gradient-to-r from-[#fc9d71] to-[#ffc8ad]">
                <img
                  className="mx-auto h-80 object-cover lg:w-1/2"
                  src="/assets/img/growth-potential.png"
                  alt="Growth Potential"
                />
              </div>
            }
            fade={["bottom"]}
            className="lg:rounded-t-4xl lg:col-span-2"
          />
          <BentoCard
            title="Practical branding strategies"
            description={
              <>
                We will provide you with some of the key elements of effective
                brand marketing:
                <br />- Purpose, Vision, Values, Positioning, Personality
              </>
            }
            graphic={<LogoCluster />}
            className="lg:rounded-bl-4xl"
          />
          <BentoCard
            title="Your social media presence"
            description="The Digital Marketing funnel is a strategic model we use that represents the entire buying journey of the personas, from the moment they know your brand until the time they become customers."
            graphic={<LogoTimeline />}
            // `overflow-visible!` is needed to work around a Chrome bug that disables the mask on the graphic.
            className="z-10 overflow-visible! lg:rounded-br-4xl "
          />
        </div>
      </Section>
      <Section className={"gap-4"}>
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl bold-40 lg:bold-64 tracking-tight text-white">
            Why Moving Essential Is Right For My Company!
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm/6 text-gray-300">
            Moving Essential has a team of experienced individuals across the
            board that will help you to promote and get quality moving jobs!
          </p>
          <div
            aria-hidden="true"
            className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl"
          >
            <div
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
              className="aspect-1404/767 w-[87.75rem] bg-linear-to-r from-[#80caff] to-[#4f46e5] opacity-25"
            />
          </div>
        </div>
      </Section>
      <Section id="form-join-company">
        <h2 className="max-w-2xl bold-40 lg:bold-64 tracking-tight text-gray-900">
          Sign me up!
        </h2>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 mt-10 gap-y-10 xl:grid-cols-3 md:gap-x-10">
            <div className="col-span-2 -m-2 rounded-4xl ring-1 shadow-[inset_0_0_2px_1px_#ffffff4d] ring-black/5">
              <div className="rounded-4xl p-2 shadow-md shadow-black/5">
                <div className="rounded-3xl bg-white p-10 pb-9 ring-1 shadow-2xl ring-black/5">
                  <div className="flex gap-x-2 items-center">
                    <CustomIcon icon={Building2} />
                    <h3 className="font-medium">Company information</h3>
                  </div>
                  <div className="mt-4">
                    <FormJoinCompany
                      register={register}
                      control={control}
                      errors={errors}
                      isSubmitting={isSubmitting}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 xl:col-span-1 -m-2">
              <div className="rounded-4xl p-2 shadow-md shadow-black/5 ring-1  ring-black/5">
                <div className="rounded-3xl bg-white p-10 pb-9 ring-1 shadow-2xl ring-black/5">
                  <div className="flex gap-x-2 items-center">
                    <CustomIcon icon={Image} />
                    <h3 className="font-medium">Images</h3>
                  </div>
                  <div className="mt-4 w-full mx-auto">
                    <div className="grid grid-cols-2 gap-2">
                      <InputUploadImage
                        id="images.img_1"
                        name="images.img_1"
                        placeholder="Upload logo"
                        errors={errors}
                        required={true}
                        control={control}
                      />
                      {[2, 3, 4, 5, 6].map((index) => (
                        <InputUploadImage
                          key={index}
                          id={`images.img_${index}`}
                          name={`images.img_${index}`}
                          placeholder={`Additional image`}
                          errors={errors}
                          required={false}
                          control={control}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-8">
            <div className="items-top flex space-x-2">
              <Checkbox
                id="terms"
                name="terms"
                checked={terms}
                onCheckedChange={onChangeTerms}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                >
                  I agree to receive the newsletter and commercial messages from
                  Moving Essential LLC.
                </label>
                <p className="text-xs text-muted-foreground lg:max-w-2xl">
                  We use Brevo as a Marketing platform. By clicking the
                  &apos;Join Moving Essential Today!&apos; button, you consent
                  to the information provided being transferred to Brevo for
                  processing under Brevo&apos;s terms and conditions; you accept
                  Movingessential&apos;s data processing policy and agree to
                  receive Movingessential&apos;s newsletter and commercial
                  messages.
                </p>
              </div>
            </div>
            <Button
              orange
              type="submit"
              className={"w-full 2xl:w-1/6 xl:w-1/6"}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Section>
    </div>
  );
};

export default JoinCompanyPage;
