import { useEffect, useState } from "react";
import ConnectPlatform from "./components/ConnectPlatform";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

const CardSummary = ({ title, img, id, setIsOpen, setPlatform }) => {
  const handleClick = () => {
    setIsOpen(true);
    setPlatform(id);
  };

  return (
    <div
      className="shadow-xs bg-background rounded-lg p-5 py-3 hover:shadow-lg transition flex flex-col items-center cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-full border-1 rounded-lg">
        <img
          src={img}
          alt={`${title} integration`}
          className="w-full object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col items-center gap-2 mt-2 md:mt-4">
        <p className="font-normal">{title}</p>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Connect
        </Button>
      </div>
    </div>
  );
};

const IntegrationsPage = () => {
  const services = [
    {
      title: "Salesforce",
      img: "/assets/img/crm/salesforce.png",
      id: "salesforce",
    },
    {
      title: "Zoho",
      img: "/assets/img/crm/zoho.png",
      id: "zoho",
    },
    {
      title: "Hubspot",
      img: "/assets/img/crm/hubspot.png",
      id: "hubspot",
    },
    {
      title: "Monday Sales",
      img: "/assets/img/crm/monday.png",
      id: "monday",
    },
    {
      title: "Kommo",
      img: "/assets/img/crm/kommo.png",
      id: "kommo",
    },
    {
      title: "Teamleader",
      img: "/assets/img/crm/teamleader.png",
      id: "teamleader",
    },
  ];

  const [searchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());

  const [isOpen, setIsOpen] = useState(false);
  const [platform, setPlatform] = useState(null);

  useEffect(() => {
    if (paramsObject.code) {
      setIsOpen(true);
      setPlatform("teamleader");
    }
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <h2 className="text-2xl font-normal">Integrations</h2>
        <p>
          You can integrate your CRM into Moving Essential to keep data updated
          and synchronized.
        </p>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
            {services.map((service) => (
              <CardSummary
                key={service.id}
                title={service.title}
                img={service.img}
                id={service.id}
                setIsOpen={setIsOpen}
                setPlatform={setPlatform}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4 items-start bg-background rounded-lg p-5">
            <div>
              <h2 className="text-xl font-normal">Tutorials</h2>
              <p>Step by step video tutorials:</p>
            </div>
            <ul className="space-y-2 border-l-1 border-color-1 pl-4">
              <li>Salesforce</li>
              <li>Zoho</li>
              <li>HubSpot</li>
              <li>Monday Sales</li>
              <li>Kommo</li>
              <li>Teamleader</li>
            </ul>
          </div>
        </div>
      </div>
      {isOpen && (
        <ConnectPlatform
          platform={platform}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          params={paramsObject}
        />
      )}
    </>
  );
};

export default IntegrationsPage;
