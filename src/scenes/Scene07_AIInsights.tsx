import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { LuxuryBackground } from "../components/LuxuryBackground";
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
        padding: "13px",
        borderRadius: 14,
        background: `linear-gradient(135deg, rgba(155,142,196,0.06), rgba(201,168,76,0.03))`,
        border: `1px solid rgba(155,142,196,0.12)`,
        marginBottom: 8,
        boxShadow: `0 4px 16px rgba(0,0,0,0.2)`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 16 }}>{emoji}</span>
          <div style={{ fontSize: 10, color: colors.lavender, letterSpacing: 1, textTransform: "uppercase" }}>{category}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 10, color: trendColor, fontWeight: 700 }}>{trendIcon}</span>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              background: score >= 0.8 ? colors.gradientGold : "none",
              color: score >= 0.8 ? undefined : score >= 0.6 ? colors.rose : colors.textSecondary,
              WebkitBackgroundClip: score >= 0.8 ? "text" : undefined,
              WebkitTextFillColor: score >= 0.8 ? "transparent" : undefined,
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
    <div style={{ padding: "60px 16px 16px", fontFamily: fonts.sans, background: `linear-gradient(180deg, #0D0D14, #0A0A0F)`, height: "100%", overflow: "hidden" }}>
      {/* AI Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
          padding: "12px 14px",
          borderRadius: 16,
          background: `linear-gradient(135deg, rgba(155,142,196,0.12), rgba(155,142,196,0.04))`,
          border: `1px solid rgba(155,142,196,0.25)`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 20px rgba(155,142,196,0.05)`,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${colors.lavender}, ${colors.lavenderLight})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            flexShrink: 0,
            boxShadow: `0 0 16px rgba(155,142,196,0.3)`,
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
          padding: "14px 16px",
          borderRadius: 16,
          background: `linear-gradient(135deg, rgba(155,142,196,0.1), rgba(155,142,196,0.03))`,
          border: `1px solid rgba(155,142,196,0.15)`,
          marginBottom: 14,
          fontSize: 11,
          color: colors.textPrimary,
          lineHeight: 1.5,
          boxShadow: `0 4px 16px rgba(0,0,0,0.2)`,
        }}
      >
        <div style={{ color: colors.lavender, fontSize: 9, letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>
          Weekly Analysis
        </div>
        {frame > 10 && (
          <TypingText
            startFrame={10}
            text="Great week, Alexandra! Your communication score jumped 12%. I notice you and James had fewer conflicts — consider scheduling a tech-free evening to deepen connection."
          />
        )}
        {frame > 40 && <span style={{ opacity: frame % 30 < 15 ? 1 : 0, color: colors.lavender }}>|</span>}
      </div>

      {/* Insights */}
      <div style={{ fontSize: 9, color: colors.lavender, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
        Key Insights
      </div>
      <InsightCard emoji="💬" category="Communication" insight="Active listening scores up 18% this week" score={0.88} trend="up" delay={50} />
      <InsightCard emoji="❤️" category="Intimacy" insight="Schedule intentional quality time this weekend" score={0.71} trend="stable" delay={65} />
      <InsightCard emoji="🌱" category="Growth" insight="Both showing strong commitment to improvement" score={0.92} trend="up" delay={80} />
    </div>
  );
};

