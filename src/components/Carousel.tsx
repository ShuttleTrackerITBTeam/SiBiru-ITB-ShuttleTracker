import React, { useState } from 'react';
import CarouselItem from './CarouselItem';
import CarouselIndicator from './CarouselIndicator';

export interface CarouselProps {
  width?: number;
  height?: number;
  items: React.ReactNode[];
}

export default function Carousel({ items }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  function handleNextItemBtn() {
    setActiveIndex((prev) => {
      return prev + 1 < items.length ? prev + 1 : prev;
    });
  }

  function handlePrevItemBtn() {
    setActiveIndex((prev) => {
      return prev - 1 >= 0 ? prev - 1 : prev;
    });
  }

  return (
    <div className="carousel-container w-[384px] relative">
      {activeIndex > 0 && (
        <button
          className="carousel-btn-switch-card absolute left-20 mt-4"
          onClick={handlePrevItemBtn}
        >
          <img src="/images/fotoProfileAbout/arrow_circle_left.svg" style={{ width: '40px', height: '40px' }} />
        </button>
      )}
      {items?.map((item, index) => (
        <CarouselItem key={index} index={index} activeIndex={activeIndex}>
          {item}
        </CarouselItem>
      ))}
      {activeIndex < items.length - 1 && (
        <button
          className="carousel-btn-switch-card absolute right-20 mt-4"
          onClick={handleNextItemBtn}
        >
          <img src="/images/fotoProfileAbout/arrow_circle_right.svg" style={{ width: '40px', height: '40px' }}/>
        </button>
      )}

      <CarouselIndicator
        activeIndex={activeIndex}
        length={items.length}
        onSetActiveIndex={(activeIndex) => {
          setActiveIndex(activeIndex);
        }}
      />
    </div>
  );
}