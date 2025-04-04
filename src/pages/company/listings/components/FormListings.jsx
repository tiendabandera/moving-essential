import { memo, useEffect, useMemo, useState } from "react";
import { useFieldArray } from "react-hook-form";
import SearchPlaceId from "./SearchPlaceId";
import { Button } from "@/components/ui/button";
import {
  CircleFadingPlus,
  MapPin,
  Minus,
  Plus,
  Presentation,
  RotateCcw,
  Trash,
} from "lucide-react";
import CustomIcon from "@/components/design/CustomIcon";
import CustomToolTips from "@/components/design/CustomTooltips";

import Input from "@/components/Input";
import Select from "@/components/Select";
import Checkbox from "@/components/Checkbox";

import { fieldsListings, schemaLocation } from "@/constants/listings";
import { homeTypes } from "@/constants";
import TextArea from "@/components/TextArea";
import InputUploadImage from "@/components/InputUploadImage";

const tooltipText =
  "Is the middle point on a map. It’s like the main spot that the map is focused on, helping you see what’s around it easily.";

const LocationItem = memo(
  ({
    field,
    index,
    control,
    errors,
    register,
    setValue,
    remove,
    isSubmitting,
    centerOptions,
    handleDelete,
  }) => {
    return (
      <div
        key={field.id}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 rounded-sm bg-slate-50"
      >
        <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="center.place_id" className="text-sm font-medium">
              Address *
            </label>
            <SearchPlaceId
              id={`locations.${index}.place_id`}
              name={`locations.${index}.place_id`}
              label="Address"
              readOnly={false}
              options={centerOptions}
              required={true}
              placeholder="Select a place"
              control={control}
              onOptionChange={(data) => {
                setValue(`locations.${index}.address`, data.label);
              }}
            />
          </div>
          {fieldsListings.map((input) => {
            if (input.isInput) {
              return (
                <div key={input.id}>
                  <label
                    htmlFor={`locations.${index}.${input.id}`}
                    className="text-sm font-medium"
                  >
                    {input.label}
                    {input.isRequired && " *"}
                  </label>
                  <Input
                    id={`locations.${index}.${input.id}`}
                    name={`locations.${index}.${input.name}`}
                    label={input.label}
                    type={input.type}
                    placeholder={input.placeholder}
                    readOnly={input.isReadOnly}
                    register={register}
                    required={input.isRequired}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    className={"bg-white"}
                  />
                </div>
              );
            }
            return (
              <div key={input.id}>
                <label className="text-sm font-medium">
                  {input.label}
                  {input.isRequired && " *"}
                </label>
                <Select
                  key={input.id}
                  id={`locations.${index}.${input.id}`}
                  label={input.label}
                  name={`locations.${index}.${input.name}`}
                  readOnly={input.isReadOnly}
                  options={input.options}
                  required={input.isRequired}
                  placeholder={input.placeholder}
                  control={control}
                  className={"bg-white"}
                />
              </div>
            );
          })}
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Home types *</label>
            <Checkbox
              name={`locations.${index}.home_types`}
              options={homeTypes}
              control={control}
            />
          </div>
          <div className="sm:col-span-2 ">
            <label
              htmlFor={`locations.${index}.description`}
              className="text-sm font-medium"
            >
              Description *
            </label>
            <TextArea
              id={`locations.${index}.description`}
              name={`locations.${index}.description`}
              label="Description"
              placeholder="Enter your description"
              readOnly={false}
              register={register}
              required={true}
              errors={errors}
              className={"bg-white lg:min-h-[180px] xl:min-h-[270px]"}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
        <div>
          <div className="mt-6 w-full mx-auto">
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <InputUploadImage
                  key={i}
                  id={`locations.${index}.images.img_${i}`}
                  name={`locations.${index}.images.img_${i}`}
                  placeholder={`Upload pic`}
                  errors={errors}
                  required={true}
                  control={control}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 xl:col-span-3 flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => {
              //console.log(field);
              handleDelete(field.originalId);
              remove(index);
            }}
          >
            <Trash />
          </Button>
        </div>
      </div>
    );
  }
);

