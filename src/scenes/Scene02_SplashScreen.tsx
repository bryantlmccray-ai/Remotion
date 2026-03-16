import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../utils/colors";
import { LuxuryBackground } from "../components/LuxuryBackground";

export const Scene02_SplashScreen: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // Heartbeat rings — multiple layered
  const rings = [0, 15, 30, 45].map((offset) => {
    const f = (frame + offset) % 90;
    return {
      scale: 1 + interpolate(f, [0, 70], [0, 2], { extrapolateRight: "clamp" }),
      opacity: interpolate(f, [0, 70], [0.5, 0], { extrapolateRight: "clamp" }),
    };
  });

  // Loading bar
  const loadProgress = interpolate(frame, [20, 100], [0, 100], { extrapolateRight: "clamp" });

  // Text float
  const textY = 6 * Math.sin(frame * 0.05);

  // Heart pulse
  const heartScale = 1 + 0.08 * Math.sin(frame * 0.15);

  // Rotating outer decorative ring
  const outerRotate = frame * 0.4;

  // Feature text reveals
  const features = ["Wellness Tracking", "AI Coaching", "Deep Connection"];
  const featureIdx = Math.floor(interpolate(frame, [50, 110], [0, 2.99], { extrapolateRight: "clamp" }));

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
        opacity: fadeIn,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <LuxuryBackground variant="warm" showGrid={false} />

      {/* Decorative rotating outer ring */}
      <svg
        style={{ position: "absolute", width: 500, height: 500, top: "50%", left: "50%", transform: `translate(-50%, -50%) rotate(${outerRotate}deg)`, opacity: 0.1 }}
        viewBox="0 0 500 500"
      >
        <circle cx="250" cy="250" r="240" fill="none" stroke={colors.gold} strokeWidth="0.5" strokeDasharray="3 8" />
        <circle cx="250" cy="250" r="220" fill="none" stroke={colors.rose} strokeWidth="0.5" strokeDasharray="6 12" />
        {/* Tick marks */}
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i * 10 * Math.PI) / 180;
          const r1 = 230;
          const r2 = 236;
          return (
            <line
              key={i}
              x1={250 + r1 * Math.cos(a)}
              y1={250 + r1 * Math.sin(a)}
              x2={250 + r2 * Math.cos(a)}
              y2={250 + r2 * Math.sin(a)}
              stroke={colors.gold}
              strokeWidth="1"
              opacity={0.4}
            />
          );
        })}
      </svg>

      {/* Heartbeat rings */}
      {rings.map((r, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 140,
            height: 140,
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${r.scale})`,
            borderRadius: "50%",
            border: `${i % 2 === 0 ? 2 : 1}px solid ${i % 2 === 0 ? colors.gold : colors.rose}`,
            opacity: r.opacity,
            boxShadow: i === 0 ? `0 0 30px rgba(201,168,76,0.3)` : "none",
          }}
        />
      ))}

      {/* Logo area */}
      <div
        style={{
          transform: `translateY(${textY}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          zIndex: 2,
        }}
      >
        {/* Heart + M logo */}
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: "50%",
            border: `2px solid ${colors.borderBright}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.03) 60%, transparent 80%)`,
            boxShadow: `0 0 80px rgba(201,168,76,0.3), inset 0 0 40px rgba(201,168,76,0.05)`,
            position: "relative",
            transform: `scale(${heartScale})`,
          }}
        >
          {/* Heart SVG */}
          <svg width="52" height="48" viewBox="0 0 48 44" fill="none">
            <path
              d="M24 40C24 40 2 26 2 14C2 7.4 7.4 2 14 2C17.6 2 20.8 3.6 24 6.4C27.2 3.6 30.4 2 34 2C40.6 2 46 7.4 46 14C46 26 24 40 24 40Z"
              fill="url(#heartGrad2)"
            />
            <defs>
              <linearGradient id="heartGrad2" x1="2" y1="2" x2="46" y2="40" gradientUnits="userSpaceOnUse">
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
              fontSize: 56,
              fontWeight: 300,
              letterSpacing: 16,
              color: colors.textPrimary,
              textTransform: "uppercase",
              textShadow: `0 0 40px rgba(201,168,76,0.3)`,
            }}
          >
            MONARK
          </div>
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: 14,
              fontWeight: 300,
              letterSpacing: 6,
              background: `linear-gradient(90deg, ${colors.gold}, ${colors.rose})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textTransform: "uppercase",
              marginTop: 10,
            }}
          >
            Relationship Wellness
          </div>
        </div>

        {/* Loading bar */}
        <div
          style={{
            width: 240,
            height: 2,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 2,
            marginTop: 20,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${loadProgress}%`,
              background: `linear-gradient(90deg, ${colors.gold}, ${colors.rose})`,
              borderRadius: 2,
              boxShadow: `0 0 12px rgba(201,168,76,0.5)`,
            }}
          />
        </div>

        {/* Cycling feature text */}
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 13,
            letterSpacing: 4,
            color: colors.textSecondary,
            textTransform: "uppercase",
            marginTop: 8,
            opacity: interpolate(frame, [50, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {features[featureIdx]}
        </div>
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          fontFamily: fonts.sans,
          fontSize: 12,
          letterSpacing: 4,
          color: colors.textMuted,
          textTransform: "uppercase",
          opacity: interpolate(frame, [60, 90], [0, 0.6], { extrapolateRight: "clamp" }),
        }}
      >
        Your Love. Elevated.
      </div>
    </div>
  );
};
