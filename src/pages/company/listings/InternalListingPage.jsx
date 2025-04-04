import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatPrice } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { GetCosultationButton } from "@/pages/realtors/InternalPage";
import { MapPinHouse } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CiShare1 } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";

const CarouselImages = ({ property }) => {
  return (
    <div className="mt-[-5px] md:max-container lg:pt-20 lg:padding-container">
      <Carousel className="block lg:hidden border border-gray-100 lg:rounded-3xl">
        <CarouselContent>
          {property.images.map((img, index) => (
            <CarouselItem key={index}>
              <img
                src={img}
                alt=""
                className="w-full h-[350px] lg:h-[500px] lg:rounded-3xl xl:h-[600px]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {property.images.length > 1 && (
          <div className="hidden xl:flex">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        )}
      </Carousel>
      <div className="hidden border border-gray-100 rounded-3xl h-[500px] lg:flex lg:gap-5">
        <div className="w-[35%]">
          <img
            src={property.images[0]}
            alt="property"
            className="w-full h-full object-cover rounded-l-3xl"
          />
        </div>
        <div className="flex-auto rounded-r-3xl">
          <div className="w-full h-full grid grid-cols-3 gap-5">
            <div className="w-full h-auto overflow-hidden">
              <img
                src={property.images[1]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-auto overflow-hidden">
              <img
                src={property.images[2]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-auto overflow-hidden rounded-tr-3xl">
              <img
                src={property.images[3]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-auto overflow-hidden">
              <img
                src={property.images[4]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-auto overflow-hidden">
              <img
                src={property.images[5]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-auto overflow-hidden rounded-br-3xl">
              <img
                src={property.images[6]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InternalListingPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const realtorInstanceRef = useRef(null); // Evita re-creación de instancia
  const analyticsSentRef = useRef(false); // Controla si `submitAnalytics` ya se ejecutó
  const [property, setProperty] = useState(null);
  const [copied, setCopied] = useState(false);

  const { createCompanyInstance } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const realtorInstance = await createCompanyInstance({
          id: params.id,
        });

        realtorInstanceRef.current = realtorInstance; // Almacena la instancia solo una vez

        const { data, error } = await realtorInstance.getListingById();
        if (error) navigate("/not-found");

        setProperty(data);
      }
    };

    fetchData();
  }, [params]);

  const submitAnalytics = async (param, bypassCheck = false) => {
    if (
      realtorInstanceRef.current &&
      (bypassCheck || !analyticsSentRef.current)
    ) {
      if (!bypassCheck) analyticsSentRef.current = true; // Marca que ya se envió la analítica
      await realtorInstanceRef.current.submitAnalytics(param);
    }
  };

  const handleCopyLink = async (query = "") => {
    const urlBase = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    const shareLink = `${urlBase}${query}`;
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Ocultar el mensaje después de 2s
    } catch (err) {
      console.error("Error copying link: ", err);
    }
  };

  return (
    property && (
      <>
        <title>{property.address}</title>
        <CarouselImages property={property} />
        <section className="max-container padding-container flex flex-col gap-12 py-10 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <div className="flex flex-col-reverse gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col">
                  <h1 className="text-3xl font-semibold text-color-1">
                    $ {formatPrice(property.price)}
                  </h1>
                  <p className="font-medium text-lg">{property.address}</p>
                </div>
                <div className="flex gap-2 items-start">
                  <div className="flex flex-col items-center">
                    <CiShare1
                      className="w-7 h-7 cursor-pointer"
                      onClick={() => handleCopyLink()}
                    />
                    <span
                      className={`text-xs font-medium text-gray-50 ${
                        copied ? "text-color-1!" : ""
                      }`}
                    >
                      {copied ? "Copied!" : "Share"}
                    </span>
                  </div>
                  <MapPinHouse
                    className="w-7 h-7 cursor-pointe"
                    strokeWidth={1}
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 relative">
              <div className="sticky top-32">
                <GetCosultationButton
                  phone={property.realtor.phone}
                  submitAnalytics={submitAnalytics}
                  info={property.realtor}
                />
              </div>
            </div>
          </div>
        </section>
      </>
    )
  );
};

export default InternalListingPage;
