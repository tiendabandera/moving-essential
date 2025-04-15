import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useTransition } from "react";
import FormRegister from "../components/forms/FormRegister";
import Section from "@/components/Section";
import { DoubleBorder } from "@/components/design/Frames";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, startTransition] = useTransition();
  const { signIn, isAuthenticated, user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) navigate(`/${user.user_metadata.role}/dashboard`);
  }, [isAuthenticated, navigate, user]);

  const onSubmit = handleSubmit((values) => {
    startTransition(() => signIn(values));
  });

  return (
    <Section>
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10 h-fit">
        <div className="w-full">
          <DoubleBorder>
            <form onSubmit={onSubmit}>
              <FormRegister
                register={register}
                errors={errors}
                isSubmitting={isSubmitting}
              />
            </form>
          </DoubleBorder>
        </div>
        <div className="hidden md:flex w-full flex-col items-center relative animate-float">
          <img
            src="/assets/img/form-review-2.png"
            alt="form-review"
            className="object-cover"
          />
          <div className="flex items-center bg-white py-1 px-2 -mt-20 gap-2 rounded-lg shadow-2xl ring-1 ring-gray-100">
            <div className="size-15 flex items-center">
              <img
                src="/assets/img/cohete.png"
                alt="Sign up and enjoy what we have for you."
                className="bg-gray-100 rounded-lg object-cover"
              />
            </div>
            <p className="text-xs font-medium w-auto">
              Sign up and enjoy what we have for you.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default RegisterPage;
