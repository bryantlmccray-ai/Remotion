import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { PhoneMockup } from "../components/PhoneMockup";

const PhoneLandingScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const scrollY = interpolate(frame, [30, 150], [0, -60], { extrapolateRight: "clamp" });

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
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              fontSize: 26,
              fontFamily: fonts.serif,
              fontWeight: 700,
              background: colors.gradientGold,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2,
              marginBottom: 8,
            }}
          >
            Meet People Who Get You
          </div>
          <div style={{ fontSize: 11, color: colors.textSecondary, lineHeight: 1.5 }}>
            Depth-first matching powered by behavioral science
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          style={{
            background: colors.gradientGold,
            borderRadius: 30,
            padding: "13px 24px",
            textAlign: "center",
            marginBottom: 10,
            boxShadow: "0 8px 32px rgba(201,168,76,0.35)",
          }}
        >
          <div style={{ color: "#0A0A0F", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
            Start Your Journey
          </div>
        </div>
        <div
          style={{
            borderRadius: 30,
            padding: "12px 24px",
            textAlign: "center",
            marginBottom: 20,
            border: `1.5px solid ${colors.borderBright}`,
            background: "transparent",
          }}
        >
          <div style={{ color: colors.gold, fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>
            Explore the App
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          {[
            ["92%", "Match Rate"],
            ["4.9", "Rating"],
            ["15K+", "Members"],
          ].map(([num, label]) => (
            <div
              key={label}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "12px 6px",
                borderRadius: 12,
                background: colors.bgGlass,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  background: colors.gradientGold,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {num}
              </div>
              <div style={{ fontSize: 8, color: colors.textSecondary, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Feature previews */}
        {[
          { icon: "🧬", title: "RIF Assessment", desc: "Deep personality & values profiling" },
          { icon: "💬", title: "Live Chat", desc: "Real conversations, not swiping" },
          { icon: "📅", title: "Curated Dates", desc: "AI-planned experiences together" },
        ].map(({ icon, title, desc }) => (
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
            <span style={{ fontSize: 20 }}>{icon}</span>
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

export const Scene02_Landing: React.FC = () => {
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
          Depth-First Dating
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
          Where{" "}
          <span
            style={{
              background: colors.gradientGold,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            connection
          </span>{" "}
          <br />
          runs deep
        </div>

        <div
          style={{
            width: 80,
            height: 1,
            background: colors.gradientGold,
            marginBottom: 24,
          }}
        />

        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 16,
            color: colors.textSecondary,
            lineHeight: 1.7,
            marginBottom: 40,
            maxWidth: 380,
          }}
        >
          MonArk uses the RIF behavioral framework to match you with people who
          share your values, communication style, and vision for the future.
        </div>

        {/* Feature bullets */}
        {[
          { icon: "🧬", title: "RIF Intelligence Framework", desc: "Map your relational DNA across 12 dimensions", delay: 50 },
          { icon: "🎯", title: "Curated Matches", desc: "Your Top 3 each week — quality over quantity", delay: 65 },
          { icon: "💎", title: "Luxury Experiences", desc: "AI-crafted date itineraries in your city", delay: 80 },
        ].map(({ icon, title, desc, delay }) => {
          const opacity = interpolate(frame, [delay, delay + 25], [0, 1], { extrapolateRight: "clamp" });
          const y = interpolate(frame, [delay, delay + 25], [20, 0], { extrapolateRight: "clamp" });
          return (
            <div
              key={title}
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                padding: "14px 18px",
                borderRadius: 16,
                background: colors.bgGlass,
                border: `1px solid ${colors.border}`,
                backdropFilter: "blur(10px)",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
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
                <div style={{ fontFamily: fonts.serif, fontSize: 15, color: colors.textPrimary, fontWeight: 600, marginBottom: 3 }}>{title}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textSecondary, lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          );
        })}
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
          <PhoneLandingScreen />
        </PhoneMockup>
      </div>
    </div>
  );
};
