import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FormJoin from "../../components/forms/FormJoin";
import curve from "../../assets/img/curve.png";
import Button from "@/components/Button";
import Section from "@/components/Section";
import CardBenefit from "@/components/design/CardBenefit";
import { HeartHandshakeIcon, Stars, UserRoundSearch } from "lucide-react";

const JoinCompanyPageOld = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    signupCompany,
    isAuthenticated,
    errors: registerErrors,
    user,
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate(`/${user.user_metadata.role}/dashboard`);
  }, [isAuthenticated, navigate, user]);

  const onSubmit = handleSubmit(async (values) => {
    signupCompany(values);
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
          <Button white href="/join/real-estate">
            Start listing your services
          </Button>
        </div>
        <div className="flex justify-center lg:w-[45%] xl:w-[30%]">
          <img
            //src="https://static.wixstatic.com/media/02498f_2b72f707eb384d7db91fab93896c56ff~mv2.png"
            src="https://static.wixstatic.com/media/02498f_2162c90c5f114c489c20f07da0c46fce~mv2.png"
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
      <div className="w-full flex flex-col items-center justify-center gap-14 pb-32">
        <div className="container mt-20">
          <h1 className="font-extrabold h1 mb-6 text-center">
            Join Moving Essential{" "}
            <span className="inline-block relative">
              Today!{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
        </div>
        <form onSubmit={onSubmit} className="w-11/12 max-w-[900px]">
          <FormJoin
            register={register}
            errors={errors}
            registerErrors={registerErrors}
          />
        </form>
      </div>
    </div>
  );
};

export default JoinCompanyPageOld;
