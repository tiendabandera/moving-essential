import Button from "@/components/Button";
import { Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FAQs from "./components/FAQs";
import { motion } from "framer-motion";

const FeatureCard = ({ title, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.3 }}
      className="flex flex-col p-2 rounded-xl items-center justify-center shadow-md ring-1 ring-black/5"
    >
      <img src={image} alt="Feature" className="size-32 sm:size-40" />
      <h3 className="font-semibold text-sm sm:text-base lg:text-lg max-w-44 text-center">
        {title}
      </h3>
    </motion.div>
  );
};

const faqs = [
  {
    question: "Is there a premium option available?",
    answer:
      "Yes. While it’s free to list your business, we also offer a premium upgrade for companies that want more exposure and exclusive features.",
  },
  {
    question: "What features come with a premium profile?",
    answer:
      "Premium members get access to real-time leads, enhanced profile visibility in multiple zip codes, CRM integrations, and the ability to appeal reviews.",
  },
  {
    question: "What’s the cost to upgrade to premium?",
    answer:
      "Our premium package is competitively priced and month-to-month with no long-term contracts. Contact us to view the most up-to-date pricing.",
  },
  {
    question: "Do I need a website to join?",
    answer:
      "No website? No problem. We only require your business license and insurance. Your Moving Essential profile acts as a landing page to showcase your services.",
  },
  {
    question: "How do I view and manage leads?",
    answer:
      "You’ll receive lead notifications via email, and you can track and manage all leads directly through your dashboard.",
  },
  {
    question: "Can I edit my profile whenever I need to?",
    answer:
      "Yes. You can update your company information, photos, service areas, and more at any time — no approval needed.",
  },
  {
    question:
      "Can I list my company if I operate in multiple cities or states?",
    answer:
      "Absolutely. You can be visible in multiple locations to expand your reach and capture more leads.",
  },
  {
    question: "How are leads matched to my company?",
    answer:
      "We use location, availability, and service offerings to match your business with users actively searching in your area.",
  },
  {
    question: "Do I pay any commission on leads I receive?",
    answer:
      "No. All leads are 100% free — even with a basic listing. We never take a cut from your jobs.",
  },
  {
    question: "How long does it take to get listed?",
    answer:
      "Once you submit your information, we typically review and approve your profile within 1–2 business days.",
  },
];

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
    <div className="padding-container w-full flex flex-col gap-24 my-10 md:my-24">
      {/* Section 1 */}
      <section className="flex flex-col w-full">
        <div className="get-app-landing flex-col xl:flex-row items-center p-10 sm:px-20 sm:py-20 md:pb-0 xl:pt-10">
          <div className="pb-0 xl:pb-10 flex flex-col items-center xl:items-start gap-12">
            <h2 className="text-center font-bold text-4xl md:text-5xl xl:text-left md:max-w-xl text-pretty leading-tight">
              Get Your Moving Company in Front of More Clients.{" "}
              <span className="text-white">
                Be the first choice in your area with zero ad spend
              </span>
            </h2>
            <Button
              className="lg:w-[50%] bg-purple-500 text-color-1 border border-purple-500 rounded-2xl hover:bg-purple-100 hover:text-purple-500"
              onClick={() => navigate("/join/company")}
            >
              Create your free profile
            </Button>
          </div>
          <img
            src="/assets/img/landing-company-1.png"
            className="hidden md:block w-[70%] xl:w-1/2 mt-auto"
            alt=""
          />
        </div>
      </section>
      {/* Section 2 */}
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
              index={index}
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
      <section className="max-container flex items-center w-full gap-5">
        <div className="get-app-landing-2 flex-row p-8 xl:p-10 !items-center justify-center mt-auto lg:items-start h-[370px] xl:h-[450px]">
          <div className="w-full flex flex-col gap-5">
            <h2 className="bold-32 lg:bold-52 text-color-1">Who Can Join?</h2>
            <ul className="text-white text-lg space-y-4">
              <li className="flex items-center gap-2">
                <Circle className="text-color-1 size-2 fill-current" />
                Local or interstate moving companies
              </li>
              <li className="flex items-center gap-2">
                <Circle className="text-color-1 size-2 fill-current" />
                Licensed and insured businesses only
              </li>
              <li className="flex items-center gap-2">
                <Circle className="text-color-1 size-2 fill-current" />
                Serving residential or commercial clients welcome
              </li>
            </ul>
            <Button
              className="lg:w-1/2 bg-white !text-black border border-white rounded-2xl hover:bg-transparent hover:!text-white"
              onClick={() => navigate("/join/company")}
            >
              More information
            </Button>
          </div>
          <img
            src="/assets/img/landing-company-2.png"
            className="hidden md:block lg:hidden w-[50%]"
            alt=""
          />
        </div>
        <img
          src="/assets/img/landing-company-2.png"
          className="hidden lg:block w-[50%] lg:h-[390px] xl:w-1/2 mt-auto xl:h-[480px]"
          alt=""
        />
      </section>
      {/* Section 4 */}
      <section className="max-container flex items-center w-full gap-5">
        <img
          src="/assets/img/landing-company-3.png"
          className="hidden mt-auto w-[50%] lg:block lg:h-[430px] xl:w-1/2 xl:h-[480px]"
          alt=""
        />
        <div className="get-app-landing flex-row p-8 xl:p-10 !items-center justify-center mt-auto lg:items-start h-[400px] xl:h-[450px]">
          <div className="w-full flex flex-col gap-5">
            <h2 className="bold-32 lg:bold-52 text-white">How does it work?</h2>
            <ul className="text-white text-lg space-y-4">
              <li className="flex items-center gap-2">
                <Circle className="text-black size-2 fill-current" />
                Register for free
              </li>
              <li className="flex items-center gap-2">
                <Circle className="text-black size-2 fill-current" />
                Set up your profile with service areas and specialties
              </li>
              <li className="flex items-center gap-2">
                <Circle className="text-black size-2 fill-current" />
                Connect with people looking for a new home
              </li>
            </ul>
            <Button
              className="lg:w-1/2 bg-purple-500 text-white border border-purple-500 rounded-2xl hover:bg-purple-100 hover:text-purple-500"
              onClick={() => navigate("/join/company")}
            >
              Register for free now
            </Button>
          </div>
          <img
            src="/assets/img/landing-company-3.png"
            className="hidden md:block lg:hidden w-[50%]"
            alt=""
          />
        </div>
      </section>
      {/* Section 5 */}
      <section className="w-full flex flex-col">
        <div className="get-app-landing-3 h-[450px] flex-col items-center justify-center p-10 sm:px-20 sm:py-20 md:pb-0 xl:pt-10">
          <div className="w-full flex flex-col items-center gap-10">
            <h2 className="bold-32 lg:bold-52">Join our Network</h2>
            <Button
              className="lg:w-[20%] bg-color-1 text-white border border-color-1 rounded-2xl hover:bg-transparent hover:text-color-1"
              onClick={() => navigate("/join/company")}
            >
              I Own a Moving Company
            </Button>
          </div>
        </div>
      </section>
      {/* Section 6 */}
      <section className="flex-center w-full flex-col pb-[100px]">
        <div className="get-app-landing flex-col xl:flex-row items-center max-h-none !py-10 sm:px-28 md:px-12">
          <FAQs title="FAQs for Movers" options={faqs} />
          <img
            src="/assets/img/landing-company-4.png"
            className="hidden lg:block md:w-3/5 lg:w-1/2"
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

export default CompanyPage;