const FormListings = ({
  listingInfo,
  register,
  errors,
  control,
  isSubmitting,
  setValue,
  zoom: defaultZoom,
  handleDelete,
  handlePreview,
}) => {
  //const [centerOptions, setCenterOptions] = useState([]);
  const [zoom, setZoom] = useState(defaultZoom);
  const [resetPreview, setResetPreview] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "locations",
  });

  const onClick = (change) => {
    setZoom((prevZoom) => {
      const newZoom = prevZoom + change;
      setValue("center.zoom", newZoom); // Actualizar el campo en react-hook-form
      return newZoom;
    });
  };

  const centerOptionsMemo = useMemo(() => {
    if (!listingInfo) return [];
    const { center, properties } = listingInfo;

    const options = [];
    if (center?.address && center?.place_id) {
      options.push({ label: center.address, value: center.place_id });
    }
    return [
      ...options,
      ...properties.map((p) => ({ label: p.address, value: p.place_id })),
    ];
  }, [listingInfo]);

  useEffect(() => {
    setZoom(defaultZoom); // Actualizar cuando defaultZoom cambie
  }, [defaultZoom]);

  /* useEffect(() => {
    if (listingInfo) {
      const { center, properties } = listingInfo;

      const options = [];
      // Crear opciones para el centro
      if (center && center.address && center.place_id) {
        options.push({
          label: center.address,
          value: center.place_id,
        });
      }

      // Crear opciones para las propiedades
      const propertiesOptions = properties
        .filter((property) => property.address && property.place_id)
        .map((property) => ({
          label: property.address,
          value: property.place_id,
        }));

      options.push(...propertiesOptions);

      setCenterOptions(options);
    }
  }, [listingInfo]); */

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex gap-x-2 items-center">
          <CustomIcon icon={MapPin} />
          <h3 className="font-medium">Center of the map</h3>
          <CustomToolTips content={tooltipText} className={"w-70"} />
        </div>
        <div className="w-full grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <div className="flex flex-col">
              <label htmlFor="center.place_id" className="text-sm font-medium">
                Center place
              </label>
              <SearchPlaceId
                id="center.place_id"
                label="Center place"
                name="center.place_id"
                readOnly={false}
                options={centerOptionsMemo}
                required={true}
                placeholder="Select the center place"
                control={control}
                onOptionChange={(data) => {
                  setValue("center.address", data.label);
                }}
              />
            </div>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-1)}
                disabled={zoom <= 1}
              >
                <Minus />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-base font-bold tracking-tighter">
                  {zoom}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  zoom
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(1)}
                disabled={zoom >= 20}
              >
                <Plus />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-x-2 items-center">
          <CustomIcon icon={CircleFadingPlus} />
          <h3 className="font-medium">Locations</h3>
        </div>
        <div
          className={`flex flex-col gap-6 ${
            fields.length > 1 && "h-[800px] overflow-y-auto scroll-smooth"
          }`}
        >
          {/* {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 rounded-sm bg-slate-50"
            >
              <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="center.place_id"
                    className="text-sm font-medium"
                  >
                    Address *
                  </label>
                  <SearchPlaceId
                    id={`locations.${index}.place_id`}
                    name={`locations.${index}.place_id`}
                    label="Address"
                    readOnly={false}
                    options={centerOptionsMemo}
                    required={true}
                    placeholder="Select a place"
                    control={control}
                    onOptionChange={(data) => {
                      setValue(`locations.${index}.address`, data.label);
                    }}
                  />
                </div>
                {fieldsListings.map((input) => {
                  if (input.isInput) {
                    return (
                      <div key={input.id}>
                        <label
                          htmlFor={`locations.${index}.${input.id}`}
                          className="text-sm font-medium"
                        >
                          {input.label}
                          {input.isRequired && " *"}
                        </label>
                        <Input
                          id={`locations.${index}.${input.id}`}
                          name={`locations.${index}.${input.name}`}
                          label={input.label}
                          type={input.type}
                          placeholder={input.placeholder}
                          readOnly={input.isReadOnly}
                          register={register}
                          required={input.isRequired}
                          errors={errors}
                          isSubmitting={isSubmitting}
                          className={"bg-white"}
                        />
                      </div>
                    );
                  }
                  return (
                    <div key={input.id}>
                      <label className="text-sm font-medium">
                        {input.label}
                        {input.isRequired && " *"}
                      </label>
                      <Select
                        key={input.id}
                        id={`locations.${index}.${input.id}`}
                        label={input.label}
                        name={`locations.${index}.${input.name}`}
                        readOnly={input.isReadOnly}
                        options={input.options}
                        required={input.isRequired}
                        placeholder={input.placeholder}
                        control={control}
                        className={"bg-white"}
                      />
                    </div>
                  );
                })}
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Home types *</label>
                  <Checkbox
                    name={`locations.${index}.home_types`}
                    options={homeTypes}
                    control={control}
                  />
                </div>
                <div className="sm:col-span-2 ">
                  <label
                    htmlFor={`locations.${index}.description`}
                    className="text-sm font-medium"
                  >
                    Description *
                  </label>
                  <TextArea
                    id={`locations.${index}.description`}
                    name={`locations.${index}.description`}
                    label="Description"
                    placeholder="Enter your description"
                    readOnly={false}
                    register={register}
                    required={true}
                    errors={errors}
                    className={"bg-white lg:min-h-[180px] xl:min-h-[270px]"}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </div>
              <div>
                <div className="mt-6 w-full mx-auto">
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <InputUploadImage
                        key={i}
                        id={`locations.${index}.images.img_${i}`}
                        name={`locations.${index}.images.img_${i}`}
                        placeholder={`Upload pic`}
                        errors={errors}
                        required={true}
                        control={control}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 xl:col-span-3 flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => remove(index)}
                >
                  <Trash />
                </Button>
              </div>
            </div>
          ))} */}

          {fields.map((field, index) => (
            <LocationItem
              key={field.id}
              field={field}
              index={index}
              control={control}
              errors={errors}
              register={register}
              setValue={setValue}
              remove={remove}
              isSubmitting={isSubmitting}
              centerOptions={centerOptionsMemo}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => append({ ...schemaLocation })}
          >
            <Plus />
          </Button>
          <span className="text-sm font-medium">Add location</span>
        </div>
        {resetPreview ? (
          <div className="flex gap-x-2 items-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              onClick={() => {
                handlePreview();
                setResetPreview(false);
              }}
            >
              <RotateCcw />
            </Button>
            <span className="text-sm font-medium">Refresh preview</span>
          </div>
        ) : (
          <div className="flex gap-x-2 items-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              onClick={() => {
                handlePreview();
                setResetPreview(true);
              }}
            >
              <Presentation />
            </Button>
            <span className="text-sm font-medium">Preview</span>
          </div>
        )}
      </div>
    </div>
  );
};

LocationItem.displayName = "LocationItem";

export default FormListings;
