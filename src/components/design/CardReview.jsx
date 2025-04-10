import { FaStar } from "react-icons/fa";
import { Separator } from "../ui/separator";
import { useState, useTransition } from "react";
import { ChevronRight, Loader2, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { reportingTypes } from "@/constants";
import { useForm } from "react-hook-form";
import TextArea from "../TextArea";
import { Button } from "../ui/button";
import { supabase } from "@/api/auth";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

/* COMPONENTS
_________________________________________ */

const ReportingReview = ({ changeStep, setValue }) => {
  const handleClick = (value) => {
    changeStep(1);
    setValue("type", value);
  };

  return (
    <div className="mt-2 flex flex-col gap-2">
      {reportingTypes.map((reportingType) => (
        <div
          key={reportingType.value}
          className="flex justify-between items-center py-2 cursor-pointer hover:bg-slate-100 hover:px-2 hover:rounded-md"
          onClick={() => handleClick(reportingType.value)}
        >
          <p className="text-base md:text-sm">{reportingType.label}</p>
          <ChevronRight className="w-4 h-4" />
        </div>
      ))}
    </div>
  );
};

const ReportingMessage = ({ register, errors, isSubmitting }) => {
  return (
    <div className="mt-2 flex flex-col gap-4">
      <TextArea
        id="message"
        label="Message"
        name="message"
        placeholder="Type your message here..."
        readOnly={false}
        register={register}
        required={true}
        errors={errors}
        className={"h-40"}
      />
      <Button
        className="w-full bg-color-1 border border-color-1 rounded-md hover:bg-transparent hover:text-color-1"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="animate-spin" />}
        Submit
      </Button>
    </div>
  );
};

const ApplealReview = ({ isOpen, onClose, review }) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, startTransition] = useTransition();
  const { user } = useAuth();

  const steps = [
    {
      component: (
        <ReportingReview changeStep={setCurrentStep} setValue={setValue} />
      ),
    },
    {
      component: (
        <ReportingMessage
          changeStep={setCurrentStep}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      ),
    },
  ];

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      const res = await supabase
        .from("appeal_reviews")
        .insert({
          review_id: review.id,
          ...values,
        })
        .select()
        .single();

      if (!res.error) {
        await supabase.functions.invoke("sendEmailToCompany", {
          body: {
            data: {
              review_id: review.id,
              type: reportingTypes.find((t) => t.value === values.type).label,
              message: values.message,
              link: `${window.location.origin}/admin/reviews/appeals?id=${res.data.id}`,
            },
            emails: ["libardo@banderaonline.org"], //info@movingessential.com
            templateId: 35,
          },
        });

        // Send email to company
        await supabase.functions.invoke("sendEmailToCompany", {
          body: {
            data: {
              appeal_id: res.data.id,
            },
            emails: [user.email],
            templateId: 36,
          },
        });
      }

      toast({
        title: res.error ? "Error" : "Success",
        description: res.error
          ? "You already have a pending appeal process for this review."
          : "Your appeal has been submitted.",
        variant: res.error ? "destructive" : "success",
      });

      reset();
      onClose(false);
      setCurrentStep(0);
    });
  });

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Do you want to appeal this review ?</DialogTitle>
            <DialogDescription>Submit appeal request </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <motion.div layout>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {steps[currentStep].component}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const CardReview = ({ review, isOwner, has_premium_features }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200; // Define la longitud máxima del texto antes de truncarlo

  // Función para alternar entre mostrar el mensaje completo o truncado
  const toggleReadMore = () => setIsExpanded(!isExpanded);

  const handleAppealReview = () => {
    if (!has_premium_features) navigate("/company/membership-premium-features");
    setIsOpen(true);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 border border-gray-100 rounded-xl p-6 relative">
      <div className="w-12 h-12 rounded-full">
        <img
          src={
            review.user_info.user_metadata.profile_picture ||
            "/assets/img/user-not-found.png"
          }
          alt="user-review"
          className="object-cover rounded-full"
        />
      </div>
      {isOwner && (
        <div className="absolute top-5 right-5 cursor-pointer">
          <Trash
            strokeWidth={1.5}
            width={20}
            height={20}
            onClick={handleAppealReview}
          />
        </div>
      )}
      <div className="flex flex-col items-center gap-1">
        <p className="font-medium text-xl lg:text-lg">
          {review.user_info.user_metadata.name}
        </p>
        <p className="text-gray-50 font-light text-base lg:text-sm">
          {new Date(review.created_at).toDateString()}
        </p>
        <div className="flex gap-2">
          {Array.from({ length: review.rating }).map((_, index) => {
            return <FaStar key={index} className="w-4 h-4" color="#ffe424" />;
          })}
        </div>
      </div>
      <p className="text-gray-50 font-light text-justify text-base lg:text-sm">
        {isExpanded || review.message.length <= maxLength
          ? review.message
          : `${review.message.slice(0, maxLength)}...`}
        {review.message.length > maxLength && (
          <span
            className="text-color-1 cursor-pointer ml-2 underline"
            onClick={toggleReadMore}
          >
            {isExpanded ? "read less" : "read more"}
          </span>
        )}
      </p>
      {review.company.business_type_id === 1 && (
        <>
          <Separator className="w-1/4 bg-color-1 h-[2px]" />
          <div className="w-full flex flex-col text-base justify-center 2xl:flex-row 2xl:justify-between lg:text-sm">
            <div className="flex flex-col items-center 2xl:items-start">
              <div className="flex gap-x-2">
                <p className="font-medium">Quoted Price:</p>
                <p className="text-gray-50 font-light">
                  ${review.quoted_price}
                </p>
              </div>
              <div className="flex gap-x-2">
                <p className="font-medium">Actual Price:</p>
                <p className="text-gray-50 font-light">
                  ${review.actual_price}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center 2xl:items-start">
              <div className="flex gap-x-2">
                <p className="font-medium">Origin:</p>
                <p className="text-gray-50 font-light">{review.origin}</p>
              </div>
              <div className="flex gap-x-2">
                <p className="font-medium">Destination:</p>
                <p className="text-gray-50 font-light">{review.destination}</p>
              </div>
            </div>
          </div>
        </>
      )}
      <ApplealReview isOpen={isOpen} onClose={setIsOpen} review={review} />
    </div>
  );
};

export default CardReview;
