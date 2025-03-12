import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import TextArea from "./TextArea";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useOutletContext } from "react-router-dom";

const CancelRenewal = ({ isOpen, onClose, subcription_id }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createCompanyInstance, setUserInfo } = useAuth();
  const { userInfo } = useOutletContext();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);

    const companyInstance = createCompanyInstance({
      ...userInfo.company,
    });

    const res = await companyInstance.cancelRenewal(
      values.message,
      subcription_id
    );

    if (!res.error) {
      onClose(false);

      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        company: {
          ...prevUserInfo.company,
          premium_features: {
            ...prevUserInfo.company.premium_features,
            is_active: false,
            stop_payment: true,
          },
        },
      }));

      toast({
        title: "Success",
        description: res.message,
        variant: "success",
      });

      return;
    }

    toast({
      title: "Error",
      description: res.error,
      variant: "destructive",
    });

    return;
  });

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reason for cancellation</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div>
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
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CancelRenewal;
