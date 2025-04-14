import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Input from "./design/Input";
import { Button } from "./ui/button";
import { useRef, useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/api/auth";
const ForgotPassword = ({ isOpen, onClose }) => {
  const inputEmail = useRef(null);
  const [isSubmitting, startTransition] = useTransition();

  const handleForgotPassword = () => {
    startTransition(async () => {
      const value = inputEmail.current.value;

      if (!value) {
        toast({
          title: "Error",
          description: "Please enter your email",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(value, {
        redirectTo: `${window.location.origin}/login`,
      });

      toast({
        title: error ? "Error" : "Success",
        description: error?.message || "Password reset link sent successfully",
        variant: error ? "destructive" : "success",
      });

      onClose(false);
      return;
    });
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Reset password</DialogTitle>
            <DialogDescription>
              Enter your login email and we’ll send you a link to reset your
              password.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              id="email"
              name="email"
              label="Email"
              type="email"
              ref={inputEmail}
            />
            <Button
              className="ml-auto w-fit bg-color-1 border border-color-1 rounded-lg hover:bg-transparent hover:text-color-1"
              onClick={handleForgotPassword}
              disabled={isSubmitting}
              type="button"
            >
              {isSubmitting && <LoaderCircle className="animate-spin" />} Reset
              password
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ForgotPassword;