export const Scene07_AIInsights: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const phoneSlide = spring({ frame, fps, config: { damping: 70, stiffness: 120, mass: 0.9 } });
  const phoneX = interpolate(phoneSlide, [0, 1], [200, 0]);
  const phoneFloat = Math.sin(frame * 0.025) * 5;

  const dividerWidth = interpolate(frame, [45, 70], [0, 100], { extrapolateRight: "clamp" });

  // Animated AI "thinking" dots near the phone
  const dotPulse = (i: number) => 0.3 + 0.7 * Math.abs(Math.sin(frame * 0.08 + i * 0.8));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: colors.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 80px",
        opacity: fadeIn,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <LuxuryBackground variant="cool" />

      {/* AI neural network decorative lines */}
      <svg
        style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none", opacity: 0.05 }}
        viewBox="0 0 1920 1080"
      >
        {Array.from({ length: 6 }).map((_, i) => {
          const y1 = 180 + i * 140;
          const cp = 960 + Math.sin(frame * 0.01 + i) * 200;
          return (
            <path
              key={i}
              d={`M 0 ${y1} Q ${cp} ${y1 + 60 * Math.sin(frame * 0.02 + i)} 1920 ${y1}`}
              fill="none"
              stroke={i % 2 === 0 ? colors.lavender : colors.gold}
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {/* Left content */}
      <div style={{ maxWidth: 440, zIndex: 2 }}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            letterSpacing: 6,
            color: colors.lavenderLight,
            textTransform: "uppercase",
            marginBottom: 24,
            opacity: interpolate(frame, [5, 35], [0, 1], { extrapolateRight: "clamp" }),
            textShadow: `0 0 20px rgba(155,142,196,0.3)`,
          }}
        >
          AI-Powered
        </div>

        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 54,
            fontWeight: 300,
            lineHeight: 1.12,
            color: colors.textPrimary,
            marginBottom: 28,
            opacity: interpolate(frame, [15, 45], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [15, 45], [30, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          Your personal{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${colors.lavender}, ${colors.lavenderLight}, ${colors.goldLight})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            relationship
          </span>{" "}
          coach
        </div>

        {/* Animated divider */}
        <div
          style={{
            width: dividerWidth,
            height: 2,
            background: `linear-gradient(90deg, ${colors.lavender}, ${colors.gold}, transparent)`,
            marginBottom: 28,
            boxShadow: `0 0 10px rgba(155,142,196,0.3)`,
          }}
        />

        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 15,
            color: colors.textSecondary,
            lineHeight: 1.7,
            marginBottom: 44,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          Monark's AI engine analyzes your weekly check-ins, identifies patterns, and delivers personalized coaching that adapts to the unique rhythm of your relationship.
        </div>

        {/* AI Capabilities with glass cards */}
        {[
          { icon: "🔍", title: "Pattern Recognition", desc: "Spots trends before they become issues" },
          { icon: "💬", title: "Conversational Coaching", desc: "Ask questions, get instant guidance" },
          { icon: "🎯", title: "Goal Alignment", desc: "Keeps both partners toward shared vision" },
          { icon: "🔮", title: "Predictive Wellness", desc: "Forecasts challenges before they arise" },
        ].map(({ icon, title, desc }, i) => {
          const opacity = interpolate(frame, [40 + i * 10, 65 + i * 10], [0, 1], { extrapolateRight: "clamp" });
          const x = interpolate(frame, [40 + i * 10, 65 + i * 10], [-20, 0], { extrapolateRight: "clamp" });
          return (
            <div
              key={title}
              style={{
                opacity,
                transform: `translateX(${x}px) perspective(800px) rotateX(${1 + i * 0.5}deg) rotateY(${-2 + i}deg)`,
                display: "flex",
                gap: 14,
                marginBottom: 14,
                alignItems: "center",
                padding: "12px 16px",
                borderRadius: 14,
                background: `linear-gradient(135deg, rgba(155,142,196,0.06), rgba(201,168,76,0.03))`,
                border: `1px solid rgba(155,142,196,0.1)`,
                boxShadow: `0 4px 16px rgba(0,0,0,0.2)`,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: `linear-gradient(135deg, rgba(155,142,196,0.15), rgba(155,142,196,0.05))`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>
              <div>
                <div style={{ fontFamily: fonts.serif, fontSize: 14, color: colors.textPrimary, fontWeight: 600 }}>{title}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textSecondary }}>{desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI thinking dots between content and phone */}
      <div style={{ position: "absolute", right: 380, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 12, zIndex: 1, perspective: 600 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: colors.lavender,
              opacity: dotPulse(i),
              boxShadow: `0 0 10px ${colors.lavender}`,
              transform: `translateZ(${Math.sin(frame * 0.05 + i * 1.2) * 20}px)`,
            }}
          />
        ))}
      </div>

      {/* Right phone */}
      <div style={{ transform: `translateX(${phoneX}px) translateY(${phoneFloat}px)`, zIndex: 2 }}>
        <PhoneMockup scale={1.05} rotateY={8 + Math.sin(frame * 0.02) * 4} rotateX={-2 + Math.cos(frame * 0.015) * 3} perspective={900}>
          <PhoneAIScreen />
        </PhoneMockup>
      </div>
    </div>
  );
};
