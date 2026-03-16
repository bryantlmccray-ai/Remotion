import React from "react";
import { colors } from "../utils/colors";

interface PhoneMockupProps {
  children: React.ReactNode;
  scale?: number;
  style?: React.CSSProperties;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ children, scale = 1, style }) => {
  const phoneW = 320 * scale;
  const phoneH = 680 * scale;
  const borderR = 44 * scale;
  const border = 3 * scale;

  return (
    <div
      style={{
        width: phoneW,
        height: phoneH,
        borderRadius: borderR,
        border: `${border}px solid`,
        borderColor: "rgba(166,147,95,0.35)",
        background: colors.bgCard,
        position: "relative",
        overflow: "hidden",
        boxShadow: `
          0 0 0 ${border}px ${colors.bgCard},
          0 40px 120px rgba(80,63,48,0.25),
          0 0 60px rgba(166,147,95,0.08),
          inset 0 1px 0 rgba(255,255,255,0.3)
        `,
        ...style,
      }}
    >
      {/* Notch */}
      <div
        style={{
          position: "absolute",
          top: 14 * scale,
          left: "50%",
          transform: "translateX(-50%)",
          width: 100 * scale,
          height: 28 * scale,
          borderRadius: 14 * scale,
          background: colors.bg,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6 * scale,
        }}
      >
        <div style={{ width: 10 * scale, height: 10 * scale, borderRadius: "50%", background: "rgba(67,54,39,0.12)" }} />
        <div style={{ width: 60 * scale, height: 6 * scale, borderRadius: 3 * scale, background: "rgba(67,54,39,0.12)" }} />
      </div>
      {/* Screen glow overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(166,147,95,0.04) 0%, transparent 30%)",
          pointerEvents: "none",
          zIndex: 50,
        }}
      />
      {/* Content */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>{children}</div>
    </div>
  );
};
