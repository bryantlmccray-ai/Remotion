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
        borderColor: colors.borderBright,
        background: colors.bgCard,
        position: "relative",
        overflow: "hidden",
        boxShadow: `
          0 0 0 ${border}px ${colors.bgCard},
          0 40px 120px rgba(0,0,0,0.8),
          0 0 60px rgba(201,168,76,0.15),
          inset 0 1px 0 rgba(255,255,255,0.1)
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
        <div style={{ width: 10 * scale, height: 10 * scale, borderRadius: "50%", background: "#1a1a2e" }} />
        <div style={{ width: 60 * scale, height: 6 * scale, borderRadius: 3 * scale, background: "#1a1a2e" }} />
      </div>
      {/* Screen glow overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(201,168,76,0.03) 0%, transparent 30%)",
          pointerEvents: "none",
          zIndex: 50,
        }}
      />
      {/* Content */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>{children}</div>
    </div>
  );
};
