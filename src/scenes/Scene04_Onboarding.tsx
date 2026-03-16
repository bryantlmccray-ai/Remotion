import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { LuxuryBackground } from "../components/LuxuryBackground";
import { PhoneMockup } from "../components/PhoneMockup";

const ProgressDots: React.FC<{ step: number; total: number }> = ({ step, total }) => (
  <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        style={{
          width: i === step ? 28 : 8,
          height: 8,
          borderRadius: 4,
          background: i <= step ? `linear-gradient(90deg, ${colors.gold}, ${colors.rose})` : "rgba(255,255,255,0.08)",
          boxShadow: i <= step ? `0 0 8px rgba(201,168,76,0.3)` : "none",
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
    <div style={{ padding: "60px 20px 20px", opacity: fadeIn, fontFamily: fonts.sans, background: `linear-gradient(180deg, #0D0D14, #0A0A0F)`, height: "100%" }}>
      <ProgressDots step={0} total={5} />
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>👋</div>
        <div style={{ fontFamily: fonts.serif, fontSize: 22, color: colors.textPrimary, fontWeight: 600, marginBottom: 8 }}>
          Welcome to Monark
        </div>
        <div style={{ fontSize: 12, color: colors.textSecondary }}>Let's get to know you</div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: colors.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
          Your Name
        </div>
        <div
          style={{
            padding: "16px 18px",
            borderRadius: 14,
            border: `1.5px solid ${colors.borderBright}`,
            background: `linear-gradient(135deg, rgba(201,168,76,0.06), rgba(155,142,196,0.03))`,
            fontSize: 16,
            color: colors.textPrimary,
            display: "flex",
            alignItems: "center",
            boxShadow: `0 0 20px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.04)`,
          }}
        >
          {displayName}
          <span style={{ width: 2, height: 20, background: `linear-gradient(180deg, ${colors.gold}, ${colors.rose})`, marginLeft: 1, opacity: frame % 30 < 15 ? 1 : 0 }} />
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: colors.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
          Your Role
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["Partner", "Single", "Exploring"].map((role, i) => (
            <div
              key={role}
              style={{
                flex: 1,
                padding: "12px 6px",
                borderRadius: 12,
                border: `1.5px solid ${i === 0 ? colors.borderBright : colors.border}`,
                background: i === 0 ? `linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))` : `rgba(255,255,255,0.02)`,
                textAlign: "center",
                fontSize: 12,
                color: i === 0 ? colors.gold : colors.textSecondary,
                fontWeight: i === 0 ? 600 : 400,
                boxShadow: i === 0 ? `0 0 16px rgba(201,168,76,0.15)` : "none",
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
          marginTop: 28,
          opacity: interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" }),
          boxShadow: `0 8px 32px rgba(201,168,76,0.3)`,
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
    <div style={{ padding: "60px 20px 20px", opacity: fadeIn, fontFamily: fonts.sans, background: `linear-gradient(180deg, #0D0D14, #0A0A0F)`, height: "100%" }}>
      <ProgressDots step={1} total={5} />
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontFamily: fonts.serif, fontSize: 20, color: colors.textPrimary, fontWeight: 600, marginBottom: 6 }}>
          What do you value most?
        </div>
        <div style={{ fontSize: 11, color: colors.textSecondary }}>Select all that apply</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {values.map(({ emoji, label, selected }, i) => {
          const appear = interpolate(frame, [10 + i * 8, 30 + i * 8], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={label}
              style={{
                opacity: appear,
                transform: `scale(${appear * 0.1 + 0.9})`,
                padding: "14px 12px",
                borderRadius: 14,
                border: `1.5px solid ${selected ? colors.borderBright : colors.border}`,
                background: selected
                  ? `linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))`
                  : `rgba(255,255,255,0.02)`,
                textAlign: "center",
                boxShadow: selected ? `0 0 16px rgba(201,168,76,0.12)` : "none",
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 6 }}>{emoji}</div>
              <div style={{ fontSize: 10, color: selected ? colors.gold : colors.textSecondary, fontWeight: selected ? 600 : 400, lineHeight: 1.3 }}>
                {label}
              </div>
              {selected && (
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: `linear-gradient(135deg, ${colors.gold}, ${colors.rose})`, margin: "6px auto 0", boxShadow: `0 0 6px rgba(201,168,76,0.4)` }} />
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
    { q: "How often do you feel heard by your partner?", rating: 4 },
    { q: "Rate your current communication level", rating: 3.5 },
    { q: "How satisfied are you with intimacy?", rating: null as number | null },
  ];

  const activeQ = Math.floor(interpolate(frame, [0, 90], [0, 2.9], { extrapolateRight: "clamp" }));

  return (
    <div style={{ padding: "60px 20px 20px", opacity: fadeIn, fontFamily: fonts.sans, background: `linear-gradient(180deg, #0D0D14, #0A0A0F)`, height: "100%" }}>
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
              marginBottom: 14,
              padding: "16px",
              borderRadius: 16,
              border: `1.5px solid ${isActive ? colors.borderBright : colors.border}`,
              background: isActive
                ? `linear-gradient(135deg, rgba(201,168,76,0.08), rgba(155,142,196,0.04))`
                : `rgba(255,255,255,0.02)`,
              opacity: isPast ? 0.5 : 1,
              boxShadow: isActive ? `0 0 20px rgba(201,168,76,0.1)` : "none",
            }}
          >
            <div style={{ fontSize: 11, color: isActive ? colors.textPrimary : colors.textSecondary, marginBottom: 10, lineHeight: 1.4 }}>{q}</div>
            {rating && (
              <div style={{ display: "flex", gap: 4 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    style={{
                      flex: 1,
                      height: 5,
                      borderRadius: 3,
                      background: star <= Math.ceil(rating) ? `linear-gradient(90deg, ${colors.gold}, ${colors.rose})` : "rgba(255,255,255,0.06)",
                      boxShadow: star <= Math.ceil(rating) ? `0 0 6px rgba(201,168,76,0.2)` : "none",
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
  const step = Math.floor(interpolate(frame, [0, 270], [0, 2.9], { extrapolateRight: "clamp" }));

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 30], [30, 0], { extrapolateRight: "clamp", easing: (t) => 1 - Math.pow(1 - t, 3) });

  // Phone float
  const phoneFloat = Math.sin(frame * 0.03) * 5;

  // Decorative line pulse
  const linePulse = 0.15 + 0.05 * Math.sin(frame * 0.04);

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

      {/* Decorative arc on right side */}
      <svg
        style={{ position: "absolute", right: -100, top: "10%", width: 600, height: 600, opacity: 0.06, pointerEvents: "none" }}
        viewBox="0 0 600 600"
      >
        <circle cx="300" cy="300" r="280" fill="none" stroke={colors.lavender} strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="300" cy="300" r="250" fill="none" stroke={colors.gold} strokeWidth="0.5" strokeDasharray="2 12" />
      </svg>

      {/* Left: copy */}
      <div style={{ maxWidth: 420, opacity: titleOpacity, transform: `translateY(${titleY}px)`, zIndex: 2 }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 12, letterSpacing: 6, color: colors.gold, textTransform: "uppercase", marginBottom: 24, textShadow: `0 0 20px rgba(201,168,76,0.3)` }}>
          Personalized Journey
        </div>
        <div style={{ fontFamily: fonts.serif, fontSize: 54, fontWeight: 300, lineHeight: 1.12, color: colors.textPrimary, marginBottom: 28 }}>
          Your story,{" "}
          <span style={{ background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight}, ${colors.lavenderLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            uniquely
          </span>{" "}
          understood
        </div>

        {/* Animated divider */}
        <div style={{ width: 100, height: 2, background: `linear-gradient(90deg, ${colors.lavender}, ${colors.gold}, transparent)`, marginBottom: 28, boxShadow: `0 0 10px rgba(155,142,196,0.3)` }} />

        <div style={{ fontFamily: fonts.sans, fontSize: 15, color: colors.textSecondary, lineHeight: 1.7, marginBottom: 44 }}>
          Our intelligent onboarding learns about your relationship values, communication style, and wellness goals to create a truly personalized experience.
        </div>

        {/* Step indicators */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, perspective: 800 }}>
          {["Share your values", "Define what matters", "Check current wellness"].map((label, i) => {
            const isActive = i === step;
            const isPast = i < step;
            return (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 16, transform: `rotateX(${isActive ? -2 : isPast ? 1 : 3}deg)`, transformStyle: "preserve-3d" }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: `2px solid ${isActive ? colors.gold : isPast ? colors.goldDim : colors.border}`,
                    background: isPast
                      ? `linear-gradient(135deg, rgba(201,168,76,0.25), rgba(201,168,76,0.1))`
                      : isActive
                      ? `radial-gradient(circle, rgba(201,168,76,0.1), transparent)`
                      : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: isActive ? `0 0 16px rgba(201,168,76,0.2)` : "none",
                  }}
                >
                  {isPast ? (
                    <span style={{ color: colors.gold, fontSize: 16 }}>✓</span>
                  ) : (
                    <span style={{ fontSize: 13, color: isActive ? colors.gold : colors.textMuted, fontWeight: isActive ? 700 : 400 }}>{i + 1}</span>
                  )}
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 15, color: isActive ? colors.textPrimary : colors.textSecondary, fontWeight: isActive ? 600 : 400 }}>
                  {label}
                </div>
                {isActive && (
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: colors.gold, boxShadow: `0 0 8px ${colors.gold}`, marginLeft: 4, opacity: linePulse * 4 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: phone */}
      <div style={{ transform: `translateY(${phoneFloat}px)`, zIndex: 2 }}>
        <PhoneMockup scale={1.05} rotateY={-6 + Math.sin(frame * 0.02) * 4} rotateX={3} perspective={1000}>
          {step === 0 && <OnboardingStep1 />}
          {step === 1 && <OnboardingStep2 />}
          {step === 2 && <OnboardingStep3 />}
        </PhoneMockup>
      </div>
    </div>
  );
};
