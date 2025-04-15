import SearchCompanies from "@/components/SearchCompanies";
import { Button } from "@/components/ui/button";
import {
  ChartNoAxesCombined,
  ChevronRight,
  Handshake,
  Headset,
  House,
  Search,
  Truck,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RepeaterCompanies from "@/components/RepeaterCompanies";
import { useState } from "react";
import RepeaterRealtors from "@/components/RepeaterRealtors";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("local-moving");

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
      <section className="max-container padding-container flex flex-col items-center gap-10 mb-40 pt-10">
        <SearchCompanies service={activeTab} />
        <Tabs
          defaultValue="local-moving"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="w-fit h-fit grid grid-cols-2 mb-10">
            <TabsTrigger value="local-moving">
              <div className="flex flex-col items-center">
                <Truck className="size-7" strokeWidth={1.2} />
                <p className="!text-xs">Local Moving</p>
              </div>
            </TabsTrigger>
            <TabsTrigger value="realtors">
              <div className="flex flex-col items-center">
                <House className="size-7" strokeWidth={1.2} />
                <p className="!text-xs">Realtors</p>
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="local-moving">
            <RepeaterCompanies className="!px-0" />
          </TabsContent>
          <TabsContent value="realtors">
            <RepeaterRealtors className="!px-0" />
          </TabsContent>
        </Tabs>
      </section>
      <section className="flex-center w-full flex-col pb-[100px]">
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
              <Button
                className="bg-white text-color-1 h-12 border border-white rounded-2xl hover:bg-transparent hover:text-white"
                onClick={() => navigate("/join")}
              >
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
                  <p className="text-sm mt-2 text-gray-50 lg:mt-[10px] lg:bg-none text-justify">
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
