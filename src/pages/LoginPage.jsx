import FormLogin from "../components/forms/FormLogin";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useTransition } from "react";
import Section from "@/components/Section";
import { DoubleBorder } from "@/components/design/Frames";

const LoginPage = () => {
  const [isSubmitting, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const params = new URLSearchParams(window.location.search);
      const encodedRedirect = params.get("redirect");

      // Si existe, tratamos de decodificarlo con Base64
      if (encodedRedirect) {
        try {
          const redirectUrl = atob(encodedRedirect);
          // Si la URL decodificada es válida, redirigimos a ella
          window.location.href = redirectUrl;
        } catch (error) {
          console.error("Error al decodificar redirect:", error);
          // En caso de error, redirigimos al dashboard por defecto según el rol
          window.location.href = `/${user.user_metadata.role}/dashboard`;
        }
      } else {
        // Si no viene redirect, redireccionamos al dashboard según rol
        window.location.href = `/${user.user_metadata.role}/dashboard`;
      }
    }
  }, [isAuthenticated, user]);

  const onSubmit = handleSubmit((values) => {
    startTransition(() => login(values));
  });

  return (
    <Section>
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10 h-fit">
        <div className="w-full">
          <DoubleBorder>
            <form onSubmit={onSubmit}>
              <FormLogin
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
                alt="Tell us about your experience"
                className="bg-gray-100 rounded-lg object-cover"
              />
            </div>
            <p className="text-xs font-medium w-auto">
              Sign in and enjoy what we have for you.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default LoginPage;
