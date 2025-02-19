import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CardReview from "./design/CardReview";

const CarouselReview = ({ reviews = [] }) => {
  return (
    <div className="w-full md:w-11/12">
      <Carousel>
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem key={`review_${review.id}`} className="lg:basis-1/2">
              <CardReview review={{ ...review }} />
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
