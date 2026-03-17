import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { MonArkLogo } from "../components/MonArkLogo";
import { SPRING, ease } from "../utils/animations";

/**
 * SCENE 1 — THE ARRIVAL (4 sec / 120 frames)
 *
 * Iris opens from darkness. The MA compass rose logo draws itself —
 * ring, cardinal points, monogram, then "Date well." tagline.
 * Sandy gold on deep navy. Pentagon embers rise.
 * Fast, punchy, luxurious.
 */
export const Scene01_BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Iris opens FAST
  const irisOpen = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
    easing: ease.outCubic,
  });
  const vignetteSize = interpolate(irisOpen, [0, 1], [0, 150]);

  // Warm light source rises
  const lightRise = interpolate(frame, [3, 30], [110, 45], {
    extrapolateRight: "clamp",
    easing: ease.outQuart,
  });
  const lightIntensity = interpolate(frame, [3, 25], [0, 0.3], {
    extrapolateRight: "clamp",
  });

  // Logo entrance — scale from center
  const logoScale = spring({ frame: frame - 8, fps, config: SPRING.bounce });
  const logoOpacity = interpolate(frame, [8, 20], [0, 1], { extrapolateRight: "clamp" });

  // "MONARK" wordmark below logo
  const wordmarkOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateRight: "clamp" });
  const wordmarkY = interpolate(frame, [35, 50], [15, 0], {
    extrapolateRight: "clamp",
    easing: ease.outCubic,
  });

  // Shimmer sweep
  const shimmerX = interpolate(frame, [55, 95], [-150, 500], { extrapolateRight: "clamp" });

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
      {/* Warm light source */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: `${lightRise}%`,
          width: 800,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(201,168,76,${lightIntensity}) 0%, rgba(201,168,76,${lightIntensity * 0.3}) 40%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Pentagon embers */}
      <div style={{ opacity: interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" }) }}>
        <ParticleField intensity={0.7} direction="up" />
      </div>

      <GlowOrb x="20%" y="60%" size={450} color="rgba(201,168,76,0.18)" delay={0} />
      <GlowOrb x="80%" y="35%" size={350} color="rgba(201,168,76,0.12)" delay={40} />

      {/* === MA COMPASS ROSE LOGO === */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: 30,
        }}
      >
        <MonArkLogo size={180} animate animateDelay={8} showTagline />
      </div>

      {/* === MONARK WORDMARK === */}
      <div
        style={{
          opacity: wordmarkOpacity,
          transform: `translateY(${wordmarkY}px)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 72,
            fontWeight: 300,
            letterSpacing: 18,
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
            top: 0,
            left: 0,
            width: 80,
            height: "100%",
            background: colors.gradientShimmer,
            transform: `translateX(${shimmerX}px)`,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Iris overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, transparent ${vignetteSize}%, ${colors.bg} ${vignetteSize + 30}%)`,
          pointerEvents: "none",
          zIndex: frame < 25 ? 500 : -1,
        }}
      />
    </div>
  );
};
