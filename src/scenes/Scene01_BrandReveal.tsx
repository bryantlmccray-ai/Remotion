import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { LuxuryBackground } from "../components/LuxuryBackground";

export const Scene01_BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3D Logo ring rotations
  const logoRotateY = interpolate(frame, [0, 150], [0, 360], { extrapolateRight: "clamp" }) * 0.3;
  const logoRotateX = 15 * Math.sin(frame * 0.02);
  const logoPerspective = 800;

  // Logo ring scale
  const ringScale = spring({ frame, fps, config: { damping: 60, stiffness: 80, mass: 1.2 } });
  const ringOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Inner elements
  const innerScale = spring({ frame: frame - 15, fps, config: { damping: 80, stiffness: 200, mass: 0.6 } });
  const innerOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" });

  // Title
  const titleOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [40, 65], [30, 0], {
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  // 3D title tilt
  const titleRotateX = interpolate(frame, [40, 80], [20, 0], { extrapolateRight: "clamp" });

  // Tagline
  const taglineOpacity = interpolate(frame, [60, 85], [0, 1], { extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [60, 85], [20, 0], {
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  // Shimmer
  const shimmerX = interpolate(frame, [70, 120], [-100, 300], { extrapolateRight: "clamp" });

  // Expanding 3D rings
  const ring1 = (frame * 0.5) % 100;
  const ring2 = ((frame * 0.5) + 50) % 100;

  // Animated divider width
  const lineWidth = interpolate(frame, [85, 120], [0, 200], { extrapolateRight: "clamp" });

  // Floating 3D diamonds around logo
  const diamonds = [
    { angle: frame * 0.8, radius: 200, size: 12, delay: 0 },
    { angle: frame * 0.8 + 120, radius: 220, size: 10, delay: 30 },
    { angle: frame * 0.8 + 240, radius: 190, size: 8, delay: 60 },
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
      <LuxuryBackground variant="warm" />

      {/* Expanding concentric 3D rings */}
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
            transform: `translate(-50%, -50%) rotateX(60deg)`,
            opacity: 0.1 * (1 - r / 100),
            pointerEvents: "none",
          }}
        />
      ))}

      {/* 3D rotating decorative arcs */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", perspective: 600, pointerEvents: "none" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 400 + i * 60,
              height: 400 + i * 60,
              left: -(200 + i * 30),
              top: -(200 + i * 30),
              borderRadius: "50%",
              border: `1px solid rgba(201,168,76,${0.08 - i * 0.02})`,
              transform: `rotateY(${frame * 0.3 + i * 40}deg) rotateX(${20 + i * 10}deg)`,
              transformStyle: "preserve-3d",
            }}
          />
        ))}
      </div>

      {/* 3D floating diamonds orbiting logo */}
      <div style={{ position: "absolute", left: "50%", top: "50%", perspective: 500, pointerEvents: "none" }}>
        {diamonds.map((d, i) => {
          const rad = (d.angle * Math.PI) / 180;
          const x = Math.cos(rad) * d.radius;
          const y = Math.sin(rad) * d.radius * 0.4; // Elliptical orbit
          const z = Math.sin(rad) * 80;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: d.size,
                height: d.size,
                border: `1px solid ${colors.gold}`,
                transform: `translateZ(${z}px) rotate(45deg)`,
                opacity: 0.3 + 0.2 * Math.sin(frame * 0.03 + i),
                boxShadow: `0 0 8px rgba(201,168,76,0.3)`,
              }}
            />
          );
        })}
      </div>

      {/* 3D Logo Ring */}
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
            width: 180,
            height: 180,
            transform: `scale(${ringScale}) rotateY(${logoRotateY}deg) rotateX(${logoRotateX}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Outer ring glow */}
          <div
            style={{
              position: "absolute",
              inset: -25,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(201,168,76,0.2) 40%, transparent 70%)`,
              transform: "translateZ(-20px)",
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
          {/* Back face depth ring */}
          <div
            style={{
              position: "absolute",
              inset: 5,
              borderRadius: "50%",
              border: `1px solid rgba(201,168,76,0.1)`,
              transform: "translateZ(-15px)",
              backfaceVisibility: "hidden",
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
              transform: `scale(${innerScale}) translateZ(10px)`,
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
      </div>

      {/* Brand Name with 3D perspective tilt */}
      <div
        style={{
          perspective: 600,
          opacity: titleOpacity,
          zIndex: 10,
        }}
      >
        <div
          style={{
            transform: `translateY(${titleY}px) rotateX(${titleRotateX}deg)`,
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
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          marginTop: 20,
          textAlign: "center",
          zIndex: 10,
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
        <div
          style={{
            width: lineWidth,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${colors.gold}, ${colors.rose}, ${colors.gold}, transparent)`,
            margin: "20px auto 0",
          }}
        />
      </div>

      {/* Bottom text */}
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
