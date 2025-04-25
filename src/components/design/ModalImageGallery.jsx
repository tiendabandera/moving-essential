import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const ModalImageGallery = ({ isOpen, onClose, images, position = 0 }) => {
  const [api, setApi] = useState();

  useEffect(() => {
    if (!api) {
      return;
    }

    api.scrollTo(position);
  }, [api]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <Carousel
          className="relative border border-gray-100 lg:rounded-md"
          setApi={setApi}
        >
          <CarouselContent className="">
            {Object.values(images).map((img, index) => (
              <CarouselItem key={index}>
                <img
                  src={img}
                  alt=""
                  className="w-full h-[300px] sm:h-[500px] lg:h-[700px] lg:rounded-md object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute w-[80%] mx-auto top-1/2 left-2 right-4 flex items-center justify-between">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default ModalImageGallery;
