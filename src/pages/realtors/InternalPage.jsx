import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
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
  BrickWall,
  GraduationCap,
  BadgeDollarSign,
  BriefcaseBusiness,
  Unlink,
} from "lucide-react";

import { FaStar, FaTiktok } from "react-icons/fa";
import { CiShare1 } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { TbPointFilled } from "react-icons/tb";
import FormReview from "@/components/forms/FormReview";
import CarouselReview from "@/components/CarouselReview";
import { homeTypes } from "@/constants";
import { AnonymousView } from "@/components/AnonymousView";
import LikeCompany from "@/components/LikeCompany";
import GoogleMap from "@/components/GoogleMap";

export const GetCosultationButton = ({ phone, submitAnalytics, info }) => {
  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center py-6 px-10 border border-gray-200 rounded-xl shadow-2xl text-center">
      <h3 className="font-semibold text-3xl">Get a Consultation</h3>
      {info && (
        <div className="flex flex-col items-center">
          <img
            src={info.images[0]}
            alt="Realtor profile"
            className="w-20 h-20 rounded-lg"
          />
          <h3 className="mt-3 font-medium text-lg">
            {info.user_info.user_metadata.name}
          </h3>
          <p>{info.company_name}</p>
        </div>
      )}
      <Button
        className="w-full bg-color-1 border border-color-1 rounded-md hover:bg-transparent hover:text-color-1"
        onClick={() => {
          if (submitAnalytics) submitAnalytics("phone_number", true);
          window.open(`tel:${phone}`);
        }}
      >
        Phone number
      </Button>
      <span>Talk to a knowledgeable agent, not a call center</span>
    </div>
  );
};

const InternalPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { createCompanyInstance, user, createUserInstance } = useAuth();
  const [isOpenAnonymous, setIsOpenAnonymous] = useState(null);
  const [userLikes, setUserLikes] = useState(new Set());

  const [realtor, setCompany] = useState(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [owner, setOwner] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ownerButtonText, setOwnerButtonText] = useState("Get more reviews");
  const realtorInstanceRef = useRef(null); // Evita re-creación de instancia
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

  const listingsTypes = [
    {
      title: "Houses for sale",
      bg: "bg-[#0288D1]",
    },
    {
      title: "Sold houses",
      bg: "bg-[#dd0808]",
    },
    {
      title: "Open houses",
      bg: "bg-[#558B2F]",
    },
    {
      title: "Pending houses",
      bg: "bg-[#faeb1c]",
    },
  ];

  const submitAnalytics = async (param, bypassCheck = false) => {
    if (
      realtorInstanceRef.current &&
      (bypassCheck || !analyticsSentRef.current)
    ) {
      if (!bypassCheck) analyticsSentRef.current = true; // Marca que ya se envió la analítica
      await realtorInstanceRef.current.submitAnalytics(param);
    }
  };

  useEffect(() => {
    const loadRealtor = async () => {
      if (params.id) {
        const realtorInstance = await createCompanyInstance({
          id: params.id,
          business_type_id: 2,
        });

        realtorInstanceRef.current = realtorInstance; // Almacena la instancia solo una vez
        const { data, error } = await realtorInstance.getById();

        if (error) navigate("/not-found");

        setCompany(data);

        const resReviews = await realtorInstance.getAllReviews();
        const totalReviews = resReviews.data.length;

        if (totalReviews > 0) {
          const totalRating = resReviews.totalRating;
          const average = (totalRating / totalReviews).toFixed(1);

          setReviews(resReviews.data);
          setAverageRating(average);
        }

        document.title = data.user_info.user_metadata.realtor_name; //Cambiar el titulo de la pagina
        submitAnalytics("internal_page");
      }
    };

    loadRealtor();
  }, [user, params]);

  useEffect(() => {
    validateUser();
  }, [user, realtor]);

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
    if (!user || !realtor) {
      setOwner(false);
      setUserLikes(new Set());
      return;
    }

    const userInstance = createUserInstance(user);
    const { data } = await userInstance.getLikes(realtor.id);

    setUserLikes(new Set(data.map((like) => like.company_id)));

    if (realtor.user_id === user.id) setOwner(true);

    return;
  };

  return (
    realtor && (
      <div>
        <div className="mt-[-5px] md:max-container lg:pt-20 lg:padding-container">
          <Carousel className="block lg:hidden border border-gray-100 lg:rounded-3xl">
            <CarouselContent>
              {realtor.images.map((img, index) => (
                <CarouselItem key={index}>
                  <img
                    src={img}
                    alt=""
                    className="w-full h-[350px] lg:h-[500px] lg:rounded-3xl xl:h-[600px]"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {realtor.images.length > 1 && (
              <div className="hidden xl:flex">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            )}
          </Carousel>
          <div className="hidden border border-gray-100 rounded-3xl h-[500px] lg:flex lg:gap-5">
            <div className="w-[35%]">
              <img
                src={realtor.images[0]}
                alt="Realtor"
                className="w-full h-full object-cover rounded-l-3xl"
              />
            </div>
            <div className="flex-auto rounded-r-3xl">
              <div className="w-full h-full grid grid-cols-3 gap-5">
                <div className="w-full h-auto overflow-hidden">
                  <img
                    src={realtor.images[1]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-auto overflow-hidden">
                  <img
                    src={realtor.images[2]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-auto overflow-hidden rounded-tr-3xl">
                  <img
                    src={realtor.images[3]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-auto overflow-hidden">
                  <img
                    src={realtor.images[4]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-auto overflow-hidden">
                  <img
                    src={realtor.images[5]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-auto overflow-hidden rounded-br-3xl">
                  <img
                    src={realtor.images[6]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="max-container padding-container flex flex-col gap-12 py-10 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <div className="flex flex-col-reverse gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col">
                  <h1 className="text-3xl font-semibold">
                    {realtor.user_info.user_metadata.realtor_name}
                  </h1>
                  <p className="font-medium text-lg">{realtor.company_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <LikeCompany
                    company={realtor}
                    userLikes={userLikes}
                    setUserLikes={setUserLikes}
                    isLiked={userLikes.has(realtor.id)}
                    setIsOpenAnonymous={setIsOpenAnonymous}
                    className={"flex flex-col items-center"}
                    classNameText={"text-sm font-normal text-gray-50"}
                  />
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
                  {realtor.cities.name}, {realtor.state}, {realtor.zipcode}
                </p>
              </div>
              <p className="mt-8 font-medium text-lg">About me</p>
              <p className="text-gray-50 font-light text-justify">
                {realtor.service.bio}
              </p>
              {realtor.service.agency_website && (
                <Button
                  variant="link"
                  className="mt-8 text-color-1 text-base text-left p-0"
                  asChild
                >
                  <Link to={realtor.service.agency_website}>
                    <Unlink />
                    Website
                  </Link>
                </Button>
              )}
              <Separator className="my-8" />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-x-5 gap-y-2 md:flex-row items-start">
                  <BrickWall />
                  <div className="flex flex-col gap-1 ">
                    <p className="font-medium text-lg leading-none">
                      Homes types:
                    </p>
                    <p className="text-gray-50 font-light">
                      {realtor.service.home_types
                        .map((name) => {
                          const type = homeTypes.find(
                            (type) => type.value === name
                          );
                          return type.label;
                        })
                        .join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-x-5 gap-y-2 md:flex-row items-start">
                  <GraduationCap />
                  <div className="flex flex-col gap-1 ">
                    <p className="font-medium text-lg leading-none">Title:</p>
                    <p className="text-gray-50 font-light">
                      {realtor.service.title_work}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-x-5 gap-y-2 md:flex-row items-start">
                  <BadgeDollarSign />
                  <div className="flex flex-col gap-1 ">
                    <p className="font-medium text-lg leading-none">
                      Total sales:
                    </p>
                    <p className="text-gray-50 font-light">
                      {realtor.service.total_sales}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-x-5 gap-y-2 md:flex-row items-start">
                  <BriefcaseBusiness />
                  <div className="flex flex-col gap-1 ">
                    <p className="font-medium text-lg leading-none">
                      Years of experience:
                    </p>
                    <p className="text-gray-50 font-light">
                      {realtor.service.experience}
                    </p>
                  </div>
                </div>
              </div>
              <Separator className="my-8" />
              <div className="mt-8 flex gap-2">
                {socialNetworks.map(
                  (network, index) =>
                    realtor[network.field] && (
                      <CustomIcon
                        key={index}
                        className={`cursor-pointer`}
                        icon={network.icon}
                        onClick={() => {
                          submitAnalytics(network.field, true);
                          window.open(realtor[network.field], "_blank");
                        }}
                      />
                    )
                )}
              </div>
              <div className="md:hidden">
                <Separator className="my-8" />
                <GetCosultationButton
                  phone={realtor.phone}
                  submitAnalytics={submitAnalytics}
                />
              </div>
              {realtor.has_premium_features &&
                realtor.properties.length > 0 && (
                  <div className="flex flex-col">
                    <Separator className="my-8" />
                    <h3 className="text-3xl font-semibold">Listings</h3>
                    <div className="my-8 shadow-xs border border-slate-200 rounded-lg p-5 flex gap-2 justify-between">
                      {listingsTypes.map((listingType) => (
                        <div
                          key={listingType.title}
                          className="flex flex-col gap-2 items-center"
                        >
                          <div
                            className={`py-2 px-3 rounded-[50%] ${listingType.bg} w-fit text-white `}
                          >
                            <i className="fa fa-icon fa-home"></i>
                          </div>
                          <p className="font-medium text-sm">
                            {listingType.title}
                          </p>
                        </div>
                      ))}
                    </div>
                    <GoogleMap
                      center={realtor.center}
                      properties={realtor.properties}
                    />
                    <Separator className="my-8" />
                  </div>
                )}
              <div className="flex flex-col">
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
                      info={realtor}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:block lg:col-span-1 relative">
              <div className="sticky top-32">
                <GetCosultationButton
                  phone={realtor.phone}
                  submitAnalytics={submitAnalytics}
                />
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
                  company={realtor}
                  setIsOpenAnonymous={setIsOpenAnonymous}
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
              <div className="w-full h-[200px] xs:h-[85%] animate-float border border-gray-200 rounded-xl shadow-2xl">
                <img
                  src={realtor.images[0]}
                  alt={realtor.company_name}
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
            <FormGetQuote className={" shadow-none!"} />
          </DialogContent>
        </Dialog>
        {isOpenAnonymous && (
          <AnonymousView
            isOpen={isOpenAnonymous}
            onClose={setIsOpenAnonymous}
          />
        )}
      </div>
    )
  );
};

export default InternalPage;
