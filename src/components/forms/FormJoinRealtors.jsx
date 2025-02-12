import Input from "../Input";
import Select from "../Select";
import SelectWithSearch from "../SelectWithSearch";
import TextArea from "../TextArea";
import CustomIcon from "../design/CustomIcon";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Eye, Link } from "lucide-react";
import {
  states,
  yearOfExperience,
  totalSales,
  homeTypes,
} from "@/constants/index";
import Checkbox from "../Checkbox";

const FormJoinRealtors = ({ register, control, errors }) => {
  const { getZipcodes } = useAuth();
  const [zipcodes, setZipcodes] = useState([]);

  const searchZipcode = async (input) => {
    try {
      const zipcode = input.target.value;

      if (zipcode.length < 3 || zipcode.length > 5) {
        setZipcodes([]);
        return;
      }

      const zipcodes = await getZipcodes(zipcode);

      if (zipcodes.length === 0) {
        setZipcodes([]);
        return;
      }

      const formattedZipcodes = zipcodes.map((zipcode) => ({
        value: zipcode.id,
        label: zipcode.name,
        //label: `${zipcode.zipcodes[0]} - ${zipcode.name}, ${zipcode.state_id}`, Utilizar para la busqueda en el home
      }));

      setZipcodes(formattedZipcodes);
    } catch (error) {
      console.error("Error al cargar los códigos postales:", error);
    }
  };

  const inputsUser = [
    {
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Enter your full name",
      label: "First/Last name",
      isInput: true,
      isRequired: true,
      isReadOnly: false,
      validations: {},
    },
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      label: "Email",
      isInput: true,
      isRequired: true,
      isReadOnly: false,
      validations: {},
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      label: "Password",
      isInput: true,
      isRequired: true,
      isReadOnly: false,
      validations: {},
    },
  ];

  const inputsRealtor = [
    {
      id: "phone",
      name: "company.phone",
      type: "number",
      placeholder: "Enter your phone",
      label: "Phone",
      isInput: true,
      isRequired: true,
      isReadOnly: false,
    },
    {
      id: "state",
      name: "company.state",
      type: "text",
      placeholder: "Enter your state",
      label: "State",
      isInput: false,
      withSearch: true,
      isRequired: true,
      isReadOnly: false,
      options: states,
    },
    {
      id: "zipcode",
      name: "company.zipcode",
      type: "number",
      placeholder: "Enter your zipcode",
      label: "Zipcode",
      isInput: true,
      isRequired: true,
      isReadOnly: false,
      onChange: searchZipcode,
      validations: {
        pattern: {
          value: /^[0-9]{5}$/, // Expresión regular para validar exactamente 5 dígitos
          message: "Zipcode must be exactly 5 digits",
        },
      },
    },
    {
      id: "city_id",
      name: "company.city_id",
      type: "text",
      placeholder: "Select a city",
      label: "City",
      isInput: false,
      isRequired: true,
      isReadOnly: false,
      options: zipcodes,
    },
    {
      id: "address",
      name: "company.address",
      type: "text",
      placeholder: "Enter your address",
      label: "Address",
      isInput: true,
      isRequired: true,
      isReadOnly: false,
    },
  ];

  const inputsAdditionalInfo = [
    {
      id: "company_name",
      name: "company.company_name",
      type: "text",
      placeholder: "Enter your agency",
      label: "Agency",
      isInput: true,
      isRequired: true,
      isReadOnly: false,
    },
    {
      id: "agency_website",
      name: "service.agency_website",
      type: "text",
      placeholder: "Enter your website",
      label: "Website",
      isInput: true,
      isRequired: false,
      isReadOnly: false,
    },
    {
      id: "title_work",
      name: "service.title_work",
      type: "text",
      placeholder: "Enter your title",
      label: "Title",
      isInput: true,
      isRequired: true,
      isReadOnly: false,
    },
    {
      id: "experience",
      name: "service.experience",
      type: "text",
      placeholder: "Select year of experience",
      label: "Year of experience",
      isInput: false,
      isRequired: true,
      isReadOnly: false,
      options: yearOfExperience,
    },
    {
      id: "total_sales",
      name: "service.total_sales",
      type: "text",
      placeholder: "Select total sales",
      label: "Total sales",
      isInput: false,
      isRequired: true,
      isReadOnly: false,
      options: totalSales,
    },
  ];

  const inputSocial = [
    {
      id: "facebook_link",
      name: "company.facebook_link",
      type: "text",
      placeholder: "Enter your facebook link",
      label: "Facebook",
      isInput: true,
      isRequired: false,
      isReadOnly: false,
    },
    {
      id: "instagram_link",
      name: "company.instagram_link",
      type: "text",
      placeholder: "Enter your instagram link",
      label: "Instagram",
      isInput: true,
      isRequired: false,
      isReadOnly: false,
    },
    {
      id: "twitter_link",
      name: "company.twitter_link",
      type: "text",
      placeholder: "Enter your twitter link",
      label: "Twitter",
      isInput: true,
      isRequired: false,
      isReadOnly: false,
    },
    {
      id: "linkedin_link",
      name: "company.linkedin_link",
      type: "text",
      placeholder: "Enter your linkedin link",
      label: "Linkedin",
      isInput: true,
      isRequired: false,
      isReadOnly: false,
    },
    {
      id: "youtube_link",
      name: "company.youtube_link",
      type: "text",
      placeholder: "Enter your youtube link",
      label: "Youtube",
      isInput: true,
      isRequired: false,
      isReadOnly: false,
    },
    {
      id: "tiktok_link",
      name: "company.tiktok_link",
      type: "text",
      placeholder: "Enter your tiktok link",
      label: "TikTok",
      isInput: true,
      isRequired: false,
      isReadOnly: false,
    },
  ];

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2">
        {inputsUser.map((input) => {
          if (input.isInput) {
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
          }
          return null;
        })}
        {inputsRealtor.map((input) => {
          return (
            <div key={input.id}>
              <label htmlFor={input.id} className="text-sm font-medium">
                {input.label}
                {input.isRequired && " *"}
              </label>
              {input.isInput ? (
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
                  onChange={input.onChange}
                  validations={input.validations}
                />
              ) : input.withSearch ? (
                <SelectWithSearch
                  id={input.id}
                  label={input.label}
                  name={input.name}
                  readOnly={input.isReadOnly}
                  options={input.options}
                  required={input.isRequired}
                  placeholder={input.placeholder}
                  control={control}
                />
              ) : (
                <Select
                  id={input.id}
                  label={input.label}
                  name={input.name}
                  readOnly={input.isReadOnly}
                  options={input.options}
                  required={input.isRequired}
                  placeholder={input.placeholder}
                  control={control}
                />
              )}
            </div>
          );
        })}
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Home types *</label>
          <Checkbox
            name="service.home_types"
            options={homeTypes}
            control={control}
          />
        </div>
        <div className="mt-7 xl:col-span-2 md:col-span-2 flex gap-x-2 items-center">
          <CustomIcon icon={Eye} />
          <h3 className="font-medium">Additional information</h3>
        </div>
        {inputsAdditionalInfo.map((input) => {
          return (
            <div key={input.id}>
              <label htmlFor={input.id} className="text-sm font-medium">
                {input.label}
                {input.isRequired && " *"}
              </label>
              {input.isInput ? (
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
                  onChange={input.onChange}
                  validations={input.validations}
                />
              ) : input.withSearch ? (
                <SelectWithSearch
                  id={input.id}
                  label={input.label}
                  name={input.name}
                  readOnly={input.isReadOnly}
                  options={input.options}
                  required={input.isRequired}
                  placeholder={input.placeholder}
                  control={control}
                />
              ) : (
                <Select
                  id={input.id}
                  label={input.label}
                  name={input.name}
                  readOnly={input.isReadOnly}
                  options={input.options}
                  required={input.isRequired}
                  placeholder={input.placeholder}
                  control={control}
                />
              )}
            </div>
          );
        })}
        <div className="md:col-span-2">
          <label htmlFor="service.bio" className="text-sm font-medium">
            Bio *
          </label>
          <TextArea
            id="service.bio"
            label="Bio"
            name="service.bio"
            placeholder="Enter your bio"
            readOnly={false}
            register={register}
            required={true}
            errors={errors}
          />
        </div>
        <div className="mt-7 xl:col-span-2 md:col-span-2 flex gap-x-2 items-center">
          <CustomIcon icon={Link} />
          <h3 className="font-medium">Social networks</h3>
        </div>
        {inputSocial.map((input) => {
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
    </div>
  );
};

export default FormJoinRealtors;
