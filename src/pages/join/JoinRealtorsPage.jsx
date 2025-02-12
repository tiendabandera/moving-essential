import curve from "../../assets/img/curve.png";
import Button from "@/components/Button";
import Section from "@/components/Section";
import CardBenefit from "@/components/design/CardBenefit";
import {
  HeartHandshakeIcon,
  Image,
  Stars,
  UserRound,
  UserRoundSearch,
} from "lucide-react";
import CustomIcon from "@/components/design/CustomIcon";
import FormJoinRealtors from "@/components/forms/FormJoinRealtors";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import InputUploadImage from "@/components/InputUploadImage";

const JoinRealtorsPage = () => {
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
        business_type_id: 2,
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
        total_sales: "",
        experience: "",
        title_work: "",
        bio: "",
        agency_website: "",
        home_types: [],
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
    const section = document.getElementById("form-join-realtors");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col w-full h-screen gap-4">
      <div className="w-full xl:px-36 -mt-1 px-14 pt-14 flex flex-col xl:flex-row lg:flex-row justify-center bg-color-1 gap-10">
        <div className="flex flex-col items-center justify-center text-center lg:pb-14 lg:items-start lg:text-left lg:w-[60%] xl:w-[70%] gap-10">
          <h1 className="font-extrabold h1 text-white xl:w-[75%]">
            Grow Your Real Estate Business with{" "}
            <span className="inline-block relative">
              Moving Essential!
              <img
                src={curve}
                className="absolute top-full left-0 w-full"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="font-medium xl:text-lg xl:w-2/3">
            Join our trusted network to showcase your moving services and real
            estate expertise to thousands of potential clients.
          </p>
          <Button white onClick={handleScroll}>
            Start listing your services
          </Button>
        </div>
        <div className="flex justify-center lg:w-[45%] xl:w-[30%]">
          <img
            src="/assets/img/realtors.png"
            alt="Join real estate company"
            className="w-2/4 md:w-1/2 lg:w-full"
          />
        </div>
      </div>
      <Section className={"flex flex-col gap-10"}>
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
      <Section className={`bg-[#f1f1f1]`} id="form-join-realtors">
        <h1 className="h3 font-bold text-center">
          How Moving Essential Works for You
        </h1>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 mt-10 gap-y-10 xl:grid-cols-3 md:gap-x-10">
            <div className="col-span-2">
              <div className="shadow-lg bg-background rounded-lg p-5">
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
            <div className="col-span-2 xl:col-span-1">
              <div className="shadow-sm bg-background rounded-lg p-5">
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
                      className={"col-span-2"}
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
