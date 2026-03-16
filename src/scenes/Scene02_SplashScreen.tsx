import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../utils/colors";
import { LuxuryBackground } from "../components/LuxuryBackground";
import { DynamicElements } from "../components/DynamicElements";

export const Scene02_SplashScreen: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 3D pulsing rings — MORE and BIGGER
  const rings = [0, 15, 30, 45, 60].map((offset) => {
    const f = (frame + offset) % 90;
    return {
      scale: 1 + interpolate(f, [0, 70], [0, 2.5], { extrapolateRight: "clamp" }),
      opacity: interpolate(f, [0, 70], [0.6, 0], { extrapolateRight: "clamp" }),
      rotateX: 55 + offset * 0.3,
    };
  });

  // Loading bar
  const loadProgress = interpolate(frame, [20, 100], [0, 100], { extrapolateRight: "clamp" });

  // 3D floating logo
  const logoRotateY = Math.sin(frame * 0.03) * 15;
  const logoRotateX = Math.cos(frame * 0.025) * 10;
  const textY = 8 * Math.sin(frame * 0.05);
  const heartScale = 1 + 0.1 * Math.sin(frame * 0.15);

  // Feature text reveals
  const features = ["Wellness Tracking", "AI Coaching", "Deep Connection"];
  const featureIdx = Math.floor(interpolate(frame, [50, 110], [0, 2.99], { extrapolateRight: "clamp" }));

  // 3D rotating outer decoration
  const outerRotate = frame * 0.5;

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
      <LuxuryBackground variant="warm" showGrid={false} intensity={1.2} />
      <DynamicElements variant="centered" />

      {/* 3D tilted outer decorative ring — BIGGER */}
      <div style={{ position: "absolute", left: "50%", top: "50%", perspective: 600, pointerEvents: "none" }}>
        <svg
          style={{ width: 650, height: 650, position: "absolute", left: -325, top: -325, transform: `rotateX(60deg) rotateZ(${outerRotate}deg)`, opacity: 0.15 }}
          viewBox="0 0 500 500"
        >
          <circle cx="250" cy="250" r="240" fill="none" stroke={colors.gold} strokeWidth="0.8" strokeDasharray="3 8" />
          <circle cx="250" cy="250" r="220" fill="none" stroke={colors.rose} strokeWidth="0.8" strokeDasharray="6 12" />
          <circle cx="250" cy="250" r="200" fill="none" stroke={colors.lavender} strokeWidth="0.5" strokeDasharray="4 10" />
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (i * 10 * Math.PI) / 180;
            return (
              <line key={i} x1={250 + 230 * Math.cos(a)} y1={250 + 230 * Math.sin(a)} x2={250 + 238 * Math.cos(a)} y2={250 + 238 * Math.sin(a)} stroke={colors.gold} strokeWidth="1.2" opacity={0.5} />
            );
          })}
        </svg>
      </div>

      {/* 3D heartbeat rings — BIGGER */}
      <div style={{ position: "absolute", left: "50%", top: "50%", perspective: 500, pointerEvents: "none" }}>
        {rings.map((r, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 170,
              height: 170,
              left: -85,
              top: -85,
              transform: `scale(${r.scale}) rotateX(${r.rotateX}deg)`,
              borderRadius: "50%",
              border: `${i % 2 === 0 ? 2.5 : 1.5}px solid ${i % 2 === 0 ? colors.gold : colors.rose}`,
              opacity: r.opacity,
              boxShadow: i === 0 ? `0 0 40px rgba(201,168,76,0.4)` : "none",
            }}
          />
        ))}
      </div>

      {/* Logo area with 3D float — BIGGER */}
      <div style={{ perspective: 800, zIndex: 2 }}>
        <div
          style={{
            transform: `translateY(${textY}px) rotateY(${logoRotateY}deg) rotateX(${logoRotateX}deg)`,
            transformStyle: "preserve-3d",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
          }}
        >
          {/* Heart + M logo — BIGGER */}
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: "50%",
              border: `2.5px solid ${colors.borderBright}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `radial-gradient(circle, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.04) 60%, transparent 80%)`,
              boxShadow: `0 0 100px rgba(201,168,76,0.4), inset 0 0 50px rgba(201,168,76,0.06)`,
              transform: `scale(${heartScale}) translateZ(30px)`,
            }}
          >
            <svg width="64" height="58" viewBox="0 0 48 44" fill="none">
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

          {/* Brand — MUCH BIGGER */}
          <div style={{ textAlign: "center", transform: "translateZ(15px)" }}>
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 74,
                fontWeight: 300,
                letterSpacing: 20,
                color: colors.textPrimary,
                textTransform: "uppercase",
                textShadow: `0 0 60px rgba(201,168,76,0.4)`,
              }}
            >
              MONARK
            </div>
            <div
              style={{
                fontFamily: fonts.sans,
                fontSize: 18,
                fontWeight: 300,
                letterSpacing: 8,
                background: `linear-gradient(90deg, ${colors.gold}, ${colors.rose})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textTransform: "uppercase",
                marginTop: 12,
              }}
            >
              Relationship Wellness
            </div>
          </div>

          {/* Loading bar — WIDER */}
          <div
            style={{
              width: 300,
              height: 3,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 2,
              marginTop: 24,
              overflow: "hidden",
              transform: "translateZ(5px)",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${loadProgress}%`,
                background: `linear-gradient(90deg, ${colors.gold}, ${colors.rose})`,
                borderRadius: 2,
                boxShadow: `0 0 16px rgba(201,168,76,0.6)`,
              }}
            />
          </div>

          {/* Cycling feature text — BIGGER */}
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: 16,
              letterSpacing: 5,
              color: colors.textSecondary,
              textTransform: "uppercase",
              marginTop: 10,
              opacity: interpolate(frame, [50, 60], [0, 1], { extrapolateRight: "clamp" }),
              transform: "translateZ(5px)",
            }}
          >
            {features[featureIdx]}
          </div>
        </div>
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          fontFamily: fonts.sans,
          fontSize: 14,
          letterSpacing: 5,
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
