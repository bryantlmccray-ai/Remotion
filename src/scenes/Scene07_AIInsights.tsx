import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { PhoneMockup } from "../components/PhoneMockup";

const TypingText: React.FC<{ text: string; startFrame: number }> = ({ text, startFrame }) => {
  const frame = useCurrentFrame();
  const charCount = Math.floor(interpolate(frame, [startFrame, startFrame + text.length * 1.8], [0, text.length], { extrapolateRight: "clamp" }));
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
  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [delay, delay + 20], [20, 0], { extrapolateRight: "clamp" });

  const trendColor = trend === "up" ? "#4ade80" : trend === "down" ? "#f87171" : colors.gold;
  const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        padding: "12px",
        borderRadius: 12,
        background: colors.bgGlass,
        border: `1px solid ${colors.border}`,
        marginBottom: 8,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 16 }}>{emoji}</span>
          <div style={{ fontSize: 10, color: colors.textSecondary, letterSpacing: 1, textTransform: "uppercase" }}>{category}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 10, color: trendColor, fontWeight: 700 }}>{trendIcon}</span>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: score >= 0.8 ? colors.gold : score >= 0.6 ? colors.rose : colors.textSecondary,
            }}
          >
            {Math.round(score * 100)}%
          </div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: colors.textPrimary, lineHeight: 1.4 }}>{insight}</div>
    </div>
  );
};

const PhoneAIScreen: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ padding: "60px 16px 16px", fontFamily: fonts.sans, background: colors.bg, height: "100%", overflow: "hidden" }}>
      {/* AI Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
          padding: "10px 14px",
          borderRadius: 14,
          background: "rgba(155,142,196,0.1)",
          border: `1px solid rgba(155,142,196,0.3)`,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #9B8EC4, #C4BAE8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          ✨
        </div>
        <div>
          <div style={{ fontSize: 12, color: colors.textPrimary, fontWeight: 600, fontFamily: fonts.serif }}>Monark AI Coach</div>
          <div style={{ fontSize: 9, color: colors.textSecondary }}>Personalized for Alexandra & James</div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#4ade80",
            boxShadow: "0 0 8px #4ade80",
          }}
        />
      </div>

      {/* AI Message */}
      <div
        style={{
          padding: "12px 14px",
          borderRadius: 14,
          background: "rgba(155,142,196,0.08)",
          border: `1px solid rgba(155,142,196,0.2)`,
          marginBottom: 14,
          fontSize: 11,
          color: colors.textPrimary,
          lineHeight: 1.5,
        }}
      >
        <div style={{ color: colors.olive, fontSize: 9, letterSpacing: 1, marginBottom: 6, textTransform: "uppercase" }}>
          Weekly Analysis
        </div>
        {frame > 10 && (
          <TypingText
            startFrame={10}
            text="Great week, Alexandra! Your communication score jumped 12%. I notice you and James had fewer conflicts — consider scheduling a tech-free evening to deepen connection."
          />
        )}
        {frame > 40 && <span style={{ opacity: frame % 30 < 15 ? 1 : 0 }}>|</span>}
      </div>

      {/* Insights */}
      <div style={{ fontSize: 9, color: colors.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
        Key Insights
      </div>
      <InsightCard
        emoji="💬"
        category="Communication"
        insight="Active listening scores up 18% this week"
        score={0.88}
        trend="up"
        delay={50}
      />
      <InsightCard
        emoji="❤️"
        category="Intimacy"
        insight="Schedule intentional quality time this weekend"
        score={0.71}
        trend="stable"
        delay={65}
      />
      <InsightCard
        emoji="🌱"
        category="Growth"
        insight="Both showing strong commitment to improvement"
        score={0.92}
        trend="up"
        delay={80}
      />
    </div>
  );
};

export const Scene07_AIInsights: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const phoneSlide = spring({ frame, fps, config: { damping: 70, stiffness: 120, mass: 0.9 } });
  const phoneX = interpolate(phoneSlide, [0, 1], [200, 0]);

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
      <GlowOrb x="30%" y="40%" size={600} color="rgba(155,142,196,0.25)" delay={0} />
      <GlowOrb x="80%" y="65%" size={400} color="rgba(201,168,76,0.2)" delay={50} />

      {/* Left content */}
      <div style={{ maxWidth: 430 }}>
        {[
          { text: "AI-Powered", color: colors.oliveLight, size: 12, spacing: 5, delay: 5 },
        ].map(({ text, color, size, spacing, delay }) => (
          <div
            key={text}
            style={{
              fontFamily: fonts.sans,
              fontSize: size,
              letterSpacing: spacing,
              color,
              textTransform: "uppercase",
              marginBottom: 20,
              opacity: interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            {text}
          </div>
        ))}

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
            background: "linear-gradient(90deg, #9B8EC4, #C4BAE8)",
            marginBottom: 24,
          }}
        />

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
          Monark's AI engine analyzes your weekly check-ins, identifies patterns, and delivers personalized coaching that adapts to the unique rhythm of your relationship.
        </div>

        {/* AI Capabilities */}
        {[
          { icon: "🔍", title: "Pattern Recognition", desc: "Spots trends before they become issues" },
          { icon: "💬", title: "Conversational Coaching", desc: "Ask questions, get instant guidance" },
          { icon: "🎯", title: "Goal Alignment", desc: "Keeps both partners moving toward shared vision" },
          { icon: "🔮", title: "Predictive Wellness", desc: "Forecasts challenges before they arise" },
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
      <div style={{ transform: `translateX(${phoneX}px)` }}>
        <PhoneMockup scale={1}>
          <PhoneAIScreen />
        </PhoneMockup>
      </div>
    </div>
  );
};
