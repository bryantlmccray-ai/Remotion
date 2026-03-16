import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { LuxuryBackground } from "../components/LuxuryBackground";

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

  // Expanding rings
  const ring1 = (frame * 0.5) % 100;
  const ring2 = ((frame * 0.5) + 50) % 100;

  // Floating tagline words
  const wordFloat = Math.sin(frame * 0.03) * 4;

  // Bottom decorative line width animation
  const lineWidth = interpolate(frame, [85, 120], [0, 200], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: colors.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <LuxuryBackground variant="warm" />

      {/* Expanding concentric rings from center */}
      {[ring1, ring2].map((r, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: r * 12,
            height: r * 12,
            borderRadius: "50%",
            border: `1px solid ${colors.gold}`,
            transform: "translate(-50%, -50%)",
            opacity: 0.08 * (1 - r / 100),
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Decorative arcs */}
      <svg
        style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }}
        viewBox="0 0 1920 1080"
      >
        <circle
          cx="960"
          cy="540"
          r={200 + Math.sin(frame * 0.02) * 10}
          fill="none"
          stroke={colors.gold}
          strokeWidth="0.5"
          strokeDasharray="8 12"
          opacity={0.15}
          transform={`rotate(${frame * 0.3}, 960, 540)`}
        />
        <circle
          cx="960"
          cy="540"
          r={280 + Math.cos(frame * 0.015) * 8}
          fill="none"
          stroke={colors.rose}
          strokeWidth="0.5"
          strokeDasharray="4 16"
          opacity={0.1}
          transform={`rotate(${-frame * 0.2}, 960, 540)`}
        />
      </svg>

      {/* Logo Ring */}
      <div
        style={{
          position: "relative",
          width: 180,
          height: 180,
          marginBottom: 48,
          opacity: ringOpacity,
          transform: `scale(${ringScale})`,
        }}
      >
        {/* Outer glow ring */}
        <div
          style={{
            position: "absolute",
            inset: -20,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(201,168,76,0.15) 40%, transparent 70%)`,
            animation: "pulse 3s infinite",
          }}
        />
        {/* Outer ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `2px solid`,
            borderColor: colors.borderBright,
            boxShadow: `0 0 60px rgba(201,168,76,0.4), inset 0 0 40px rgba(201,168,76,0.08), 0 0 120px rgba(201,168,76,0.15)`,
          }}
        />
        {/* Rotating gradient ring */}
        <div
          style={{
            position: "absolute",
            inset: -3,
            borderRadius: "50%",
            background: `conic-gradient(from ${frame * 1.5}deg, transparent 60%, ${colors.gold} 75%, ${colors.rose} 85%, ${colors.lavender} 90%, transparent 100%)`,
            mask: "radial-gradient(circle, transparent 76px, black 78px, black 90px, transparent 92px)",
            WebkitMask: "radial-gradient(circle, transparent 76px, black 78px, black 90px, transparent 92px)",
          }}
        />
        {/* Inner glow */}
        <div
          style={{
            position: "absolute",
            inset: 20,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(201,168,76,0.15) 0%, rgba(232,160,160,0.05) 50%, transparent 70%)`,
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
              fontSize: 72,
              fontWeight: 700,
              background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 40%, ${colors.rose} 80%, ${colors.gold} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
              letterSpacing: -2,
              filter: `drop-shadow(0 0 20px rgba(201,168,76,0.5))`,
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
            fontSize: 80,
            fontWeight: 300,
            letterSpacing: 24,
            color: colors.textPrimary,
            textTransform: "uppercase",
            lineHeight: 1,
            textShadow: `0 0 60px rgba(201,168,76,0.3), 0 0 120px rgba(201,168,76,0.1)`,
          }}
        >
          MONARK
        </div>
        {/* Shimmer sweep */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)`,
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
          transform: `translateY(${taglineY + wordFloat}px)`,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 18,
            fontWeight: 300,
            letterSpacing: 8,
            background: `linear-gradient(90deg, ${colors.gold}, ${colors.roseLight}, ${colors.gold})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textTransform: "uppercase",
          }}
        >
          Relationship Wellness
        </div>
        {/* Animated divider */}
        <div
          style={{
            width: lineWidth,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${colors.gold}, ${colors.rose}, ${colors.gold}, transparent)`,
            margin: "20px auto 0",
            opacity: taglineOpacity,
          }}
        />
      </div>

      {/* Bottom established text */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          fontFamily: fonts.sans,
          fontSize: 11,
          letterSpacing: 6,
          color: colors.textMuted,
          textTransform: "uppercase",
          opacity: interpolate(frame, [100, 130], [0, 0.5], { extrapolateRight: "clamp" }),
        }}
      >
        Elevate Your Connection
      </div>
    </div>
  );
};
