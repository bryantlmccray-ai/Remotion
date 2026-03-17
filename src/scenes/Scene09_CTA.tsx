import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { MonArkLogo } from "../components/MonArkLogo";
import { SPRING, ease } from "../utils/animations";

/**
 * SCENE 9 — THE FINALE (4.5 sec / 135 frames)
 *
 * Everything converges. MA compass rose logo returns.
 * Stats fly in. CTA pulses. Orbiting elements.
 * Iris closes — mirroring the iris-open beginning.
 * Fast. Confident. Apple keynote energy.
 */

const StatPill: React.FC<{ num: string; label: string; delay: number }> = ({ num, label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame: frame - delay, fps, config: SPRING.elastic });
  const floatY = 2 * Math.sin(frame * 0.05 + delay * 0.1);

  return (
    <div
      style={{
        opacity: appear,
        transform: `scale(${appear}) translateY(${floatY}px)`,
        padding: "14px 24px",
        borderRadius: 18,
        background: colors.bgGlassWarm,
        border: `1px solid ${colors.borderBright}`,
        textAlign: "center",
        backdropFilter: "blur(10px)",
        boxShadow: `0 6px 24px rgba(0,0,0,0.3), 0 0 16px rgba(201,168,76,0.06)`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 34,
          fontWeight: 700,
          background: colors.gradientGold,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1,
          marginBottom: 4,
        }}
      >
        {num}
      </div>
      <div style={{ fontFamily: fonts.sans, fontSize: 10, color: colors.textSecondary, letterSpacing: 1 }}>{label}</div>
    </div>
  );
};

export const Scene09_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // Orbiting elements
  const orbit1 = frame * 1.0 * (Math.PI / 180);
  const orbit2 = frame * 1.0 * (Math.PI / 180) + Math.PI;
  const orbitR = 300;

  // Logo stamps in
  const logoScale = spring({ frame, fps, config: SPRING.bounce });
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Wordmark
  const wordmarkOpacity = interpolate(frame, [15, 28], [0, 1], { extrapolateRight: "clamp" });
  const shimmerX = interpolate(frame, [30, 75], [-200, 600], { extrapolateRight: "clamp" });

  // Tagline
  const tagProgress = spring({ frame: frame - 18, fps, config: SPRING.velvet });
  const tagOpacity = interpolate(frame, [18, 32], [0, 1], { extrapolateRight: "clamp" });

  // CTA button
  const btnScale = 1 + 0.03 * Math.sin(frame * 0.12);
  const btnGlow = 0.3 + 0.2 * Math.sin(frame * 0.08);
  const btnOpacity = interpolate(frame, [50, 65], [0, 1], { extrapolateRight: "clamp" });

  // Iris close
  const irisClose = interpolate(frame, [105, 135], [150, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
        opacity: fadeIn,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ParticleField intensity={0.8} direction="up" />
      <GlowOrb x="50%" y="45%" size={800} color="rgba(201,168,76,0.1)" delay={0} />
      <GlowOrb x="20%" y="25%" size={350} color="rgba(201,168,76,0.12)" delay={30} />
      <GlowOrb x="80%" y="75%" size={300} color="rgba(155,142,196,0.1)" delay={60} />

      {/* Orbiting elements */}
      {[
        { angle: orbit1, emoji: "\u2728", size: 24, opacity: 0.3 },
        { angle: orbit2, emoji: "\uD83D\uDC9B", size: 22, opacity: 0.25 },
      ].map(({ angle, emoji, size, opacity }, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: "50%",
            top: "48%",
            transform: `translate(${orbitR * Math.cos(angle)}px, ${orbitR * 0.4 * Math.sin(angle)}px)`,
            fontSize: size,
            opacity,
            filter: "blur(1px)",
            pointerEvents: "none",
          }}
        >
          {emoji}
        </div>
      ))}

      {/* === LOGO === */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          marginBottom: 20,
        }}
      >
        <MonArkLogo size={110} animate={false} showTagline={false} />
      </div>

      {/* Wordmark with shimmer */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          marginBottom: 8,
          opacity: wordmarkOpacity,
        }}
      >
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 76,
            fontWeight: 300,
            letterSpacing: 20,
            color: colors.textPrimary,
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          MONARK
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: colors.gradientShimmer,
            transform: `translateX(${shimmerX}px)`,
            width: 100,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* "Date well." */}
      <div
        style={{
          opacity: wordmarkOpacity * 0.8,
          fontFamily: fonts.serif,
          fontSize: 16,
          fontStyle: "italic",
          fontWeight: 300,
          color: colors.gold,
          letterSpacing: 3,
          marginBottom: 30,
        }}
      >
        Date well.
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: tagOpacity,
          transform: `translateY(${(1 - tagProgress) * 12}px)`,
          textAlign: "center",
          marginBottom: 35,
        }}
      >
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 26,
            fontWeight: 300,
            color: colors.textPrimary,
            marginBottom: 8,
          }}
        >
          Your love story deserves{" "}
          <span style={{ background: colors.gradientGold, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            extraordinary care
          </span>
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 13, color: colors.textSecondary, letterSpacing: 2 }}>
          Join 50,000+ couples building lasting connection
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          gap: 18,
          marginBottom: 35,
          opacity: interpolate(frame, [30, 45], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <StatPill num="50K+" label="Couples" delay={32} />
        <StatPill num="4.9\u2605" label="App Store" delay={38} />
        <StatPill num="95%" label="Improved" delay={44} />
      </div>

      {/* CTA Button */}
      <div
        style={{
          transform: `scale(${btnScale})`,
          opacity: btnOpacity,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: 50,
            background: colors.gradientGold,
            opacity: btnGlow * 0.2,
            filter: "blur(18px)",
          }}
        />
        <div
          style={{
            position: "relative",
            background: colors.gradientGold,
            borderRadius: 50,
            padding: "16px 48px",
            boxShadow: `0 8px 36px rgba(201,168,76,${btnGlow})`,
          }}
        >
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: 14,
              fontWeight: 700,
              color: "#0B0E17",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Begin Your Journey
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 35,
          fontFamily: fonts.sans,
          fontSize: 10,
          letterSpacing: 3,
          color: colors.textMuted,
          textTransform: "uppercase",
          opacity: interpolate(frame, [65, 80], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        monark.app · Date well.
      </div>

      {/* Iris close */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, transparent ${irisClose}%, ${colors.bg} ${irisClose + 25}%)`,
          pointerEvents: "none",
          zIndex: frame > 105 ? 500 : -1,
        }}
      />
    </div>
  );
};
