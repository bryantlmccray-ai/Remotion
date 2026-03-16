import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";

interface MatchProfile {
  name: string;
  age: number;
  city: string;
  emoji: string;
  score: number;
  rifAlign: number;
  traits: string[];
  bio: string;
}

const MATCHES: MatchProfile[] = [
  {
    name: "Amara",
    age: 28,
    city: "Brooklyn, NY",
    emoji: "👩🏾‍🎨",
    score: 96,
    rifAlign: 94,
    traits: ["Emotionally Present", "Creative Soul", "Growth-Oriented"],
    bio: "Art curator who believes vulnerability is strength.",
  },
  {
    name: "Sienna",
    age: 26,
    city: "West Village, NY",
    emoji: "👩🏻‍💼",
    score: 91,
    rifAlign: 88,
    traits: ["Ambitious", "Deep Listener", "Adventurous"],
    bio: "Strategy consultant. Loves jazz bars and slow mornings.",
  },
  {
    name: "Kai",
    age: 30,
    city: "Williamsburg, NY",
    emoji: "👩🏽‍🔬",
    score: 87,
    rifAlign: 85,
    traits: ["Intellectual", "Nature Lover", "Calm Energy"],
    bio: "Neuroscientist exploring the science of connection.",
  },
];

const MatchCard: React.FC<{ match: MatchProfile; index: number; isCenter: boolean }> = ({ match, index, isCenter }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const baseDelay = 30 + index * 20;
  const appear = spring({ frame: frame - baseDelay, fps, config: { damping: 70, stiffness: 150, mass: 0.8 } });
  const opacity = interpolate(appear, [0, 1], [0, 1]);

  const scoreAnim = interpolate(frame, [baseDelay + 15, baseDelay + 55], [0, match.score], { extrapolateRight: "clamp" });
  const rifAnim = interpolate(frame, [baseDelay + 20, baseDelay + 60], [0, match.rifAlign], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${appear}) translateY(${isCenter ? 0 : 20}px)`,
        width: isCenter ? 340 : 300,
        padding: isCenter ? "28px 24px" : "22px 20px",
        borderRadius: 24,
        background: isCenter
          ? "linear-gradient(145deg, rgba(166,147,95,0.1) 0%, #F5EDE4 100%)"
          : colors.bgCard,
        border: `1.5px solid ${isCenter ? colors.borderBright : colors.border}`,
        boxShadow: isCenter
          ? "0 20px 80px rgba(80,63,48,0.15), 0 0 40px rgba(166,147,95,0.08)"
          : "0 12px 40px rgba(80,63,48,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: isCenter ? 10 : 1,
        position: "relative",
      }}
    >
      {/* Rank badge */}
      <div
        style={{
          position: "absolute",
          top: -12,
          left: "50%",
          transform: "translateX(-50%)",
          background: isCenter ? colors.gradientGold : "rgba(94,110,74,0.2)",
          borderRadius: 20,
          padding: "4px 16px",
          fontSize: 10,
          fontWeight: 700,
          color: isCenter ? colors.bgCard : colors.olive,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontFamily: fonts.sans,
        }}
      >
        #{index + 1} Match
      </div>

      <div
        style={{
          width: isCenter ? 80 : 64,
          height: isCenter ? 80 : 64,
          borderRadius: "50%",
          background: "rgba(166,147,95,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: isCenter ? 40 : 32,
          border: `2px solid ${colors.borderBright}`,
          marginBottom: 12,
          marginTop: 8,
        }}
      >
        {match.emoji}
      </div>

      <div style={{ fontFamily: fonts.serif, fontSize: isCenter ? 22 : 18, color: colors.textPrimary, fontWeight: 600, marginBottom: 2 }}>
        {match.name}, {match.age}
      </div>
      <div style={{ fontSize: 11, color: colors.textSecondary, marginBottom: 12 }}>{match.city}</div>

      <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: isCenter ? 32 : 26,
              fontWeight: 700,
              background: colors.gradientGold,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
            }}
          >
            {Math.round(scoreAnim)}%
          </div>
          <div style={{ fontSize: 9, color: colors.textMuted, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>Match</div>
        </div>
        <div style={{ width: 1, height: 36, background: colors.border }} />
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: isCenter ? 32 : 26,
              fontWeight: 700,
              color: colors.accent,
              lineHeight: 1,
            }}
          >
            {Math.round(rifAnim)}%
          </div>
          <div style={{ fontSize: 9, color: colors.textMuted, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>RIF Align</div>
        </div>
      </div>

      <div style={{ fontSize: 11, color: colors.textSecondary, textAlign: "center", lineHeight: 1.5, marginBottom: 12, fontStyle: "italic" }}>
        "{match.bio}"
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
        {match.traits.map((trait) => (
          <div
            key={trait}
            style={{
              padding: "3px 10px",
              borderRadius: 20,
              background: "rgba(166,147,95,0.08)",
              border: `1px solid ${colors.border}`,
              fontSize: 9,
              color: colors.gold,
            }}
          >
            {trait}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Scene04_YourThree: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleOpacity = interpolate(frame, [5, 35], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [5, 35], [30, 0], {
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

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
      <GlowOrb x="50%" y="35%" size={700} color="rgba(166,147,95,0.1)" delay={0} />
      <GlowOrb x="20%" y="70%" size={400} color="rgba(192,128,138,0.08)" delay={30} />
      <GlowOrb x="80%" y="60%" size={400} color="rgba(94,110,74,0.08)" delay={60} />

      <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, textAlign: "center", marginBottom: 60 }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 12, letterSpacing: 6, color: colors.gold, textTransform: "uppercase", marginBottom: 12 }}>
          This Week's Curated Matches
        </div>
        <div style={{ fontFamily: fonts.serif, fontSize: 52, fontWeight: 300, color: colors.textPrimary, lineHeight: 1.15 }}>
          Your{" "}
          <span style={{ background: colors.gradientGold, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Top 3</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 30, position: "relative" }}>
        {MATCHES.map((match, i) => (
          <MatchCard key={match.name} match={match} index={i} isCenter={i === 0} />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 50,
          fontFamily: fonts.sans,
          fontSize: 12,
          color: colors.textMuted,
          letterSpacing: 2,
          opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        New matches every Monday at 9 AM
      </div>
    </div>
  );
};
