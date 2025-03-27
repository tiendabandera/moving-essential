import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fields } from "@/constants/crm";
import { useAuth } from "@/context/AuthContext";
import { LoaderCircle } from "lucide-react";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";

const titles = {
  salesforce: "Salesforce",
  zoho: "Zoho CRM",
  hubspot: "HubSpot",
  monday: "Monday Sales",
  kommo: "Kommo",
  teamleader: "Teamleader",
};

const ConnectPlatform = ({ platform, isOpen, onClose, params }) => {
  const [isSubmitting, startTransition] = useTransition();
  const { createCompanyInstance } = useAuth();
  const { userInfo } = useOutletContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      if (platform === "teamleader" && !params.code) {
        console.log("Generar code: ", values);
        return;
      }

      const { name, ...restValues } = values;
      const companyInstance = createCompanyInstance({
        values: restValues,
        name,
        platform,
        company_id: userInfo.company.id,
      });

      const res = await companyInstance.createIntegration();

      if (res.error || res.data.error) {
        onClose();
        return;
      }

      navigate(`/company/crm/my-integrations?id=${res.data.data.id}`);
    });
  });

  useEffect(() => {
    if (params.code && platform === "teamleader") {
      reset({
        generated_code: params.code,
      });
    }
  }, [params]);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Integration with {titles[platform]}
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            {platform === "teamleader" ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {fields[platform]
                  .filter((field) => {
                    if (!params.code) return field.name == "client_id";
                    return true;
                  })
                  .map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium"
                      >
                        {field.label}
                        {field.isRequired && " *"}
                      </label>
                      <Input
                        id={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        readOnly={field.isReadOnly}
                        register={register}
                        required={field.isRequired}
                        errors={errors}
                      />
                    </div>
                  ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">
                    Integration name *
                  </label>
                  <Input
                    id="name"
                    label="Integration name"
                    name="name"
                    type="text"
                    placeholder="Enter integration name"
                    readOnly={false}
                    register={register}
                    required={true}
                    errors={errors}
                  />
                </div>
                {fields[platform].map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="text-sm font-medium">
                      {field.label}
                      {field.isRequired && " *"}
                    </label>
                    <Input
                      id={field.name}
                      label={field.label}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      readOnly={false}
                      register={register}
                      required={field.isRequired}
                      errors={errors}
                    />
                  </div>
                ))}
              </div>
            )}
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

export default ConnectPlatform;
