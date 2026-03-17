import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../utils/colors";

export const GoldDivider: React.FC<{
  width?: string;
  startFrame?: number;
  animated?: boolean;
}> = ({ width = "80px", startFrame = 0, animated = true }) => {
  const frame = useCurrentFrame();

  // The divider draws itself — like a sommelier uncovering a dish
  const drawProgress = animated
    ? interpolate(frame, [startFrame, startFrame + 30], [0, 100], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 100;

  // Shimmer travels along the divider after it's drawn
  const shimmerPos = interpolate(
    frame,
    [startFrame + 30, startFrame + 60],
    [-20, 120],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div style={{ position: "relative", width, height: 2, overflow: "hidden" }}>
      <div
        style={{
          width: `${drawProgress}%`,
          height: 1,
          background: colors.gradientGoldHoriz,
          borderRadius: 1,
          position: "relative",
        }}
      />
      {animated && drawProgress > 50 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${shimmerPos}%`,
            width: "20%",
            height: "100%",
            background: "rgba(255,255,255,0.6)",
            filter: "blur(2px)",
          }}
        />
      )}
    </div>
  );
};
