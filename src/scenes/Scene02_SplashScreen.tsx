import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";

export const Scene02_SplashScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // Heartbeat rings
  const beatFrame = frame % 90;
  const ring1Scale = 1 + interpolate(beatFrame, [0, 60], [0, 1.4], { extrapolateRight: "clamp" });
  const ring1Opacity = interpolate(beatFrame, [0, 60], [0.6, 0], { extrapolateRight: "clamp" });

  const beat2Frame = (frame + 15) % 90;
  const ring2Scale = 1 + interpolate(beat2Frame, [0, 60], [0, 1.2], { extrapolateRight: "clamp" });
  const ring2Opacity = interpolate(beat2Frame, [0, 60], [0.4, 0], { extrapolateRight: "clamp" });

  // Loading bar
  const loadProgress = interpolate(frame, [20, 100], [0, 100], { extrapolateRight: "clamp" });

  // Text float
  const textY = 8 * Math.sin(frame * 0.05);

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
        opacity: fadeIn,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ParticleField />
      <GlowOrb x="50%" y="40%" size={700} color="rgba(201,168,76,0.2)" delay={0} />
      <GlowOrb x="30%" y="60%" size={400} color="rgba(232,160,160,0.15)" delay={40} />

      {/* Heartbeat rings */}
      <div
        style={{
          position: "absolute",
          width: 120,
          height: 120,
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${ring1Scale})`,
          borderRadius: "50%",
          border: `2px solid ${colors.gold}`,
          opacity: ring1Opacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 120,
          height: 120,
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${ring2Scale})`,
          borderRadius: "50%",
          border: `1px solid ${colors.rose}`,
          opacity: ring2Opacity,
        }}
      />

      {/* Logo area */}
      <div
        style={{
          transform: `translateY(${textY}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Heart + M logo */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: `2px solid ${colors.borderBright}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(201,168,76,0.06)",
            boxShadow: `0 0 60px rgba(201,168,76,0.2)`,
            position: "relative",
          }}
        >
          {/* Heart SVG */}
          <svg width="48" height="44" viewBox="0 0 48 44" fill="none">
            <path
              d="M24 40C24 40 2 26 2 14C2 7.4 7.4 2 14 2C17.6 2 20.8 3.6 24 6.4C27.2 3.6 30.4 2 34 2C40.6 2 46 7.4 46 14C46 26 24 40 24 40Z"
              fill="url(#heartGrad)"
            />
            <defs>
              <linearGradient id="heartGrad" x1="2" y1="2" x2="46" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C9A84C" />
                <stop offset="0.5" stopColor="#E8C97A" />
                <stop offset="1" stopColor="#E8A0A0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Brand */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize: 48,
              fontWeight: 300,
              letterSpacing: 12,
              color: colors.textPrimary,
              textTransform: "uppercase",
            }}
          >
            MONARK
          </div>
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: 13,
              fontWeight: 300,
              letterSpacing: 5,
              color: colors.textSecondary,
              textTransform: "uppercase",
              marginTop: 8,
            }}
          >
            Relationship Wellness
          </div>
        </div>

        {/* Loading bar */}
        <div
          style={{
            width: 200,
            height: 2,
            background: "rgba(255,255,255,0.08)",
            borderRadius: 2,
            marginTop: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${loadProgress}%`,
              background: colors.gradientGold,
              borderRadius: 2,
              transition: "width 0.1s",
            }}
          />
        </div>
      </div>

      {/* Tagline at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          fontFamily: fonts.sans,
          fontSize: 12,
          letterSpacing: 3,
          color: colors.textMuted,
          textTransform: "uppercase",
          opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        Your Love. Elevated.
      </div>
    </div>
  );
};
