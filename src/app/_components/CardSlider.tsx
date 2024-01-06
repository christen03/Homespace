import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

interface CardSliderProps {
  imgSrcs: string[];
}

export default function CardSlider({ imgSrcs }: CardSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (emblaApi) emblaApi.scrollPrev();
    },
    [emblaApi],
  );

  const scrollNext = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (emblaApi) emblaApi.scrollNext();
    },
    [emblaApi],
  );

  return (
    <div className="relative">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {imgSrcs.map((src, index) => (
            <div className="embla__slide min-w-full flex-shrink-0" key={index}>
              <img
                className="embla__slide__img block h-80 w-full object-cover"
                src={src}
                alt={`Slide ${index}`}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute left-0 z-20 m-4 rounded-full bg-black bg-opacity-50 p-2"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-8 w-8 text-white" />
      </button>
      <button
        className="absolute right-0 z-20 m-4 rounded-full bg-black bg-opacity-50 p-2"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-8 w-8 text-white" />
      </button>
    </div>
  );
}
