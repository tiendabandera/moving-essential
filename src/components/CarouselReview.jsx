import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CardReview from "./design/CardReview";

const CarouselReview = () => {
  const reviews = [
    {
      id: 1,
      customer_name: "Libardo Valera",
      quoted_price: 200,
      actual_price: 200,
      origin: "Point MacKenzie",
      destination: "Florida Hills",
      rating: 5,
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima aliquam assumenda libero ullam? Explicabo sapiente molestias inventore, veritatis alias pariatur est fugit dolore ipsa at tempore maiores vitae ex quis!",
    },
    {
      id: 2,
      customer_name: "Valera Libardo",
      quoted_price: 200,
      actual_price: 200,
      origin: "West Miami",
      destination: "Florida Hills",
      rating: 3,
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima aliquam assumenda libero ullam? Explicabo sapiente molestias inventore, veritatis alias pariatur est fugit dolore ipsa at tempore maiores vitae ex quis! est fugit dolore ipsa at tempore maiores vitae ex quis!",
    },
  ];

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
