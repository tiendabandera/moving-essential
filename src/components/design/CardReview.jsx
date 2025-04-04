import { FaStar } from "react-icons/fa";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { Trash } from "lucide-react";

const CardReview = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200; // Define la longitud máxima del texto antes de truncarlo

  // Función para alternar entre mostrar el mensaje completo o truncado
  const toggleReadMore = () => setIsExpanded(!isExpanded);
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 border border-gray-100 rounded-xl p-6 relative">
      <div className="w-12 h-12 rounded-full">
        <img
          src={
            review.user_info.user_metadata.profile_picture ||
            "/assets/img/user-not-found.png"
          }
          alt="user-review"
          className="object-cover rounded-full"
        />
      </div>
      <div className="hidden absolute top-5 right-5">
        <Trash strokeWidth={1} width={20} height={20} />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="font-medium text-xl lg:text-lg">
          {review.user_info.user_metadata.name}
        </p>
        <p className="text-gray-50 font-light text-base lg:text-sm">
          {new Date(review.created_at).toDateString()}
        </p>
        <div className="flex gap-2">
          {Array.from({ length: review.rating }).map((_, index) => {
            return <FaStar key={index} className="w-4 h-4" color="#ffe424" />;
          })}
        </div>
      </div>

      <p className="text-gray-50 font-light text-justify text-base lg:text-sm">
        {isExpanded || review.message.length <= maxLength
          ? review.message
          : `${review.message.slice(0, maxLength)}...`}
        {review.message.length > maxLength && (
          <span
            className="text-color-1 cursor-pointer ml-2 underline"
            onClick={toggleReadMore}
          >
            {isExpanded ? "read less" : "read more"}
          </span>
        )}
      </p>
      {review.company.business_type_id === 1 && (
        <>
          <Separator className="w-1/4 bg-color-1 h-[2px]" />
          <div className="w-full flex flex-col text-base justify-center 2xl:flex-row 2xl:justify-between lg:text-sm">
            <div className="flex flex-col items-center 2xl:items-start">
              <div className="flex gap-x-2">
                <p className="font-medium">Quoted Price:</p>
                <p className="text-gray-50 font-light">
                  ${review.quoted_price}
                </p>
              </div>
              <div className="flex gap-x-2">
                <p className="font-medium">Actual Price:</p>
                <p className="text-gray-50 font-light">
                  ${review.actual_price}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center 2xl:items-start">
              <div className="flex gap-x-2">
                <p className="font-medium">Origin:</p>
                <p className="text-gray-50 font-light">{review.origin}</p>
              </div>
              <div className="flex gap-x-2">
                <p className="font-medium">Destination:</p>
                <p className="text-gray-50 font-light">{review.destination}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardReview;
