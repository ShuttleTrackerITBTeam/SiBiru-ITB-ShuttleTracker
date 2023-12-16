import React, { useState } from 'react';

export interface CardProps {
  index: number;
  activeIndex: number;
  children?: React.ReactNode;
}

export default function CarouselItem({ index, activeIndex, children }: CardProps) {
  const [scaled, setScaled] = useState<Boolean>(false);

  const offset = (index - activeIndex) * 100; // Offset in percentage

  const cssTransformProperties = `
        translateX(${offset}%)
       `;

  const cssDisplay = index === activeIndex ? 'block' : 'none';

  return (
    <div
      className="carousel-item"
      style={{
        transform: cssTransformProperties,
        display: cssDisplay,
        zIndex: `${scaled ? 100 : 1}`,
      }}
      onClick={() => {
        setScaled(!scaled);
      }}
    >
      {children}
    </div>
  );
}