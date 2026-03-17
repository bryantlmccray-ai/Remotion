import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { PhoneMockup } from "../components/PhoneMockup";
import { SPRING, ease } from "../utils/animations";

/**
 * SCENE 8 — DISCOVERY (0:47–0:54)
 *
 * Constellation connections. Profile cards orbit and connect.
 * Connection lines draw themselves like neural pathways.
 * Phone on the left — rose accent color dominates.
 * Shows the diversity of the matching system.
 */

const ConnectionLine: React.FC<{
  x1: number; y1: number;
  x2: number; y2: number;
  progress: number;
  color?: string;
}> = ({ x1, y1, x2, y2, progress, color = "url(#connGrad8)" }) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - 25;
  const d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  const len = 250;

  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeDasharray={len}
      strokeDashoffset={len * (1 - progress)}
      strokeLinecap="round"
      opacity={0.7}
    />
  );
};

const ProfileCard: React.FC<{
  emoji: string; name: string; age: number;
  trait: string; compat: number;
  x: number; y: number; delay: number;
}> = ({ emoji, name, age, trait, compat, x, y, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame: frame - delay, fps, config: SPRING.elastic });
  const floatY = 3 * Math.sin(frame * 0.04 + delay * 0.1);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${appear}) translateY(${floatY}px)`,
        opacity: appear,
        width: 88,
        padding: "9px",
        borderRadius: 14,
        background: colors.bgCard,
        border: `1px solid ${colors.borderBright}`,
        boxShadow: `0 8px 28px rgba(0,0,0,0.5), 0 0 16px rgba(201,168,76,0.08)`,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 26, marginBottom: 3 }}>{emoji}</div>
      <div style={{ fontFamily: fonts.serif, fontSize: 10, color: colors.textPrimary, fontWeight: 600 }}>{name}</div>
      <div style={{ fontFamily: fonts.sans, fontSize: 8, color: colors.textSecondary }}>{age} · {trait}</div>
      <div
        style={{
          marginTop: 5,
          padding: "2px 6px",
          borderRadius: 10,
          background: "rgba(201,168,76,0.12)",
          fontSize: 8,
          color: colors.gold,
          fontWeight: 700,
        }}
      >
        {compat}%
      </div>
    </div>
  );
};

const PhoneDiscoveryScreen: React.FC = () => {
  const frame = useCurrentFrame();

  const profiles = [
    { emoji: "👨‍💼", name: "James", age: 30, trait: "Communicator", compat: 94, x: 160, y: 130, delay: 15 },
    { emoji: "👩‍🎨", name: "Sophie", age: 27, trait: "Creative", compat: 81, x: 68, y: 210, delay: 28 },
    { emoji: "👨‍🔬", name: "Marcus", age: 32, trait: "Intellectual", compat: 76, x: 252, y: 210, delay: 40 },
    { emoji: "👩‍⚕️", name: "Elena", age: 29, trait: "Empath", compat: 88, x: 68, y: 120, delay: 55 },
    { emoji: "👨‍🎭", name: "Theo", age: 31, trait: "Adventurer", compat: 72, x: 252, y: 120, delay: 68 },
  ];

  const connProgress = interpolate(frame, [40, 90], [0, 1], {
    extrapolateRight: "clamp",
    easing: ease.outQuart,
  });

  // Center user pulse
  const userPulse = 1 + 0.04 * Math.sin(frame * 0.12);

  return (
    <div style={{ padding: "60px 0 0", fontFamily: fonts.sans, background: colors.bg, height: "100%", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "0 16px", marginBottom: 10 }}>
        <div style={{ fontFamily: fonts.serif, fontSize: 15, color: colors.textPrimary, fontWeight: 600, marginBottom: 2 }}>
          Discovery
        </div>
        <div style={{ fontSize: 8, color: colors.textSecondary }}>Compatibility-matched connections</div>
      </div>

      {/* Connection constellation */}
      <div style={{ position: "relative", height: 300 }}>
        {/* SVG connection lines */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          viewBox="0 0 320 300"
        >
          <defs>
            <linearGradient id="connGrad8" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.gold} stopOpacity="0.7" />
              <stop offset="100%" stopColor={colors.rose} stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <ConnectionLine x1={160} y1={55} x2={160} y2={110} progress={connProgress} />
          <ConnectionLine x1={160} y1={55} x2={68} y2={190} progress={connProgress * 0.85} />
          <ConnectionLine x1={160} y1={55} x2={252} y2={190} progress={connProgress * 0.8} />
          <ConnectionLine x1={160} y1={55} x2={68} y2={100} progress={connProgress * 0.9} />
          <ConnectionLine x1={160} y1={55} x2={252} y2={100} progress={connProgress * 0.75} />
        </svg>

        {/* Center user node */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 32,
            transform: `translate(-50%, 0) scale(${userPulse})`,
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: colors.gradientGold,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              boxShadow: `0 0 30px rgba(201,168,76,0.4), 0 0 60px rgba(201,168,76,0.15)`,
              border: `2px solid ${colors.goldBright}`,
            }}
          >
            👩
          </div>
          <div style={{ textAlign: "center", marginTop: 3, fontSize: 8, color: colors.gold, fontWeight: 600 }}>You</div>
        </div>

        {/* Profile cards */}
        {profiles.map((p) => (
          <ProfileCard key={p.name} {...p} />
        ))}
      </div>

      {/* Filter tags */}
      <div
        style={{
          padding: "0 16px",
          display: "flex",
          gap: 5,
          flexWrap: "wrap",
          opacity: interpolate(frame, [65, 85], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {["Values Aligned", "Growth Mindset", "Communicator"].map((tag) => (
          <div
            key={tag}
            style={{
              padding: "3px 8px",
              borderRadius: 16,
              background: "rgba(201,168,76,0.1)",
              border: `1px solid ${colors.border}`,
              fontSize: 8,
              color: colors.gold,
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Scene08_Discovery: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // Phone enters from left with bounce
  const phoneSlide = spring({ frame, fps, config: SPRING.bounce });
  const phoneX = interpolate(phoneSlide, [0, 1], [-280, 0]);
  const phoneFloat = 5 * Math.sin(frame * 0.032);

  // Right content
  const contentProgress = spring({ frame: frame - 12, fps, config: SPRING.velvet });
  const contentX = interpolate(contentProgress, [0, 1], [50, 0]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: colors.gradientBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 80px",
        opacity: fadeIn,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ParticleField intensity={0.5} />
      <GlowOrb x="75%" y="50%" size={600} color="rgba(232,160,160,0.18)" delay={20} />
      <GlowOrb x="20%" y="35%" size={450} color="rgba(201,168,76,0.18)" delay={0} />

      {/* === LEFT: PHONE === */}
      <div style={{ transform: `translateX(${phoneX}px) translateY(${phoneFloat}px)` }}>
        <PhoneMockup scale={1.05} screenBloom bloomDelay={8}>
          <PhoneDiscoveryScreen />
        </PhoneMockup>
      </div>

      {/* === RIGHT CONTENT === */}
      <div
        style={{
          maxWidth: 440,
          opacity: interpolate(frame, [12, 35], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateX(${contentX}px)`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            letterSpacing: 6,
            color: colors.roseLight,
            textTransform: "uppercase",
            marginBottom: 22,
          }}
        >
          Smart Discovery
        </div>
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 52,
            fontWeight: 300,
            lineHeight: 1.12,
            color: colors.textPrimary,
            marginBottom: 24,
          }}
        >
          Find connections that{" "}
          <span style={{ background: colors.gradientRose, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            truly resonate
          </span>
        </div>

        <div
          style={{
            width: 80,
            height: 1,
            background: colors.gradientRose,
            marginBottom: 24,
            boxShadow: `0 0 8px rgba(232,160,160,0.3)`,
          }}
        />

        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 15,
            color: colors.textSecondary,
            lineHeight: 1.7,
            marginBottom: 40,
            opacity: interpolate(frame, [28, 50], [0, 1], { extrapolateRight: "clamp" }),
            filter: `blur(${interpolate(frame, [28, 50], [4, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          Our compatibility engine goes beyond surface attraction, matching on values,
          communication styles, life goals, and emotional intelligence profiles.
        </div>

        {[
          { icon: "🧬", title: "Deep Compatibility", desc: "12-dimension matching algorithm" },
          { icon: "🎯", title: "Values-First", desc: "Aligned on what matters most" },
          { icon: "🌐", title: "Curated Network", desc: "Quality over quantity, always" },
          { icon: "🔐", title: "Safe Space", desc: "Verified, respectful community" },
        ].map(({ icon, title, desc }, i) => {
          const fProgress = spring({ frame: frame - (40 + i * 10), fps, config: SPRING.velvet });
          const fOpacity = interpolate(frame, [40 + i * 10, 55 + i * 10], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={title}
              style={{
                opacity: fOpacity,
                transform: `translateX(${(1 - fProgress) * 25}px)`,
                display: "flex",
                gap: 12,
                marginBottom: 12,
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 20 }}>{icon}</span>
              <div>
                <div style={{ fontFamily: fonts.serif, fontSize: 14, color: colors.textPrimary, fontWeight: 600 }}>{title}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textSecondary }}>{desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
