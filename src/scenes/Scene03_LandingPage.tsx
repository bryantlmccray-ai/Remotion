import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { LuxuryBackground } from "../components/LuxuryBackground";
import { PhoneMockup } from "../components/PhoneMockup";

const Feature: React.FC<{ icon: string; title: string; desc: string; delay: number }> = ({ icon, title, desc, delay }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 25], [0, 1], { extrapolateRight: "clamp" });
  const x = interpolate(frame, [delay, delay + 25], [-30, 0], {
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  const glowPulse = 0.1 + 0.05 * Math.sin(frame * 0.05 + delay);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
        padding: "18px 22px",
        borderRadius: 18,
        background: `linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(155,142,196,0.03) 100%)`,
        border: `1px solid rgba(201,168,76,${glowPulse + 0.1})`,
        backdropFilter: "blur(12px)",
        marginBottom: 14,
        boxShadow: `0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 14,
          background: `linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))`,
          border: `1px solid ${colors.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          flexShrink: 0,
          boxShadow: `0 0 20px rgba(201,168,76,0.1)`,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: fonts.serif, fontSize: 16, color: colors.textPrimary, fontWeight: 600, marginBottom: 4 }}>{title}</div>
        <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textSecondary, lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  );
};

const PhoneScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const scrollY = interpolate(frame, [20, 140], [0, -100], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(180deg, #0D0D14 0%, #0A0A0F 100%)`,
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
              background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight}, ${colors.rose})`,
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
            padding: "14px 24px",
            textAlign: "center",
            marginBottom: 20,
            boxShadow: `0 8px 32px rgba(201,168,76,0.4), 0 0 60px rgba(201,168,76,0.15)`,
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
                padding: "14px 8px",
                borderRadius: 14,
                background: `linear-gradient(145deg, rgba(201,168,76,0.08), rgba(155,142,196,0.04))`,
                border: `1px solid ${colors.border}`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04)`,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  background: colors.gradientGold,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {num}
              </div>
              <div style={{ fontSize: 9, color: colors.textSecondary, marginTop: 3 }}>{label}</div>
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
              padding: "12px 14px",
              borderRadius: 14,
              background: `linear-gradient(135deg, rgba(201,168,76,0.06), rgba(155,142,196,0.03))`,
              border: `1px solid ${colors.border}`,
              marginBottom: 8,
              boxShadow: `0 2px 12px rgba(0,0,0,0.3)`,
            }}
          >
            <span style={{ fontSize: 22 }}>{emoji}</span>
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

  // Decorative line that traces the divider area
  const dividerWidth = interpolate(frame, [50, 80], [0, 100], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: colors.bg,
        display: "flex",
        alignItems: "center",
        opacity: fadeIn,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <LuxuryBackground variant="default" />

      {/* Decorative vertical line on the split */}
      <div
        style={{
          position: "absolute",
          left: "55%",
          top: "10%",
          width: 1,
          height: "80%",
          background: `linear-gradient(180deg, transparent, rgba(201,168,76,0.15), rgba(232,160,160,0.1), transparent)`,
          pointerEvents: "none",
        }}
      />

      {/* Left content */}
      <div
        style={{
          flex: 1,
          padding: "0 80px",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 13,
            letterSpacing: 6,
            color: colors.gold,
            textTransform: "uppercase",
            marginBottom: 24,
            textShadow: `0 0 20px rgba(201,168,76,0.3)`,
          }}
        >
          Relationship Wellness Platform
        </div>

        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 58,
            fontWeight: 300,
            lineHeight: 1.12,
            color: colors.textPrimary,
            marginBottom: 28,
          }}
        >
          Cultivate a{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight}, ${colors.rose})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            thriving
          </span>{" "}
          <br />
          relationship
        </div>

        {/* Animated gold divider */}
        <div
          style={{
            width: dividerWidth,
            height: 2,
            background: `linear-gradient(90deg, ${colors.gold}, ${colors.rose}, transparent)`,
            borderRadius: 2,
            boxShadow: `0 0 12px rgba(201,168,76,0.3)`,
          }}
        />

        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 16,
            color: colors.textSecondary,
            lineHeight: 1.7,
            marginTop: 28,
            marginBottom: 40,
            maxWidth: 400,
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
          zIndex: 2,
        }}
      >
        <PhoneMockup scale={1.05}>
          <PhoneScreen />
        </PhoneMockup>
      </div>
    </div>
  );
};
