import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { PhoneMockup } from "../components/PhoneMockup";

const ProgressDots: React.FC<{ step: number; total: number }> = ({ step, total }) => (
  <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        style={{
          width: i === step ? 24 : 8,
          height: 8,
          borderRadius: 4,
          background: i <= step ? colors.gradientGold : "rgba(67,54,39,0.1)",
        }}
      />
    ))}
  </div>
);

const RIFStep1: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const dimensions = [
    { label: "Emotional Depth", icon: "💜", selected: true },
    { label: "Social Energy", icon: "⚡", selected: false },
    { label: "Growth Drive", icon: "🌱", selected: true },
    { label: "Adventure Spirit", icon: "🧭", selected: false },
    { label: "Loyalty Core", icon: "🛡️", selected: true },
    { label: "Creative Fire", icon: "🔥", selected: true },
  ];

  return (
    <div style={{ padding: "60px 18px 18px", opacity: fadeIn, fontFamily: fonts.sans }}>
      <ProgressDots step={0} total={4} />
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: fonts.serif, fontSize: 20, color: colors.textPrimary, fontWeight: 600, marginBottom: 6 }}>
          Your RIF Profile
        </div>
        <div style={{ fontSize: 11, color: colors.textSecondary }}>What defines your connection style?</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {dimensions.map(({ label, icon, selected }, i) => {
          const appear = interpolate(frame, [10 + i * 6, 28 + i * 6], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={label}
              style={{
                opacity: appear,
                transform: `scale(${appear * 0.15 + 0.85})`,
                padding: "14px 10px",
                borderRadius: 14,
                border: `1.5px solid ${selected ? colors.borderBright : colors.border}`,
                background: selected ? "rgba(166,147,95,0.1)" : colors.bgGlass,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
              <div
                style={{
                  fontSize: 10,
                  color: selected ? colors.gold : colors.textSecondary,
                  fontWeight: selected ? 600 : 400,
                  lineHeight: 1.3,
                }}
              >
                {label}
              </div>
              {selected && (
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: colors.gold, margin: "5px auto 0" }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RIFStep2: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const questions = [
    { q: "How do you handle conflict?", left: "Avoid", right: "Address", value: 0.72 },
    { q: "Your ideal weekend?", left: "Home", right: "Adventure", value: 0.58 },
    { q: "How quickly do you open up?", left: "Slowly", right: "Quickly", value: 0.35 },
  ];

  return (
    <div style={{ padding: "60px 18px 18px", opacity: fadeIn, fontFamily: fonts.sans }}>
      <ProgressDots step={1} total={4} />
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontFamily: fonts.serif, fontSize: 20, color: colors.textPrimary, fontWeight: 600, marginBottom: 6 }}>
          Your Values Spectrum
        </div>
        <div style={{ fontSize: 11, color: colors.textSecondary }}>No right answers — just honest ones</div>
      </div>
      {questions.map(({ q, left, right, value }, i) => {
        const appear = interpolate(frame, [15 + i * 12, 35 + i * 12], [0, 1], { extrapolateRight: "clamp" });
        const sliderFill = interpolate(frame, [20 + i * 12, 60 + i * 12], [0, value], { extrapolateRight: "clamp" });
        return (
          <div key={q} style={{ opacity: appear, marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: colors.textPrimary, marginBottom: 10, fontWeight: 500 }}>{q}</div>
            <div style={{ position: "relative", height: 6, borderRadius: 3, background: "rgba(67,54,39,0.08)", marginBottom: 6 }}>
              <div style={{ height: "100%", width: `${sliderFill * 100}%`, background: colors.gradientGold, borderRadius: 3 }} />
              <div
                style={{
                  position: "absolute",
                  left: `${sliderFill * 100}%`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: colors.gold,
                  border: `2px solid ${colors.bgCard}`,
                  boxShadow: `0 0 12px rgba(166,147,95,0.3)`,
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 9, color: colors.textMuted }}>{left}</span>
              <span style={{ fontSize: 9, color: colors.textMuted }}>{right}</span>
            </div>
          </div>
        );
      })}
      <div
        style={{
          background: colors.gradientGold,
          borderRadius: 28,
          padding: "13px",
          textAlign: "center",
          marginTop: 12,
          opacity: interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ color: colors.bgCard, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>Continue</div>
      </div>
    </div>
  );
};

export const Scene03_Onboarding: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const step = Math.floor(interpolate(frame, [0, 240], [0, 1.99], { extrapolateRight: "clamp" }));

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
      <GlowOrb x="70%" y="50%" size={600} color="rgba(94,110,74,0.1)" delay={20} />
      <GlowOrb x="20%" y="30%" size={400} color="rgba(166,147,95,0.1)" delay={0} />

      <div style={{ maxWidth: 420 }}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            letterSpacing: 5,
            color: colors.olive,
            textTransform: "uppercase",
            marginBottom: 20,
            opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          RIF Intelligence
        </div>
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 52,
            fontWeight: 300,
            lineHeight: 1.15,
            color: colors.textPrimary,
            marginBottom: 24,
            opacity: interpolate(frame, [10, 40], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [10, 40], [30, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          Know yourself.{" "}
          <span style={{ background: colors.gradientGold, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Find your match.
          </span>
        </div>

        <div style={{ width: 80, height: 1, background: colors.gradientGold, marginBottom: 24 }} />

        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 15,
            color: colors.textSecondary,
            lineHeight: 1.7,
            marginBottom: 40,
            opacity: interpolate(frame, [25, 55], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          The Relational Intelligence Framework goes beyond surface traits — mapping
          emotional patterns, attachment styles, and growth orientation to find
          people who truly align with how you love.
        </div>

        {["Select your dimensions", "Define your spectrum", "Review your RIF score", "Get matched"].map((label, i) => {
          const isActive = i === step;
          const isPast = i < step;
          return (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 14,
                opacity: interpolate(frame, [30 + i * 8, 50 + i * 8], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  border: `2px solid ${isActive ? colors.gold : isPast ? colors.goldDim : colors.border}`,
                  background: isPast ? "rgba(166,147,95,0.12)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {isPast ? (
                  <span style={{ color: colors.gold, fontSize: 13 }}>✓</span>
                ) : (
                  <span style={{ fontSize: 11, color: isActive ? colors.gold : colors.textMuted }}>{i + 1}</span>
                )}
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 13, color: isActive ? colors.textPrimary : colors.textSecondary }}>
                {label}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ transform: `scale(${spring({ frame, fps, config: { damping: 70, stiffness: 120, mass: 0.9 } })})` }}>
        <PhoneMockup scale={1}>
          {step === 0 && <RIFStep1 />}
          {step === 1 && <RIFStep2 />}
        </PhoneMockup>
      </div>
    </div>
  );
};
