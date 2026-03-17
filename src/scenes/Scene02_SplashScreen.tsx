import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { MonArkLogo } from "../components/MonArkLogo";
import { SPRING, ease } from "../utils/animations";

/**
 * SCENE 2 — THE PULSE (4 sec / 120 frames)
 *
 * The compass rose logo at center. Concentric pulse rings.
 * Loading bar sweeps fast. "Date well." tagline.
 * Everything moves — nothing static.
 */
export const Scene02_SplashScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pulse rings — fast heartbeat
  const pulseRings = [0, 15, 30].map((offset) => {
    const beatFrame = (frame + offset) % 60;
    return {
      scale: 1 + interpolate(beatFrame, [0, 45], [0, 2.5], { extrapolateRight: "clamp" }),
      opacity: interpolate(beatFrame, [0, 8, 45], [0, 0.45, 0], { extrapolateRight: "clamp" }),
    };
  });

  // Logo breathes
  const logoScale = 1 + 0.04 * Math.sin(frame * 0.12);
  const logoEntrance = spring({ frame, fps, config: SPRING.snap });

  // Loading bar — fast sweep
  const loadProgress = interpolate(frame, [10, 70], [0, 100], {
    extrapolateRight: "clamp",
    easing: ease.outQuart,
  });

  // Float
  const floatY = 5 * Math.sin(frame * 0.05);

  // Brand text
  const brandOpacity = interpolate(frame, [5, 18], [0, 1], { extrapolateRight: "clamp" });

  // Bottom tagline
  const tagOpacity = interpolate(frame, [40, 55], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: colors.gradientBgRadial,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ParticleField intensity={0.5} />
      <GlowOrb x="50%" y="45%" size={650} color="rgba(201,168,76,0.15)" delay={0} />
      <GlowOrb x="30%" y="65%" size={300} color="rgba(201,168,76,0.1)" delay={40} />

      {/* Pulse rings */}
      {pulseRings.map((ring, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 90,
            height: 90,
            borderRadius: "50%",
            border: `${1.5 - i * 0.3}px solid ${colors.gold}`,
            opacity: ring.opacity,
            transform: `translate(-50%, -50%) scale(${ring.scale})`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Logo + brand */}
      <div
        style={{
          transform: `translateY(${floatY}px) scale(${logoEntrance * logoScale})`,
          opacity: brandOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <MonArkLogo size={120} animate={false} showTagline={false} />

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
              fontFamily: fonts.serif,
              fontSize: 14,
              fontStyle: "italic",
              fontWeight: 300,
              color: colors.gold,
              letterSpacing: 3,
              marginTop: 8,
              opacity: 0.8,
            }}
          >
            Date well.
          </div>
        </div>

        {/* Loading bar */}
        <div
          style={{
            width: 200,
            height: 2,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${loadProgress}%`,
              background: colors.gradientGoldHoriz,
              borderRadius: 2,
              boxShadow: `0 0 8px rgba(201,168,76,0.4)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: `${loadProgress - 6}%`,
              width: "6%",
              height: "100%",
              background: "rgba(255,255,255,0.5)",
              borderRadius: 2,
              filter: "blur(2px)",
            }}
          />
        </div>
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 55,
          opacity: tagOpacity,
          fontFamily: fonts.sans,
          fontSize: 11,
          letterSpacing: 3,
          color: colors.textMuted,
          textTransform: "uppercase",
        }}
      >
        Your Love. Elevated.
      </div>
    </div>
  );
};
