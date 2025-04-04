import { useForm } from "react-hook-form";
import FormListings from "./components/FormListings";
import { useOutletContext } from "react-router-dom";
import Button from "@/components/Button";
import { schemaLocation } from "@/constants/listings";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import GoogleMap from "@/components/GoogleMap";

const listingsTypes = [
  {
    title: "Houses for sale",
    bg: "bg-[#0288D1]",
  },
  {
    title: "Sold houses",
    bg: "bg-[#dd0808]",
  },
  {
    title: "Open houses",
    bg: "bg-[#558B2F]",
  },
  {
    title: "Pending houses",
    bg: "bg-[#faeb1c]",
  },
];

const CreateListingPage = () => {
  const { userInfo } = useOutletContext();
  const { createCompanyInstance, uploadImages, setUserInfo } = useAuth();
  const [deleteSelectedRows, setDeleteSelectedRows] = useState([]);
  const [seePreview, setSeePreview] = useState(false);
  const [mapCenter, setMapCenter] = useState([]);
  const [mapLocations, setMapLocations] = useState([]);

  const handleDelete = (id) => {
    setDeleteSelectedRows((prevRows) => [...prevRows, id]);
  };

  const handlePreview = () => {
    setSeePreview((prev) => !prev);
    setMapCenter(getValues("center"));
    setMapLocations(getValues("locations"));
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      center: {
        address: "",
        place_id: "",
        zoom: 5,
      },
      locations: [{ ...schemaLocation }],
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const cleanedData = {
      ...values,
      locations: values.locations.map(({ originalId, ...rest }) => rest), // Elimina originalId
    };

    // Transformar a numero
    for (const location of cleanedData.locations) {
      location.price = parseNumber(location.price);
      location.bed = parseNumber(location.bed);
      location.bath = parseNumber(location.bath);
      location.annual_tax = parseNumber(location.annual_tax);
      location.size = parseNumber(location.size);
      location.year_built = parseNumber(location.year_built);
      location.company_id = userInfo.company.id;
      location.id = location.id || crypto.randomUUID();
    }

    const companyInstance = createCompanyInstance({ userInfo });
    const response = await companyInstance.createListing(
      cleanedData,
      uploadImages,
      deleteSelectedRows
    );

    const { center, locations } = response;

    if (!center.error && !locations.error) {
      toast({
        title: "Success",
        description: "Listing created successfully",
        variant: "success",
      });

      renderUserInfo(center.data, locations.data);
    }

    return;
  });

  const parseNumber = (value) => {
    return Number(value) || 0;
  };

  const renderUserInfo = async (center, locations) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      service: {
        ...prevUserInfo.service,
        listings: {
          center,
          properties: locations,
        },
      },
    }));
  };

  useEffect(() => {
    if (userInfo && userInfo.service.listings) {
      const { center, properties } = userInfo.service.listings;

      for (const property of properties) {
        const images = {};
        const data = Object.values(property.images);
        data.forEach((url, index) => {
          images[`img_${index + 1}`] = url;
        });

        property.images = images;
        property.originalId = property.id;
      }

      reset({
        center: { ...center },
        locations: [...properties],
      });
    }
  }, [userInfo, reset]);

  return (
    <div>
      <h2 className="text-2xl mb-4 font-normal">Add listing</h2>
      <div>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 mt-10 gap-y-10">
            <div className="col-span-2">
              <div className="shadow-xs bg-background rounded-lg p-5">
                <div className="">
                  <FormListings
                    listingInfo={{ ...userInfo.service.listings }}
                    register={register}
                    errors={errors}
                    control={control}
                    setValue={setValue}
                    zoom={getValues("center.zoom")}
                    isSubmitting={isSubmitting}
                    handleDelete={handleDelete}
                    handlePreview={handlePreview}
                  />
                </div>
              </div>
            </div>
          </div>
          {seePreview && (
            <div className="mt-10 grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="order-2 lg:order-1 xl:col-span-2">
                <GoogleMap center={mapCenter} properties={mapLocations} />
              </div>
              <div className="order-1 lg:order-2 ">
                <div className="shadow-xs bg-background rounded-lg p-5 grid grid-cols-2 gap-y-10">
                  {listingsTypes.map((listingType) => (
                    <div
                      key={listingType.title}
                      className="flex flex-col gap-2 items-center"
                    >
                      <div
                        className={`py-2 px-3 rounded-[50%] ${listingType.bg} w-fit text-white `}
                      >
                        <i className="fa fa-icon fa-home"></i>
                      </div>
                      <p className="font-medium text-sm">{listingType.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="mt-10">
            <Button
              orange
              type="submit"
              className={"w-full sm:w-fit"}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListingPage;
