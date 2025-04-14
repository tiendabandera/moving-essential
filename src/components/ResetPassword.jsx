import { LoaderCircle, LockKeyhole } from "lucide-react";
import Button from "./Button";
import { Button as ButtonUI } from "./ui/button";
import { supabase } from "@/api/auth";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { toast } from "@/hooks/use-toast";

const fields = [
  {
    id: "new_password",
    name: "new_password",
    type: "password",
    placeholder: "Enter your new password",
    label: "Password",
    isInput: true,
    isRequired: true,
    isReadOnly: false,
  },
  {
    id: "confirm_password",
    name: "confirm_password",
    type: "password",
    placeholder: "Confirm password",
    label: "Confirm password",
    isInput: true,
    isRequired: true,
    isReadOnly: false,
  },
];

const ResetPassword = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, startTransition] = useTransition();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      new_password: null,
      confirm_password: null,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    if (values.new_password !== values.confirm_password) {
      toast({
        title: "Passwords do not match",
        description: "The passwords do not match",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      const { error } = await supabase.auth.updateUser({
        password: values.new_password,
      });

      toast({
        title: error ? "Error" : "Success",
        description: error?.message || "Password reset successfully",
        variant: error ? "destructive" : "success",
      });

      reset();
      setIsOpen(false);
    });
  });

  return (
    <>
      <div
        className={`flex justify-end my-6 w-full md:w-1/2 lg:w-fit ${className}`}
      >
        <Button
          className={"w-full"}
          orange
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <LockKeyhole className="w-4 h-4" /> Reset Password
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>Minimum 6 characters</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="grid xs:grid-cols-2 gap-4">
              {fields.map((input) => {
                return (
                  <div key={input.id}>
                    <label htmlFor={input.id} className="text-sm font-medium">
                      {input.label}
                      {input.isRequired && " *"}
                    </label>
                    <Input
                      id={input.id}
                      label={input.label}
                      name={input.name}
                      type={input.type}
                      placeholder={input.placeholder}
                      readOnly={input.isReadOnly}
                      register={register}
                      required={input.isRequired}
                      errors={errors}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex justify-end">
              <ButtonUI
                className="bg-color-1 border border-color-1 rounded-lg hover:bg-transparent hover:text-color-1"
                type="submit"
                disabled={isSubmitting}
              >
                Confirm{" "}
                {isSubmitting && <LoaderCircle className="animate-spin" />}
              </ButtonUI>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResetPassword;
