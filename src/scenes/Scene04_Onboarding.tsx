import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig, Sequence } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { PhoneMockup } from "../components/PhoneMockup";

const ProgressDots: React.FC<{ step: number; total: number }> = ({ step, total }) => (
  <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        style={{
          width: i === step ? 24 : 8,
          height: 8,
          borderRadius: 4,
          background: i <= step ? colors.gradientGold : "rgba(255,255,255,0.1)",
          transition: "all 0.3s",
        }}
      />
    ))}
  </div>
);

const OnboardingStep1: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const typeProgress = interpolate(frame, [15, 60], [0, 1], { extrapolateRight: "clamp" });
  const name = "Alexandra";
  const displayName = name.slice(0, Math.floor(typeProgress * name.length));

  return (
    <div style={{ padding: "60px 20px 20px", opacity: fadeIn, fontFamily: fonts.sans }}>
      <ProgressDots step={0} total={5} />
      <div
        style={{
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 12 }}>👋</div>
        <div style={{ fontFamily: fonts.serif, fontSize: 22, color: colors.textPrimary, fontWeight: 600, marginBottom: 8 }}>
          Welcome to Monark
        </div>
        <div style={{ fontSize: 12, color: colors.textSecondary }}>Let's get to know you</div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: colors.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
          Your Name
        </div>
        <div
          style={{
            padding: "14px 16px",
            borderRadius: 12,
            border: `1.5px solid ${colors.borderBright}`,
            background: colors.bgGlass,
            fontSize: 16,
            color: colors.textPrimary,
            display: "flex",
            alignItems: "center",
          }}
        >
          {displayName}
          <span style={{ width: 2, height: 18, background: colors.gold, marginLeft: 1, opacity: frame % 30 < 15 ? 1 : 0 }} />
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: colors.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
          Your Role
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["Partner", "Single", "Exploring"].map((role, i) => (
            <div
              key={role}
              style={{
                flex: 1,
                padding: "10px 6px",
                borderRadius: 10,
                border: `1.5px solid ${i === 0 ? colors.borderBright : colors.border}`,
                background: i === 0 ? "rgba(201,168,76,0.12)" : colors.bgGlass,
                textAlign: "center",
                fontSize: 11,
                color: i === 0 ? colors.gold : colors.textSecondary,
                fontWeight: i === 0 ? 600 : 400,
              }}
            >
              {role}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          background: colors.gradientGold,
          borderRadius: 28,
          padding: "14px",
          textAlign: "center",
          marginTop: 24,
          opacity: interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ color: "#0A0A0F", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>Continue →</div>
      </div>
    </div>
  );
};

const OnboardingStep2: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const values = [
    { emoji: "🤝", label: "Trust & Honesty", selected: true },
    { emoji: "💬", label: "Open Communication", selected: true },
    { emoji: "🌍", label: "Adventure & Growth", selected: false },
    { emoji: "🏡", label: "Stability & Security", selected: true },
    { emoji: "❤️", label: "Passion & Intimacy", selected: false },
    { emoji: "🎯", label: "Shared Goals", selected: false },
  ];

  return (
    <div style={{ padding: "60px 20px 20px", opacity: fadeIn, fontFamily: fonts.sans }}>
      <ProgressDots step={1} total={5} />
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontFamily: fonts.serif, fontSize: 20, color: colors.textPrimary, fontWeight: 600, marginBottom: 6 }}>
          What do you value most?
        </div>
        <div style={{ fontSize: 11, color: colors.textSecondary }}>Select all that apply</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {values.map(({ emoji, label, selected }, i) => {
          const appear = interpolate(frame, [10 + i * 8, 30 + i * 8], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={label}
              style={{
                opacity: appear,
                transform: `scale(${appear * 0.1 + 0.9})`,
                padding: "12px 10px",
                borderRadius: 12,
                border: `1.5px solid ${selected ? colors.borderBright : colors.border}`,
                background: selected ? "rgba(201,168,76,0.1)" : colors.bgGlass,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>{emoji}</div>
              <div style={{ fontSize: 10, color: selected ? colors.gold : colors.textSecondary, fontWeight: selected ? 600 : 400, lineHeight: 1.3 }}>
                {label}
              </div>
              {selected && (
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: colors.gold, margin: "4px auto 0" }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const OnboardingStep3: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const questions = [
    { q: "How often do you feel heard by your partner?", a: "Usually", rating: 4 },
    { q: "Rate your current communication level", a: null, rating: 3.5 },
    { q: "How satisfied are you with intimacy?", a: null, rating: null },
  ];

  const activeQ = Math.floor(interpolate(frame, [0, 90], [0, 2.9], { extrapolateRight: "clamp" }));

  return (
    <div style={{ padding: "60px 20px 20px", opacity: fadeIn, fontFamily: fonts.sans }}>
      <ProgressDots step={2} total={5} />
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: fonts.serif, fontSize: 20, color: colors.textPrimary, fontWeight: 600, marginBottom: 6 }}>
          Your Wellness Check-in
        </div>
        <div style={{ fontSize: 11, color: colors.textSecondary }}>Honest answers help us help you</div>
      </div>

      {questions.map(({ q, rating }, i) => {
        const isActive = i === activeQ;
        const isPast = i < activeQ;
        return (
          <div
            key={q}
            style={{
              marginBottom: 12,
              padding: "14px",
              borderRadius: 14,
              border: `1.5px solid ${isActive ? colors.borderBright : colors.border}`,
              background: isActive ? "rgba(201,168,76,0.06)" : colors.bgGlass,
              opacity: isPast ? 0.5 : 1,
              transition: "all 0.3s",
            }}
          >
            <div style={{ fontSize: 11, color: colors.textSecondary, marginBottom: 10, lineHeight: 1.4 }}>{q}</div>
            {rating && (
              <div style={{ display: "flex", gap: 4 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 2,
                      background: star <= Math.ceil(rating) ? colors.gradientGold : "rgba(255,255,255,0.08)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const Scene04_Onboarding: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Which onboarding step to show
  const step = Math.floor(interpolate(frame, [0, 270], [0, 2.9], { extrapolateRight: "clamp" }));
  const stepDuration = 90;

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

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
      <GlowOrb x="70%" y="50%" size={600} color="rgba(94,110,74,0.2)" delay={20} />
      <GlowOrb x="20%" y="30%" size={400} color="rgba(201,168,76,0.2)" delay={0} />

      {/* Left: copy */}
      <div style={{ maxWidth: 420, opacity: titleOpacity }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 12, letterSpacing: 5, color: colors.gold, textTransform: "uppercase", marginBottom: 20 }}>
          Personalized Journey
        </div>
        <div style={{ fontFamily: fonts.serif, fontSize: 52, fontWeight: 300, lineHeight: 1.15, color: colors.textPrimary, marginBottom: 24 }}>
          Your story,{" "}
          <span style={{ background: colors.gradientGold, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            uniquely
          </span>{" "}
          understood
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 15, color: colors.textSecondary, lineHeight: 1.7, marginBottom: 40 }}>
          Our intelligent onboarding learns about your relationship values, communication style, and wellness goals to create a truly personalized experience.
        </div>

        {/* Step indicators */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {["Share your values", "Define what matters", "Check current wellness"].map((label, i) => {
            const isActive = i === step;
            const isPast = i < step;
            return (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: `2px solid ${isActive ? colors.gold : isPast ? colors.goldDim : colors.border}`,
                    background: isPast ? "rgba(201,168,76,0.2)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.3s",
                  }}
                >
                  {isPast ? (
                    <span style={{ color: colors.gold, fontSize: 14 }}>✓</span>
                  ) : (
                    <span style={{ fontSize: 12, color: isActive ? colors.gold : colors.textMuted }}>{i + 1}</span>
                  )}
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 14, color: isActive ? colors.textPrimary : colors.textSecondary }}>
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: phone */}
      <PhoneMockup scale={1}>
        {step === 0 && <OnboardingStep1 />}
        {step === 1 && <OnboardingStep2 />}
        {step === 2 && <OnboardingStep3 />}
      </PhoneMockup>
    </div>
  );
};
