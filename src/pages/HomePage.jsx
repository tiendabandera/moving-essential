import SearchCompanies from "@/components/SearchCompanies";
import curve from "../assets/img/curve.png";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ChartNoAxesCombined,
  ChevronRight,
  Handshake,
  Headset,
  Search,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RepeaterCompanies from "@/components/RepeaterCompanies";

const HomePage = () => {
  const FeatureItem = [
    {
      icon: ChartNoAxesCombined,
      title: "Convenience",
      description:
        "By providing all the necessary services under one platform, we make it easier for you to find the right company for your needs. No more searching through numerous websites or making endless phone calls.",
    },
    {
      icon: Search,
      title: "Transparency",
      description:
        "We provide no-cost quotations from different moving and real estate companies, allowing you to compare costs and choose a company that fits your budget. This ensures transparency in the pricing process.",
    },
    {
      icon: Handshake,
      title: "Reputable Companies",
      description:
        "We only work with reputable and licensed companies, ensuring the safety and security of the process. You can rest assured that professionals will handle your needs.",
    },
    {
      icon: Headset,
      title: "Customer Service",
      description:
        "Our team can always answer any questions or concerns. We strive to provide a seamless and stress-free experience for our customers.",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <section className="max-container padding-container flex flex-col gap-20 py-10 pb-20 md:gap-28 lg:py-20 xl:flex-row">
        <div className="hero-map" />
        <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
          <div>
            <h1 className="bold-52 lg:bold-88">Compare Moving Services Near</h1>
            <span className="bold-52 lg:bold-88 inline-block relative">
              You Today!
              <img
                src={curve}
                className="absolute top-full left-0 w-full"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </div>
          <p className="regular-16 mt-11 text-gray-50 xl:max-w-[520px]">
            Find reputable realtors and movers near you to ease the burden. Just
            let us know about your move to get NO-COST moving quotations.
            Compare costs and get in touch with movers or realtors near your
            area.
          </p>
          <div className="my-11 flex items-center flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <img
                src={`/assets/img/person-1.png`}
                alt="Person-1"
                className="w-10 h-10 rounded-full border-2 border-gray-10"
              />
              <img
                src={`/assets/img/person-2.png`}
                alt="Person-2"
                className="w-10 h-10 rounded-full border-2 border-gray-10 ml-[-1.2rem]"
              />
              <img
                src={`/assets/img/person-3.png`}
                alt="Person-3"
                className="w-10 h-10 rounded-full border-2 border-gray-10 ml-[-1.2rem]"
              />
              <img
                src={`/assets/img/person-4.png`}
                alt="Person-3"
                className="w-10 h-10 rounded-full border-2 border-gray-10 ml-[-1.2rem]"
              />
            </div>
            <span className="font-semibold">Come and join us</span>
          </div>
          <div className="flex flex-col w-full gap-3 sm:flex-row">
            <Button className="bg-color-1 h-12 border border-color-1 rounded-full hover:bg-transparent hover:text-color-1">
              Explore everything we have for you <ChevronRight />
            </Button>
          </div>
        </div>
        <div className="relative flex flex-1 items-start">
          <div className="relative z-20 flex w-[268px] flex-col gap-8 rounded-3xl bg-color-1 px-7 py-8">
            <div className="flex flex-col">
              <div className="flexBetween">
                <p className="font-normal">Location</p>
                <img
                  src="/assets/svg/close.svg"
                  alt="close"
                  width={24}
                  height={24}
                />
              </div>
              <p className="bold-20 text-white">5489 NW 27th St, Margate</p>
            </div>

            <div className="flexBetween">
              <div className="flex flex-col">
                <p className="block font-normal">State</p>
                <p className="bold-20 text-white">Florida</p>
              </div>
              <div className="flex flex-col">
                <p className="block font-normal">Zipcode</p>
                <p className="bold-20 text-white">33063</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-container padding-container flex flex-col items-center gap-10 mb-40">
        <Separator className="" />
        <SearchCompanies />
        <Tabs defaultValue="local-moving" className="w-full">
          <TabsList className="grid grid-cols-2 mb-10">
            <TabsTrigger value="local-moving">Local Moving</TabsTrigger>
            <TabsTrigger value="realors">Realtors</TabsTrigger>
          </TabsList>
          <TabsContent value="local-moving">
            <RepeaterCompanies />
          </TabsContent>
          <TabsContent value="realors"></TabsContent>
        </Tabs>
      </section>
      <section className="flexCenter w-full flex-col pb-[100px]">
        <div className="get-app">
          <div className="z-20 flex w-full flex-1 flex-col items-start justify-center gap-12">
            <h2 className="bold-40 lg:bold-64 xl:max-w-[420px]">
              Why Choose Moving Essential?
            </h2>
            <p className="text-base xl:max-w-[480px]">
              Our online business directory is the choice for all your moving
              needs. Here is what sets us apart from the competition:
            </p>
            <div className="flex w-full flex-col gap-3 whitespace-nowrap xl:flex-row">
              <Button className="bg-white text-color-1 h-12 border border-white rounded-2xl hover:bg-transparent hover:text-white">
                Explore everything we have for you <ChevronRight />
              </Button>
            </div>
          </div>
          <div className="flex flex-1 items-center">
            <ul className="grid gap-8 md:grid-cols-2 lg:gap-5 bg-white p-5 rounded-xl">
              {FeatureItem.map((item) => (
                <li
                  key={item.title}
                  className="flex w-full flex-1 flex-col items-start"
                >
                  <div className="rounded-full p-3 bg-gray-10">
                    <item.icon strokeWidth={1} width={25} height={25} />
                  </div>
                  <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
                  <p className="text-base mt-2 text-gray-50 lg:mt-[10px] lg:bg-none text-justify">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
