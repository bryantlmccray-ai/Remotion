import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { LuxuryBackground } from "../components/LuxuryBackground";
import { PhoneMockup } from "../components/PhoneMockup";

const AvatarRing: React.FC<{ frame: number }> = ({ frame }) => {
  const rotate = frame * 0.8;
  return (
    <div style={{ position: "relative", width: 100, height: 100, margin: "0 auto 16px" }}>
      <div
        style={{
          position: "absolute",
          inset: -4,
          borderRadius: "50%",
          background: `conic-gradient(from ${rotate}deg, ${colors.gold}, ${colors.rose}, ${colors.lavender}, ${colors.gold})`,
          padding: 3,
          boxShadow: `0 0 24px rgba(201,168,76,0.3)`,
        }}
      >
        <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: colors.bgCard }} />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 3,
          borderRadius: "50%",
          background: `linear-gradient(135deg, #2a2040, #1a1530)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
        }}
      >
        👩
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 4,
          right: 4,
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: colors.gradientGold,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          boxShadow: `0 2px 12px rgba(201,168,76,0.5)`,
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
    <div style={{ padding: "60px 16px 16px", fontFamily: fonts.sans, background: `linear-gradient(180deg, #0D0D14, #0A0A0F)`, height: "100%" }}>
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
                padding: "11px 14px",
                borderRadius: 12,
                border: `1px solid ${filled ? colors.borderBright : colors.border}`,
                background: filled
                  ? `linear-gradient(135deg, rgba(201,168,76,0.06), rgba(155,142,196,0.03))`
                  : `rgba(255,255,255,0.02)`,
                boxShadow: filled ? `0 0 12px rgba(201,168,76,0.06)` : "none",
              }}
            >
              <div style={{ fontSize: 9, color: colors.gold, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 3 }}>{label}</div>
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
          padding: "13px",
          textAlign: "center",
          opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp" }),
          boxShadow: `0 8px 32px rgba(201,168,76,0.3)`,
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

  const phoneFloat = Math.sin(frame * 0.025) * 6;
  const dividerWidth = interpolate(frame, [40, 65], [0, 100], { extrapolateRight: "clamp" });

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
      <LuxuryBackground variant="rose" />

      {/* Decorative arcs */}
      <svg
        style={{ position: "absolute", left: -50, top: "20%", width: 500, height: 500, opacity: 0.05, pointerEvents: "none" }}
        viewBox="0 0 500 500"
      >
        <circle cx="250" cy="250" r="230" fill="none" stroke={colors.rose} strokeWidth="1" strokeDasharray="4 10" />
        <circle cx="250" cy="250" r="200" fill="none" stroke={colors.gold} strokeWidth="0.5" strokeDasharray="2 14" />
      </svg>

      {/* Phone */}
      <div style={{ transform: `scale(${phoneScale}) translateY(${phoneFloat}px)`, transformOrigin: "center", zIndex: 2 }}>
        <PhoneMockup scale={1.05}>
          <PhoneProfileScreen />
        </PhoneMockup>
      </div>

      {/* Right content */}
      <div style={{ maxWidth: 460, opacity: titleOpacity, transform: `translateY(${titleY}px)`, zIndex: 2 }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 12, letterSpacing: 6, color: colors.rose, textTransform: "uppercase", marginBottom: 24, textShadow: `0 0 20px rgba(232,160,160,0.3)` }}>
          Your Identity
        </div>
        <div style={{ fontFamily: fonts.serif, fontSize: 54, fontWeight: 300, lineHeight: 1.12, color: colors.textPrimary, marginBottom: 28 }}>
          A profile as{" "}
          <span style={{ background: `linear-gradient(135deg, ${colors.rose}, ${colors.roseLight}, ${colors.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            unique
          </span>{" "}
          as your love
        </div>

        {/* Animated divider */}
        <div
          style={{
            width: dividerWidth,
            height: 2,
            background: `linear-gradient(90deg, ${colors.rose}, ${colors.gold}, transparent)`,
            marginBottom: 28,
            boxShadow: `0 0 10px rgba(232,160,160,0.3)`,
          }}
        />

        <div style={{ fontFamily: fonts.sans, fontSize: 15, color: colors.textSecondary, lineHeight: 1.7, marginBottom: 44 }}>
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
                gap: 16,
                marginBottom: 18,
                alignItems: "center",
                padding: "14px 18px",
                borderRadius: 16,
                background: `linear-gradient(135deg, rgba(232,160,160,0.06), rgba(201,168,76,0.03))`,
                border: `1px solid rgba(232,160,160,0.12)`,
                boxShadow: `0 4px 20px rgba(0,0,0,0.2)`,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, rgba(232,160,160,0.15), rgba(232,160,160,0.05))`,
                  border: `1px solid rgba(232,160,160,0.2)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                  boxShadow: `0 0 16px rgba(232,160,160,0.1)`,
                }}
              >
                {icon}
              </div>
              <div>
                <div style={{ fontFamily: fonts.serif, fontSize: 15, color: colors.textPrimary, fontWeight: 600 }}>{title}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textSecondary }}>{desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
