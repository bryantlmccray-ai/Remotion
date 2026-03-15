import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { PhoneMockup } from "../components/PhoneMockup";
import { GoldDivider } from "../components/GoldDivider";

const Feature: React.FC<{ icon: string; title: string; desc: string; delay: number }> = ({ icon, title, desc, delay }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 25], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [delay, delay + 25], [30, 0], {
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
        padding: "16px 20px",
        borderRadius: 16,
        background: colors.bgGlass,
        border: `1px solid ${colors.border}`,
        backdropFilter: "blur(10px)",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: "rgba(201,168,76,0.12)",
          border: `1px solid ${colors.border}`,
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
        <div style={{ fontFamily: fonts.serif, fontSize: 15, color: colors.textPrimary, fontWeight: 600, marginBottom: 4 }}>{title}</div>
        <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textSecondary, lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  );
};

const PhoneScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const scrollY = interpolate(frame, [20, 120], [0, -80], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: colors.bg,
        display: "flex",
        flexDirection: "column",
        padding: "60px 20px 20px",
        fontFamily: fonts.sans,
      }}
    >
      <div style={{ transform: `translateY(${scrollY}px)` }}>
        {/* Hero text */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              fontSize: 24,
              fontFamily: fonts.serif,
              fontWeight: 700,
              background: colors.gradientGold,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2,
              marginBottom: 8,
            }}
          >
            Transform Your Relationship
          </div>
          <div style={{ fontSize: 11, color: colors.textSecondary, lineHeight: 1.5 }}>
            Science-backed tools for deeper connection
          </div>
        </div>

        {/* CTA Button */}
        <div
          style={{
            background: colors.gradientGold,
            borderRadius: 30,
            padding: "12px 24px",
            textAlign: "center",
            marginBottom: 20,
            boxShadow: "0 8px 32px rgba(201,168,76,0.3)",
          }}
        >
          <div style={{ color: "#0A0A0F", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>Begin Your Journey</div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {[["50K+", "Couples"], ["4.9★", "Rating"], ["95%", "Success"]].map(([num, label]) => (
            <div
              key={label}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "12px 8px",
                borderRadius: 12,
                background: colors.bgGlass,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  background: colors.gradientGold,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {num}
              </div>
              <div style={{ fontSize: 9, color: colors.textSecondary, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Feature previews */}
        {[
          { emoji: "💞", title: "Weekly Check-ins", desc: "Sync on what matters most" },
          { emoji: "🧠", title: "AI Insights", desc: "Personalized guidance for your bond" },
          { emoji: "🌱", title: "Growth Tracking", desc: "See your progress together" },
        ].map(({ emoji, title, desc }) => (
          <div
            key={title}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 14px",
              borderRadius: 12,
              background: colors.bgGlass,
              border: `1px solid ${colors.border}`,
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 20 }}>{emoji}</span>
            <div>
              <div style={{ fontSize: 12, color: colors.textPrimary, fontWeight: 600 }}>{title}</div>
              <div style={{ fontSize: 10, color: colors.textSecondary }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Scene03_LandingPage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const phoneScale = spring({ frame, fps, config: { damping: 70, stiffness: 120, mass: 1 } });
  const phoneX = interpolate(phoneScale, [0, 1], [-200, 0]);

  const titleOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [20, 50], [40, 0], {
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
        alignItems: "center",
        opacity: fadeIn,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ParticleField />
      <GlowOrb x="20%" y="50%" size={500} color="rgba(201,168,76,0.25)" delay={0} />
      <GlowOrb x="80%" y="30%" size={400} color="rgba(232,160,160,0.2)" delay={45} />

      {/* Left content */}
      <div
        style={{
          flex: 1,
          padding: "0 80px",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 13,
            letterSpacing: 5,
            color: colors.gold,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Relationship Wellness Platform
        </div>

        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 56,
            fontWeight: 300,
            lineHeight: 1.15,
            color: colors.textPrimary,
            marginBottom: 24,
          }}
        >
          Cultivate a{" "}
          <span
            style={{
              background: colors.gradientGold,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            thriving
          </span>{" "}
          <br />
          relationship
        </div>

        <GoldDivider width="80px" />

        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 16,
            color: colors.textSecondary,
            lineHeight: 1.7,
            marginTop: 24,
            marginBottom: 40,
            maxWidth: 380,
          }}
        >
          Science-backed tools and AI-powered insights to help couples build
          deeper connection, resolve conflict gracefully, and grow together.
        </div>

        <Feature icon="💞" title="Weekly Wellness Check-ins" desc="Stay synced on emotional health, needs & desires" delay={50} />
        <Feature icon="🧠" title="AI Relationship Coach" desc="Personalized guidance tailored to your unique bond" delay={65} />
        <Feature icon="🌱" title="Growth & Discovery" desc="Track progress and celebrate milestones together" delay={80} />
      </div>

      {/* Right phone mockup */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 80px 40px 40px",
          transform: `translateX(${phoneX}px) scale(${phoneScale})`,
        }}
      >
        <PhoneMockup scale={1}>
          <PhoneScreen />
        </PhoneMockup>
      </div>
    </div>
  );
};
