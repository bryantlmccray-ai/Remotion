import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { PhoneMockup } from "../components/PhoneMockup";
import { GoldDivider } from "../components/GoldDivider";
import { SPRING, ease } from "../utils/animations";

/**
 * SCENE 3 — THE STATEMENT + PHONE ENTERS (0:09–0:15)
 *
 * "WEEKLY WELLNESS" stencils in. Copy arrives with weight.
 * Then THE PHONE enters from off-screen right, gliding on a luxury arc
 * with a micro-bounce (the Pixar ball). Screen blooms to life.
 * The UI builds itself inside the phone in sequence.
 */

const PhoneScreen: React.FC = () => {
  const frame = useCurrentFrame();

  // UI elements build themselves in sequence
  const heroOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const heroScale = interpolate(frame, [0, 20], [0.9, 1], { extrapolateRight: "clamp", easing: ease.outCubic });
  const ctaSlide = interpolate(frame, [15, 35], [40, 0], { extrapolateRight: "clamp", easing: ease.outQuart });
  const ctaOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" });
  const statsOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });

  // Scroll the phone content gently
  const scrollY = interpolate(frame, [50, 150], [0, -60], { extrapolateRight: "clamp", easing: ease.inOutSine });

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
        <div
          style={{
            textAlign: "center",
            marginBottom: 20,
            opacity: heroOpacity,
            transform: `scale(${heroScale})`,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontFamily: fonts.serif,
              fontWeight: 700,
              background: colors.gradientGold,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2,
              marginBottom: 8,
            }}
          >
            Transform Your
            <br />
            Relationship
          </div>
          <div style={{ fontSize: 10, color: colors.textSecondary, lineHeight: 1.5 }}>
            Science-backed tools for deeper connection
          </div>
        </div>

        {/* CTA Button — slides up */}
        <div
          style={{
            background: colors.gradientGold,
            borderRadius: 28,
            padding: "12px 24px",
            textAlign: "center",
            marginBottom: 16,
            boxShadow: "0 8px 32px rgba(201,168,76,0.3)",
            opacity: ctaOpacity,
            transform: `translateY(${ctaSlide}px)`,
          }}
        >
          <div style={{ color: "#0A0A0F", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>Begin Your Journey</div>
        </div>

        {/* Stats — fade in with stagger */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16, opacity: statsOpacity }}>
          {[["50K+", "Couples"], ["4.9\u2605", "Rating"], ["95%", "Success"]].map(([num, label], i) => {
            const staggerOp = interpolate(frame, [35 + i * 6, 50 + i * 6], [0, 1], { extrapolateRight: "clamp" });
            return (
              <div
                key={label}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "10px 6px",
                  borderRadius: 12,
                  background: colors.bgGlass,
                  border: `1px solid ${colors.border}`,
                  opacity: staggerOp,
                }}
              >
                <div
                  style={{
                    fontSize: 15,
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
            );
          })}
        </div>

        {/* Feature previews — cascade in */}
        {[
          { icon: "\u2764\uFE0F", title: "Weekly Check-ins", desc: "Sync on what matters most" },
          { icon: "\u2728", title: "AI Insights", desc: "Personalized guidance" },
          { icon: "\uD83C\uDF31", title: "Growth Tracking", desc: "See your progress together" },
        ].map(({ icon, title, desc }, i) => {
          const fOpacity = interpolate(frame, [45 + i * 10, 65 + i * 10], [0, 1], { extrapolateRight: "clamp" });
          const fX = interpolate(frame, [45 + i * 10, 65 + i * 10], [20, 0], { extrapolateRight: "clamp", easing: ease.outCubic });
          return (
            <div
              key={title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 12,
                background: colors.bgGlass,
                border: `1px solid ${colors.border}`,
                marginBottom: 6,
                opacity: fOpacity,
                transform: `translateX(${fX}px)`,
              }}
            >
              <span style={{ fontSize: 18 }}>{icon}</span>
              <div>
                <div style={{ fontSize: 11, color: colors.textPrimary, fontWeight: 600 }}>{title}</div>
                <div style={{ fontSize: 9, color: colors.textSecondary }}>{desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Scene03_LandingPage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === LEFT COPY — arrives with intention ===
  const labelOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const labelY = interpolate(frame, [0, 20], [15, 0], { extrapolateRight: "clamp", easing: ease.outCubic });

  // "Cultivate a" drops in on a downward arc
  const headlineProgress = interpolate(frame, [10, 40], [0, 1], {
    extrapolateRight: "clamp",
    easing: ease.outQuart,
  });
  const headlineY = (1 - headlineProgress) * 35;

  // "thriving" rises with the rose glow
  const accentProgress = interpolate(frame, [25, 50], [0, 1], {
    extrapolateRight: "clamp",
    easing: ease.outCubic,
  });

  // Body copy — focus pull (blur to sharp)
  const bodyBlur = interpolate(frame, [35, 55], [6, 0], { extrapolateRight: "clamp" });
  const bodyOpacity = interpolate(frame, [35, 55], [0, 1], { extrapolateRight: "clamp" });

  // === PHONE ENTERS — THE BIG FIX ===
  // Enters from off-screen right, gliding on a luxury arc
  const phoneEnterStart = 30;
  const phoneSlide = spring({
    frame: frame - phoneEnterStart,
    fps,
    config: SPRING.bounce, // micro-bounce like Pixar ball
  });
  const phoneX = interpolate(phoneSlide, [0, 1], [350, 0]);
  const phoneY = interpolate(phoneSlide, [0, 0.5, 1], [30, -10, 0]); // arc motion
  const phoneOpacity = interpolate(frame, [phoneEnterStart, phoneEnterStart + 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  // Subtle rotation as it settles
  const phoneRotation = interpolate(phoneSlide, [0, 0.7, 1], [3, -1, 0]);

  // Feature bullets on left — staggered
  const features = [
    { icon: "\uD83D\uDC9E", title: "Weekly Wellness Check-ins", desc: "Stay synced on emotional health" },
    { icon: "\uD83E\uDDE0", title: "AI Relationship Coach", desc: "Personalized guidance for your bond" },
    { icon: "\uD83C\uDF31", title: "Growth & Discovery", desc: "Track progress, celebrate milestones" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: colors.gradientBg,
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ParticleField intensity={0.7} />
      <GlowOrb x="15%" y="50%" size={550} color="rgba(201,168,76,0.22)" delay={0} />
      <GlowOrb x="82%" y="35%" size={450} color="rgba(232,160,160,0.18)" delay={45} />
      <GlowOrb x="60%" y="80%" size={300} color="rgba(155,142,196,0.12)" delay={20} />

      {/* === LEFT CONTENT === */}
      <div style={{ flex: 1, padding: "0 80px", maxWidth: 580 }}>
        {/* Category label */}
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            letterSpacing: 6,
            color: colors.gold,
            textTransform: "uppercase",
            marginBottom: 24,
            opacity: labelOpacity,
            transform: `translateY(${labelY}px)`,
          }}
        >
          Relationship Wellness Platform
        </div>

        {/* Headline */}
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 58,
            fontWeight: 300,
            lineHeight: 1.12,
            color: colors.textPrimary,
            marginBottom: 28,
            opacity: headlineProgress,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          Cultivate a{" "}
          <span
            style={{
              background: colors.gradientGold,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: accentProgress,
              display: "inline-block",
              transform: `translateY(${(1 - accentProgress) * 15}px)`,
            }}
          >
            thriving
          </span>
          <br />
          relationship
        </div>

        <GoldDivider width="90px" startFrame={40} />

        {/* Body copy — blur to sharp, like camera deciding to focus */}
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 16,
            color: colors.textSecondary,
            lineHeight: 1.75,
            marginTop: 24,
            marginBottom: 40,
            maxWidth: 400,
            opacity: bodyOpacity,
            filter: `blur(${bodyBlur}px)`,
          }}
        >
          Science-backed tools and AI-powered insights to help couples build
          deeper connection, resolve conflict gracefully, and grow together.
        </div>

        {/* Feature bullets — cascade */}
        {features.map(({ icon, title, desc }, i) => {
          const fStart = 55 + i * 12;
          const fProgress = spring({ frame: frame - fStart, fps, config: SPRING.velvet });
          const fOpacity = interpolate(frame, [fStart, fStart + 15], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={title}
              style={{
                opacity: fOpacity,
                transform: `translateX(${(1 - fProgress) * 30}px)`,
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                padding: "14px 18px",
                borderRadius: 16,
                background: colors.bgGlass,
                border: `1px solid ${colors.border}`,
                backdropFilter: "blur(10px)",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: colors.bgGlassWarm,
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
                <div style={{ fontFamily: fonts.serif, fontSize: 14, color: colors.textPrimary, fontWeight: 600, marginBottom: 3 }}>{title}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textSecondary, lineHeight: 1.4 }}>{desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* === PHONE — THE CO-STAR === */}
      <div
        style={{
          padding: "40px 80px 40px 40px",
          opacity: phoneOpacity,
          transform: `translateX(${phoneX}px) translateY(${phoneY}px) rotate(${phoneRotation}deg)`,
          transformOrigin: "center center",
        }}
      >
        <PhoneMockup scale={1.05} screenBloom bloomDelay={15}>
          <PhoneScreen />
        </PhoneMockup>
      </div>
    </div>
  );
};
