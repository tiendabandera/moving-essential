import Button from "@/components/Button";
import { Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeatureCard = ({ title, image }) => {
  return (
    <div className="flex flex-col p-2 rounded-xl items-center justify-center shadow-md ring-1 ring-black/5">
      <img src={image} alt="Feature" className="size-32 sm:size-40" />
      <h3 className="font-semibold text-sm sm:text-base lg:text-lg max-w-56 text-center">
        {title}
      </h3>
    </div>
  );
};

const CompanyPage = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: "Visibility without paying for ads",
      image: "/assets/svg/landing-company-1.svg",
    },
    {
      title: "Qualified leads with no commissions",
      image: "/assets/svg/landing-company-2.svg",
    },
    {
      title: "Access to new clients in your area",
      image: "/assets/svg/landing-company-3.svg",
    },
    {
      title: "Ideal for small businesses or large companies",
      image: "/assets/svg/landing-company-4.svg",
    },
  ];

  return (
    <div className="padding-container w-full flex flex-col gap-24 my-24">
      {/* Section 1 */}
      <section className="flex-center w-full flex-col">
        <div className="get-app-landing flex-col xl:flex-row items-center py-0 px-6 sm:px-10 md:px-12 pt-20 xl:pt-0 gap-10">
          <div className="flex items-center xl:items-start flex-1 flex-col gap-12">
            <h2 className="text-center xl:text-left bold-40 lg:bold-52 xl:max-w-[632px]">
              Get Your Moving Company in Front of More Clients.{" "}
              <span className="text-white">
                Be the first choice in your area with zero ad spend
              </span>
            </h2>
            <div className="flex w-full flex-col gap-3 sm:w-1/2">
              <Button
                className="bg-purple-500 text-color-1 h-12 border border-purple-500 rounded-2xl hover:bg-purple-100 hover:text-purple-500"
                onClick={() => navigate("/join/company")}
              >
                Create your free profile
              </Button>
            </div>
          </div>
          <div className="flex md:h-[500px] xl:h-[610px] mt-auto">
            <img
              src="/assets/img/landing-company-1.png"
              alt="Landing User"
              className="object-cover size-full mt-auto"
            />
          </div>
        </div>
      </section>
      {/* Section 2 */}
      <section className="relative max-container w-full py-20 flex flex-center flex-col gap-10">
        <img
          src="/assets/img/border.png"
          alt=""
          className="absolute w-16 md:w-28 right-0 top-0"
        />
        <img
          src="/assets/img/border-2.png"
          alt=""
          className="absolute w-28 md:w-52 left-0 bottom-0 rotate-180"
        />
        <div className="w-full flex flex-col gap-4">
          <h2 className="bold-32 lg:bold-52">
            Benefits of being part of Moving Essential
          </h2>
          <div className="w-1/2 h-[4px] bg-linear-to-r from-color-1 to-white" />
        </div>
        <div className="py-20 w-full grid grid-cols-2 md:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              image={feature.image}
              title={feature.title}
            />
          ))}
        </div>
        <Button
          className="bg-green-500 text-color-1 h-12 border border-green-500 rounded-2xl hover:bg-transparent hover:text-green-500"
          onClick={() => navigate("/join/company")}
        >
          Start today
        </Button>
      </section>
      {/* Section 3 */}
      <section className="max-container w-full grid xl:grid-cols-2 gap-10 items-center">
        <div className="get-app-landing-2 items-center lg:items-start py-10 flex flex-col lg:gap-10 lg:h-[455px] mt-auto">
          <h2 className="bold-32 lg:bold-52 text-color-1">Who Can Join?</h2>
          <ul className="text-white text-lg space-y-4">
            <li className="flex items-center gap-2">
              <Circle className="text-color-1 size-4 fill-current" />
              Local or interstate moving companies
            </li>
            <li className="flex items-center gap-2">
              <Circle className="text-color-1 size-4 fill-current" />
              Licensed and insured businesses only
            </li>
            <li className="flex items-center gap-2">
              <Circle className="text-color-1 size-4 fill-current" />
              Serving residential or commercial clients welcome
            </li>
          </ul>
          <Button
            className="md:w-1/2 bg-white !text-black h-12 border border-white rounded-2xl hover:bg-transparent hover:!text-white"
            onClick={() => navigate("/join/company")}
          >
            More information
          </Button>
        </div>
        <img
          src="/assets/img/landing-company-2.png"
          alt=""
          className="hidden md:block w-full h-[490px] object-contain"
        />
      </section>
      {/* Section 4 */}
      <section className="max-container w-full grid lg:grid-cols-2 gap-10 items-center">
        <img
          src="/assets/img/landing-company-3.png"
          alt=""
          className="hidden md:block w-full h-[530px]"
        />
        <div className="get-app-landing items-center lg:items-start py-10 flex flex-col gap-4 lg:h-[510px] mt-auto">
          <h2 className="bold-32 lg:bold-52 text-white">Who Can Join?</h2>
          <ul className="text-white text-lg space-y-4">
            <li className="flex items-center gap-2">
              <Circle className="text-black size-4 fill-current" />
              Register for free
            </li>
            <li className="flex items-center gap-2">
              <Circle className="text-black size-4 fill-current" />
              Set up your profile with service areas and specialties
            </li>
            <li className="flex items-center gap-2">
              <Circle className="text-black size-4 fill-current" />
              Connect with people looking for a new home
            </li>
          </ul>
          <Button
            className="md:w-1/2 bg-white !text-black h-12 border border-white rounded-2xl hover:bg-transparent hover:!text-white"
            onClick={() => navigate("/join/company")}
          >
            More information
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CompanyPage;
