import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";

const AvatarGlow: React.FC<{ frame: number; size: number }> = ({ frame, size }) => {
  const rotate = frame * 0.6;
  const pulse = 1 + 0.02 * Math.sin(frame * 0.1);

  return (
    <div style={{ position: "relative", width: size, height: size, transform: `scale(${pulse})` }}>
      <div
        style={{
          position: "absolute", inset: -4, borderRadius: "50%",
          background: `conic-gradient(from ${rotate}deg, ${colors.gold}, ${colors.rose}, ${colors.olive}, ${colors.gold})`,
          padding: 4,
        }}
      >
        <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: colors.bgCard }} />
      </div>
      <div
        style={{
          position: "absolute", inset: 4, borderRadius: "50%",
          background: "linear-gradient(135deg, #DDD3C8, #E8DDD4)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.45,
        }}
      >
        👩🏾‍🎨
      </div>
      <div
        style={{
          position: "absolute", bottom: 8, right: 8, width: 28, height: 28, borderRadius: "50%",
          background: colors.gradientGold, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, boxShadow: "0 2px 10px rgba(80,63,48,0.3)", border: `2px solid ${colors.bgCard}`,
          color: colors.bgCard,
        }}
      >
        ✓
      </div>
    </div>
  );
};

const RIFMiniBar: React.FC<{ label: string; value: number; color: string; frame: number; delay: number }> = ({
  label, value, color, frame, delay,
}) => {
  const progress = interpolate(frame, [delay, delay + 40], [0, value], { extrapolateRight: "clamp" });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <div style={{ width: 80, fontSize: 11, color: colors.textSecondary, fontFamily: fonts.sans }}>{label}</div>
      <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(67,54,39,0.06)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress * 100}%`, background: color, borderRadius: 3 }} />
      </div>
      <div style={{ width: 35, textAlign: "right", fontSize: 11, color, fontWeight: 600 }}>{Math.round(progress * 100)}%</div>
    </div>
  );
};

export const Scene10_MockProfile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const cardScale = spring({ frame: frame - 10, fps, config: { damping: 60, stiffness: 100, mass: 1 } });
  const cardOpacity = interpolate(frame, [10, 35], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%", height: "100%", background: colors.gradientBg,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: fadeIn, position: "relative", overflow: "hidden",
      }}
    >
      <ParticleField />
      <GlowOrb x="50%" y="40%" size={700} color="rgba(166,147,95,0.1)" delay={0} />
      <GlowOrb x="25%" y="70%" size={400} color="rgba(192,128,138,0.08)" delay={40} />
      <GlowOrb x="80%" y="25%" size={350} color="rgba(94,110,74,0.08)" delay={20} />

      <div
        style={{
          opacity: cardOpacity, transform: `scale(${cardScale})`, width: 520, padding: "40px", borderRadius: 32,
          background: "linear-gradient(145deg, rgba(166,147,95,0.06) 0%, #F5EDE4 50%, rgba(94,110,74,0.04) 100%)",
          border: `1.5px solid ${colors.borderBright}`,
          boxShadow: "0 40px 120px rgba(80,63,48,0.15), 0 0 60px rgba(166,147,95,0.06), inset 0 1px 0 rgba(255,255,255,0.4)",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}
      >
        <AvatarGlow frame={frame} size={120} />

        <div style={{ marginTop: 20, textAlign: "center", opacity: interpolate(frame, [25, 50], [0, 1], { extrapolateRight: "clamp" }) }}>
          <div style={{ fontFamily: fonts.serif, fontSize: 32, color: colors.textPrimary, fontWeight: 600 }}>Amara Okafor</div>
          <div style={{ fontFamily: fonts.sans, fontSize: 14, color: colors.textSecondary, marginTop: 4 }}>28 · Brooklyn, NY · Art Curator</div>
        </div>

        <div style={{ display: "flex", gap: 24, marginTop: 20, marginBottom: 24, opacity: interpolate(frame, [35, 60], [0, 1], { extrapolateRight: "clamp" }) }}>
          <div style={{ padding: "12px 24px", borderRadius: 16, background: "rgba(166,147,95,0.1)", border: `1px solid ${colors.borderBright}`, textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 700, background: colors.gradientGold, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>
              {Math.round(interpolate(frame, [40, 70], [0, 96], { extrapolateRight: "clamp" }))}%
            </div>
            <div style={{ fontSize: 10, color: colors.gold, letterSpacing: 1, textTransform: "uppercase", marginTop: 4 }}>Match</div>
          </div>
          <div style={{ padding: "12px 24px", borderRadius: 16, background: "rgba(127,90,56,0.08)", border: `1px solid rgba(127,90,56,0.2)`, textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: colors.accent, lineHeight: 1 }}>
              {Math.round(interpolate(frame, [45, 75], [0, 94], { extrapolateRight: "clamp" }))}%
            </div>
            <div style={{ fontSize: 10, color: colors.accent, letterSpacing: 1, textTransform: "uppercase", marginTop: 4 }}>RIF Align</div>
          </div>
        </div>

        <div style={{ fontSize: 14, color: colors.textSecondary, textAlign: "center", lineHeight: 1.6, fontStyle: "italic", marginBottom: 20, padding: "0 12px", opacity: interpolate(frame, [45, 70], [0, 1], { extrapolateRight: "clamp" }) }}>
          "I believe connection starts with curiosity. Let's skip the small talk and talk about what makes us feel alive."
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 24, opacity: interpolate(frame, [55, 80], [0, 1], { extrapolateRight: "clamp" }) }}>
          {["Emotionally Present", "Creative Soul", "Growth-Oriented", "Deep Listener", "Art & Culture"].map((tag) => (
            <div key={tag} style={{ padding: "5px 14px", borderRadius: 20, background: "rgba(166,147,95,0.08)", border: `1px solid ${colors.border}`, fontSize: 11, color: colors.gold }}>
              {tag}
            </div>
          ))}
        </div>

        <div style={{ width: "100%", opacity: interpolate(frame, [60, 85], [0, 1], { extrapolateRight: "clamp" }) }}>
          <div style={{ fontSize: 10, color: colors.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>RIF Dimensions</div>
          <RIFMiniBar label="Emotional" value={0.92} color={colors.rose} frame={frame} delay={65} />
          <RIFMiniBar label="Creative" value={0.88} color={colors.accent} frame={frame} delay={72} />
          <RIFMiniBar label="Growth" value={0.85} color={colors.olive} frame={frame} delay={79} />
          <RIFMiniBar label="Loyalty" value={0.94} color={colors.gold} frame={frame} delay={86} />
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 24, width: "100%", opacity: interpolate(frame, [80, 105], [0, 1], { extrapolateRight: "clamp" }) }}>
          <div style={{ flex: 1, padding: "14px", borderRadius: 28, background: colors.gradientGold, textAlign: "center", boxShadow: "0 8px 32px rgba(166,147,95,0.2)" }}>
            <div style={{ color: colors.bgCard, fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>Start Conversation</div>
          </div>
          <div style={{ padding: "14px 20px", borderRadius: 28, border: `1.5px solid ${colors.borderBright}`, textAlign: "center" }}>
            <div style={{ color: colors.gold, fontSize: 13, fontWeight: 600 }}>Plan a Date</div>
          </div>
        </div>
      </div>
    </div>
  );
};
