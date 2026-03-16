import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";

const AnimatedMetric: React.FC<{
  value: string;
  label: string;
  sublabel?: string;
  delay: number;
  large?: boolean;
}> = ({ value, label, sublabel, delay, large }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({ frame: frame - delay, fps, config: { damping: 80, stiffness: 180, mass: 0.6 } });
  const opacity = interpolate(appear, [0, 1], [0, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${appear}) translateY(${(1 - appear) * 20}px)`,
        textAlign: "center",
        padding: large ? "28px 36px" : "20px 24px",
        borderRadius: 20,
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${colors.border}`,
        backdropFilter: "blur(10px)",
        minWidth: large ? 220 : 160,
      }}
    >
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: large ? 52 : 36,
          fontWeight: 700,
          background: colors.gradientGold,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: large ? 14 : 12,
          color: colors.textSecondary,
          letterSpacing: 1,
          textTransform: "uppercase",
          lineHeight: 1.4,
        }}
      >
        {label}
      </div>
      {sublabel && (
        <div style={{ fontFamily: fonts.sans, fontSize: 10, color: colors.textMuted, marginTop: 4 }}>
          {sublabel}
        </div>
      )}
    </div>
  );
};

export const Scene06_InvestorBrief: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });

  // Slow scan line effect
  const scanY = interpolate(frame, [0, 300], [0, 1080], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#050508",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeIn,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow only */}
      <GlowOrb x="50%" y="50%" size={900} color="rgba(201,168,76,0.06)" delay={0} />
      <GlowOrb x="30%" y="30%" size={400} color="rgba(155,142,196,0.04)" delay={30} />

      {/* Scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: scanY,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.08), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Top: Logo + tagline */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 60,
          opacity: interpolate(frame, [10, 40], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [10, 40], [20, 0], { extrapolateRight: "clamp" })}px)`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 48,
            fontWeight: 300,
            letterSpacing: 16,
            color: colors.textPrimary,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          MONARK
        </div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            letterSpacing: 6,
            color: colors.textMuted,
            textTransform: "uppercase",
          }}
        >
          Investor Overview
        </div>
        <div
          style={{
            width: 60,
            height: 1,
            background: colors.gradientGold,
            margin: "16px auto 0",
          }}
        />
      </div>

      {/* Key Metrics Row 1 */}
      <div
        style={{
          display: "flex",
          gap: 24,
          marginBottom: 28,
        }}
      >
        <AnimatedMetric value="$4.2M" label="ARR" sublabel="42% QoQ growth" delay={30} large />
        <AnimatedMetric value="15K+" label="Active Members" sublabel="78% retention at 90d" delay={45} large />
        <AnimatedMetric value="92%" label="Match Satisfaction" sublabel="Post-date NPS: 87" delay={60} large />
      </div>

      {/* Key Metrics Row 2 */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 50,
        }}
      >
        <AnimatedMetric value="4.9" label="App Store" delay={75} />
        <AnimatedMetric value="$82" label="ARPU / mo" delay={85} />
        <AnimatedMetric value="3.2x" label="LTV / CAC" delay={95} />
        <AnimatedMetric value="18 min" label="Avg Session" delay={105} />
      </div>

      {/* Founder attribution */}
      <div
        style={{
          textAlign: "center",
          opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [120, 150], [15, 0], { extrapolateRight: "clamp" })}px)`,
        }}
      >
        <div
          style={{
            width: 40,
            height: 1,
            background: colors.gradientGold,
            margin: "0 auto 20px",
          }}
        />
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 18,
            color: colors.textPrimary,
            fontWeight: 300,
            fontStyle: "italic",
            marginBottom: 12,
            maxWidth: 600,
          }}
        >
          "We're building the infrastructure for how the next generation forms meaningful relationships."
        </div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            letterSpacing: 3,
            color: colors.gold,
            textTransform: "uppercase",
          }}
        >
          Bryant McCray — Founder & CEO
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          fontFamily: fonts.sans,
          fontSize: 10,
          letterSpacing: 2,
          color: "rgba(245,240,232,0.15)",
          textTransform: "uppercase",
          opacity: interpolate(frame, [130, 160], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        Confidential · For Investor Use Only · Q1 2026
      </div>
    </div>
  );
};
