
import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  DotButton,
  PrevButton,
  NextButton
} from './CarouselArrowsAndButtons'
import {type EmblaCarouselType} from "embla-carousel"
import "./embla.css"

type PropType = {
  imgSrcs: string[]
}

const CardSlider = ({imgSrcs} : PropType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation()
      if (emblaApi) {
        emblaApi.scrollPrev();
      }
    },
    [emblaApi]
  );
  
  const scrollNext = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (emblaApi) {
        emblaApi.scrollNext();
      }
    },
    [emblaApi]
  );
  const handleDotClick = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    scrollTo(index);
  };
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    const snaps = emblaApi.scrollSnapList();
    setScrollSnaps(snaps);
  }, []);


  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
          {imgSrcs.map((src, index) => (
  <div className="embla__slide" key={index}>
    <div className="embla__slide__number">
      <span>{index + 1}</span>
    </div>
    <img
      className="embla__slide__img"
      src={src} 
      alt={`Slide ${index + 1}`}
    />
  </div>
))}
          </div>
        </div>

        <div className="embla__buttons">
          <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
          <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
        </div>
      </div>
<div className="embla__dots">
  {scrollSnaps.map((_, index) => (
    <DotButton
      key={index}
      onClick={(event) => handleDotClick(index, event)}
      className={'embla__dot'.concat(
        index === selectedIndex ? ' embla__dot--selected' : ''
      )}
    />
  ))}
</div>
    </>
  )
}

export default CardSlider
