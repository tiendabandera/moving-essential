import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomIcon from "@/components/design/CustomIcon";
import FormGetQuote from "@/components/forms/FormGetQuote";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { CiHeart, CiShare1 } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

const InternalPage = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const params = useParams();
  const { createCompanyInstance } = useAuth();

  const socialNetworks = [
    {
      field: "facebook_link",
      icon: Facebook,
    },
    {
      field: "instagram_link",
      icon: Instagram,
    },
    {
      field: "linkedin_link",
      icon: Linkedin,
    },
    {
      field: "youtube_link",
      icon: Youtube,
    },
    {
      field: "twitter_link",
      icon: FaXTwitter,
    },
    {
      field: "tiktok_link",
      icon: FaTiktok,
    },
  ];

  useEffect(() => {
    const loadCompany = async () => {
      if (params.id) {
        const { data, error } = await createCompanyInstance({
          id: params.id,
        }).getById();

        if (error) navigate("/not-found");

        setCompany(data);
      }
    };
    loadCompany();
  }, []);

  return (
    company && (
      <>
        <div className="mt-[-3px] md:max-container lg:pt-20">
          <Carousel className="border border-gray-100 lg:rounded-3xl">
            <CarouselContent>
              {company.images.map((img, index) => (
                <CarouselItem key={index}>
                  <img
                    src={img}
                    alt=""
                    className="w-full h-[350px] lg:h-[600px] lg:rounded-3xl"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {company.images.length > 1 && (
              <div className="hidden xl:flex">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            )}
          </Carousel>
        </div>
        <section className="max-container padding-container flex flex-col gap-20 py-10 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex flex-col-reverse gap-5 md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-semibold">
                  {company.company_name}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <CiHeart color="#ff0000" className="w-8 h-8" />
                    <span className="mt-[-4px] text-xs font-medium text-gray-50">
                      1
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <CiShare1 className="w-7 h-7" />
                    <span className="text-xs font-medium text-gray-50">
                      Share
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin strokeWidth={1} className="w-5 h-5" color="#EA6020" />
                <p className="text-gray-50 font-light">
                  {company.cities.name}, {company.state}, {company.zipcode}
                </p>
              </div>
              <p className="mt-5 font-medium text-lg">
                {company.local_moving.slogan}
              </p>
              <p className="text-gray-50 font-light text-justify">
                {company.local_moving.long_description}
              </p>
              <p className="mt-5 font-medium text-lg">How we charge:</p>
              <div className="flex text-gray-50 font-light">
                {(company.local_moving.rate_type_id === 2 ||
                  company.local_moving.rate_type_id === 3) && <p>Flat rate</p>}

                {company.local_moving.rate_type_id === 3 && (
                  <span className="mx-2 font-semibold text-black">/</span>
                )}

                {(company.local_moving.rate_type_id === 1 ||
                  company.local_moving.rate_type_id === 3) && (
                  <p>Hourly rate</p>
                )}
              </div>
              <div className="mt-5 flex gap-2">
                {socialNetworks.map(
                  (network, index) =>
                    company[network.field] && (
                      <Link
                        key={index}
                        target="_blank"
                        to={company[network.field]}
                      >
                        <CustomIcon icon={network.icon} />
                      </Link>
                    )
                )}
              </div>
            </div>
            <div className="lg:col-span-1">
              <FormGetQuote />
            </div>
          </div>
        </section>
      </>
    )
  );
};

export default InternalPage;
