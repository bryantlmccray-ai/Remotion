import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { SPRING, ease } from "../utils/animations";

/**
 * SCENE 2 — THE PULSE (0:05–0:09)
 *
 * The MonArk heart beats. Concentric pulse rings expand outward.
 * Energy builds. A loading sequence with luxurious progress.
 * "Your Love. Elevated." arrives with gravity.
 */
export const Scene02_SplashScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === HEARTBEAT PULSE — three concentric rings, staggered ===
  const pulseRings = [0, 20, 40].map((offset) => {
    const beatFrame = (frame + offset) % 75;
    return {
      scale: 1 + interpolate(beatFrame, [0, 55], [0, 2.2], { extrapolateRight: "clamp" }),
      opacity: interpolate(beatFrame, [0, 10, 55], [0, 0.5, 0], { extrapolateRight: "clamp" }),
    };
  });

  // === HEART LOGO — breathes with the pulse ===
  const heartScale = 1 + 0.06 * Math.sin(frame * 0.15);
  const heartGlow = 0.3 + 0.15 * Math.sin(frame * 0.15);
  const heartEntrance = spring({ frame, fps, config: SPRING.bounce });

  // === LOADING BAR — sweeps with luxury ===
  const loadProgress = interpolate(frame, [15, 85], [0, 100], {
    extrapolateRight: "clamp",
    easing: ease.outQuart,
  });

  // === BRAND TEXT — floats gently ===
  const floatY = 6 * Math.sin(frame * 0.04);
  const brandOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // === TAGLINE — arrives with weight ===
  const tagScale = spring({ frame: frame - 50, fps, config: SPRING.velvet });
  const tagOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateRight: "clamp",
  });

  // === AMBIENT ROTATION — subtle world rotation ===
  const worldRotation = frame * 0.08;

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
      <ParticleField intensity={0.6} />
      <GlowOrb x="50%" y="45%" size={700} color="rgba(201,168,76,0.18)" delay={0} />
      <GlowOrb x="25%" y="65%" size={350} color="rgba(232,160,160,0.12)" delay={40} />
      <GlowOrb x="75%" y="30%" size={300} color="rgba(155,142,196,0.1)" delay={80} />

      {/* === PULSE RINGS — radiating life === */}
      {pulseRings.map((ring, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: `${1.5 - i * 0.3}px solid`,
            borderColor: i === 0 ? colors.gold : i === 1 ? colors.rose : colors.lavender,
            opacity: ring.opacity,
            transform: `translate(-50%, -50%) scale(${ring.scale}) rotate(${worldRotation + i * 30}deg)`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* === HEART LOGO === */}
      <div
        style={{
          transform: `translateY(${floatY}px) scale(${heartEntrance * heartScale})`,
          opacity: brandOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          position: "relative",
        }}
      >
        {/* Heart container with glow */}
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: "50%",
            border: `2px solid ${colors.borderBright}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(201,168,76,0.04)",
            boxShadow: `0 0 80px rgba(201,168,76,${heartGlow}), 0 0 160px rgba(201,168,76,${heartGlow * 0.3})`,
            position: "relative",
          }}
        >
          <svg width="52" height="48" viewBox="0 0 48 44" fill="none">
            <path
              d="M24 40C24 40 2 26 2 14C2 7.4 7.4 2 14 2C17.6 2 20.8 3.6 24 6.4C27.2 3.6 30.4 2 34 2C40.6 2 46 7.4 46 14C46 26 24 40 24 40Z"
              fill="url(#heartGradSplash)"
            />
            <defs>
              <linearGradient id="heartGradSplash" x1="2" y1="2" x2="46" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C9A84C" />
                <stop offset="0.5" stopColor="#E8C97A" />
                <stop offset="1" stopColor="#E8A0A0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Brand name */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize: 52,
              fontWeight: 300,
              letterSpacing: 14,
              color: colors.textPrimary,
              textTransform: "uppercase",
            }}
          >
            MONARK
          </div>
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: 12,
              fontWeight: 300,
              letterSpacing: 6,
              color: colors.textSecondary,
              textTransform: "uppercase",
              marginTop: 8,
            }}
          >
            Relationship Wellness
          </div>
        </div>

        {/* Loading bar — luxurious sweep */}
        <div
          style={{
            width: 220,
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
              boxShadow: `0 0 10px rgba(201,168,76,0.4)`,
            }}
          />
          {/* Moving highlight on loading bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: `${loadProgress - 8}%`,
              width: "8%",
              height: "100%",
              background: "rgba(255,255,255,0.5)",
              borderRadius: 2,
              filter: "blur(2px)",
            }}
          />
        </div>
      </div>

      {/* === TAGLINE — arrives last === */}
      <div
        style={{
          position: "absolute",
          bottom: 65,
          opacity: tagOpacity,
          transform: `translateY(${(1 - tagScale) * 10}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 13,
            letterSpacing: 4,
            color: colors.textMuted,
            textTransform: "uppercase",
          }}
        >
          Your Love. Elevated.
        </div>
      </div>
    </div>
  );
};
