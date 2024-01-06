import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'; // Assuming you're using Heroicons for arrow icons

export default function CardSlider({ imgSrcs }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });


  const scrollPrev = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  
  const scrollNext = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation(); 
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  

  return (
    <div className="relative">
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
          {imgSrcs.map((src, index) => (
            <div className="embla__slide flex-shrink-0 min-w-full" key={index}>
              <img className="embla__slide__img block w-full h-80 object-cover" src={src} alt={`Slide ${index}`} />
            </div>
          ))}
          </div>
      </div>
      <button
        className="absolute left-0 z-20 m-4 bg-black bg-opacity-50 rounded-full p-2"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-8 w-8 text-white" />
      </button>
      <button
        className="absolute right-0 z-20 m-4 bg-black bg-opacity-50 rounded-full p-2"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-8 w-8 text-white" />
      </button>
    </div>
  );
}