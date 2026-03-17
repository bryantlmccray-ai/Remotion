import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { PhoneMockup } from "../components/PhoneMockup";
import { GoldDivider } from "../components/GoldDivider";
import { SPRING, ease } from "../utils/animations";

/**
 * SCENE 5 — PROFILE CREATION (0:25–0:32)
 *
 * Phone is on the left this time — variety keeps it alive.
 * Avatar ring rotates with a conic gradient. Fields fill themselves.
 * Right side has copy that slides in from the right.
 * Everything breathes.
 */

const AvatarRing: React.FC<{ frame: number }> = ({ frame }) => {
  const rotate = frame * 1.2;
  const pulseScale = 1 + 0.03 * Math.sin(frame * 0.1);

  return (
    <div style={{ position: "relative", width: 90, height: 90, margin: "0 auto 14px", transform: `scale(${pulseScale})` }}>
      {/* Rotating gradient ring */}
      <div
        style={{
          position: "absolute",
          inset: -4,
          borderRadius: "50%",
          background: `conic-gradient(from ${rotate}deg, ${colors.gold}, ${colors.rose}, ${colors.lavender}, ${colors.gold})`,
          padding: 3,
        }}
      >
        <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: colors.bgCard }} />
      </div>
      {/* Avatar */}
      <div
        style={{
          position: "absolute",
          inset: 3,
          borderRadius: "50%",
          background: `linear-gradient(135deg, #2a2040, #1a1530)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 34,
        }}
      >
        👩
      </div>
      {/* Edit badge — pops in */}
      <div
        style={{
          position: "absolute",
          bottom: 2,
          right: 2,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: colors.gradientGold,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.4), 0 0 10px rgba(201,168,76,0.2)",
        }}
      >
        ✏️
      </div>
    </div>
  );
};

const PhoneProfileScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fields = [
    { label: "Display Name", value: "Alexandra M.", filled: true },
    { label: "Age", value: "28", filled: true },
    { label: "Location", value: "New York, NY", filled: true },
    { label: "Relationship", value: "In a relationship", filled: true },
    { label: "Love Language", value: "Words of Affirmation", filled: frame > 35 },
    { label: "Short Bio", value: "Passionate about growth...", filled: frame > 60 },
  ];

  return (
    <div style={{ padding: "60px 16px 16px", fontFamily: fonts.sans, background: colors.bg, height: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <AvatarRing frame={frame} />
        <div style={{ fontFamily: fonts.serif, fontSize: 16, color: colors.textPrimary, fontWeight: 600 }}>Create Your Profile</div>
        <div style={{ fontSize: 9, color: colors.textSecondary, marginTop: 3 }}>Your personal sanctuary</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {fields.map(({ label, value, filled }, i) => {
          const fieldScale = spring({ frame: frame - (i * 6), fps, config: SPRING.velvet });
          const fillAnim = filled
            ? interpolate(frame, [i * 8 + 5, i * 8 + 20], [0, 1], { extrapolateRight: "clamp" })
            : 0;

          return (
            <div
              key={label}
              style={{
                opacity: fieldScale,
                transform: `translateY(${(1 - fieldScale) * 8}px)`,
                padding: "9px 12px",
                borderRadius: 10,
                border: `1px solid ${filled ? colors.borderBright : colors.border}`,
                background: filled ? colors.bgGlassWarm : colors.bgGlass,
              }}
            >
              <div style={{ fontSize: 8, color: colors.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 11, color: filled ? colors.textPrimary : colors.textMuted, opacity: fillAnim > 0 ? fillAnim : 0.3 }}>
                {filled ? value : "—"}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 14,
          background: colors.gradientGold,
          borderRadius: 22,
          padding: "11px",
          textAlign: "center",
          opacity: interpolate(frame, [55, 75], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [55, 75], [12, 0], { extrapolateRight: "clamp" })}px)`,
          boxShadow: "0 6px 24px rgba(201,168,76,0.25)",
        }}
      >
        <div style={{ color: "#0A0A0F", fontSize: 11, fontWeight: 700 }}>Save & Continue</div>
      </div>
    </div>
  );
};

export const Scene05_ProfileCreation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // Phone slides in from left this time — variety
  const phoneSlide = spring({ frame, fps, config: SPRING.bounce });
  const phoneX = interpolate(phoneSlide, [0, 1], [-300, 0]);
  const phoneRotation = interpolate(phoneSlide, [0, 0.7, 1], [-3, 1, 0]);
  const phoneFloat = 4 * Math.sin(frame * 0.035);

  // Right content slides from right
  const contentProgress = spring({ frame: frame - 15, fps, config: SPRING.velvet });
  const contentX = interpolate(contentProgress, [0, 1], [60, 0]);
  const contentOpacity = interpolate(frame, [15, 40], [0, 1], { extrapolateRight: "clamp" });

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
      <GlowOrb x="80%" y="45%" size={550} color="rgba(232,160,160,0.18)" delay={30} />
      <GlowOrb x="15%" y="60%" size={400} color="rgba(201,168,76,0.18)" delay={0} />

      {/* === PHONE (left side this time) === */}
      <div
        style={{
          transform: `translateX(${phoneX}px) translateY(${phoneFloat}px) rotate(${phoneRotation}deg)`,
        }}
      >
        <PhoneMockup scale={1.05} screenBloom bloomDelay={10}>
          <PhoneProfileScreen />
        </PhoneMockup>
      </div>

      {/* === RIGHT CONTENT === */}
      <div
        style={{
          maxWidth: 440,
          opacity: contentOpacity,
          transform: `translateX(${contentX}px)`,
        }}
      >
        <div style={{ fontFamily: fonts.sans, fontSize: 12, letterSpacing: 6, color: colors.rose, textTransform: "uppercase", marginBottom: 22 }}>
          Your Identity
        </div>
        <div style={{ fontFamily: fonts.serif, fontSize: 52, fontWeight: 300, lineHeight: 1.12, color: colors.textPrimary, marginBottom: 24 }}>
          A profile as{" "}
          <span style={{ background: colors.gradientRose, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            unique
          </span>{" "}
          as your love
        </div>

        <GoldDivider width="80px" startFrame={30} />

        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 15,
            color: colors.textSecondary,
            lineHeight: 1.7,
            marginTop: 24,
            marginBottom: 40,
            opacity: interpolate(frame, [35, 60], [0, 1], { extrapolateRight: "clamp" }),
            filter: `blur(${interpolate(frame, [35, 60], [4, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          Build a rich profile that captures your personality, values, and relationship
          style. Your profile becomes the foundation for meaningful insights.
        </div>

        {/* Benefits — staggered entrance from right */}
        {[
          { icon: "🎭", title: "Express Authentically", desc: "Share your true self without filters" },
          { icon: "🔒", title: "Privacy First", desc: "You control what others can see" },
          { icon: "✨", title: "Dynamic & Living", desc: "Evolves as your relationship grows" },
        ].map(({ icon, title, desc }, i) => {
          const bProgress = spring({ frame: frame - (45 + i * 12), fps, config: SPRING.velvet });
          const bOpacity = interpolate(frame, [45 + i * 12, 60 + i * 12], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={title}
              style={{
                opacity: bOpacity,
                transform: `translateX(${(1 - bProgress) * 25}px)`,
                display: "flex",
                gap: 14,
                marginBottom: 14,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "rgba(232,160,160,0.1)",
                  border: `1px solid ${colors.borderRose}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
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
    </div>
  );
};
