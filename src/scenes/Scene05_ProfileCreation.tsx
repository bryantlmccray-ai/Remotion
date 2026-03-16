import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { PhoneMockup } from "../components/PhoneMockup";
import { GoldDivider } from "../components/GoldDivider";

const AvatarRing: React.FC<{ frame: number }> = ({ frame }) => {
  const rotate = frame * 0.8;
  return (
    <div style={{ position: "relative", width: 100, height: 100, margin: "0 auto 16px" }}>
      {/* Rotating gradient ring */}
      <div
        style={{
          position: "absolute",
          inset: -3,
          borderRadius: "50%",
          background: `conic-gradient(from 0deg, ${colors.gold}, ${colors.rose}, ${colors.olive}, ${colors.gold})`,
          padding: 3,
        }}
      >
        <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: colors.bgCard }} />
      </div>
      {/* Avatar placeholder */}
      <div
        style={{
          position: "absolute",
          inset: 3,
          borderRadius: "50%",
          background: `linear-gradient(135deg, #503F30, #433627)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
        }}
      >
        👩
      </div>
      {/* Edit badge */}
      <div
        style={{
          position: "absolute",
          bottom: 4,
          right: 4,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: colors.gradientGold,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}
      >
        ✏️
      </div>
    </div>
  );
};

const PhoneProfileScreen: React.FC = () => {
  const frame = useCurrentFrame();

  const fields = [
    { label: "Display Name", value: "Alexandra M.", filled: true },
    { label: "Age", value: "28", filled: true },
    { label: "Location", value: "New York, NY", filled: true },
    { label: "Relationship Status", value: "In a relationship", filled: true },
    { label: "Love Language", value: "Words of Affirmation", filled: frame > 40 },
    { label: "Short Bio", value: "Passionate about growth & connection...", filled: frame > 70 },
  ];

  return (
    <div style={{ padding: "60px 16px 16px", fontFamily: fonts.sans, background: colors.bg, height: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <AvatarRing frame={frame} />
        <div style={{ fontFamily: fonts.serif, fontSize: 18, color: colors.textPrimary, fontWeight: 600 }}>Create Your Profile</div>
        <div style={{ fontSize: 10, color: colors.textSecondary, marginTop: 4 }}>Your personal sanctuary</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {fields.map(({ label, value, filled }, i) => {
          const appear = interpolate(frame, [i * 8, i * 8 + 20], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={label}
              style={{
                opacity: appear,
                padding: "10px 12px",
                borderRadius: 10,
                border: `1px solid ${filled ? colors.borderBright : colors.border}`,
                background: filled ? "rgba(201,168,76,0.05)" : colors.bgGlass,
              }}
            >
              <div style={{ fontSize: 9, color: colors.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 3 }}>{label}</div>
              <div style={{ fontSize: 12, color: filled ? colors.textPrimary : colors.textMuted }}>{filled ? value : "—"}</div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 16,
          background: colors.gradientGold,
          borderRadius: 24,
          padding: "12px",
          textAlign: "center",
          opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ color: "#0A0A0F", fontSize: 12, fontWeight: 700 }}>Save & Continue</div>
      </div>
    </div>
  );
};

export const Scene05_ProfileCreation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const phoneScale = spring({ frame, fps, config: { damping: 70, stiffness: 120, mass: 0.9 } });

  const titleOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [10, 40], [30, 0], { extrapolateRight: "clamp", easing: (t) => 1 - Math.pow(1 - t, 3) });

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
      <GlowOrb x="80%" y="40%" size={550} color="rgba(232,160,160,0.2)" delay={30} />
      <GlowOrb x="15%" y="65%" size={400} color="rgba(201,168,76,0.2)" delay={0} />

      {/* Phone */}
      <div style={{ transform: `scale(${phoneScale})`, transformOrigin: "center" }}>
        <PhoneMockup scale={1}>
          <PhoneProfileScreen />
        </PhoneMockup>
      </div>

      {/* Right content */}
      <div style={{ maxWidth: 440, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 12, letterSpacing: 5, color: colors.rose, textTransform: "uppercase", marginBottom: 20 }}>
          Your Identity
        </div>
        <div style={{ fontFamily: fonts.serif, fontSize: 52, fontWeight: 300, lineHeight: 1.15, color: colors.textPrimary, marginBottom: 24 }}>
          A profile as{" "}
          <span style={{ background: colors.gradientRose, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            unique
          </span>{" "}
          as your love
        </div>

        <GoldDivider width="80px" />

        <div style={{ fontFamily: fonts.sans, fontSize: 15, color: colors.textSecondary, lineHeight: 1.7, marginTop: 24, marginBottom: 40 }}>
          Build a rich profile that captures your personality, values, and relationship style. Your profile becomes the foundation for meaningful insights and connections.
        </div>

        {/* Profile benefits */}
        {[
          { icon: "🎭", title: "Express Authentically", desc: "Share your true self without filters" },
          { icon: "🔒", title: "Privacy First", desc: "You control what others can see" },
          { icon: "✨", title: "Dynamic & Living", desc: "Evolves as your relationship grows" },
        ].map(({ icon, title, desc }, i) => {
          const opacity = interpolate(frame, [30 + i * 15, 55 + i * 15], [0, 1], { extrapolateRight: "clamp" });
          const x = interpolate(frame, [30 + i * 15, 55 + i * 15], [30, 0], { extrapolateRight: "clamp" });
          return (
            <div
              key={title}
              style={{
                opacity,
                transform: `translateX(${x}px)`,
                display: "flex",
                gap: 14,
                marginBottom: 16,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "rgba(232,160,160,0.12)",
                  border: `1px solid rgba(232,160,160,0.2)`,
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
