import React, { useRef, useState } from 'react';

export default function CustomTinderCard({ project, onSwipe }) {
  const cardRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [swiped, setSwiped] = useState(false);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;
    setTranslate({ x: dx, y: dy });
    setRotation(dx * 0.05);
  };

  const handlePointerUp = () => {
    setIsDragging(false);

    if (translate.x > 150) {
      swipe('right');
    } else if (translate.x < -150) {
      swipe('left');
    } else {
      setTranslate({ x: 0, y: 0 });
      setRotation(0);
    }
  };

  const swipe = (dir) => {
    setSwiped(true);
    if (onSwipe) onSwipe(dir, project.title);
  };

  return (
    !swiped && (
      <div
        ref={cardRef}
        className="absolute left-0 top-0 w-full h-full flex items-center justify-center transition-transform duration-300 ease-in-out"
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) rotate(${rotation}deg)`,
          cursor: 'grab',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => isDragging && handlePointerUp()}
      >
        <div
          className="w-[300px] h-[450px] rounded-2xl p-4 shadow-lg text-white relative overflow-hidden flex flex-col items-center justify-center text-center"
          style={{
            background: project.gradient,
            border: `2px solid ${project.borderColor}`,
          }}
        >
          {project.isIntroCard ? (
            <>
              <h2 className="text-2xl font-bold mb-3">Start Swiping</h2>
              <p className="text-sm text-gray-300">
                Swipe left or right to get started →
              </p>
            </>
          ) : (
            <>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">{project.title}</h3>
              <p className="text-sm italic text-gray-300 mb-2">{project.subtitle}</p>
              <p className="text-sm">{project.description}</p>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition text-sm"
              >
                View Code →
              </a>
            </>
          )}
        </div>
      </div>
    )
  );
}
