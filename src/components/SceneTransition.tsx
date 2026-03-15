import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../utils/colors";

interface SceneTransitionProps {
  type?: "fade" | "wipe-gold";
  durationFrames?: number;
}

export const FadeTransition: React.FC<{ durationIn?: number; durationOut?: number; totalFrames: number }> = ({
  durationIn = 20,
  durationOut = 20,
  totalFrames,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, durationIn, totalFrames - durationOut, totalFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: colors.bg,
        opacity: 1 - opacity,
        pointerEvents: "none",
        zIndex: 1000,
      }}
    />
  );
};
