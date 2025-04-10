import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

import { supabase } from "@/api/auth";
import { toast } from "@/hooks/use-toast";

const RestoreReviews = ({
  tableName,
  records,
  setNewRecords,
  isOpen,
  onClose,
  setRowSelection,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRestore = async () => {
    setIsLoading(true);

    const response = await supabase
      .from(tableName)
      .update({ was_deleted: false })
      .in("id", records);

    const { error } = response;

    toast({
      title: error ? "Error" : "Success",
      description: error ? error.message : "Records restored successfully",
      variant: error ? "destructive" : "success",
    });

    if (!error) {
      setNewRecords((pre) => pre.filter((item) => !records.includes(item.id)));
      setRowSelection({});
    }

    onClose();
  };

  return (
    <AlertDialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <AlertDialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50" />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className="bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border border-slate-200 p-6 shadow-lg duration-200 sm:max-w-lg dark:bg-slate-950 dark:border-slate-800"
      >
        <AlertDialogPrimitive.Title className="text-lg font-semibold">
          Are you absolutely sure?
        </AlertDialogPrimitive.Title>
        <AlertDialogPrimitive.Description
          data-slot="alert-dialog-description"
          className="text-sm text-gray-600"
        >
          This action cannot be undone. It will permanently delete the selected
          records.
        </AlertDialogPrimitive.Description>
        <div className="mt-4 flex justify-end gap-2">
          <AlertDialogPrimitive.Cancel
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </AlertDialogPrimitive.Cancel>
          <Button
            className="bg-color-1 border border-color-1 rounded-lg hover:bg-transparent hover:text-color-1"
            disabled={isLoading}
            onClick={handleRestore}
          >
            {isLoading && <LoaderCircle className="animate-spin" />} Confirm
          </Button>
        </div>
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Root>
  );
};

export default RestoreReviews;
