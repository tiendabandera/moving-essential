import Button from "@/components/Button";
import CancelRenewal from "@/components/CancelRenewal";
import CustomIcon from "@/components/design/CustomIcon";
//import { Button } from "@/components/ui/button";
import { Info, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const PremiumFeatures = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userInfo } = useOutletContext();

  const [premiumFeatures, setPremiumFeatures] = useState(null);

  useEffect(() => {
    if (userInfo && userInfo.company.premium_features) {
      setPremiumFeatures(userInfo.company.premium_features);
    }
  }, [userInfo]);

  const service = {
    1: {
      href: "/membership#!/Premium-features/p/691004197",
      image: "/assets/img/local-moving/premium-features.png",
    },
    2: {
      href: "/membership#!/12-Month-Subscription-plan/p/706226854",
      image: "/assets/img/realtor/premium-features.png",
    },
  };

  return (
    <div>
      <h2 className="text-2xl mb-4 font-normal">Premium features</h2>
      {userInfo && (
        <div className="grid grid-cols-1 mt-10 gap-y-10 xl:grid-cols-4 md:gap-x-10">
          <div className="col-span-2 lg:col-span-3 2xl:col-span-2">
            <div className="shadow-xs bg-background rounded-lg p-5">
              <div className="flex gap-x-2 items-center">
                <CustomIcon icon={Info} />
                <h3 className="font-medium">Subscription information</h3>
              </div>
              <div className="mt-7 flex flex-col gap-4">
                {premiumFeatures ? (
                  <>
                    <div className="grid grid-cols-6 gap-2">
                      <div className="col-span-6 xs:col-span-5 flex flex-col gap-2">
                        <span className="text-sm font-medium">
                          Membership expiration date
                        </span>
                        <div className="h-9 w-full rounded-md border border-slate-200 px-3 py-1 text-sm shadow-xs transition-colors flex items-center">
                          <span>
                            {new Date(
                              premiumFeatures.membership_end_at
                            ).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "short", // Short month (Jan, Feb, Mar, etc.)
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="hidden xs:flex col-span-1 items-end">
                        <div
                          className={`w-full rounded-md ${
                            premiumFeatures.stop_payment
                              ? "bg-yellow-500"
                              : premiumFeatures.is_active
                              ? "bg-green-500"
                              : "bg-red-500"
                          } flex items-center justify-center h-9 text-center`}
                        >
                          <span className="leading-none text-white text-sm font-semibold">
                            {premiumFeatures.stop_payment
                              ? "Renewal cancelled"
                              : premiumFeatures.is_active
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </div>
                      </div>
                    </div>
                    {premiumFeatures.is_active &&
                      !premiumFeatures.stop_payment && (
                        <Button
                          orange
                          className={"sm:w-[35%]"}
                          disabled={isSubmitting}
                          onClick={() => setIsSubmitting(true)}
                        >
                          Cancel renewal{" "}
                          {isSubmitting && <Loader2 className="animate-spin" />}
                        </Button>
                      )}
                    {isSubmitting && (
                      <CancelRenewal
                        isOpen={isSubmitting}
                        onClose={setIsSubmitting}
                        subcription_id={premiumFeatures.subscription_id}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <div
                      className="bg-[#f8f8f8] p-3 cursor-pointer rounded-lg w-fit shadow-sm shadow-orange-200/70 flex flex-col items-center transition-all duration-300 hover:shadow-md hover:shadow-orange-300"
                      onClick={() => {
                        location.href =
                          service[userInfo.company.business_type_id].href;
                      }}
                    >
                      <p className="font-medium">Premium features</p>
                      <img
                        src={service[userInfo.company.business_type_id].image}
                        alt="Premium features local moving"
                        className="size-40"
                      />
                      <Button
                        className={"w-full"}
                        orange
                        onClick={() => {
                          location.href =
                            service[userInfo.company.business_type_id].href;
                        }}
                      >
                        Active
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumFeatures;
