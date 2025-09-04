// components/AnimatedCard.jsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./AnimatedCard.css";

export default function AnimatedCard({ children, glowColor = "132, 0, 255", className = "" }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      gsap.to(el, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      const relX = (x / rect.width) * 100;
      const relY = (y / rect.height) * 100;
      el.style.setProperty("--glow-x", `${relX}%`);
      el.style.setProperty("--glow-y", `${relY}%`);
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.4,
        ease: "power2.out",
      });
      el.style.setProperty("--glow-intensity", "0");
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`animated-card ${className}`}
      style={{ "--glow-color": glowColor }}
    >
      {children}
    </div>
  );
}
