import React from "react";
import { useCurrentFrame } from "remotion";

/**
 * Ambient pentagon-shaped particles that drift upward like embers.
 * These fill the dead zone and persist throughout the entire video.
 * Mirrors the RIF dimension pentagon shape from the app.
 */

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  rotation: number;
  opacity: number;
  delay: number;
}

// Pre-computed particle configs for 35 particles
const PARTICLES: Particle[] = Array.from({ length: 35 }, (_, i) => ({
  x: (i * 137.508) % 100, // golden angle distribution
  y: 100 + (i * 23.7) % 40, // start below frame
  size: 6 + (i % 5) * 3,
  speed: 0.15 + (i % 7) * 0.04,
  drift: ((i * 31) % 60 - 30) * 0.01,
  rotation: (i * 47) % 360,
  opacity: 0.08 + (i % 4) * 0.05,
  delay: (i * 11) % 120,
}));

const PentagonShape: React.FC<{ size: number; opacity: number; rotation: number; color: string }> = ({
  size,
  opacity,
  rotation,
  color,
}) => {
  // Pentagon vertices
  const points = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    const r = size / 2;
    return `${r + r * Math.cos(angle)},${r + r * Math.sin(angle)}`;
  }).join(" ");

  return (
    <svg width={size} height={size} style={{ transform: `rotate(${rotation}deg)`, opacity }}>
      <polygon
        points={points}
        fill={color}
        stroke="none"
      />
    </svg>
  );
};

export const PentagonParticles: React.FC<{ fadeIn?: number }> = ({ fadeIn = 1 }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: fadeIn,
      }}
    >
      {PARTICLES.map((p, i) => {
        const t = Math.max(0, frame - p.delay);
        // Particles drift upward continuously, looping
        const yPos = ((p.y - t * p.speed) % 140) - 20;
        // Gentle horizontal drift with sine wave
        const xPos = p.x + Math.sin(t * 0.02 + i) * 3 + t * p.drift;
        // Slow rotation
        const rot = p.rotation + t * 0.3;
        // Gentle opacity pulse
        const opacityPulse = p.opacity + Math.sin(t * 0.04 + i * 0.5) * 0.03;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${xPos}%`,
              top: `${yPos}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <PentagonShape
              size={p.size}
              opacity={opacityPulse}
              rotation={rot}
              color="rgba(201,168,76,0.25)"
            />
          </div>
        );
      })}
    </div>
  );
};
