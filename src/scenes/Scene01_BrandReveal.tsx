import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { LuxuryBackground } from "../components/LuxuryBackground";
import { DynamicElements } from "../components/DynamicElements";

export const Scene01_BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3D Logo ring rotations — faster, more dramatic
  const logoRotateY = interpolate(frame, [0, 150], [0, 360], { extrapolateRight: "clamp" }) * 0.4;
  const logoRotateX = 18 * Math.sin(frame * 0.025);
  const logoPerspective = 800;

  // Logo ring scale
  const ringScale = spring({ frame, fps, config: { damping: 55, stiffness: 70, mass: 1.2 } });
  const ringOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Inner elements
  const innerScale = spring({ frame: frame - 15, fps, config: { damping: 80, stiffness: 200, mass: 0.6 } });
  const innerOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" });

  // Title — BIGGER
  const titleOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [40, 65], [40, 0], {
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  const titleRotateX = interpolate(frame, [40, 80], [25, 0], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame: frame - 40, fps, config: { damping: 65, stiffness: 90, mass: 1 } });

  // Tagline
  const taglineOpacity = interpolate(frame, [60, 85], [0, 1], { extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [60, 85], [20, 0], {
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  // Shimmer
  const shimmerX = interpolate(frame, [70, 120], [-100, 300], { extrapolateRight: "clamp" });

  // Expanding 3D rings — MORE of them, BIGGER
  const rings = [0, 1, 2, 3].map((i) => ({
    progress: ((frame * 0.6 + i * 25) % 100),
  }));

  // Animated divider width
  const lineWidth = interpolate(frame, [85, 120], [0, 300], { extrapolateRight: "clamp" });

  // Floating 3D diamonds — MORE, BIGGER orbits
  const diamonds = [
    { angle: frame * 0.9, radius: 250, size: 18, delay: 0, color: colors.gold },
    { angle: frame * 0.9 + 90, radius: 280, size: 14, delay: 30, color: colors.rose },
    { angle: frame * 0.9 + 180, radius: 230, size: 12, delay: 60, color: colors.lavender },
    { angle: frame * 0.9 + 270, radius: 260, size: 16, delay: 90, color: colors.goldLight },
    { angle: frame * 0.7, radius: 320, size: 10, delay: 15, color: colors.rose },
    { angle: frame * 0.7 + 120, radius: 340, size: 14, delay: 45, color: colors.gold },
  ];

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
      <LuxuryBackground variant="warm" intensity={1.3} />
      <DynamicElements variant="grand" />

      {/* Expanding concentric 3D rings — MORE */}
      {rings.map((r, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: r.progress * 14,
            height: r.progress * 14,
            borderRadius: "50%",
            border: `1.5px solid ${i % 2 === 0 ? colors.gold : colors.rose}`,
            transform: `translate(-50%, -50%) rotateX(${60 + i * 5}deg)`,
            opacity: 0.12 * (1 - r.progress / 100),
            pointerEvents: "none",
          }}
        />
      ))}

      {/* 3D rotating decorative arcs — BIGGER */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", perspective: 600, pointerEvents: "none" }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 500 + i * 80,
              height: 500 + i * 80,
              left: -(250 + i * 40),
              top: -(250 + i * 40),
              borderRadius: "50%",
              border: `${i === 0 ? 1.5 : 1}px solid rgba(201,168,76,${0.1 - i * 0.02})`,
              transform: `rotateY(${frame * 0.4 + i * 40}deg) rotateX(${20 + i * 10}deg)`,
              transformStyle: "preserve-3d",
            }}
          />
        ))}
      </div>

      {/* 3D floating diamonds orbiting logo — MORE */}
      <div style={{ position: "absolute", left: "50%", top: "50%", perspective: 500, pointerEvents: "none" }}>
        {diamonds.map((d, i) => {
          const rad = (d.angle * Math.PI) / 180;
          const x = Math.cos(rad) * d.radius;
          const y = Math.sin(rad) * d.radius * 0.4;
          const z = Math.sin(rad) * 100;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: d.size,
                height: d.size,
                border: `1.5px solid ${d.color}`,
                transform: `translateZ(${z}px) rotate(45deg)`,
                opacity: 0.35 + 0.2 * Math.sin(frame * 0.03 + i),
                boxShadow: `0 0 12px ${d.color}`,
              }}
            />
          );
        })}
      </div>

      {/* 3D Logo Ring — BIGGER */}
      <div
        style={{
          perspective: logoPerspective,
          marginBottom: 48,
          opacity: ringOpacity,
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 220,
            height: 220,
            transform: `scale(${ringScale}) rotateY(${logoRotateY}deg) rotateX(${logoRotateX}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div style={{ position: "absolute", inset: -30, borderRadius: "50%", background: `radial-gradient(circle, rgba(201,168,76,0.25) 40%, transparent 70%)`, transform: "translateZ(-20px)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2.5px solid`, borderColor: colors.borderBright, boxShadow: `0 0 80px rgba(201,168,76,0.5), inset 0 0 50px rgba(201,168,76,0.1), 0 0 160px rgba(201,168,76,0.2)` }} />
          <div style={{ position: "absolute", inset: -4, borderRadius: "50%", background: `conic-gradient(from ${frame * 2}deg, transparent 50%, ${colors.gold} 70%, ${colors.rose} 82%, ${colors.lavender} 90%, transparent 100%)`, mask: "radial-gradient(circle, transparent 96px, black 98px, black 110px, transparent 112px)", WebkitMask: "radial-gradient(circle, transparent 96px, black 98px, black 110px, transparent 112px)" }} />
          <div style={{ position: "absolute", inset: 5, borderRadius: "50%", border: `1px solid rgba(201,168,76,0.12)`, transform: "translateZ(-15px)", backfaceVisibility: "hidden" }} />
          <div style={{ position: "absolute", inset: 20, borderRadius: "50%", background: `radial-gradient(circle, rgba(201,168,76,0.18) 0%, rgba(232,160,160,0.06) 50%, transparent 70%)`, opacity: innerOpacity, transform: `scale(${innerScale})` }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: innerOpacity, transform: `scale(${innerScale}) translateZ(10px)` }}>
            <span
              style={{
                fontFamily: fonts.serif,
                fontSize: 88,
                fontWeight: 700,
                background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 40%, ${colors.rose} 80%, ${colors.gold} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1,
                letterSpacing: -2,
                filter: `drop-shadow(0 0 25px rgba(201,168,76,0.6))`,
              }}
            >
              M
            </span>
          </div>
        </div>
      </div>

      {/* Brand Name — MUCH BIGGER with 3D perspective tilt */}
      <div style={{ perspective: 600, opacity: titleOpacity, zIndex: 10 }}>
        <div style={{ transform: `translateY(${titleY}px) rotateX(${titleRotateX}deg) scale(${Math.min(titleScale, 1)})`, position: "relative", overflow: "hidden" }}>
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize: 110,
              fontWeight: 300,
              letterSpacing: 28,
              color: colors.textPrimary,
              textTransform: "uppercase",
              lineHeight: 1,
              textShadow: `0 0 80px rgba(201,168,76,0.4), 0 0 160px rgba(201,168,76,0.15)`,
            }}
          >
            MONARK
          </div>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)`, transform: `translateX(${shimmerX}%)`, width: "40%", pointerEvents: "none" }} />
        </div>
      </div>

      {/* Tagline — BIGGER */}
      <div style={{ opacity: taglineOpacity, transform: `translateY(${taglineY}px)`, marginTop: 24, textAlign: "center", zIndex: 10 }}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 22,
            fontWeight: 300,
            letterSpacing: 10,
            background: `linear-gradient(90deg, ${colors.gold}, ${colors.roseLight}, ${colors.gold})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textTransform: "uppercase",
          }}
        >
          Relationship Wellness
        </div>
        <div style={{ width: lineWidth, height: 2, background: `linear-gradient(90deg, transparent, ${colors.gold}, ${colors.rose}, ${colors.gold}, transparent)`, margin: "24px auto 0", boxShadow: `0 0 16px rgba(201,168,76,0.4)` }} />
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          fontFamily: fonts.sans,
          fontSize: 13,
          letterSpacing: 8,
          color: colors.textMuted,
          textTransform: "uppercase",
          opacity: interpolate(frame, [100, 130], [0, 0.6], { extrapolateRight: "clamp" }),
        }}
      >
        Elevate Your Connection
      </div>
    </div>
  );
};
