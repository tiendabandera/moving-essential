import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const CreatePhonePool = ({ isOpen, onClose, setNewRecords }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createUserInstance } = useAuth();
  const userInstance = createUserInstance({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: null,
      last_name: null,
      phone: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    const response = await userInstance.createPhonePool(values);

    const { error } = response;

    toast({
      title: error ? "Error" : "Success",
      description: error ? error.message : "Records deleted successfully",
      variant: error ? "error" : "success",
    });

    if (!error) setNewRecords((prev) => [response.data, ...prev]);
    onClose();
  });

  const inputsUser = [
    {
      id: "first_name",
      name: "first_name",
      type: "text",
      placeholder: "Enter your first name",
      label: "First name",
      isInput: true,
      isRequired: false,
      isReadOnly: false,
    },
    {
      id: "last_name",
      name: "last_name",
      type: "text",
      placeholder: "Enter your last name",
      label: "Last name",
      isInput: true,
      isRequired: false,
      isReadOnly: false,
    },
    {
      id: "phone",
      name: "phone",
      type: "number",
      placeholder: "Enter your phone",
      label: "Phone",
      isInput: true,
      isRequired: true,
      isReadOnly: false,
      validations: {
        pattern: {
          value: /^[0-9]{10}$/, // Expresión regular para validar exactamente 5 dígitos
          message: "Phone must be exactly 10 digits",
        },
      },
    },
  ];

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle> Add new row</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inputsUser.map((input) => {
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
                      validations={input.validations}
                      errors={errors}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end mt-4">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="bg-color-1 border border-color-1 hover:bg-transparent hover:text-color-1"
              >
                Save {isSubmitting && <LoaderCircle className="animate-spin" />}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePhonePool;
