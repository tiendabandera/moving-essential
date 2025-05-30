import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import FAQs from "./components/FAQs";

const FeatureCard = ({ title, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.3 }}
      className="flex flex-col p-2 rounded-xl items-center justify-center shadow-md ring-1 ring-black/5"
    >
      <img src={image} alt="Feature" className="size-32 lg:size-40" />
      <h3 className="font-semibold text-sm sm:text-base lg:text-lg max-w-44 text-center">
        {title}
      </h3>
    </motion.div>
  );
};

const faqs = [
  {
    question: "Do I have to pay a commission to Moving Essential?",
    answer:
      "No. Moving Essential does not take any commission from your closings. You keep 100% of your earnings — our platform is free to join and designed to support your growth, not cut into it.",
  },
  {
    question: "Can I showcase my listings or recent closings?",
    answer:
      "Yes. With a premium profile, you can highlight featured listings, recent sales, and even client testimonials to build trust and attract new buyers or sellers.",
  },
  {
    question: "Can I appear in multiple cities or zip codes?",
    answer:
      "Absolutely. You can expand your visibility across multiple cities, counties, or zip codes — a great option if you serve more than one area or are part of a regional team.",
  },
  {
    question: "Is an active license required to join?",
    answer:
      "Yes. We only accept licensed real estate professionals based in the U.S. This helps us maintain the quality and credibility of our platform for users searching for trusted agents.",
  },
  {
    question: "What extra features come with a premium profile?",
    answer:
      "Premium members receive enhanced visibility in multiple areas, priority placement in search results, advanced profile customization, and the ability to promote listings and gather reviews.",
  },
  {
    question: "How much does the premium upgrade cost, and is it monthly?",
    answer:
      "The premium upgrade is just $75/year — that’s less than $7/month, with no hidden fees or commissions. It’s a one-time annual payment that gives your profile extra reach and tools to stand out.",
  },
];

const RealtorPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Build a free online presence with no website required",
      image: "/assets/svg/landing-realtor-1.svg",
    },
    {
      title: "Get leads from buyers and movers in your area",
      image: "/assets/svg/landing-realtor-2.svg",
    },
    {
      title: "Personalize your profile with service areas",
      image: "/assets/svg/landing-realtor-3.svg",
    },
    {
      title: "Grow your closing rate and expand your network effortlessly",
      image: "/assets/svg/landing-realtor-4.svg",
    },
  ];

  return (
    <div className="padding-container w-full flex flex-col gap-24 my-10 md:my-24">
      {/* Section 1 */}
      <section className="flex-center w-full flex-col">
        <div className="get-app-landing flex-col items-center justify-center p-10 xl:px-0 md:flex-row">
          <div className="flex flex-col items-center gap-5 lg:gap-8">
            <h2 className="text-center title-landing leading-tight">
              Connect with Homebuyers <br />
              <span className="text-white">Who Are Ready to Find You</span>
            </h2>
            <Button
              className="w-full lg:w-[60%] bg-purple-500 text-color-1 border border-purple-500 rounded-2xl hover:bg-purple-100 hover:text-purple-500"
              onClick={() => navigate("/join/realtors")}
            >
              Create your free profile
            </Button>
          </div>
          <img
            src="/assets/img/landing-realtor-1.png"
            className="hidden md:block md:w-[50%]"
            alt=""
          />
        </div>
      </section>
      {/* Section 2 */}
      <section className="relative max-container w-full py-20 flex items-center flex-col gap-10">
        <img
          src="/assets/img/border.png"
          alt=""
          className="absolute w-16 xl:w-20 right-0 top-0"
        />
        <img
          src="/assets/img/border-2.png"
          alt=""
          className="absolute w-28 xl:w-36 left-0 bottom-0 rotate-180"
        />
        <img
          src="/assets/svg/landing-realtor-5.svg"
          alt="Feature"
          className="size-32 sm:size-40"
        />
        <h2 className="text-color-1 text-2xl md:text-3xl font-bold sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl text-center">
          Moving Essential is the go-to platform for future homeowners looking
          for a trusted realtor.
        </h2>
        <h2 className="text-2xl md:text-3xl font-bold sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl text-center">
          List your profile for free and appear in their searches at the exact
          moment they’re ready to take action.
        </h2>
      </section>
      {/* Section 3 */}
      <section className="max-container w-full lg:h-[72 0px]">
        <img
          src="/assets/img/landing-realtor-2.png"
          alt="Landing User"
          className="object-cover size-full"
        />
      </section>
      {/* Section 4 */}
      <section className="relative max-container w-full py-20 flex items-center flex-col gap-10">
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
          <h2 className="title-landing">
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
              index={index}
            />
          ))}
        </div>
        <Button
          className="bg-green-500 text-color-1 h-12 border border-green-500 rounded-2xl hover:bg-transparent hover:text-green-500"
          onClick={() => navigate("/join/realtors")}
        >
          Start Free Today
        </Button>
      </section>
      {/* Section 5 */}
      <section className="max-container flex items-center w-full gap-5">
        <div className="get-app-landing-2 flex-row p-8 xl:p-10 !items-center justify-center mt-auto lg:items-start lg:h-[305px] xl:h-[405px]">
          <div className="w-full flex flex-col gap-5 xl:gap-10">
            <h2 className="title-landing text-color-1 leading-none">
              Who Can Join?
            </h2>
            <ul className="text-white text-md lg:text-lg space-y-2 xl:space-y-4">
              <li className="flex items-center gap-2">
                <Circle className="text-color-1 size-2 fill-current" />
                Licensend real estate agents or broker associates.
              </li>
              <li className="flex items-center gap-2">
                <Circle className="text-color-1 size-2 fill-current" />
                Professionals working in residential or rental markets.
              </li>
              <li className="flex items-center gap-2">
                <Circle className="text-color-1 size-2 fill-current" />
                Agents with valid licenses anywhere in the U.S.
              </li>
            </ul>
            <Button
              className="lg:w-1/2 bg-white !text-black border border-white rounded-2xl hover:bg-transparent hover:!text-white"
              onClick={() => navigate("/join/realtors")}
            >
              More information
            </Button>
          </div>
          <img
            src="/assets/img/landing-realtor-3.png"
            className="hidden md:block lg:hidden w-[50%]"
            alt=""
          />
        </div>
        <img
          src="/assets/img/landing-realtor-3.png"
          className="hidden mt-auto lg:block w-1/2 lg:h-[340px] xl:h-[450px]"
          alt=""
        />
      </section>
      {/* Section 6 */}
      <section className="max-container flex items-center w-full gap-5">
        <img
          src="/assets/img/landing-realtor-4.png"
          className="hidden mt-auto lg:block w-1/2 lg:h-[340px] xl:h-[445px]"
          alt=""
        />
        <div className="get-app-landing flex-row p-8 xl:p-10 !items-center justify-center mt-auto lg:items-start lg:h-[305px] xl:h-[405px]">
          <div className="w-full flex flex-col gap-5 xl:gap-10">
            <h2 className="title-landing text-white leading-none">
              Who Can Join?
            </h2>
            <ul className="text-white text-md lg:text-lg space-y-2 xl:space-y-4">
              <li className="flex items-center gap-2">
                <Circle className="text-black size-2 fill-current" />
                Sign up for free - it takes less than 2 minutes.
              </li>
              <li className="flex items-center gap-2">
                <Circle className="text-black size-2 fill-current" />
                Customize your profile with your service areas and specialties.
              </li>
              <li className="flex items-center gap-2">
                <Circle className="text-black size-2 fill-current" />
                Start connecting with buyers and movers looking for a realtor
                like you.
              </li>
            </ul>
            <Button
              className="lg:w-1/2 bg-white !text-black border border-white rounded-2xl hover:bg-transparent hover:!text-white"
              onClick={() => navigate("/join/realtors")}
            >
              More information
            </Button>
          </div>
          <img
            src="/assets/img/landing-realtor-4.png"
            className="hidden md:block lg:hidden w-[50%]"
            alt=""
          />
        </div>
      </section>
      {/* Section 7 */}
      <section className="w-full flex flex-col">
        <div className="get-app-landing-3 lg:h-[300px] flex-col items-center justify-center p-0">
          <div className="w-full flex flex-col items-center gap-10">
            <h2 className="bold-32 lg:bold-52">Join our Network</h2>
            <Button
              className="lg:w-[20%] bg-black text-white border border-black rounded-2xl hover:bg-transparent hover:!text-black"
              onClick={() => navigate("/join/realtors")}
            >
              I&apos;m a Realtor
            </Button>
          </div>
        </div>
      </section>
      {/* Section 8 */}
      {/* <section className="flex-center w-full flex-col">
        <div className="get-app-landing flex-row items-center max-h-none !py-10 sm:px-28 md:px-12">
          <FAQs title="FAQs for Movers" options={faqs} />
          <img
            src="/assets/img/landing-realtor-5.png"
            className="hidden lg:block md:w-3/5 lg:w-2/5"
            alt=""
          />
        </div>
      </section> */}
      <section className="flex-center w-full flex-col">
        <div className="get-app-landing max-h-none flex-row items-center py-10 md:p-10">
          <FAQs title="FAQs for Realtors" options={faqs} />
          <img
            src="/assets/img/landing-realtor-5.png"
            className="hidden md:block md:w-[40%]"
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

export default RealtorPage;
