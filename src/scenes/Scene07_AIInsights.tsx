import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { PhoneMockup } from "../components/PhoneMockup";
import { SPRING, ease, typewriter } from "../utils/animations";

/**
 * SCENE 7 — AI INSIGHTS (0:40–0:47)
 *
 * Neural network energy. The AI coach types its analysis in real-time.
 * Insight cards cascade in with trend indicators.
 * The lavender accent color dominates — this is the intelligence layer.
 * Phone slides in from right with 3D perspective.
 */

const TypingText: React.FC<{ text: string; startFrame: number; speed?: number }> = ({
  text,
  startFrame,
  speed = 0.7,
}) => {
  const frame = useCurrentFrame();
  const charCount = typewriter(frame, startFrame, text.length, speed);
  return <span>{text.slice(0, charCount)}</span>;
};

const InsightCard: React.FC<{
  emoji: string;
  category: string;
  insight: string;
  score: number;
  trend: "up" | "down" | "stable";
  delay: number;
}> = ({ emoji, category, insight, score, trend, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardProgress = spring({ frame: frame - delay, fps, config: SPRING.elastic });
  const opacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateRight: "clamp" });

  const trendColor = trend === "up" ? colors.emerald : trend === "down" ? "#f87171" : colors.gold;
  const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${(1 - cardProgress) * 15}px) scale(${0.95 + cardProgress * 0.05})`,
        padding: "10px 12px",
        borderRadius: 12,
        background: colors.bgGlass,
        border: `1px solid ${colors.border}`,
        marginBottom: 7,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 14 }}>{emoji}</span>
          <div style={{ fontSize: 9, color: colors.textSecondary, letterSpacing: 1, textTransform: "uppercase" }}>{category}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          <span style={{ fontSize: 9, color: trendColor, fontWeight: 700 }}>{trendIcon}</span>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: score >= 0.8 ? colors.gold : score >= 0.6 ? colors.rose : colors.textSecondary,
            }}
          >
            {Math.round(score * 100)}%
          </div>
        </div>
      </div>
      <div style={{ fontSize: 10, color: colors.textPrimary, lineHeight: 1.4 }}>{insight}</div>
    </div>
  );
};

const PhoneAIScreen: React.FC = () => {
  const frame = useCurrentFrame();

  // AI typing cursor blink
  const cursorOpacity = frame > 15 && frame < 80 ? (frame % 25 < 12 ? 1 : 0) : 0;

  return (
    <div style={{ padding: "60px 16px 16px", fontFamily: fonts.sans, background: colors.bg, height: "100%", overflow: "hidden" }}>
      {/* AI Coach header — neural glow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 14,
          padding: "10px 12px",
          borderRadius: 14,
          background: "rgba(155,142,196,0.08)",
          border: `1px solid rgba(155,142,196,0.25)`,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: colors.gradientLavender,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            flexShrink: 0,
            boxShadow: `0 0 12px rgba(155,142,196,0.3)`,
          }}
        >
          ✨
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: colors.textPrimary, fontWeight: 600, fontFamily: fonts.serif }}>Monark AI Coach</div>
          <div style={{ fontSize: 8, color: colors.textSecondary }}>Personalized for Alexandra & James</div>
        </div>
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: colors.emerald,
            boxShadow: `0 0 8px ${colors.emerald}`,
          }}
        />
      </div>

      {/* AI Message — types itself */}
      <div
        style={{
          padding: "11px 12px",
          borderRadius: 14,
          background: "rgba(155,142,196,0.06)",
          border: `1px solid rgba(155,142,196,0.15)`,
          marginBottom: 12,
          fontSize: 10,
          color: colors.textPrimary,
          lineHeight: 1.5,
        }}
      >
        <div style={{ color: colors.lavender, fontSize: 8, letterSpacing: 1.5, marginBottom: 5, textTransform: "uppercase" }}>
          Weekly Analysis
        </div>
        {frame > 10 && (
          <TypingText
            startFrame={10}
            speed={0.6}
            text="Great week, Alexandra! Your communication score jumped 12%. I notice fewer conflicts — consider scheduling a tech-free evening to deepen connection."
          />
        )}
        <span style={{ opacity: cursorOpacity, color: colors.lavender }}>|</span>
      </div>

      {/* Insight cards — cascade in */}
      <div style={{ fontSize: 8, color: colors.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
        Key Insights
      </div>
      <InsightCard
        emoji="💬"
        category="Communication"
        insight="Active listening scores up 18% this week"
        score={0.88}
        trend="up"
        delay={45}
      />
      <InsightCard
        emoji="❤️"
        category="Intimacy"
        insight="Schedule intentional quality time this weekend"
        score={0.71}
        trend="stable"
        delay={58}
      />
      <InsightCard
        emoji="🌱"
        category="Growth"
        insight="Both showing strong commitment to improvement"
        score={0.92}
        trend="up"
        delay={71}
      />
    </div>
  );
};

export const Scene07_AIInsights: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // Phone enters with 3D perspective — depth
  const phoneProgress = spring({ frame: frame - 5, fps, config: SPRING.heavy });
  const phoneX = interpolate(phoneProgress, [0, 1], [250, 0]);
  const phoneRotateY = interpolate(phoneProgress, [0, 0.7, 1], [12, -2, 0]);
  const phoneFloat = 4 * Math.sin(frame * 0.03);

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
      <GlowOrb x="30%" y="40%" size={600} color="rgba(155,142,196,0.22)" delay={0} />
      <GlowOrb x="80%" y="65%" size={400} color="rgba(201,168,76,0.15)" delay={50} />

      {/* === LEFT CONTENT — lavender-themed === */}
      <div style={{ maxWidth: 440 }}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            letterSpacing: 6,
            color: colors.lavenderLight,
            textTransform: "uppercase",
            marginBottom: 22,
            opacity: interpolate(frame, [5, 25], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          AI-Powered
        </div>

        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 52,
            fontWeight: 300,
            lineHeight: 1.12,
            color: colors.textPrimary,
            marginBottom: 24,
            opacity: interpolate(frame, [10, 35], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [10, 35], [25, 0], { extrapolateRight: "clamp", easing: ease.outCubic })}px)`,
          }}
        >
          Your personal{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #9B8EC4, #C4BAE8, #E8C97A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            relationship
          </span>{" "}
          coach
        </div>

        <div
          style={{
            width: 80,
            height: 1,
            background: colors.gradientLavender,
            marginBottom: 24,
            boxShadow: `0 0 8px rgba(155,142,196,0.3)`,
          }}
        />

        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 15,
            color: colors.textSecondary,
            lineHeight: 1.7,
            marginBottom: 40,
            opacity: interpolate(frame, [30, 55], [0, 1], { extrapolateRight: "clamp" }),
            filter: `blur(${interpolate(frame, [30, 55], [4, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          Monark's AI analyzes your weekly check-ins, identifies patterns, and
          delivers personalized coaching that adapts to the unique rhythm of your relationship.
        </div>

        {/* AI Capabilities */}
        {[
          { icon: "🔍", title: "Pattern Recognition", desc: "Spots trends before they become issues" },
          { icon: "💬", title: "Conversational AI", desc: "Ask questions, get instant guidance" },
          { icon: "🎯", title: "Goal Alignment", desc: "Keeps partners moving toward shared vision" },
          { icon: "🔮", title: "Predictive Wellness", desc: "Forecasts challenges before they arise" },
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

      {/* === RIGHT: PHONE with 3D perspective === */}
      <div
        style={{
          transform: `perspective(1200px) translateX(${phoneX}px) translateY(${phoneFloat}px) rotateY(${phoneRotateY}deg)`,
          transformOrigin: "center center",
        }}
      >
        <PhoneMockup scale={1.05} screenBloom bloomDelay={10}>
          <PhoneAIScreen />
        </PhoneMockup>
      </div>
    </div>
  );
};
