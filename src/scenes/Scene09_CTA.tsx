import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";

const StatPill: React.FC<{ num: string; label: string; delay: number }> = ({ num, label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame: frame - delay, fps, config: { damping: 80, stiffness: 200, mass: 0.6 } });
  return (
    <div
      style={{
        opacity: appear,
        transform: `scale(${appear})`,
        padding: "20px 32px",
        borderRadius: 20,
        background: "rgba(201,168,76,0.08)",
        border: `1px solid ${colors.borderBright}`,
        textAlign: "center",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 40,
          fontWeight: 700,
          background: colors.gradientGold,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {num}
      </div>
      <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textSecondary, letterSpacing: 1 }}>{label}</div>
    </div>
  );
};

export const Scene09_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Animated hearts orbiting
  const heart1Angle = frame * 1.2 * (Math.PI / 180);
  const heart2Angle = frame * 1.2 * (Math.PI / 180) + Math.PI;
  const orbitR = 280;

  // Main title
  const titleScale = spring({ frame, fps, config: { damping: 60, stiffness: 100, mass: 1 } });
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // Tagline
  const tagOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });
  const tagY = interpolate(frame, [30, 60], [20, 0], { extrapolateRight: "clamp" });

  // CTA button pulse
  const btnScale = 1 + 0.04 * Math.sin(frame * 0.12);
  const btnGlow = 0.3 + 0.2 * Math.sin(frame * 0.08);

  const statsOpacity = interpolate(frame, [50, 80], [0, 1], { extrapolateRight: "clamp" });

  // Final shimmer
  const shimmerX = interpolate(frame, [60, 120], [-200, 500], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

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
      <GlowOrb x="50%" y="50%" size={800} color="rgba(201,168,76,0.15)" delay={0} pulse={true} />
      <GlowOrb x="20%" y="20%" size={400} color="rgba(232,160,160,0.2)" delay={30} />
      <GlowOrb x="80%" y="80%" size={350} color="rgba(94,110,74,0.2)" delay={60} />

      {/* Orbiting hearts */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(${orbitR * Math.cos(heart1Angle)}px, ${orbitR * 0.5 * Math.sin(heart1Angle)}px)`,
          fontSize: 28,
          opacity: 0.4,
          filter: "blur(1px)",
        }}
      >
        💛
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(${orbitR * Math.cos(heart2Angle)}px, ${orbitR * 0.5 * Math.sin(heart2Angle)}px)`,
          fontSize: 24,
          opacity: 0.3,
          filter: "blur(1px)",
        }}
      >
        🌹
      </div>

      {/* Main logo */}
      <div
        style={{
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
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
            background: "rgba(201,168,76,0.06)",
            boxShadow: `0 0 60px rgba(201,168,76,0.2)`,
          }}
        >
          <svg width="44" height="40" viewBox="0 0 48 44" fill="none">
            <path
              d="M24 40C24 40 2 26 2 14C2 7.4 7.4 2 14 2C17.6 2 20.8 3.6 24 6.4C27.2 3.6 30.4 2 34 2C40.6 2 46 7.4 46 14C46 26 24 40 24 40Z"
              fill="url(#heartGradCTA)"
            />
            <defs>
              <linearGradient id="heartGradCTA" x1="2" y1="2" x2="46" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C9A84C" />
                <stop offset="0.5" stopColor="#E8C97A" />
                <stop offset="1" stopColor="#E8A0A0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div style={{ position: "relative", overflow: "hidden" }}>
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize: 80,
              fontWeight: 300,
              letterSpacing: 20,
              color: colors.textPrimary,
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            MONARK
          </div>
          {/* Shimmer */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
              transform: `translateX(${shimmerX}px)`,
              width: 120,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
          textAlign: "center",
          marginBottom: 50,
        }}
      >
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 30,
            fontWeight: 300,
            color: colors.textPrimary,
            marginBottom: 12,
          }}
        >
          Your love story deserves{" "}
          <span style={{ background: colors.gradientGold, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            extraordinary care
          </span>
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 15, color: colors.textSecondary, letterSpacing: 2 }}>
          Join 50,000+ couples building a lasting, fulfilling relationship
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 24, marginBottom: 50, opacity: statsOpacity }}>
        <StatPill num="50K+" label="Couples Thriving" delay={55} />
        <StatPill num="4.9★" label="App Store Rating" delay={65} />
        <StatPill num="95%" label="Report Improvement" delay={75} />
      </div>

      {/* CTA Button */}
      <div
        style={{
          transform: `scale(${btnScale})`,
          opacity: interpolate(frame, [70, 90], [0, 1], { extrapolateRight: "clamp" }),
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: 50,
            background: colors.gradientGold,
            opacity: btnGlow * 0.3,
            filter: "blur(16px)",
          }}
        />
        <div
          style={{
            position: "relative",
            background: colors.gradientGold,
            borderRadius: 50,
            padding: "20px 56px",
            cursor: "pointer",
            boxShadow: `0 8px 40px rgba(201,168,76,${btnGlow})`,
          }}
        >
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: 16,
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

      {/* Bottom tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontFamily: fonts.sans,
          fontSize: 12,
          letterSpacing: 3,
          color: colors.textMuted,
          textTransform: "uppercase",
          opacity: interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        monark.app · Your Love. Elevated.
      </div>
    </div>
  );
};
