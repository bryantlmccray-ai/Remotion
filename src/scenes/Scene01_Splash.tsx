import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";

export const Scene01_Splash: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Three concentric rings animate in sequence
  const ring1Scale = spring({ frame, fps, config: { damping: 40, stiffness: 60, mass: 1.5 } });
  const ring1Opacity = interpolate(frame, [0, 25], [0, 0.9], { extrapolateRight: "clamp" });
  const ring2Scale = spring({ frame: frame - 12, fps, config: { damping: 50, stiffness: 80, mass: 1.2 } });
  const ring2Opacity = interpolate(frame, [12, 40], [0, 0.8], { extrapolateRight: "clamp" });
  const ring3Scale = spring({ frame: frame - 24, fps, config: { damping: 60, stiffness: 100, mass: 1 } });
  const ring3Opacity = interpolate(frame, [24, 50], [0, 0.7], { extrapolateRight: "clamp" });

  // Rotating conic gradient on outer ring
  const conicAngle = frame * 1.8;

  // Heartbeat pulse on rings
  const pulse = 1 + 0.03 * Math.sin(frame * 0.15);

  // Logo monogram entrance
  const logoScale = spring({ frame: frame - 30, fps, config: { damping: 80, stiffness: 200, mass: 0.6 } });
  const logoOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateRight: "clamp" });

  // Brand name
  const nameOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateRight: "clamp" });
  const nameY = interpolate(frame, [55, 80], [30, 0], {
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  // Tagline
  const tagOpacity = interpolate(frame, [80, 105], [0, 1], { extrapolateRight: "clamp" });
  const tagY = interpolate(frame, [80, 105], [15, 0], { extrapolateRight: "clamp" });

  // Shimmer sweep across brand name
  const shimmerX = interpolate(frame, [90, 150], [-120, 400], { extrapolateRight: "clamp" });

  // Loading bar at bottom
  const loadProgress = interpolate(frame, [40, 160], [0, 100], { extrapolateRight: "clamp" });

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
      <GlowOrb x="50%" y="45%" size={800} color="rgba(201,168,76,0.2)" delay={0} />
      <GlowOrb x="25%" y="30%" size={500} color="rgba(232,160,160,0.18)" delay={40} />
      <GlowOrb x="75%" y="70%" size={450} color="rgba(155,142,196,0.15)" delay={20} />

      {/* Animated Rings Container */}
      <div
        style={{
          position: "relative",
          width: 240,
          height: 240,
          marginBottom: 48,
        }}
      >
        {/* Ring 3 (outermost) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            opacity: ring3Opacity,
            transform: `scale(${ring3Scale * pulse})`,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: `1px solid rgba(201,168,76,0.2)`,
              boxShadow: `0 0 60px rgba(201,168,76,0.1)`,
            }}
          />
          {/* Rotating conic highlight */}
          <div
            style={{
              position: "absolute",
              inset: -1,
              borderRadius: "50%",
              background: `conic-gradient(from ${conicAngle}deg, transparent 60%, ${colors.gold} 80%, transparent 100%)`,
              mask: "radial-gradient(circle, transparent 108px, black 110px, black 120px, transparent 122px)",
              WebkitMask: "radial-gradient(circle, transparent 108px, black 110px, black 120px, transparent 122px)",
            }}
          />
        </div>

        {/* Ring 2 (middle) */}
        <div
          style={{
            position: "absolute",
            inset: 30,
            borderRadius: "50%",
            opacity: ring2Opacity,
            transform: `scale(${ring2Scale * pulse})`,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: `1.5px solid rgba(232,160,160,0.3)`,
              boxShadow: `0 0 40px rgba(232,160,160,0.1)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: -1,
              borderRadius: "50%",
              background: `conic-gradient(from ${conicAngle + 120}deg, transparent 70%, ${colors.rose} 85%, transparent 100%)`,
              mask: "radial-gradient(circle, transparent 78px, black 80px, black 88px, transparent 90px)",
              WebkitMask: "radial-gradient(circle, transparent 78px, black 80px, black 88px, transparent 90px)",
            }}
          />
        </div>

        {/* Ring 1 (innermost) */}
        <div
          style={{
            position: "absolute",
            inset: 60,
            borderRadius: "50%",
            opacity: ring1Opacity,
            transform: `scale(${ring1Scale * pulse})`,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: `2px solid ${colors.borderBright}`,
              boxShadow: `0 0 50px rgba(201,168,76,0.25), inset 0 0 30px rgba(201,168,76,0.05)`,
            }}
          />
        </div>

        {/* Inner glow */}
        <div
          style={{
            position: "absolute",
            inset: 70,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)`,
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        />

        {/* Monogram "M" */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <span
            style={{
              fontFamily: fonts.serif,
              fontSize: 72,
              fontWeight: 700,
              background: colors.gradientGold,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            M
          </span>
        </div>
      </div>

      {/* Brand Name */}
      <div
        style={{
          opacity: nameOpacity,
          transform: `translateY(${nameY}px)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 80,
            fontWeight: 300,
            letterSpacing: 22,
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
            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)`,
            transform: `translateX(${shimmerX}%)`,
            width: "30%",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
          marginTop: 18,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 15,
            fontWeight: 300,
            letterSpacing: 8,
            color: colors.textSecondary,
            textTransform: "uppercase",
          }}
        >
          Connection, Elevated
        </div>
        <div
          style={{
            width: 100,
            height: 1,
            background: colors.gradientGold,
            margin: "20px auto 0",
            opacity: tagOpacity,
          }}
        />
      </div>

      {/* Loading bar */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: 240,
          height: 2,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${loadProgress}%`,
            background: colors.gradientGold,
            borderRadius: 2,
          }}
        />
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 44,
          fontFamily: fonts.sans,
          fontSize: 11,
          letterSpacing: 3,
          color: colors.textMuted,
          textTransform: "uppercase",
          opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        Your Love Story. Reimagined.
      </div>
    </div>
  );
};
