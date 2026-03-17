import React from "react";
import { useCurrentFrame } from "remotion";
import { colors } from "../utils/colors";

// Pentagon shape — mirrors the RIF dimension shape from the app
const Pentagon: React.FC<{
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  color: string;
}> = ({ x, y, size, rotation, opacity, color }) => {
  // Generate pentagon points
  const points = Array.from({ length: 5 }, (_, i) => {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
    const px = size * Math.cos(angle);
    const py = size * Math.sin(angle);
    return `${px},${py}`;
  }).join(" ");

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        opacity,
        pointerEvents: "none",
      }}
    >
      <svg width={size * 2.5} height={size * 2.5} viewBox={`${-size * 1.2} ${-size * 1.2} ${size * 2.4} ${size * 2.4}`}>
        <polygon
          points={points}
          fill={color}
          stroke={color}
          strokeWidth="0.3"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotationSpeed: number;
  phase: number;
  type: "pentagon" | "dot" | "ring";
  hue: "gold" | "rose" | "lavender";
}

// Golden ratio distribution for natural placement
const PARTICLES: Particle[] = Array.from({ length: 65 }, (_, i) => {
  const golden = 137.508;
  return {
    x: (i * golden) % 100,
    y: (i * 73.21 + i * 17.3) % 120 - 10,
    size: i % 7 === 0 ? 4 + (i % 3) * 2 : 1.5 + (i % 4) * 0.8,
    speedY: 0.15 + (i % 7) * 0.06,
    speedX: (i % 2 === 0 ? 1 : -1) * 0.02 * (1 + (i % 3)),
    opacity: 0.08 + (i % 5) * 0.06,
    rotationSpeed: (i % 2 === 0 ? 1 : -1) * (0.3 + (i % 4) * 0.2),
    phase: i * 1.618,
    type: i % 7 === 0 ? "pentagon" : i % 11 === 0 ? "ring" : "dot",
    hue: i % 3 === 0 ? "gold" : i % 3 === 1 ? "rose" : "lavender",
  };
});

const hueToColor: Record<string, string> = {
  gold: colors.gold,
  rose: colors.rose,
  lavender: colors.lavender,
};

export const ParticleField: React.FC<{
  intensity?: number;
  direction?: "up" | "down";
}> = ({ intensity = 1, direction = "up" }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {PARTICLES.map((p, i) => {
        const dirMult = direction === "up" ? -1 : 1;
        // Continuous vertical drift
        const rawY = p.y + dirMult * frame * p.speedY;
        const y = ((rawY % 130) + 130) % 130 - 15;
        // Horizontal wave drift
        const drift = Math.sin(frame * 0.015 + p.phase) * 2.5;
        const x = p.x + drift + Math.sin(frame * p.speedX * 0.1) * 1;
        // Rotation
        const rotation = frame * p.rotationSpeed + p.phase * 60;
        // Pulsing opacity
        const pulseOpacity = p.opacity * intensity * (0.4 + 0.6 * Math.sin(frame * 0.03 + p.phase));
        const color = hueToColor[p.hue];

        if (p.type === "pentagon") {
          return (
            <Pentagon
              key={i}
              x={x}
              y={y}
              size={p.size}
              rotation={rotation}
              opacity={pulseOpacity}
              color={color}
            />
          );
        }

        if (p.type === "ring") {
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                width: p.size * 3,
                height: p.size * 3,
                borderRadius: "50%",
                border: `0.5px solid ${color}`,
                opacity: pulseOpacity * 0.6,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              }}
            />
          );
        }

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: color,
              opacity: pulseOpacity,
              boxShadow: p.size > 2 ? `0 0 ${p.size * 2}px ${color}` : "none",
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </div>
  );
};
