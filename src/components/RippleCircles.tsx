import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Two translucent circles expanding outward from center — like ripples on water.
 * Pulse at resting heartbeat rhythm (60 BPM = 1 beat per second = 30 frames at 30fps).
 * Represent two people in orbit. They never fully complete — they pulse.
 */
export const RippleCircles: React.FC<{
  x?: string;
  y?: string;
  maxRadius?: number;
  opacity?: number;
}> = ({ x = "50%", y = "65%", maxRadius = 280, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 60 BPM = 1 beat per second = fps frames per beat
  const beatDuration = fps; // 30 frames at 30fps
  const progress1 = (frame % beatDuration) / beatDuration;
  const progress2 = ((frame + beatDuration / 2) % beatDuration) / beatDuration;

  const renderRipple = (progress: number, index: number) => {
    const radius = progress * maxRadius;
    // Fade out as they expand — never reach full opacity
    const rippleOpacity = (1 - progress) * 0.12;

    return (
      <div
        key={index}
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: radius * 2,
          height: radius * 2,
          borderRadius: "50%",
          border: "1.5px solid rgba(201,168,76,0.15)",
          background: `radial-gradient(circle, rgba(201,168,76,${rippleOpacity * 0.5}) 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          opacity: rippleOpacity * opacity,
          pointerEvents: "none" as const,
        }}
      />
    );
  };

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {renderRipple(progress1, 0)}
      {renderRipple(progress2, 1)}
    </div>
  );
};
