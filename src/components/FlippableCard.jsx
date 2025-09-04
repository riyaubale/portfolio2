import React, { useEffect, useState } from "react";
import "./FlippableCard.css";

export default function FlippableCard({ project, isActive }) {
  const [flipped, setFlipped] = useState(false);

  // Reset flip when card is no longer active
  useEffect(() => {
    if (!isActive && flipped) {
      setFlipped(false);
    }
  }, [isActive, flipped]);

  const handleClick = () => {
    if (isActive) {
      setFlipped(!flipped);
    }
  };

  return (
    <div className={`flip-card ${flipped ? "flipped" : ""}`} onClick={handleClick}>
      <div className="flip-card-inner">
        {/* Front */}
        <div
          className="flip-card-front"
          style={{
            background: project.gradient,
            border: `2px solid ${project.borderColor}`,
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-20 h-20 rounded-full mb-4 object-cover"
          />
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="text-sm text-gray-300">{project.subtitle}</p>
          <div className="mt-6 text-sm text-gray-400 italic">{project.handle}</div>
          {isActive && <p className="text-xs text-gray-500 mt-2">(Click to flip)</p>}
        </div>

        {/* Back */}
        <div className="flip-card-back">
          <h4 className="text-lg font-bold mb-2">{project.title}</h4>
          <p className="text-sm text-gray-300 mb-4">{project.description}</p>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-blue-300 hover:text-white underline"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}
