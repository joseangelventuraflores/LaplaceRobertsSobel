import React, { useRef, useState } from "react";
import "./hojas-de-estilo/ImageCompareSlider.css";

function ImageCompareSlider({ beforeSrc, afterSrc }) {
  const containerRef = useRef(null);
  const [sliderX, setSliderX] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const moveSlider = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderX(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (isDragging) moveSlider(e.clientX);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length > 0) moveSlider(e.touches[0].clientX);
  };
  const handleTouchMove = (e) => {
    if (e.touches.length > 0) moveSlider(e.touches[0].clientX);
  };

  return (
    <div
      className="compare-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      <img src={beforeSrc} alt="Antes" className="img-before" />
      <img
        src={afterSrc}
        alt="Después"
        className="img-after"
        style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
      />
      {/* Barra que se arrastra */}
      <div
        className="slider-bar"
        style={{ left: `${sliderX}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
    </div>
  );
}

export default ImageCompareSlider;

