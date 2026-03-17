import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { SPRING, ease } from "../utils/animations";

/**
 * SCENE 9 — THE FINALE (0:54–1:01)
 *
 * Everything converges. The MonArk brand returns, full screen.
 * Stats fly in with weight. A cinematic CTA pulses.
 * Orbiting elements create depth. The video ends as it began —
 * with warmth, intention, and a vignette closing like an iris.
 */

const StatPill: React.FC<{ num: string; label: string; delay: number }> = ({ num, label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame: frame - delay, fps, config: SPRING.elastic });
  const floatY = 3 * Math.sin(frame * 0.04 + delay * 0.1);

  return (
    <div
      style={{
        opacity: appear,
        transform: `scale(${appear}) translateY(${floatY}px)`,
        padding: "18px 28px",
        borderRadius: 20,
        background: colors.bgGlassWarm,
        border: `1px solid ${colors.borderBright}`,
        textAlign: "center",
        backdropFilter: "blur(10px)",
        boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(201,168,76,0.08)`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 38,
          fontWeight: 700,
          background: colors.gradientGold,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1,
          marginBottom: 5,
          filter: `drop-shadow(0 0 6px rgba(201,168,76,0.3))`,
        }}
      >
        {num}
      </div>
      <div style={{ fontFamily: fonts.sans, fontSize: 11, color: colors.textSecondary, letterSpacing: 1 }}>{label}</div>
    </div>
  );
};

export const Scene09_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // === ORBITING ELEMENTS — depth and movement ===
  const orbit1Angle = frame * 0.8 * (Math.PI / 180);
  const orbit2Angle = frame * 0.8 * (Math.PI / 180) + Math.PI;
  const orbit3Angle = frame * 0.6 * (Math.PI / 180) + Math.PI / 2;
  const orbitR = 320;
  const orbitRSmall = 200;

  // === LOGO ENTRANCE — stamps in with authority ===
  const logoScale = spring({ frame, fps, config: SPRING.bounce });
  const logoOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });

  // === TAGLINE ===
  const tagProgress = spring({ frame: frame - 25, fps, config: SPRING.velvet });
  const tagOpacity = interpolate(frame, [25, 50], [0, 1], { extrapolateRight: "clamp" });
  const tagY = interpolate(tagProgress, [0, 1], [20, 0]);

  // === CTA BUTTON — pulses with life ===
  const btnScale = 1 + 0.035 * Math.sin(frame * 0.1);
  const btnGlow = 0.3 + 0.2 * Math.sin(frame * 0.08);
  const btnOpacity = interpolate(frame, [65, 85], [0, 1], { extrapolateRight: "clamp" });

  // === SHIMMER across brand name ===
  const shimmerX = interpolate(frame, [50, 110], [-200, 600], { extrapolateRight: "clamp" });

  // === CLOSING IRIS — the video ends as it began ===
  const irisClose = interpolate(frame, [170, 210], [150, 0], {
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
      <GlowOrb x="50%" y="45%" size={900} color="rgba(201,168,76,0.12)" delay={0} />
      <GlowOrb x="20%" y="25%" size={400} color="rgba(232,160,160,0.15)" delay={30} />
      <GlowOrb x="80%" y="75%" size={350} color="rgba(155,142,196,0.15)" delay={60} />

      {/* === ORBITING ELEMENTS === */}
      {[
        { angle: orbit1Angle, r: orbitR, rY: 0.45, emoji: "\uD83D\uDC9B", size: 26, opacity: 0.35, blur: 1 },
        { angle: orbit2Angle, r: orbitR, rY: 0.45, emoji: "\uD83C\uDF39", size: 22, opacity: 0.3, blur: 1.5 },
        { angle: orbit3Angle, r: orbitRSmall, rY: 0.3, emoji: "\u2728", size: 18, opacity: 0.25, blur: 0.5 },
      ].map(({ angle, r, rY, emoji, size, opacity, blur }, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: "50%",
            top: "48%",
            transform: `translate(${r * Math.cos(angle)}px, ${r * rY * Math.sin(angle)}px)`,
            fontSize: size,
            opacity,
            filter: `blur(${blur}px)`,
            pointerEvents: "none",
          }}
        >
          {emoji}
        </div>
      ))}

      {/* === MAIN LOGO === */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 36,
        }}
      >
        {/* Heart logo */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: `2px solid ${colors.borderBright}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            background: "rgba(201,168,76,0.05)",
            boxShadow: `0 0 60px rgba(201,168,76,0.2), 0 0 120px rgba(201,168,76,0.08)`,
          }}
        >
          <svg width="44" height="40" viewBox="0 0 48 44" fill="none">
            <path
              d="M24 40C24 40 2 26 2 14C2 7.4 7.4 2 14 2C17.6 2 20.8 3.6 24 6.4C27.2 3.6 30.4 2 34 2C40.6 2 46 7.4 46 14C46 26 24 40 24 40Z"
              fill="url(#heartGradCTA9)"
            />
            <defs>
              <linearGradient id="heartGradCTA9" x1="2" y1="2" x2="46" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C9A84C" />
                <stop offset="0.5" stopColor="#E8C97A" />
                <stop offset="1" stopColor="#E8A0A0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Brand wordmark with shimmer */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize: 82,
              fontWeight: 300,
              letterSpacing: 22,
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
              width: 120,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* === TAGLINE === */}
      <div
        style={{
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
          textAlign: "center",
          marginBottom: 45,
        }}
      >
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 28,
            fontWeight: 300,
            color: colors.textPrimary,
            marginBottom: 10,
          }}
        >
          Your love story deserves{" "}
          <span style={{ background: colors.gradientGold, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            extraordinary care
          </span>
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 14, color: colors.textSecondary, letterSpacing: 2 }}>
          Join 50,000+ couples building a lasting, fulfilling relationship
        </div>
      </div>

      {/* === STATS === */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 45,
          opacity: interpolate(frame, [45, 65], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <StatPill num="50K+" label="Couples Thriving" delay={50} />
        <StatPill num="4.9\u2605" label="App Store Rating" delay={58} />
        <StatPill num="95%" label="Report Improvement" delay={66} />
      </div>

      {/* === CTA BUTTON === */}
      <div
        style={{
          transform: `scale(${btnScale})`,
          opacity: btnOpacity,
          position: "relative",
        }}
      >
        {/* Glow halo behind button */}
        <div
          style={{
            position: "absolute",
            inset: -10,
            borderRadius: 50,
            background: colors.gradientGold,
            opacity: btnGlow * 0.25,
            filter: "blur(20px)",
          }}
        />
        <div
          style={{
            position: "relative",
            background: colors.gradientGold,
            borderRadius: 50,
            padding: "18px 52px",
            boxShadow: `0 8px 40px rgba(201,168,76,${btnGlow}), 0 0 60px rgba(201,168,76,${btnGlow * 0.3})`,
          }}
        >
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: 15,
              fontWeight: 700,
              color: "#0A0A0F",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Begin Your Journey
          </div>
        </div>
      </div>

      {/* === BOTTOM TAGLINE === */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontFamily: fonts.sans,
          fontSize: 11,
          letterSpacing: 3,
          color: colors.textMuted,
          textTransform: "uppercase",
          opacity: interpolate(frame, [85, 110], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        monark.app · Your Love. Elevated.
      </div>

      {/* === CLOSING IRIS === */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, transparent ${irisClose}%, ${colors.bg} ${irisClose + 25}%)`,
          pointerEvents: "none",
          zIndex: frame > 170 ? 500 : -1,
        }}
      />
    </div>
  );
};
