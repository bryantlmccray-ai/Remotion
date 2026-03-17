import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { colors } from "../utils/colors";

interface PhoneMockupProps {
  children: React.ReactNode;
  scale?: number;
  style?: React.CSSProperties;
  screenBloom?: boolean;
  bloomDelay?: number;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  scale = 1,
  style,
  screenBloom = false,
  bloomDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const phoneW = 320 * scale;
  const phoneH = 680 * scale;
  const borderR = 44 * scale;
  const border = 3 * scale;

  // Screen bloom — warm glow like a candle lit behind frosted glass
  const bloomOpacity = screenBloom
    ? interpolate(frame, [bloomDelay, bloomDelay + 15, bloomDelay + 40], [0, 0.6, 0.15], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Subtle ambient reflection that shifts
  const reflectionAngle = 135 + Math.sin(frame * 0.02) * 15;

  return (
    <div
      style={{
        width: phoneW,
        height: phoneH,
        borderRadius: borderR,
        border: `${border}px solid`,
        borderImage: `linear-gradient(${reflectionAngle}deg, ${colors.borderBright}, rgba(201,168,76,0.15), ${colors.borderBright}) 1`,
        background: colors.bgCard,
        position: "relative",
        overflow: "hidden",
        boxShadow: `
          0 0 0 ${border * 0.5}px rgba(17,17,24,0.8),
          0 30px 80px rgba(0,0,0,0.7),
          0 60px 160px rgba(0,0,0,0.5),
          0 0 80px rgba(201,168,76,0.12),
          0 0 120px rgba(201,168,76,0.06),
          inset 0 1px 0 rgba(255,255,255,0.08),
          inset 0 -1px 0 rgba(0,0,0,0.3)
        `,
        ...style,
      }}
    >
      {/* Dynamic Island notch */}
      <div
        style={{
          position: "absolute",
          top: 12 * scale,
          left: "50%",
          transform: "translateX(-50%)",
          width: 110 * scale,
          height: 30 * scale,
          borderRadius: 16 * scale,
          background: "#000",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8 * scale,
          boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
        }}
      >
        <div
          style={{
            width: 8 * scale,
            height: 8 * scale,
            borderRadius: "50%",
            background: "radial-gradient(circle, #1a1a2e, #0a0a14)",
            border: "0.5px solid rgba(255,255,255,0.05)",
          }}
        />
        <div
          style={{
            width: 56 * scale,
            height: 5 * scale,
            borderRadius: 3 * scale,
            background: "#0a0a14",
          }}
        />
      </div>

      {/* Screen bloom overlay */}
      {screenBloom && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.3), transparent 70%)`,
            opacity: bloomOpacity,
            pointerEvents: "none",
            zIndex: 60,
          }}
        />
      )}

      {/* Top light reflection */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.15) 100%)`,
          pointerEvents: "none",
          zIndex: 50,
          borderRadius: borderR,
        }}
      />

      {/* Content */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: borderR - border }}>
        {children}
      </div>

      {/* Edge highlight — left and right */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: -1,
          width: 1,
          height: "30%",
          background: `linear-gradient(180deg, transparent, rgba(255,255,255,0.08), transparent)`,
          pointerEvents: "none",
          zIndex: 110,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: -1,
          width: 1,
          height: "25%",
          background: `linear-gradient(180deg, transparent, rgba(255,255,255,0.05), transparent)`,
          pointerEvents: "none",
          zIndex: 110,
        }}
      />
    </div>
  );
};
