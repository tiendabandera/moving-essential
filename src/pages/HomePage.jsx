import SearchCompanies from "@/components/SearchCompanies";
import curve from "../assets/img/curve.png";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RepeaterCompanies from "@/components/RepeaterCompanies";

const HomePage = () => {
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
                src={`./src/assets/img/person-1.png`}
                alt="Person-1"
                className="w-10 h-10 rounded-full border-2 border-gray-10"
              />
              <img
                src={`./src/assets/img/person-2.png`}
                alt="Person-2"
                className="w-10 h-10 rounded-full border-2 border-gray-10 ml-[-1.2rem]"
              />
              <img
                src={`./src/assets/img/person-3.png`}
                alt="Person-3"
                className="w-10 h-10 rounded-full border-2 border-gray-10 ml-[-1.2rem]"
              />
              <img
                src={`./src/assets/img/person-4.png`}
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
                  src="./src/assets/svg/close.svg"
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
      <section className="max-container padding-container flex flex-col items-center gap-10 mb-14">
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
      <section className="max-container padding-container h-28"></section>
    </div>
  );
};

export default HomePage;
