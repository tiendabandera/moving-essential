import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
//import { CiHeart, CiShare1 } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { TbPointFilled } from "react-icons/tb";
import FormReview from "@/components/forms/FormReview";
import CarouselReview from "@/components/CarouselReview";
import LikeCompany from "@/components/LikeCompany";
import { AnonymousView } from "@/components/AnonymousView";

const InternalPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { createCompanyInstance, user, createUserInstance } = useAuth();
  const [isOpenAnonymous, setIsOpenAnonymous] = useState(null);
  const [linkAnonymous, setLinkAnonymous] = useState(null);

  const [userLikes, setUserLikes] = useState(new Set());

  const [company, setCompany] = useState(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [owner, setOwner] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ownerButtonText, setOwnerButtonText] = useState("Get more reviews");
  const companyInstanceRef = useRef(null); // Evita re-creación de instancia
  const analyticsSentRef = useRef(false); // Controla si `submitAnalytics` ya se ejecutó

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

  const submitAnalytics = async (param, bypassCheck = false) => {
    if (
      companyInstanceRef.current &&
      (bypassCheck || !analyticsSentRef.current)
    ) {
      if (!bypassCheck) analyticsSentRef.current = true; // Marca que ya se envió la analítica
      await companyInstanceRef.current.submitAnalytics(param);
    }
  };

  useEffect(() => {
    const loadCompany = async () => {
      if (!params.id || companyInstanceRef.current) return;

      const company = await createCompanyInstance({
        id: params.id,
        business_type_id: 1,
      });

      companyInstanceRef.current = company; // Almacena la instancia de la empresa solo una vez
      const { data, error } = await company.getById();

      if (error) {
        navigate("/not-found");
        return;
      }

      setCompany(data);

      const resReviews = await company.getCompanyReviews();
      const totalReviews = resReviews.data.length;

      if (totalReviews > 0) {
        const totalRating = resReviews.totalRating;
        const average = (totalRating / totalReviews).toFixed(1);

        setReviews(resReviews.data);
        setAverageRating(average);
      }

      document.title = data.company_name; //Cambiar el titulo de la pagina
      submitAnalytics("internal_page");
    };

    loadCompany();
  }, [user, params]);

  useEffect(() => {
    validateUser();
  }, [user, company]);

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

  const validateUser = async () => {
    if (!user || !company) {
      setOwner(false);
      setUserLikes(new Set());
      return;
    }

    const userInstance = createUserInstance(user);
    const { data } = await userInstance.getLikes(company.id);

    setUserLikes(new Set(data.map((like) => like.company_id)));

    if (company.user_id === user.id) setOwner(true);

    return;
  };

  return (
    company && (
      <div>
        <div className="mt-[-3px] max-container lg:pt-20 lg:padding-container">
          <Carousel className="border border-gray-100 lg:rounded-3xl">
            <CarouselContent>
              {company.images.map((img, index) => (
                <CarouselItem key={index}>
                  <img
                    src={img}
                    alt=""
                    className="w-full h-[350px] lg:h-[500px] lg:rounded-3xl xl:h-[600px] object-cover"
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
                <div className="flex items-start gap-2">
                  <LikeCompany
                    company={company}
                    userLikes={userLikes}
                    setUserLikes={setUserLikes}
                    isLiked={userLikes.has(company.id)}
                    setIsOpenAnonymous={setIsOpenAnonymous}
                    className={"flex flex-col items-center"}
                    classNameText={"text-sm font-normal text-gray-50"}
                  />
                  <div className="flex flex-col items-center">
                    <SquareArrowOutUpRight
                      strokeWidth={1}
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => handleCopyLink()}
                    />
                    <span
                      className={`mt-[1px] text-sm font-normal text-gray-50 ${
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
                      <CustomIcon
                        key={index}
                        icon={network.icon}
                        className={`cursor-pointer`}
                        onClick={() => {
                          submitAnalytics(network.field, true);
                          window.open(company[network.field], "_blank");
                        }}
                      />
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
                    <CarouselReview
                      reviews={reviews}
                      isOwner={owner}
                      info={company}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:block lg:col-span-1 relative">
              <div className="sticky top-32">
                <FormGetQuote company={company} />
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
                <FormReview
                  company={company}
                  setIsOpenAnonymous={setIsOpenAnonymous}
                  setLinkAnonymous={setLinkAnonymous}
                />
              </div>
              {/* <div className="w-full flex flex-col items-center relative animate-float">
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
              </div> */}
              <div className="w-full h-[200px] lg:h-1/2 animate-float border border-gray-200 rounded-xl shadow-2xl">
                <img
                  src={company.images[0]}
                  alt={company.name}
                  className="rounded-xl w-full h-full object-cover"
                />
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
            <FormGetQuote className={"shadow-none!"} company={company} />
          </DialogContent>
        </Dialog>
        {isOpenAnonymous && (
          <AnonymousView
            isOpen={isOpenAnonymous}
            onClose={setIsOpenAnonymous}
            link={linkAnonymous}
          />
        )}
      </div>
    )
  );
};

export default InternalPage;
