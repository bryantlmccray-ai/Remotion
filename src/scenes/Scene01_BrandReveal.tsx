import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { SPRING, ease } from "../utils/animations";

/**
 * SCENE 1 — THE ARRIVAL (0:00–0:05)
 *
 * Full black. A pull back from darkness, like waking up.
 * A warm ambient light rises. The MonArk wordmark draws itself
 * with a calligrapher's stroke. Pentagon particles drift upward
 * like embers from a fireplace.
 */
export const Scene01_BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === DARKNESS PULL-BACK ===
  // Not a fade — a vignette that opens like an iris
  const irisOpen = interpolate(frame, [0, 45], [0, 1], {
    extrapolateRight: "clamp",
    easing: ease.outCubic,
  });
  const vignetteSize = interpolate(irisOpen, [0, 1], [0, 150]);

  // === WARM LIGHT SOURCE rising from below ===
  const lightRise = interpolate(frame, [5, 50], [120, 45], {
    extrapolateRight: "clamp",
    easing: ease.outQuart,
  });
  const lightIntensity = interpolate(frame, [5, 40], [0, 0.35], {
    extrapolateRight: "clamp",
  });

  // === LOGO RING — materializes with intention ===
  const ringProgress = spring({
    frame: frame - 15,
    fps,
    config: SPRING.heavy,
  });
  const ringOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Rotating conic gradient — the ring breathes
  const conicRotation = frame * 0.8;

  // === MONOGRAM "M" — stamps in with authority ===
  const mScale = spring({
    frame: frame - 30,
    fps,
    config: SPRING.snap,
  });
  const mOpacity = interpolate(frame, [30, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  // === WORDMARK — draws itself letter by letter ===
  const wordmark = "MONARK";
  const letterRevealStart = 50;
  const letterInterval = 6;

  // === TAGLINE ===
  const taglineOpacity = interpolate(frame, [85, 105], [0, 1], {
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [85, 105], [15, 0], {
    extrapolateRight: "clamp",
    easing: ease.outCubic,
  });

  // === DIVIDER draws itself ===
  const dividerWidth = interpolate(frame, [100, 125], [0, 80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // === SHIMMER across wordmark ===
  const shimmerX = interpolate(frame, [80, 130], [-150, 400], {
    extrapolateRight: "clamp",
  });

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
      {/* Ambient warm light source — rising from below */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: `${lightRise}%`,
          width: 900,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(201,168,76,${lightIntensity}) 0%, rgba(201,168,76,${lightIntensity * 0.3}) 40%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Pentagon particles — embers rising, filling the void */}
      <div style={{ opacity: interpolate(frame, [10, 40], [0, 1], { extrapolateRight: "clamp" }) }}>
        <ParticleField intensity={0.8} direction="up" />
      </div>

      {/* Ambient glow orbs — slow, atmospheric */}
      <GlowOrb x="20%" y="60%" size={500} color="rgba(201,168,76,0.2)" delay={0} />
      <GlowOrb x="80%" y="40%" size={400} color="rgba(232,160,160,0.15)" delay={60} />
      <GlowOrb x="50%" y="80%" size={350} color="rgba(155,142,196,0.12)" delay={30} />

      {/* === LOGO RING === */}
      <div
        style={{
          position: "relative",
          width: 180,
          height: 180,
          marginBottom: 48,
          opacity: ringOpacity,
          transform: `scale(${ringProgress})`,
        }}
      >
        {/* Outer ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `1.5px solid ${colors.borderBright}`,
            boxShadow: `0 0 50px rgba(201,168,76,0.25), 0 0 100px rgba(201,168,76,0.1), inset 0 0 30px rgba(201,168,76,0.05)`,
          }}
        />
        {/* Rotating gradient ring — alive, breathing */}
        <div
          style={{
            position: "absolute",
            inset: -3,
            borderRadius: "50%",
            background: `conic-gradient(from ${conicRotation}deg, transparent 60%, ${colors.gold} 75%, ${colors.goldLight} 85%, transparent 100%)`,
            mask: "radial-gradient(circle, transparent 76px, black 78px, black 90px, transparent 92px)",
            WebkitMask: "radial-gradient(circle, transparent 76px, black 78px, black 90px, transparent 92px)",
          }}
        />
        {/* Inner glow field */}
        <div
          style={{
            position: "absolute",
            inset: 25,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)`,
            opacity: mOpacity,
          }}
        />
        {/* Monogram "M" — stamps in */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: mOpacity,
            transform: `scale(${mScale})`,
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
              filter: `drop-shadow(0 0 20px rgba(201,168,76,0.4))`,
            }}
          >
            M
          </span>
        </div>
      </div>

      {/* === WORDMARK — letter by letter reveal === */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          {wordmark.split("").map((letter, i) => {
            const letterStart = letterRevealStart + i * letterInterval;
            const letterProgress = spring({
              frame: frame - letterStart,
              fps,
              config: SPRING.snap,
            });
            const letterOpacity = interpolate(
              frame,
              [letterStart, letterStart + 8],
              [0, 1],
              { extrapolateRight: "clamp" }
            );
            return (
              <span
                key={i}
                style={{
                  fontFamily: fonts.serif,
                  fontSize: 78,
                  fontWeight: 300,
                  letterSpacing: 20,
                  color: colors.textPrimary,
                  textTransform: "uppercase",
                  lineHeight: 1,
                  display: "inline-block",
                  opacity: letterOpacity,
                  transform: `translateY(${(1 - letterProgress) * 25}px) scale(${0.8 + letterProgress * 0.2})`,
                  filter: `blur(${(1 - letterProgress) * 3}px)`,
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>
        {/* Shimmer sweep across wordmark */}
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

      {/* === TAGLINE === */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
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
          Relationship Wellness
        </div>
        {/* Self-drawing divider */}
        <div
          style={{
            width: dividerWidth,
            height: 1,
            background: colors.gradientGoldHoriz,
            margin: "20px auto 0",
            boxShadow: `0 0 10px rgba(201,168,76,0.3)`,
          }}
        />
      </div>

      {/* === IRIS/VIGNETTE OVERLAY === */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, transparent ${vignetteSize}%, ${colors.bg} ${vignetteSize + 30}%)`,
          pointerEvents: "none",
          zIndex: frame < 45 ? 500 : -1,
        }}
      />
    </div>
  );
};
