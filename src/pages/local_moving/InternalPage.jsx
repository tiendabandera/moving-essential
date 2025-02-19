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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  SquareArrowOutUpRight,
} from "lucide-react";

import { FaStar, FaTiktok } from "react-icons/fa";
import { CiHeart, CiShare1 } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { TbPointFilled } from "react-icons/tb";
import FormReview from "@/components/forms/FormReview";
import CarouselReview from "@/components/CarouselReview";

const InternalPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { createCompanyInstance, user } = useAuth();

  const [company, setCompany] = useState(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [owner, setOwner] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ownerButtonText, setOwnerButtonText] = useState("Get more reviews");

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
        const company = await createCompanyInstance({
          id: params.id,
        });

        const { data, error } = await company.getCompanyById();
        if (error) navigate("/not-found");

        if (user && data.user_id === user.id) setOwner(true);

        setCompany(data);
        const resReviews = await company.getAllReviews();
        const totalReviews = resReviews.data.length;

        if (totalReviews > 0) {
          const totalRating = resReviews.totalRating;
          const average = (totalRating / totalReviews).toFixed(1);

          setReviews(resReviews.data);
          setAverageRating(average);
        }

        document.title = data.company_name; //Cambiar el titulo de la pagina
      }
    };
    loadCompany();
  }, [user, params]);

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
    company && (
      <div>
        <div className="mt-[-3px] md:max-container lg:pt-20 lg:padding-container">
          <Carousel className="border border-gray-100 lg:rounded-3xl">
            <CarouselContent>
              {company.images.map((img, index) => (
                <CarouselItem key={index}>
                  <img
                    src={img}
                    alt=""
                    className="w-full h-[350px] lg:h-[500px] lg:rounded-3xl xl:h-[600px]"
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
        <section className="max-container padding-container flex flex-col gap-12 py-10 pb-20">
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
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin strokeWidth={1} className="w-5 h-5" color="#EA6020" />
                <p className="text-gray-50 font-light">
                  {company.cities.name}, {company.state}, {company.zipcode}
                </p>
              </div>
              <div className="mt-8">
                <p className="font-medium text-lg">{company.service.slogan}</p>
                <p className="text-gray-50 font-light text-justify">
                  {company.service.long_description}
                </p>
              </div>
              <p className="mt-8 font-medium text-lg">How we charge:</p>
              <div className="flex text-gray-50 font-light">
                {(company.service.rate_type_id === 2 ||
                  company.service.rate_type_id === 3) && <p>Flat rate</p>}

                {company.service.rate_type_id === 3 && (
                  <span className="mx-2 font-semibold text-black">/</span>
                )}

                {(company.service.rate_type_id === 1 ||
                  company.service.rate_type_id === 3) && <p>Hourly rate</p>}
              </div>
              <div className="mt-8 flex gap-2">
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
              <div className="md:hidden">
                <Separator className="my-8" />
                <Button
                  className="w-full bg-color-1 border border-color-1 rounded-md hover:bg-transparent hover:text-color-1"
                  type="submit"
                  onClick={() => setOpen(true)}
                >
                  Get a quote
                </Button>
              </div>
              <div className="flex flex-col">
                <Separator className="my-8" />
                <h3 className="text-3xl font-semibold">Reviews</h3>
                <div className="flex gap-1 items-center">
                  <FaStar className="w-4 h-4" color="#ffe424" />
                  <p className="text-gray-50 font-light">{averageRating}</p>
                  <TbPointFilled className="w-3 h-3" />
                  <p className="text-gray-50 font-light">
                    {reviews.length} reviews
                  </p>
                </div>
                {reviews.length > 0 && (
                  <div className="mt-5 flex justify-center">
                    <CarouselReview reviews={reviews} />
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:block lg:col-span-1 relative">
              <div className="sticky top-32">
                <FormGetQuote />
              </div>
            </div>
          </div>
          <div id="form-reviews" className="flex flex-col">
            <Separator className="my-5" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="flex flex-col xs:flex-row lg:col-span-2 w-full gap-3 justify-between">
                <h3 className="text-3xl font-semibold">Write review</h3>
                {owner && (
                  <Button
                    className="bg-black border border-black rounded-md hover:bg-transparent hover:text-black group"
                    type="button"
                    onClick={() => {
                      setOwnerButtonText("Copied!");
                      handleCopyLink("#form-reviews");

                      setTimeout(() => {
                        setOwnerButtonText("Get more reviews");
                      }, 1500);
                    }}
                  >
                    {ownerButtonText}
                    <SquareArrowOutUpRight className="h-4 w-4 text-white transition-colors group-hover:text-black" />
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <FormReview company={company} />
              </div>
              <div className="w-full flex flex-col items-center relative animate-float">
                <img
                  src="/assets/img/form-review-2.png"
                  alt="form-review"
                  className="object-cover"
                />
                <div className="flex items-center bg-white py-1 px-2 -mt-20 gap-2 rounded-lg shadow-2xl ring-1 ring-gray-100">
                  <div className="size-15 flex items-center">
                    <img
                      src="/assets/img/cohete.png"
                      alt="Tell us about your experience"
                      className="bg-gray-100 rounded-lg object-cover"
                    />
                  </div>
                  <p className="text-xs font-medium w-auto">
                    Tell us about your experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl"></DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <FormGetQuote className={" shadow-none!"} />
          </DialogContent>
        </Dialog>
      </div>
    )
  );
};

export default InternalPage;
