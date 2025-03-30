import { useAuth } from "@/context/AuthContext";
import { Heart } from "lucide-react";
import { useState } from "react";

const LikeCompany = ({
  company,
  isLiked,
  userLikes,
  setUserLikes,
  className,
  classNameText,
  setIsOpenAnonymous,
}) => {
  const { user, createUserInstance } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalLikes, setTotalLikes] = useState(company.likes_count);

  const toggleLike = async (e) => {
    e.stopPropagation();

    if (!user) {
      setIsOpenAnonymous(true);
      return;
    }

    if (isProcessing) return;
    setIsProcessing(true);

    const userInstance = createUserInstance(user);
    const newUserLikes = new Set(userLikes);

    try {
      if (isLiked) {
        newUserLikes.delete(company.id);
        setTotalLikes((prev) => prev - 1);

        await userInstance.unlikeCompany(company);
      } else {
        newUserLikes.add(company.id);
        setTotalLikes((prev) => prev + 1);

        await userInstance.likeCompany(company);
      }

      setUserLikes(newUserLikes);
    } catch (error) {
      console.log(error);
      setUserLikes(userLikes);
    }

    setIsProcessing(false);
  };

  return (
    <div className={`${className || "flex gap-2 items-center"}`}>
      <Heart
        strokeWidth={1}
        className={`cursor-pointer w-6 h-6 text-red-600 ${
          isLiked && "fill-red-600"
        }`}
        onClick={toggleLike}
      />
      <p className={`${classNameText || ""}`}>{totalLikes}</p>
    </div>
  );
};

export default LikeCompany;
