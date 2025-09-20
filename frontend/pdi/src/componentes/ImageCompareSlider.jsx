import React, { useRef, useState } from "react";
import "./hojas-de-estilo/ImageCompareSlider.css";

function ImageCompareSlider({ beforeSrc, afterSrc }) {
  const containerRef = useRef(null);
  const [sliderX, setSliderX] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updateSlider = (e) => {
    if (!isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderX(percent);
  };

  return (
    <div
      className="compare-container"
      ref={containerRef}
      onMouseMove={updateSlider}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      <img src={beforeSrc} alt="Antes" className="img-before" />
      <img
        src={afterSrc}
        alt="Después"
        className="img-after"
        style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
      />

      {/* Barra que se puede arrastrar */}
      <div
        className="slider-bar"
        style={{ left: `${sliderX}%` }}
        onMouseDown={() => setIsDragging(true)}
      />
    </div>
  );
}

export default ImageCompareSlider;
