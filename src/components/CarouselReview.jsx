import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CardReview from "./design/CardReview";

const CarouselReview = ({ reviews = [], isOwner, info }) => {
  return (
    <div className="w-full md:w-11/12">
      <Carousel>
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem key={`review_${review.id}`} className="lg:basis-1/2">
              <CardReview
                review={{ ...review }}
                isOwner={isOwner}
                has_premium_features={info.has_premium_features}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden lg:flex">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselReview;
