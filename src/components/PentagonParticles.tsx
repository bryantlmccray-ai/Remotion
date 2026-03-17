import React from "react";
import { useCurrentFrame } from "remotion";
import { warm } from "../utils/warmColors";

/**
 * Pentagon-shaped particles that drift upward like embers from a fireplace.
 * These mirror the RIF dimension shape from the app.
 * They fill the center-bottom void as ambient atmosphere throughout the entire video.
 * Cream at 20% opacity — barely there, always present.
 */

interface PentagonParticleData {
  x: number;        // initial x position (% of width)
  y: number;        // initial y position (% of height)
  size: number;     // pentagon size in px
  speed: number;    // upward drift speed
  rotation: number; // initial rotation
  rotSpeed: number; // rotation speed
  opacity: number;  // base opacity
  delay: number;    // animation offset
}

const generateParticles = (count: number): PentagonParticleData[] =>
  Array.from({ length: count }, (_, i) => ({
    x: (i * 137.508 + 23) % 100,
    y: 100 + (i * 47.3) % 40,           // start below frame
    size: 6 + (i % 5) * 3,
    speed: 0.12 + (i % 7) * 0.04,
    rotation: (i * 72) % 360,
    rotSpeed: 0.15 + (i % 3) * 0.1,
    opacity: 0.08 + (i % 4) * 0.04,     // very subtle — 8-20%
    delay: (i * 31) % 120,
  }));

// SVG pentagon path centered at 0,0 with radius 1
const pentagonPath = (() => {
  const pts = Array.from({ length: 5 }, (_, i) => {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
    return `${Math.cos(angle)},${Math.sin(angle)}`;
  });
  return `M${pts.join("L")}Z`;
})();

interface Props {
  count?: number;
  /** 0-1 multiplier to slow particles during "pull together" scene */
  speedMultiplier?: number;
}

export const PentagonParticles: React.FC<Props> = ({
  count = 35,
  speedMultiplier = 1,
}) => {
  const frame = useCurrentFrame();
  const particles = React.useMemo(() => generateParticles(count), [count]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((p, i) => {
        const f = frame + p.delay;
        // Upward drift — wraps from bottom to top
        const y = ((p.y - f * p.speed * speedMultiplier) % 140) + 20;
        // Gentle horizontal sway
        const drift = Math.sin(f * 0.008 + i * 1.7) * 2;
        // Breathing opacity at ~60 BPM (1 beat per second at 30fps → period = 30 frames)
        const breathe = 0.7 + 0.3 * Math.sin((f * Math.PI * 2) / 30);
        const rotation = p.rotation + f * p.rotSpeed;

        return (
          <svg
            key={i}
            style={{
              position: "absolute",
              left: `${p.x + drift}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity * breathe,
              transform: `rotate(${rotation}deg)`,
            }}
            viewBox="-1.2 -1.2 2.4 2.4"
          >
            <path
              d={pentagonPath}
              fill="none"
              stroke={warm.primary}
              strokeWidth="0.15"
              opacity="0.6"
            />
          </svg>
        );
      })}
    </div>
  );
};
