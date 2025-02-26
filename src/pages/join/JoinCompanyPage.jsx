import curve from "../../assets/img/curve.png";
import Button from "@/components/Button";
import Section from "@/components/Section";
import CardBenefit from "@/components/design/CardBenefit";
import {
  Building2,
  HeartHandshakeIcon,
  Image,
  Stars,
  UserRoundSearch,
} from "lucide-react";
import CustomIcon from "@/components/design/CustomIcon";
import FormJoinCompany from "@/components/forms/FormJoinCompany";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import InputUploadImage from "@/components/InputUploadImage";

const JoinCompanyPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  //const [previews, setPreviews] = useState([]);

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

  const benefits = [
    {
      icon: UserRoundSearch,
      title: "Reach Thousands of Potential Clients",
      description:
        "We simplify your search for movers near you by providing a comprehensive list of reliable moving companies near you. Our curated directory helps you find the best moving companies in your area, ensuring your belongings are in trusted hands.",
    },
    {
      icon: HeartHandshakeIcon,
      title: "Marketing and SEO Support",
      description:
        "Get the advantage of our marketing resources and SEO-driven strategies that boost your profile visibility to attract more natural traffic.",
    },
    {
      icon: Stars,
      title: "Boost Your Credibility",
      description:
        "We simplify your search for movers near you by providing a comprehensive list of reliable moving companies near you. Our curated directory helps you find the best moving companies in your area, ensuring your belongings are in trusted hands.",
    },
  ];

  const {
    isAuthenticated,
    user,
    signupCompany,
    errors: registerErrors,
  } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
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

  return (
    <div className="flex flex-col w-full  gap-4 relative overflow-hidden">
      <section className="max-container padding-container flex xl:flex-row flex-col gap-5 relative z-0 ">
        <div className="flex flex-col gap-10 py-10 lg:py-20 justify-center">
          <h1 className="bold-52 lg:bold-88 relative max-w-[520px] lg:max-w-[680px]">
            Learn <br />
            How to Increase
            <span className="inline-block relative ">
              Your Business!
              <img
                src={curve}
                className="absolute top-full left-0 w-full"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="mt-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis
            sint error blanditiis, illum nemo quas similique fuga, fugiat totam
            eligendi nesciunt corporis vitae facilis temporibus in alias! Nobis,
            ex perferendis.
          </p>
          <Button orange onClick={handleScroll} className={"md:w-fit"}>
            Join Now
          </Button>
          <img
            src="/assets/img/decorator-2.png"
            alt="decorator-1"
            className="hidden xl:block absolute xl:top-0 xl:right-[90%] w-[30%] -z-10 opacity-50"
          />
        </div>
        <div className="flex lg:hidden xl:flex justify-end items-end w-full xl:h-screen">
          <div className="relative w-[90%] md:w-[60%] xl:w-full xl:h-full h-[590px] z-0">
            <img
              src="/assets/img/login.png"
              alt="hero"
              className="object-contain"
            />
          </div>
          <img
            src="/assets/img/grafica-1.png"
            alt="grafica-1"
            width={130}
            height={130}
            className="absolute top-[50%] right-[60%] lg:-right-[1%] -z-10 lg:z-10"
          />
          <img
            src="/assets/img/cohete.png"
            alt="cohete"
            width={200}
            height={200}
            className="absolute top-20 -right-[5%] lg:right-[40%] -z-10 lg:z-10"
          />
          <div className="absolute top-1/2 md:top-[40%] xl:-top-24 xl:-right-1/2 -right-1/4 bg-[url('/assets/img/mask-1.png')] g bg-repeat-round -z-10 w-full xl:h-screen h-[390px] md:h-[590px] overflow-hidden" />
        </div>
      </section>
      <Section className={"gap-10"}>
        <h1 className="h3 font-bold text-center">
          How Moving Essential Works for You
        </h1>
        <div className="flex flex-wrap justify-center gap-10 mb-10">
          {benefits.map((benefit, index) => (
            <CardBenefit
              key={index}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
            />
          ))}
        </div>
      </Section>
      <Section id="form-join-company" classNameParent={"bg-[#f1f1f1] py-10"}>
        <h1 className="h3 font-bold text-center">
          How Moving Essential Works for You
        </h1>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 mt-10 gap-y-10 xl:grid-cols-3 md:gap-x-10">
            <div className="col-span-2">
              <div className="shadow-lg bg-background rounded-lg p-5">
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
            <div className="col-span-2 xl:col-span-1">
              <div className="shadow-xs bg-background rounded-lg p-5">
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

export default JoinCompanyPage;
