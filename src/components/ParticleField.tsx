import React from "react";
import { useCurrentFrame } from "remotion";
import { colors } from "../utils/colors";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  hue: number;
}

const PARTICLES: Particle[] = Array.from({ length: 40 }, (_, i) => ({
  x: (i * 137.508) % 100,
  y: (i * 73.21) % 100,
  size: 1 + (i % 3),
  speed: 0.008 + (i % 5) * 0.003,
  opacity: 0.15 + (i % 4) * 0.1,
  hue: i % 2 === 0 ? 42 : 320, // gold or rose
}));

export const ParticleField: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {PARTICLES.map((p, i) => {
        const y = (p.y + frame * p.speed * 100) % 110 - 5;
        const drift = Math.sin(frame * 0.01 + i) * 1.5;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x + drift}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: p.hue === 42 ? colors.gold : colors.rose,
              opacity: p.opacity * (0.5 + 0.5 * Math.sin(frame * 0.05 + i)),
              filter: `blur(${p.size * 0.5}px)`,
            }}
          />
        );
      })}
    </div>
  );
};
