import Button from "@/components/Button";
import CustomIcon from "@/components/design/CustomIcon";
import { DoubleBorder } from "@/components/design/Frames";
import FormJoinRealtors from "@/components/forms/FormJoinRealtors";
import InputUploadImage from "@/components/InputUploadImage";
import Section from "@/components/Section";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { CircleCheckBig, Image, UserRound } from "lucide-react";
import { useEffect, useId, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function BackgroundIllustration(props) {
  let id = useId();

  return (
    <div {...props}>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-slow"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EA6020" />
            <stop offset="1" stopColor="#EA6020" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-reverse-slower"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EA6020" />
            <stop offset="1" stopColor="#EA6020" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function CircleBackground({ color, ...props }) {
  let id = useId();

  return (
    <svg
      viewBox="0 0 558 558"
      width="558"
      height="558"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient
          id={`${id}-2`}
          x1="79"
          y1="16"
          x2="105"
          y2="237"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        opacity=".2"
        d="M1 279C1 125.465 125.465 1 279 1s278 124.465 278 278-124.465 278-278 278S1 432.535 1 279Z"
        stroke={color}
      />
      <path
        d="M1 279C1 125.465 125.465 1 279 1"
        stroke={`url(#${id}-2)`}
        strokeLinecap="round"
      />
    </svg>
  );
}

const benefits = [
  {
    title: "Reach Thousands of Potential Clients",
    description:
      "We simplify your search for movers near you by providing a comprehensive list of reliable moving companies near you. Our curated directory helps you find the best moving companies in your area, ensuring your belongings are in trusted hands.",
  },
  {
    title: "Marketing and SEO Support",
    description:
      "Get the advantage of our marketing resources and SEO-driven strategies that boost your profile visibility to attract more natural traffic.",
  },
  {
    title: "Boost Your Credibility",
    description:
      "We simplify your search for movers near you by providing a comprehensive list of reliable moving companies near you. Our curated directory helps you find the best moving companies in your area, ensuring your belongings are in trusted hands.",
  },
];

const benefits2 = [
  {
    title: "Direct Lead Generation",
    description:
      "Engage with clients who are ready to book moving or real estate services today.",
  },
  {
    title: "Prominent Placement",
    description:
      "Stand out in search results with enhanced visibility in relevant categories.",
  },
  {
    title: "24/7 Support",
    description:
      "Get ongoing assistance to optimize your profile and listings for the best performance.",
  },
];

const JoinRealtorsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, startTransition] = useTransition();

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

  const handleScroll = () => {
    const section = document.getElementById("form-join-realtors");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const {
    isAuthenticated,
    user,
    signupCompany,
    errors: registerErrors,
  } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    startTransition(async () => {
      await signupCompany(values);
    });
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

  return (
    <div>
      <Section
        classNameParent={"overflow-hidden"}
        customPadding={"pt-10 lg:pt-32 xl:py-30"}
      >
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6 text-center lg:text-left">
            <h1 className="mt-6 bold-52 lg:bold-88 tracking-tight text-pretty text-gray-900">
              Grow Your <br />
              Real Estate Business!
            </h1>
            <p className="max-w-lg mt-6 text-base/7 text-gray-600 mx-auto lg:mx-0">
              Join our trusted network to showcase your moving services and real
              estate expertise to thousands of potential clients.
            </p>
            <Button orange onClick={handleScroll} className={"mt-6"}>
              Start listing your services
            </Button>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4"></div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <BackgroundIllustration className="absolute top-4 left-1/2 h-[1020px] w-[1020px] -translate-x-1/3 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] stroke-gray-300/70 sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
            <div className="-mx-4 h-auto [mask-image:linear-gradient(to_bottom,white_60%,transparent)] px-9 sm:mx-0 lg:absolute lg:-inset-x-10 lg:-top-10 lg:-bottom-20 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32">
              <div className="w-full h-full flex flex-col justify-end">
                <img
                  src="/assets/img/join-realtors.png"
                  className="mx-auto w-full h-full object-cover lg:h-[82%] xl:h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section className={"gap-4"} classNameParent={"bg-color-1"}>
        <div className="max-w-[600px]">
          <h2 className="bold-40 lg:bold-64 text-white">
            Master the Digital Market
          </h2>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {benefits.map((item) => (
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
              <p className="mt-1 text-sm/7">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section classNameParent={"overflow-hidden"}>
        <div className="max-w-[600px]">
          <h2 className="bold-40 lg:bold-64 text-gray-900">
            Exclusive Benefits for Members
          </h2>
        </div>
        <section className="lg:mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-lg">
            {benefits2.map((item) => (
              <div key={item.title} className="mt-15 flex gap-5">
                <div className="rounded-full p-4 bg-gradient-to-r from-color-1 to-orange-300 size-fit">
                  <CircleCheckBig className="w-5 h-5 text-white" />
                </div>
                <div className="flex-col gap-2">
                  <h4 className="text-xl font-semibold text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-pretty text-sm font-light text-gray-950/75 sm:max-w-md  lg:max-w-none">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-20 lg:row-span-2 lg:-mr-16 xl:mr-auto">
            <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
              <DoubleBorder>
                <img
                  alt=""
                  src="/assets/img/realtor/realtor-1.png"
                  className="rounded-3xl block size-full object-cover"
                />
              </DoubleBorder>
              <div className="-mt-8">
                <DoubleBorder>
                  <img
                    alt=""
                    src="/assets/img/realtor/realtor-2.png"
                    className="rounded-3xl block size-full object-cover"
                  />
                </DoubleBorder>
              </div>
              <DoubleBorder>
                <img
                  alt=""
                  src="/assets/img/realtor/realtor-3.png"
                  className="rounded-3xl block size-full object-cover"
                />
              </DoubleBorder>
              <div className="-mt-8">
                <DoubleBorder>
                  <img
                    alt=""
                    src="/assets/img/realtor/realtor-4.png"
                    className="rounded-3xl block size-full object-cover "
                  />
                </DoubleBorder>
              </div>
            </div>
          </div>
        </section>
      </Section>
      <Section id="form-join-realtors">
        <h2 className="max-w-2xl bold-40 lg:bold-64 tracking-tight text-gray-900">
          Join Us!
        </h2>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 mt-10 gap-y-10 xl:grid-cols-3 md:gap-x-10">
            <div className="col-span-2 -m-2 rounded-4xl ring-1 shadow-[inset_0_0_2px_1px_#ffffff4d] ring-black/5">
              <div className="rounded-4xl p-2 shadow-md shadow-black/5">
                <div className="rounded-3xl bg-white p-10 pb-9 ring-1 shadow-2xl ring-black/5">
                  <div className="flex gap-x-2 items-center">
                    <CustomIcon icon={UserRound} />
                    <h3 className="font-medium">Agents information</h3>
                  </div>
                  <div className="mt-4">
                    <FormJoinRealtors
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
              <div className="rounded-4xl p-2 shadow-md shadow-black/5 ring-1 ring-black/5">
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
                        placeholder="Upload profile photo"
                        errors={errors}
                        required={true}
                        control={control}
                      />
                      {[2, 3, 4, 5, 6, 7].map((index) => (
                        <InputUploadImage
                          key={index}
                          id={`images.img_${index}`}
                          name={`images.img_${index}`}
                          placeholder={`Upload house photo`}
                          errors={errors}
                          required={true}
                          control={control}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-4">
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

export default JoinRealtorsPage;
