import React, { useState, useEffect } from 'react';

export default function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 10,
  pixelColor = '#111',
  animationStepDuration = 0.05,
  className = '',
}) {
  const [hovered, setHovered] = useState(false);
  const [pixels, setPixels] = useState([]);

  useEffect(() => {
    const total = gridSize * gridSize;
    const pixelsArray = Array.from({ length: total }, (_, i) => ({
      id: i,
      delay: Math.random() * animationStepDuration * 1000,
      visible: true,
    }));
    setPixels(pixelsArray);
  }, [gridSize, animationStepDuration]);

  useEffect(() => {

    if (hovered) {
      const timeouts = pixels.map((pixel, idx) =>
        setTimeout(() => {
          setPixels((prev) => {
            const newPixels = [...prev];
            newPixels[idx].visible = false;
            return [...newPixels];
          });
        }, pixel.delay)
      );
      return () => timeouts.forEach(clearTimeout);
    } else {
    }
  }, [hovered]);

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    pointerEvents: 'none',
  };

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: '1.25rem',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      { }
      <div style={{ width: '100%', height: '100%' }}>{firstContent}</div>

      { }
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        {secondContent}
      </div>

      { }
      <div style={containerStyle}>
        {pixels.map((pixel) => (
          <div
            key={pixel.id}
            style={{
              backgroundColor: pixel.visible ? pixelColor : 'transparent',
              transition: 'background-color 0.4s ease',
            }}
          />
        ))}
      </div>

      {/* Hover prompt — show until all pixels are cleared */}
      {!hovered && !(pixels.length && pixels.every(p => !p.visible)) && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <span className="text-sm text-gray-40 italic text-center tech-text">
            hover me
          </span>
        </div>
      )}

    </div>
  );
}
