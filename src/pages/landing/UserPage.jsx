import Button from "@/components/Button";
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
    question: "Is there a cost for me to join?",
    answer:
      "No — it’s completely free to list your business and receive leads on our platform.",
  },
  {
    question: "How do you verify the companies?",
    answer:
      "We manually review each submission to ensure companies meet our quality standards and operate legally in their service areas.",
  },
  {
    question: "Which cities are available?",
    answer:
      "We’re expanding across all 50 U.S. states. You can search or list based on your target zip codes and cities.",
  },
  {
    question: "Can I register if I operate in multiple states?",
    answer:
      "Absolutely. You can list in multiple cities or states — all under one profile, completely free.",
  },
];

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
    <div className="padding-container-2 w-full flex flex-col gap-24">
      {/* Section 1 */}
      <section className="mt-10 md:mt-24 flex-center w-full flex-col">
        <div className="get-app-landing flex-col md:flex-row items-center p-6 sm:px-28 md:px-12">
          <div className="flex flex-col gap-12">
            <h2 className="text-center font-bold text-4xl md:text-5xl xl:text-6xl md:text-left xl:max-w-xl text-pretty leading-tight">
              Compare Top Moving Services & Realtors{" "}
              <span className="text-white">All in One Place</span>
            </h2>
            <Button
              className="lg:w-[50%] bg-purple-500 text-color-1 border border-purple-500 rounded-2xl hover:bg-purple-100 hover:text-purple-500"
              onClick={() => navigate("/")}
            >
              See more
            </Button>
          </div>
          <img
            src="/assets/img/landing-user-1-1.png"
            className="hidden md:block md:w-1/2"
            alt=""
          />
        </div>
      </section>
      {/* Section 2 */}
      <section className="relative max-container w-full py-20 flex flex-center flex-col gap-10">
        <img
          src="/assets/img/border.png"
          alt=""
          className="absolute w-16 lg:w-20 left-0 top-0"
        />
        <img
          src="/assets/img/border-2.png"
          alt=""
          className="absolute w-28 lg:w-40 right-0 bottom-0"
        />
        <h2 className="text-3xl lg:text-5xl font-bold sm:max-w-2xl lg:max-w-3xl xl:max-w-6xl text-center">
          Save time and money by instantly comparing prices, and verified
          ratings.
        </h2>
        <p className="md:text-2xl font-medium text-color-1 text-center">
          Start now — it’s free to search and connect.
        </p>
        <div className="flex flex-col sm:flex-row flex-center gap-4 sm:gap-10">
          <Button
            className="bg-purple-500 text-color-1 h-12 border border-purple-500 rounded-2xl hover:bg-transparent hover:text-purple-500"
            onClick={() => navigate("/local-moving/compare")}
          >
            Search Moving Companies
          </Button>
          <Button
            className="bg-purple-500 text-color-1 h-12 border border-purple-500 rounded-2xl hover:bg-transparent hover:text-purple-500"
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
          className="absolute w-16 lg:w-28 right-0 top-0"
        />
        <img
          src="/assets/img/border-2.png"
          alt=""
          className="absolute w-28 lg:w-52 left-0 bottom-0 rotate-180"
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
              index={index}
            />
          ))}
        </div>
      </section>
      {/* Section 5 */}
      <section className="flex-center w-full flex-col pb-[100px]">
        <div className="get-app-landing flex-row items-center py-10 sm:px-28 md:px-12">
          <FAQs title="Frequently Asked Questions" options={faqs} />
          <img
            src="/assets/img/landing-user-3.png"
            className="hidden md:block md:w-2/5"
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

export default UserPage;
