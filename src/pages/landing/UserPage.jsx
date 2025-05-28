import Button from "@/components/Button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

const FeatureCard = ({ title, image }) => {
  return (
    <div className="flex flex-col p-2 rounded-xl items-center justify-center shadow-md ring-1 ring-black/5">
      <img src={image} alt="Feature" className="size-32 sm:size-40" />
      <h3 className="font-semibold text-sm sm:text-base lg:text-lg max-w-44 text-center">
        {title}
      </h3>
    </div>
  );
};

const UserPage = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: "Compare prices in seconds",
      image: "/assets/svg/landing-user-1.svg",
    },
    {
      title: "Find top-rated providers in your city",
      image: "/assets/svg/landing-user-2.svg",
    },
    { title: "Read verified reviews", image: "/assets/svg/landing-user-3.svg" },
    {
      title: "100% free to use no hidden fees",
      image: "/assets/svg/landing-user-4.svg",
    },
  ];

  return (
    <div className="padding-container w-full flex flex-col gap-24">
      {/* Section 1 */}
      <section className="mt-24 flex-center w-full flex-col">
        <div className="get-app-landing flex-row px-10 sm:px-28 md:px-12">
          <div className="z-20 flex w-full flex-1 flex-col items-start justify-center gap-12">
            <h2 className="text-center md:text-left bold-40 lg:bold-64 xl:max-w-2xl">
              Compare Top Moving Services & Realtors{" "}
              <span className="text-white">All in One Place</span>
            </h2>
            <div className="flex w-full flex-col gap-3 whitespace-nowrap xl:w-1/4">
              <Button
                className="bg-purple-500 text-color-1 h-12 border border-purple-500 rounded-2xl hover:bg-purple-100 hover:text-purple-500"
                onClick={() => navigate("/")}
              >
                See more
              </Button>
            </div>
          </div>
          <div className="hidden md:flex flex-1 items-center h-[400px] lg:h-[500px]">
            <img
              src="/assets/img/landing-user-1-1.png"
              alt="Landing User"
              className="object-cover size-full"
            />
          </div>
        </div>
      </section>
      {/* Section 2 */}
      <section className="relative max-container  w-full py-20 flex flex-center flex-col gap-10">
        <img
          src="/assets/img/border.png"
          alt=""
          className="absolute w-16 md:w-28 left-0 top-0"
        />
        <img
          src="/assets/img/border-2.png"
          alt=""
          className="absolute w-28 md:w-52 right-0 bottom-0"
        />
        <h2 className="bold-32 lg:bold-52 xl:max-w-6xl text-center">
          Save time and money by instantly comparing prices, and verified
          ratings.
        </h2>
        <p className="md:text-2xl font-medium text-color-1 text-center">
          Start now — it’s free to search and connect.
        </p>
        <div className="flex flex-col sm:flex-row flex-center gap-4 sm:gap-10">
          <Button
            className="bg-purple-500 text-color-1 h-12 border border-purple-500 rounded-2xl hover:bg-purple-100 hover:text-purple-500"
            onClick={() => navigate("/local-moving/compare")}
          >
            Search Moving Companies
          </Button>
          <Button
            className="bg-purple-500 text-color-1 h-12 border border-purple-500 rounded-2xl hover:bg-purple-100 hover:text-purple-500"
            onClick={() => navigate("/realtors/compare")}
          >
            Search Realtors
          </Button>
        </div>
      </section>
      {/* Section 3 */}
      <section className="max-container w-full lg:h-[750px]">
        <img
          src="/assets/img/landing-user-2.png"
          alt="Landing User"
          className="object-cover size-full"
        />
      </section>
      {/* Section 4 */}
      <section className="relative max-container  w-full py-20 flex flex-center flex-col gap-10">
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
          <h2 className="bold-32 lg:bold-52">User benefits</h2>
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
      </section>
      {/* Section 5 */}
      <section className="flex-center w-full flex-col pb-[100px]">
        <div className="get-app-landing items-center md:flex-row px-10 lg:px-32">
          <div className="z-20 flex w-full flex-1 flex-col items-start justify-center gap-12">
            <h2 className="bold-32 lg:bold-52 xl:max-w-2xl text-white">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger
                  className="text-lg text-white data-[state=open]:text-black"
                  classNameIcon={"text-black"}
                >
                  Is there a cost for me to join?
                </AccordionTrigger>
                <AccordionContent>
                  No — it’s completely free to list your business and receive
                  leads on our platform.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg text-white data-[state=open]:text-black">
                  How do you verify the companies?
                </AccordionTrigger>
                <AccordionContent>
                  We manually review each submission to ensure companies meet
                  our quality standards and operate legally in their service
                  areas.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg text-white data-[state=open]:text-black">
                  Which cities are available?
                </AccordionTrigger>
                <AccordionContent>
                  We’re expanding across all 50 U.S. states. You can search or
                  list based on your target zip codes and cities.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg text-white data-[state=open]:text-black">
                  Can I register if I operate in multiple states?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely. You can list in multiple cities or states — all
                  under one profile, completely free.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="hidden md:flex flex-1 items-center h-[400px] lg:h-[600px]">
            <img
              src="/assets/img/landing-user-3.png"
              alt="Landing User"
              className="object-cover size-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserPage;
