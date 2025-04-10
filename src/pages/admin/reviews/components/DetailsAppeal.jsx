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
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";

const DetailsAppeal = ({ record, isOpen, onClose, setNewRecords }) => {
  const [isSubmitting, startTransition] = useTransition();
  const handleDeleteReview = () => {
    startTransition(async () => {
      const { error } = await supabase
        .from("appeal_reviews")
        .delete()
        .eq("id", record.id);

      if (!error) {
        const { error: errorReview } = await supabase
          .from("reviews")
          .update({ was_deleted: true })
          .eq("id", record.review.id);

        if (!errorReview) {
          setNewRecords((pre) => pre.filter((item) => item.id !== record.id));

          return handlerReturn();
        }

        return handlerReturn(error);
      }

      return handlerReturn(error);
    });
  };

  const handlerReturn = (error = null) => {
    onClose();

    toast({
      title: error ? "Error" : "Success",
      description: error ? error.message : "Records deleted successfully",
      variant: error ? "error" : "success",
    });

    return;
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Review Detail</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="col-span-2 sm:col-span-1">
              <Input
                id="origin"
                name="origin"
                label="Origin"
                type="text"
                readOnly
                value={record.review.origin}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Input
                id="destination"
                name="destination"
                label="Destination"
                type="email"
                readOnly
                value={record.review.destination}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Input
                id="quoted_price"
                name="quoted_price"
                label="Quoted price"
                readOnly
                value={record.review.quoted_price}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Input
                id="actual_price"
                name="actual_price"
                label="Actual price"
                readOnly
                value={record.review.actual_price}
              />
            </div>
            <div className="col-span-2">
              <TextArea
                id="message"
                name="message"
                label="Message"
                readOnly
                value={record.message}
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DetailsAppeal;
