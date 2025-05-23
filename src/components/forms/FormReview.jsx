import { useController, useForm } from "react-hook-form";
import Input from "../Input";
import TextArea from "../TextArea";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { Loader2, Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";

const FormReview = ({
  className,
  company,
  setIsOpenAnonymous,
  setLinkAnonymous,
}) => {
  const classes = `w-full relative flex flex-col gap-6 items-center justify-center p-10 border border-gray-200 rounded-xl shadow-2xl ${
    className || ""
  }`;

  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  //const [isOpenAnonymous, setIsOpenAnonymous] = useState(null);
  //const [rating, setRating] = useState(0);

  /* Funcion para controlar el rating
  __________________________________________________ */
  const handleRatingClick = (number) => {
    handleRatingChange(number);
  };

  /* Funciones para controlar el dropdown de origen y destino
  __________________________________________________ */

  const [isOpenOrigin, setIsOpenOrigin] = useState(false); // Estado para controlar la apertura del dropdown de origen
  const [isOpenDestination, setIsOpenDestination] = useState(false); // Estado para controlar la apertura del dropdown de destino

  const [originValue, setoriginValue] = useState(null);
  const [destinationValue, setdestinationValue] = useState(null);

  const [zipcodes, setZipcodes] = useState({ origin: [], destination: [] });

  const originRef = useRef(null); // Ref para el input de origen
  const destinationRef = useRef(null); // Ref para el input de destino
  const hasExecuted = useRef(false);

  const { getZipcodes, getZipcodesByCity, createCompanyInstance, user } =
    useAuth();

  const handleOptionClick = (option, inputName) => {
    reset((prevValues) => ({
      ...prevValues,
      [inputName]: option.value,
    }));

    if (inputName === "origin") {
      setoriginValue(option.value);
      setIsOpenOrigin(false);
    } else {
      setdestinationValue(option.value);
      setIsOpenDestination(false);
    }
  };

  const searchZipcode = async (input) => {
    try {
      const zipcode = input.target.value;
      const inputName = input.target.name;

      if (zipcode.length > 2) {
        const isNumber = !isNaN(zipcode);
        const zipcodes = isNumber
          ? await getZipcodes(zipcode)
          : await getZipcodesByCity(zipcode);

        if (zipcodes.length === 0) {
          setZipcodes((preValues) => ({
            ...preValues,
            origin: [],
          }));

          inputName === "origin"
            ? setoriginValue(null)
            : setdestinationValue(null);
          return;
        }

        const formattedZipcodes = zipcodes.map((zipcode) => ({
          value: `${zipcode.name}, ${zipcode.state_id}`,
          label: isNumber
            ? `${zipcode.zipcodes[0]} - ${zipcode.name}, ${zipcode.state_id}`
            : `${zipcode.name}, ${zipcode.state_id}`,
        }));

        setZipcodes((preValues) => ({
          ...preValues,
          [inputName]: formattedZipcodes,
        }));

        inputName === "origin"
          ? setIsOpenOrigin(true)
          : setIsOpenDestination(true);
      } else {
        setZipcodes((preValues) => ({
          ...preValues,
          [inputName]: [],
        }));

        inputName === "origin"
          ? setoriginValue(null)
          : setdestinationValue(null);
      }
    } catch (error) {
      console.error("Error al cargar los códigos postales:", error);
    }
  };

  /* Funciones para el form
  __________________________________________________ */

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      origin: "",
      destination: "",
      quoted_price: "",
      actual_price: "",
      rating: "",
      message: "",
    },
  });

  const {
    field: { value: rating, onChange: handleRatingChange },
    fieldState: { error },
  } = useController({
    name: "rating",
    control,
    rules: { required: `Rating is required` },
  });

  const inputs = [
    {
      id: "quoted_price",
      name: "quoted_price",
      type: "number",
      placeholder: "Quoted Price",
      label: "Quoted Price",
      isInput: true,
      required: true,
      isReadOnly: false,
      validations: {},
    },
    {
      id: "actual_price",
      name: "actual_price",
      type: "number",
      placeholder: "Actual Price",
      label: "Actual Price",
      isInput: true,
      required: true,
      isReadOnly: false,
      validations: {},
    },
  ];

  const onSubmit = handleSubmit(async (values) => {
    if (!user) {
      // Convertir values en parámetros de URL
      const params = new URLSearchParams(values);
      setIsOpenAnonymous(true);
      setLinkAnonymous(
        `${window.location.href}#form-reviews?${params.toString()}`
      );
      return;
    }

    if (user.user_metadata.role === "company") {
      toast({
        title: "Error",
        description: "You can't send a review as a company",
        variant: "destructive",
      });
      return;
    }

    if ((!originValue || !destinationValue) && company.business_type_id === 1) {
      toast({
        title: "Error",
        description:
          "You must select a value from the list of Origin and Destination",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const companyIntance = createCompanyInstance({
      ...values,
      company: company,
      user: user.user_metadata,
    });

    const { error, data } = await companyIntance.createReview();

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "You already have a review on this company",
        variant: "destructive",
      });

      return;
    }

    if (data.length > 0) {
      reset();

      toast({
        title: "Success",
        description: "Review created successfully",
        variant: "success",
      });
    }
  });

  useEffect(() => {
    if (!originValue)
      setZipcodes((preValues) => ({
        ...preValues,
        origin: [],
      }));

    if (!destinationValue)
      setZipcodes((preValues) => ({
        ...preValues,
        destination: [],
      }));

    function handleClickOutside(event) {
      if (originRef.current && !originRef.current.contains(event.target)) {
        setIsOpenOrigin(false);
      }

      if (
        destinationRef.current &&
        !destinationRef.current.contains(event.target)
      ) {
        setIsOpenDestination(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [originValue, destinationValue]);

  useEffect(() => {
    if (hasExecuted.current) return;

    const createReview = async (values, company, user) => {
      const companyIntance = createCompanyInstance({
        ...values,
        company: company,
        user: user.user_metadata,
      });

      const { error } = await companyIntance.createReview();

      if (error) {
        toast({
          title: "Error",
          description: "You already have a review on this company",
          variant: "destructive",
        });

        return;
      }

      toast({
        title: "Success",
        description: "Review created successfully, reload the page to view it.",
        variant: "success",
      });
    };

    const hashIndex = location.hash.indexOf("?");
    if (hashIndex !== -1) {
      const paramsString = location.hash.substring(hashIndex + 1);
      const params = new URLSearchParams(paramsString);

      // Obtener los parámetros
      const values = Object.fromEntries(params.entries());

      if (user.user_metadata.role === "user")
        createReview(values, company, user);

      // Eliminar los parámetros manteniendo el hash
      const cleanHash = location.hash.substring(0, hashIndex);
      navigate(`${location.pathname}${cleanHash}`, { replace: true });

      hasExecuted.current = true;
    }
  }, [location, navigate]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className={classes}>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
            {company.business_type_id === 1 && (
              <>
                <div ref={originRef} className="relative">
                  <label htmlFor="origin" className="text-sm font-medium">
                    Origin *
                  </label>
                  <Input
                    id="origin"
                    name="origin"
                    type="text"
                    placeholder="Origin"
                    label="Origin"
                    required={true}
                    register={register}
                    errors={errors}
                    onChange={searchZipcode}
                    onFocus={() => setIsOpenOrigin(true)}
                    autoComplete={"off"}
                  />
                  {isOpenOrigin && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                      <ul className="py-1 max-h-60 overflow-auto">
                        {zipcodes.origin.length > 0 ? (
                          zipcodes.origin.map((option) => (
                            <li
                              key={option.value}
                              onClick={() =>
                                handleOptionClick(option, "origin")
                              }
                              className={`px-4 py-2 cursor-pointer text-sm ${
                                option.value === originValue
                                  ? "bg-blue-50 text-color-1"
                                  : "text-gray-900 hover:bg-blue-50 hover:text-color-1"
                              }`}
                            >
                              {option.label}
                            </li>
                          ))
                        ) : (
                          <li className="px-4 py-2 text-sm text-gray-500">
                            No results found
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                <div ref={destinationRef} className="relative">
                  <label htmlFor="destination" className="text-sm font-medium">
                    Destination *
                  </label>
                  <Input
                    id="destination"
                    name="destination"
                    type="text"
                    placeholder="Destination"
                    label="Destination"
                    required={true}
                    register={register}
                    errors={errors}
                    onChange={searchZipcode}
                    onFocus={() => setIsOpenDestination(true)}
                    autoComplete={"off"}
                  />
                  {isOpenDestination && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                      <ul className="py-1 max-h-60 overflow-auto">
                        {zipcodes.destination.length > 0 ? (
                          zipcodes.destination.map((option) => (
                            <li
                              key={option.value}
                              onClick={() =>
                                handleOptionClick(option, "destination")
                              }
                              className={`px-4 py-2 cursor-pointer text-sm ${
                                option.value === destinationValue
                                  ? "bg-blue-50 text-color-1"
                                  : "text-gray-900 hover:bg-blue-50 hover:text-color-1"
                              }`}
                            >
                              {option.label}
                            </li>
                          ))
                        ) : (
                          <li className="px-4 py-2 text-sm text-gray-500">
                            No results found
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                {inputs.map((input) => (
                  <div key={input.id}>
                    <label htmlFor={input.id} className="text-sm font-medium">
                      {input.label}
                      {input.required && " *"}
                    </label>
                    <Input {...input} register={register} errors={errors} />
                  </div>
                ))}
              </>
            )}

            <div className="lg:col-span-2">
              <label className="text-sm font-medium">Rating *</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleRatingClick(index)}
                    className="focus:outline-hidden"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        index <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {error && (
                <span className="text-red-500 text-xs font-semibold">
                  {error.message}
                </span>
              )}
            </div>
            <div className="lg:col-span-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message *
              </label>
              <TextArea
                id="message"
                label="Message"
                name="message"
                placeholder="Type your message here..."
                readOnly={false}
                register={register}
                required={true}
                errors={errors}
                className={"h-40"}
              />
            </div>
          </div>
          <div className="w-full">
            <Button
              className="w-full bg-color-1 border border-color-1 rounded-md hover:bg-transparent hover:text-color-1"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="animate-spin" />}
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormReview;
