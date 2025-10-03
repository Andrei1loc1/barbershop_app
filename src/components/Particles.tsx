import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ParticlesProps {
  count?: number;
}

const Particles: React.FC<ParticlesProps> = ({ count = 100 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "raindrop";
      particle.style.left = Math.random() * window.innerWidth + "px";
      particle.style.top = -10 + "px";
      container.appendChild(particle);
      particles.push(particle);

      const duration = Math.random() * 2 + 2;

      gsap.to(particle, {
        y: window.innerHeight + 50,
        opacity: 0,
        duration,
        repeat: -1,
        delay: Math.random() * 3,
        ease: "none",
        onRepeat: () => {
          gsap.set(particle, {
            y: -10,
            left: Math.random() * window.innerWidth,
            opacity: 1,
          });
        },
      });
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 9999,
      }}
    />
  );
};

export default Particles;
