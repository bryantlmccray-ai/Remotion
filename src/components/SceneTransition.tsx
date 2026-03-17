import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../utils/colors";

// Standard cinematic fade — darkness pulling back like waking up
export const FadeTransition: React.FC<{
  durationIn?: number;
  durationOut?: number;
  totalFrames: number;
}> = ({ durationIn = 15, durationOut = 15, totalFrames }) => {
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

// Gold wipe — a luxury curtain reveal
export const GoldWipeTransition: React.FC<{
  durationIn?: number;
  durationOut?: number;
  totalFrames: number;
}> = ({ durationIn = 25, durationOut = 20, totalFrames }) => {
  const frame = useCurrentFrame();

  // Wipe in from left
  const wipeInProgress = interpolate(frame, [0, durationIn], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Wipe out to right
  const wipeOutProgress = interpolate(
    frame,
    [totalFrames - durationOut, totalFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const showWipeIn = frame <= durationIn;
  const showWipeOut = frame >= totalFrames - durationOut;

  return (
    <>
      {showWipeIn && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: colors.bg,
            clipPath: `inset(0 0 0 ${wipeInProgress * 100}%)`,
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          {/* Gold leading edge */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${wipeInProgress * 100}%`,
              width: 3,
              background: colors.gradientGold,
              boxShadow: `0 0 30px ${colors.gold}, 0 0 60px rgba(201,168,76,0.3)`,
              transform: "translateX(-50%)",
            }}
          />
        </div>
      )}
      {showWipeOut && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: colors.bg,
            clipPath: `inset(0 ${(1 - wipeOutProgress) * 100}% 0 0)`,
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: `${(1 - wipeOutProgress) * 100}%`,
              width: 3,
              background: colors.gradientGold,
              boxShadow: `0 0 30px ${colors.gold}`,
              transform: "translateX(50%)",
            }}
          />
        </div>
      )}
    </>
  );
};

// Blur transition — content softens into the next scene
export const BlurTransition: React.FC<{
  durationIn?: number;
  durationOut?: number;
  totalFrames: number;
}> = ({ durationIn = 20, durationOut = 20, totalFrames }) => {
  const frame = useCurrentFrame();

  const blurIn = interpolate(frame, [0, durationIn], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blurOut = interpolate(
    frame,
    [totalFrames - durationOut, totalFrames],
    [0, 20],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const fadeIn = interpolate(frame, [0, durationIn * 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [totalFrames - durationOut * 0.6, totalFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const blur = Math.max(blurIn, blurOut);
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backdropFilter: blur > 0.5 ? `blur(${blur}px)` : "none",
        background: `rgba(7,7,12,${1 - opacity})`,
        pointerEvents: "none",
        zIndex: 1000,
      }}
    />
  );
};
