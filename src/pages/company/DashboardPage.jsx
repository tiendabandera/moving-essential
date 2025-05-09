import CardSummary from "../../components/design/CardSummary";

import {
  User,
  Laptop2,
  CalendarCheck,
  Link,
  Building2,
  Image,
  Gem,
} from "lucide-react";

import CustomIcon from "@/components/design/CustomIcon";
import FormCompany from "@/components/forms/FormCompany";
import { useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { toast } from "@/hooks/use-toast";
import InputUploadImage from "@/components/InputUploadImage";
import FormAdditionalZipcode from "@/components/forms/FormAdditionalZipcode";
import ResetPassword from "@/components/ResetPassword";

const DashboardPage = () => {
  const { userInfo } = useOutletContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visiblePremimumFeatures, setVisiblePremimumFeatures] = useState(false);
  const [errorsForm, setErrorsForm] = useState([]);

  const {
    user,
    createCompanyInstance,
    createUserInstance,
    setUser,
    setUserInfo,
    uploadImages,
  } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      company: {
        company_name: "",
        phone: "",
        business_type_id: "",
        zipcode: "",
        city_id: "",
        state: "",
        address: "",
        facebook_link: "",
        instagram_link: "",
        twitter_link: "",
        linkedin_link: "",
        youtube_link: "",
        tiktok_link: "",
      },
      service: {
        fed_tax_class: "",
        slogan: "",
        rate_type_id: "",
        long_description: "",
      },
      images: {
        img_1: "",
        img_2: "",
        img_3: "",
        img_4: "",
        img_5: "",
        img_6: "",
        img_7: "",
      },
    },
  });

  useEffect(() => {
    if (userInfo) {
      const images = {};
      userInfo.company?.images?.forEach((url, index) => {
        images[`img_${index + 1}`] = url;
      });

      reset({
        name: userInfo.name || "",
        email: userInfo.email || "",
        company: {
          company_name: userInfo.company?.company_name || "",
          phone: userInfo.company?.phone || "",
          business_type_id: userInfo.company?.business_type_id || "",
          zipcode: userInfo.company?.zipcode || "",
          city_id: userInfo.company?.city_id || "",
          state: userInfo.company?.state || "",
          address: userInfo.company?.address || "",
          facebook_link: userInfo.company?.facebook_link || "",
          instagram_link: userInfo.company?.instagram_link || "",
          twitter_link: userInfo.company?.twitter_link || "",
          linkedin_link: userInfo.company?.linkedin_link || "",
          youtube_link: userInfo.company?.youtube_link || "",
          tiktok_link: userInfo.company?.tiktok_link || "",
          zipcode_2: userInfo.company?.zipcode_2 || null,
          city_2_id: userInfo.company?.city_2_id || null,
          state_2: userInfo.company?.state_2 || null,
        },
        service: {
          fed_tax_class: userInfo.service?.fed_tax_class || "",
          slogan: userInfo.service?.slogan || "",
          rate_type_id: userInfo.service?.rate_type_id || "",
          long_description: userInfo.service?.long_description || "",
        },
        images,
      });

      if (userInfo.company.premium_features?.is_active)
        setVisiblePremimumFeatures(true);
    }
  }, [userInfo, reset]);

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true); // Deshabilitar el botón de submit

    const companyInstance = createCompanyInstance({
      companyInfo: values.company,
      serviceInfo: values.service,
      images: values.images,
    });

    const res = await companyInstance.update(
      userInfo.company.id,
      user.id,
      uploadImages
    );

    if (res.error) {
      setErrorsForm([res.error.message]);
      setTimeout(() => {
        setErrorsForm([]);
      }, 5000);
      return;
    }

    renderUserInfo(values); // Renderizar los datos actualizados

    toast({
      description: "Updated successfully",
      variant: "success",
    });

    setIsSubmitting(false); // Habilitar el botón de submit
    return;
  });

  const renderUserInfo = async (values) => {
    const userInstance = createUserInstance(values);
    await userInstance.update();

    setUser((prevUser) => ({
      ...prevUser,
      user_metadata: {
        ...prevUser.user_metadata,
        name: values.name,
        company_name: values.company.company_name,
      },
    }));

    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      name: values.name,
      company: {
        id: userInfo.company.id,
        analytics: userInfo.company.analytics,
        ...values.company,
      },
      service: {
        ...values.service,
      },
      images: {
        ...values.images,
      },
    }));
  };

  const socialNetworks = [
    "facebook_link",
    "instagram_link",
    "twitter_link",
    "linkedin_link",
    "youtube_link",
    "tiktok_link",
  ];

  return (
    <div>
      <h2 className="text-2xl mb-4 font-normal">Dashboard</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <CardSummary
          icon={User}
          total={userInfo?.company.analytics[0]?.contact_button || 0}
          avarage="10"
          title="Contact button"
          tooltipText="Number of people who clicked the contact button."
        />
        <CardSummary
          icon={Laptop2}
          total={userInfo?.company.analytics[0]?.internal_page || 0}
          avarage="5"
          title="Internal page"
          tooltipText="Number of people who clicked on your page."
        />
        <CardSummary
          icon={CalendarCheck}
          total={userInfo?.company.analytics[0]?.get_a_quote || 0}
          avarage="5"
          title="Get a quote"
          tooltipText="Number of people who submitted the quote form."
        />
        <CardSummary
          icon={Link}
          total={socialNetworks
            .map((network) => userInfo?.company.analytics[0]?.[network] || 0)
            .reduce((acc, current) => acc + current, 0)}
          avarage="5"
          title="Social media links"
          tooltipText="Number of people who clicked on your social media links."
        />
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 mt-10 gap-y-10 xl:grid-cols-3 md:gap-x-10">
          <div className="col-span-2">
            <div className="shadow-xs bg-background rounded-lg p-5">
              <div className="flex gap-x-2 items-center">
                <CustomIcon icon={Building2} />
                <h3 className="font-medium">Company information</h3>
              </div>
              <div className="mt-7 pb-8">
                <FormCompany
                  userInfo={{ ...userInfo }}
                  register={register}
                  errors={errors}
                  control={control}
                  errorsForm={errorsForm}
                  reset={reset}
                />
              </div>
            </div>
          </div>
          <div className="col-span-2 xl:col-span-1">
            <div className="shadow-xs bg-background rounded-lg p-5">
              <div className="flex gap-x-2 items-center">
                <CustomIcon icon={Image} />
                <h3 className="font-medium">Images</h3>
              </div>
              <div className="mt-4 w-full mx-auto">
                <div className="grid grid-cols-2 gap-2">
                  <InputUploadImage
                    id="images.img_1"
                    name="images.img_1"
                    placeholder="Upload logo"
                    errors={errors}
                    required={true}
                    control={control}
                  />
                  {[2, 3, 4, 5, 6].map((index) => (
                    <InputUploadImage
                      key={index}
                      id={`images.img_${index}`}
                      name={`images.img_${index}`}
                      placeholder={`Additional image`}
                      errors={errors}
                      required={false}
                      control={control}
                    />
                  ))}
                </div>
              </div>
            </div>
            {visiblePremimumFeatures && (
              <div className="mt-10 shadow-xs bg-background rounded-lg p-5">
                <div className="flex gap-x-2 items-center">
                  <CustomIcon icon={Gem} />
                  <h3 className="font-medium">Premium features</h3>
                </div>
                <div className="mt-7">
                  <FormAdditionalZipcode
                    userInfo={{ ...userInfo }}
                    register={register}
                    errors={errors}
                    control={control}
                    errorsForm={errorsForm}
                    reset={reset}
                  />
                </div>
              </div>
            )}
            <div className="mt-8 md:w-1/2">
              <Button
                orange
                type="submit"
                className={"w-full"}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </form>
      <ResetPassword className={"xl:-mt-10"} />
    </div>
  );
};

export default DashboardPage;
