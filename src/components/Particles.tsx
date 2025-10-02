import { useEffect } from "react";
import gsap from "gsap";

interface ParticlesProps {
  count?: number; // câte particule să fie
}

const Particles: React.FC<ParticlesProps> = ({ count = 100 }) => {
  useEffect(() => {
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "raindrop";
      particle.style.left = Math.random() * window.innerWidth + "px";
      particle.style.top = -10 + "px";
      document.body.appendChild(particle);
      particles.push(particle);

      const duration = Math.random() * 2 + 2; // 2–4 secunde

      gsap.to(particle, {
        y: window.innerHeight + 50,
        opacity: 0,                // 🔹 scade opacitatea până la 0
        duration,
        repeat: -1,
        delay: Math.random() * 3,
        ease: "none",
        onRepeat: () => {
          // resetare pentru următorul ciclu
          gsap.set(particle, {
            y: -10,
            left: Math.random() * window.innerWidth,
            opacity: 1, // 🔹 reapare vizibil la început
          });
        },
      });
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, [count]);

  return null;
};

export default Particles;
