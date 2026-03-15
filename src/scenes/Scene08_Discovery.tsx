import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { PhoneMockup } from "../components/PhoneMockup";

const ConnectionLine: React.FC<{ x1: number; y1: number; x2: number; y2: number; progress: number }> = ({
  x1, y1, x2, y2, progress,
}) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - 20;
  const d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  const len = 200;
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      viewBox="0 0 320 300"
    >
      <defs>
        <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.gold} stopOpacity="0.8" />
          <stop offset="100%" stopColor={colors.rose} stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <path
        d={d}
        fill="none"
        stroke="url(#connGrad)"
        strokeWidth="1.5"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - progress)}
        strokeLinecap="round"
      />
    </svg>
  );
};

const ProfileCard: React.FC<{
  emoji: string;
  name: string;
  age: number;
  trait: string;
  compat: number;
  x: number;
  y: number;
  delay: number;
}> = ({ emoji, name, age, trait, compat, x, y, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame: frame - delay, fps, config: { damping: 80, stiffness: 200, mass: 0.6 } });
  const opacity = interpolate(appear, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${appear})`,
        opacity,
        width: 90,
        padding: "10px",
        borderRadius: 14,
        background: colors.bgCard,
        border: `1px solid ${colors.borderBright}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(201,168,76,0.1)",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 4 }}>{emoji}</div>
      <div style={{ fontFamily: fonts.serif, fontSize: 11, color: colors.textPrimary, fontWeight: 600 }}>{name}</div>
      <div style={{ fontFamily: fonts.sans, fontSize: 9, color: colors.textSecondary }}>{age} · {trait}</div>
      <div
        style={{
          marginTop: 6,
          padding: "2px 8px",
          borderRadius: 10,
          background: "rgba(201,168,76,0.15)",
          fontSize: 9,
          color: colors.gold,
          fontWeight: 700,
        }}
      >
        {compat}% match
      </div>
    </div>
  );
};

const PhoneDiscoveryScreen: React.FC = () => {
  const frame = useCurrentFrame();

  const profiles = [
    { emoji: "👨‍💼", name: "James", age: 30, trait: "Communicator", compat: 94, x: 160, y: 140, delay: 20 },
    { emoji: "👩‍🎨", name: "Sophie", age: 27, trait: "Creative", compat: 81, x: 72, y: 220, delay: 35 },
    { emoji: "👨‍🔬", name: "Marcus", age: 32, trait: "Intellectual", compat: 76, x: 248, y: 220, delay: 50 },
    { emoji: "👩‍⚕️", name: "Elena", age: 29, trait: "Empath", compat: 88, x: 72, y: 130, delay: 65 },
    { emoji: "👨‍🎭", name: "Theo", age: 31, trait: "Adventurer", compat: 72, x: 248, y: 130, delay: 80 },
  ];

  const connProgress = interpolate(frame, [50, 100], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ padding: "60px 0 0", fontFamily: fonts.sans, background: colors.bg, height: "100%", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "0 16px", marginBottom: 12 }}>
        <div style={{ fontFamily: fonts.serif, fontSize: 16, color: colors.textPrimary, fontWeight: 600, marginBottom: 2 }}>
          Discovery
        </div>
        <div style={{ fontSize: 9, color: colors.textSecondary }}>Compatibility-matched connections</div>
      </div>

      {/* Connection map */}
      <div style={{ position: "relative", height: 310 }}>
        {/* Center user */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 40,
            transform: "translate(-50%, 0)",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: colors.gradientGold,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              boxShadow: `0 0 30px rgba(201,168,76,0.4)`,
              border: `2px solid ${colors.borderBright}`,
            }}
          >
            👩
          </div>
          <div style={{ textAlign: "center", marginTop: 4, fontSize: 9, color: colors.gold }}>You</div>
        </div>

        {/* Connection lines */}
        <ConnectionLine x1={160} y1={60} x2={160} y2={120} progress={connProgress} />
        <ConnectionLine x1={160} y1={60} x2={72} y2={200} progress={connProgress * 0.9} />
        <ConnectionLine x1={160} y1={60} x2={248} y2={200} progress={connProgress * 0.85} />

        {/* Profile cards */}
        {profiles.map((p) => (
          <ProfileCard key={p.name} {...p} />
        ))}
      </div>

      {/* Filter tags */}
      <div style={{ padding: "0 16px", display: "flex", gap: 6, flexWrap: "wrap", opacity: interpolate(frame, [70, 90], [0, 1], { extrapolateRight: "clamp" }) }}>
        {["Values Aligned", "Growth Mindset", "Communicator"].map((tag) => (
          <div
            key={tag}
            style={{
              padding: "4px 10px",
              borderRadius: 20,
              background: "rgba(201,168,76,0.12)",
              border: `1px solid ${colors.border}`,
              fontSize: 9,
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

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const phoneScale = spring({ frame, fps, config: { damping: 70, stiffness: 120, mass: 0.9 } });

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
      <ParticleField />
      <GlowOrb x="75%" y="50%" size={600} color="rgba(232,160,160,0.2)" delay={20} />
      <GlowOrb x="20%" y="35%" size={450} color="rgba(201,168,76,0.2)" delay={0} />

      {/* Left content */}
      <div style={{ maxWidth: 420 }}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            letterSpacing: 5,
            color: colors.rose,
            textTransform: "uppercase",
            marginBottom: 20,
            opacity: interpolate(frame, [5, 35], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          Smart Discovery
        </div>
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 52,
            fontWeight: 300,
            lineHeight: 1.15,
            color: colors.textPrimary,
            marginBottom: 24,
            opacity: interpolate(frame, [15, 45], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [15, 45], [30, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          Find connections that{" "}
          <span style={{ background: colors.gradientRose, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            truly resonate
          </span>
        </div>

        <div style={{ width: 80, height: 1, background: colors.gradientRose, marginBottom: 24 }} />

        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 15,
            color: colors.textSecondary,
            lineHeight: 1.7,
            marginBottom: 40,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          Our compatibility engine goes beyond surface attraction, matching you on values, communication styles, life goals, and emotional intelligence profiles.
        </div>

        {[
          { icon: "🧬", title: "Deep Compatibility", desc: "12-dimension matching algorithm" },
          { icon: "🎯", title: "Values-First", desc: "Aligned on what matters most" },
          { icon: "🌐", title: "Curated Network", desc: "Quality over quantity, always" },
          { icon: "🔐", title: "Safe Space", desc: "Verified, respectful community" },
        ].map(({ icon, title, desc }, i) => (
          <div
            key={title}
            style={{
              opacity: interpolate(frame, [40 + i * 10, 65 + i * 10], [0, 1], { extrapolateRight: "clamp" }),
              display: "flex",
              gap: 12,
              marginBottom: 14,
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 20 }}>{icon}</span>
            <div>
              <div style={{ fontFamily: fonts.serif, fontSize: 14, color: colors.textPrimary }}>{title}</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textSecondary }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Right phone */}
      <div style={{ transform: `scale(${phoneScale})` }}>
        <PhoneMockup scale={1}>
          <PhoneDiscoveryScreen />
        </PhoneMockup>
      </div>
    </div>
  );
};
