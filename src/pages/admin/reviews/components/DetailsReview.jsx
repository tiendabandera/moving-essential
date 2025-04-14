import { supabase } from "@/api/auth";
import Input from "@/components/design/Input";
import TextArea from "@/components/design/TextArea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { reportingTypes } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { FaStar } from "react-icons/fa";

const DetailsReview = ({ record, isOpen, onClose, setNewRecords }) => {
  const { review, ...rest } = record;
  const [isSubmitting, startTransition] = useTransition();

  const handleDeleteReview = () => {
    startTransition(async () => {
      const { error } = await supabase
        .from("reviews")
        .update({ was_deleted: true })
        .eq("id", review.id);

      if (!error) {
        const { error: errorAppeal } = await supabase
          .from("appeal_reviews")
          .delete()
          .eq("id", rest.id);

        if (!errorAppeal) {
          setNewRecords((pre) => pre.filter((item) => item.id !== rest.id));

          // Email to company
          const company = await supabase
            .from("companies")
            .select()
            .eq("id", review.company_id)
            .single();

          await supabase.functions.invoke("sendEmailToCompany", {
            body: {
              data: {
                appeal_id: rest.id,
                message: "Your review has been successfully deleted",
              },
              emails: [company.data.email],
              templateId: 37,
            },
          });

          return handlerReturn();
        }

        return handlerReturn(error);
      }

      return handlerReturn(error);
    });
  };

  const handleRestoreReview = () => {
    startTransition(async () => {
      const { error } = await supabase
        .from("reviews")
        .update({ was_deleted: false })
        .eq("id", review.id);

      if (!error) {
        setNewRecords((pre) => pre.filter((item) => item.id !== review.id));
      }

      return handlerReturn(error, "restored");
    });
  };

  const handlerReturn = (error = null, proccess = "deleted") => {
    onClose();

    toast({
      title: error ? "Error" : "Success",
      description: error ? error.message : `Review ${proccess} successfully`,
      variant: error ? "destructive" : "success",
    });

    return;
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-xl my-2 py-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="col-span-2 flex gap-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Rating</label>
                <div className="flex gap-2">
                  {Array.from({ length: review.rating }).map((_, index) => {
                    return (
                      <FaStar key={index} className="w-4 h-4" color="#ffe424" />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Input
                id="origin"
                name="origin"
                label="Origin"
                type="text"
                readOnly
                value={review.origin}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Input
                id="destination"
                name="destination"
                label="Destination"
                type="email"
                readOnly
                value={review.destination}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Input
                id="quoted_price"
                name="quoted_price"
                label="Quoted price"
                readOnly
                value={review.quoted_price}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Input
                id="actual_price"
                name="actual_price"
                label="Actual price"
                readOnly
                value={review.actual_price}
              />
            </div>
            <div className="col-span-2">
              <TextArea
                id="message"
                name="message"
                label="Message"
                readOnly
                value={review.message}
                className={"h-40"}
              />
            </div>
          </div>
          {Object.keys(rest).length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <h4 className="col-span-2 my-4 text-lg font-semibold leading-none tracking-tight text-center sm:text-left">
                  Appeal Details
                </h4>
                <div className="col-span-2">
                  <Input
                    id="reporting_type"
                    name="reporting_type"
                    label="Reporting type"
                    readOnly
                    value={
                      reportingTypes.find((item) => item.value === rest.type)
                        .label
                    }
                  />
                </div>
                <div className="col-span-2">
                  <TextArea
                    id="appeal_message"
                    name="appeal_message"
                    label="Message"
                    readOnly
                    value={rest.message}
                    className={"h-40"}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="destructive"
                  onClick={handleDeleteReview}
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="animate-spin" />}
                  Delete Review
                </Button>
              </div>
            </>
          ) : (
            <div className="flex justify-end">
              <Button
                className="bg-color-1 border border-color-1 rounded-lg hover:bg-transparent hover:text-color-1"
                onClick={handleRestoreReview}
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="animate-spin" />}
                Restore Review
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DetailsReview;
