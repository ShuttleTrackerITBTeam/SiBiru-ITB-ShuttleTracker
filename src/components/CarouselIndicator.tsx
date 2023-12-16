import React from 'react';

export interface CarouselIndicatorProps {
  activeIndex: number;
  length: number;
  maxIndicatorVisible?: number;
  onSetActiveIndex: (index: number) => void;
}

export default function CarouselIndicator({
  activeIndex,
  length,
  maxIndicatorVisible = 0,
}: CarouselIndicatorProps) {
  const maxIndicator = length > maxIndicatorVisible ? maxIndicatorVisible : length;

  return (
    <div className="carousel-indicator">
      {Array.from(Array(maxIndicator), (_, index) => {
        return (
            <div key={index}>
                <div
                  className={`carousel-indicator-dots
                  ${activeIndex === index ? 'w-4 opacity-100' : 'w-2 bg-gray-400'}`}
                ></div>
            </div>
        );
      })}
    </div>
  );
}