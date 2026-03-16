import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";

export const Scene01_BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo ring animation
  const ringScale = spring({ frame, fps, config: { damping: 60, stiffness: 80, mass: 1.2 } });
  const ringOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Crown/logo inner
  const innerScale = spring({ frame: frame - 15, fps, config: { damping: 80, stiffness: 200, mass: 0.6 } });
  const innerOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" });

  // Title text
  const titleOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [40, 65], [30, 0], {
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  // Tagline
  const taglineOpacity = interpolate(frame, [60, 85], [0, 1], { extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [60, 85], [20, 0], {
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  // Shimmer on title
  const shimmerX = interpolate(frame, [70, 120], [-100, 300], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: colors.gradientBg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ParticleField />
      <GlowOrb x="15%" y="25%" size={600} color="rgba(201,168,76,0.3)" delay={0} />
      <GlowOrb x="85%" y="75%" size={500} color="rgba(232,160,160,0.25)" delay={60} />
      <GlowOrb x="50%" y="10%" size={400} color="rgba(94,110,74,0.2)" delay={30} />

      {/* Logo Ring */}
      <div
        style={{
          position: "relative",
          width: 160,
          height: 160,
          marginBottom: 40,
          opacity: ringOpacity,
          transform: `scale(${ringScale})`,
        }}
      >
        {/* Outer ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `2px solid`,
            borderColor: colors.borderBright,
            boxShadow: `0 0 40px rgba(201,168,76,0.3), inset 0 0 40px rgba(201,168,76,0.05)`,
          }}
        />
        {/* Rotating gradient ring */}
        <div
          style={{
            position: "absolute",
            inset: -2,
            borderRadius: "50%",
            background: `conic-gradient(from 45deg, transparent 70%, ${colors.gold} 85%, transparent 100%)`,
            mask: "radial-gradient(circle, transparent 68px, black 70px, black 80px, transparent 82px)",
            WebkitMask: "radial-gradient(circle, transparent 68px, black 70px, black 80px, transparent 82px)",
          }}
        />
        {/* Inner glow */}
        <div
          style={{
            position: "absolute",
            inset: 20,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)`,
            opacity: innerOpacity,
            transform: `scale(${innerScale})`,
          }}
        />
        {/* Monogram */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: innerOpacity,
            transform: `scale(${innerScale})`,
          }}
        >
          <span
            style={{
              fontFamily: fonts.serif,
              fontSize: 64,
              fontWeight: 700,
              background: colors.gradientGold,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
              letterSpacing: -2,
            }}
          >
            M
          </span>
        </div>
      </div>

      {/* Brand Name */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 72,
            fontWeight: 300,
            letterSpacing: 18,
            color: colors.textPrimary,
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          MONARK
        </div>
        {/* Shimmer sweep */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)`,
            transform: `translateX(${shimmerX}%)`,
            width: "40%",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          marginTop: 16,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 16,
            fontWeight: 300,
            letterSpacing: 6,
            color: colors.textSecondary,
            textTransform: "uppercase",
          }}
        >
          Relationship Wellness
        </div>
        <div
          style={{
            width: 80,
            height: 1,
            background: colors.gradientGold,
            margin: "16px auto 0",
            opacity: taglineOpacity,
          }}
        />
      </div>
    </div>
  );
};
