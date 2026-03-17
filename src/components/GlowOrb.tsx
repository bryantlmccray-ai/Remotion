import React from "react";
import { useCurrentFrame } from "remotion";

interface GlowOrbProps {
  x: string;
  y: string;
  size: number;
  color: string;
  pulse?: boolean;
  delay?: number;
  drift?: boolean;
}

export const GlowOrb: React.FC<GlowOrbProps> = ({
  x,
  y,
  size,
  color,
  pulse = true,
  delay = 0,
  drift = true,
}) => {
  const frame = useCurrentFrame();
  const scale = pulse ? 1 + 0.12 * Math.sin((frame + delay) * 0.025) : 1;
  const opacity = 0.2 + 0.15 * Math.sin((frame + delay) * 0.02);

  // Slow ambient drift — orbs are alive, never static
  const driftX = drift ? Math.sin((frame + delay) * 0.008) * 20 : 0;
  const driftY = drift ? Math.cos((frame + delay) * 0.006) * 15 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
        opacity,
        transform: `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) scale(${scale})`,
        filter: `blur(${size * 0.25}px)`,
        pointerEvents: "none",
        willChange: "transform, opacity",
      }}
    />
  );
};
