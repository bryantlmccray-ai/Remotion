import React from "react";
import { useCurrentFrame } from "remotion";

interface GlowOrbProps {
  x: string;
  y: string;
  size: number;
  color: string;
  pulse?: boolean;
  delay?: number;
}

export const GlowOrb: React.FC<GlowOrbProps> = ({ x, y, size, color, pulse = true, delay = 0 }) => {
  const frame = useCurrentFrame();
  const scale = pulse ? 1 + 0.08 * Math.sin((frame + delay) * 0.04) : 1;
  const opacity = 0.25 + 0.1 * Math.sin((frame + delay) * 0.03);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
        filter: `blur(${size * 0.3}px)`,
        pointerEvents: "none",
      }}
    />
  );
};
