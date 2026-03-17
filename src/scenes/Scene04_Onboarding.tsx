import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { PhoneMockup } from "../components/PhoneMockup";
import { GoldDivider } from "../components/GoldDivider";
import { SPRING, ease, typewriter } from "../utils/animations";

/**
 * SCENE 4 — THE ONBOARDING JOURNEY (0:15–0:25)
 *
 * Dynamic walkthrough of 3 onboarding steps.
 * The phone is center-stage. Steps transition with energy.
 * Name types itself. Values pop in like bubbles. Check-in slides fill.
 * The left panel tracks progress with animated step indicators.
 */

const ProgressDots: React.FC<{ step: number; total: number }> = ({ step, total }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 20 }}>
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === step;
        const isPast = i < step;
        const dotWidth = interpolate(
          isActive ? 1 : 0,
          [0, 1],
          [8, 28]
        );
        return (
          <div
            key={i}
            style={{
              width: dotWidth,
              height: 8,
              borderRadius: 4,
              background: isPast || isActive ? colors.gradientGold : "rgba(255,255,255,0.08)",
              boxShadow: isActive ? `0 0 8px rgba(201,168,76,0.4)` : "none",
            }}
          />
        );
      })}
    </div>
  );
};

// === STEP 1: Name Entry ===
const OnboardingStep1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = spring({ frame, fps, config: SPRING.quick });

  const name = "Alexandra";
  const charCount = typewriter(frame, 20, name.length, 0.6);
  const displayName = name.slice(0, charCount);

  return (
    <div style={{ padding: "60px 20px 20px", opacity: fadeIn, fontFamily: fonts.sans }}>
      <ProgressDots step={0} total={5} />
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 28, marginBottom: 10 }}>👋</div>
        <div style={{ fontFamily: fonts.serif, fontSize: 20, color: colors.textPrimary, fontWeight: 600, marginBottom: 6 }}>
          Welcome to Monark
        </div>
        <div style={{ fontSize: 11, color: colors.textSecondary }}>Let's get to know you</div>
      </div>

      {/* Name input with typing cursor */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, color: colors.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
          Your Name
        </div>
        <div
          style={{
            padding: "13px 16px",
            borderRadius: 12,
            border: `1.5px solid ${displayName.length > 0 ? colors.borderBright : colors.border}`,
            background: displayName.length > 0 ? colors.bgGlassWarm : colors.bgGlass,
            fontSize: 15,
            color: colors.textPrimary,
            display: "flex",
            alignItems: "center",
            minHeight: 20,
          }}
        >
          {displayName}
          <span
            style={{
              width: 2,
              height: 18,
              background: colors.gold,
              marginLeft: 1,
              opacity: frame % 25 < 12 ? 1 : 0,
              boxShadow: `0 0 4px ${colors.gold}`,
            }}
          />
        </div>
      </div>

      {/* Role selection — chips animate in */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, color: colors.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
          Your Role
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["Partner", "Single", "Exploring"].map((role, i) => {
            const chipScale = spring({ frame: frame - (30 + i * 6), fps, config: SPRING.elastic });
            const selected = i === 0 && frame > 55;
            return (
              <div
                key={role}
                style={{
                  flex: 1,
                  padding: "10px 6px",
                  borderRadius: 10,
                  border: `1.5px solid ${selected ? colors.borderBright : colors.border}`,
                  background: selected ? "rgba(201,168,76,0.12)" : colors.bgGlass,
                  textAlign: "center",
                  fontSize: 11,
                  color: selected ? colors.gold : colors.textSecondary,
                  fontWeight: selected ? 600 : 400,
                  transform: `scale(${chipScale})`,
                  boxShadow: selected ? `0 0 12px rgba(201,168,76,0.15)` : "none",
                }}
              >
                {role}
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue button */}
      <div
        style={{
          background: colors.gradientGold,
          borderRadius: 24,
          padding: "13px",
          textAlign: "center",
          marginTop: 20,
          opacity: interpolate(frame, [55, 72], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [55, 72], [15, 0], { extrapolateRight: "clamp", easing: ease.outCubic })}px)`,
          boxShadow: "0 6px 24px rgba(201,168,76,0.25)",
        }}
      >
        <div style={{ color: "#0A0A0F", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>Continue →</div>
      </div>
    </div>
  );
};

// === STEP 2: Values Selection ===
const OnboardingStep2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = spring({ frame, fps, config: SPRING.quick });

  const values = [
    { emoji: "🤝", label: "Trust & Honesty", selected: true },
    { emoji: "💬", label: "Communication", selected: true },
    { emoji: "🌍", label: "Adventure", selected: false },
    { emoji: "🏡", label: "Stability", selected: true },
    { emoji: "❤️", label: "Passion", selected: false },
    { emoji: "🎯", label: "Shared Goals", selected: false },
  ];

  return (
    <div style={{ padding: "60px 20px 20px", opacity: fadeIn, fontFamily: fonts.sans }}>
      <ProgressDots step={1} total={5} />
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: fonts.serif, fontSize: 18, color: colors.textPrimary, fontWeight: 600, marginBottom: 5 }}>
          What do you value most?
        </div>
        <div style={{ fontSize: 10, color: colors.textSecondary }}>Select all that apply</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {values.map(({ emoji, label, selected }, i) => {
          // Pop in like bubbles — elastic spring
          const popScale = spring({ frame: frame - (8 + i * 5), fps, config: SPRING.elastic });
          const isSelected = selected && frame > (25 + i * 8);
          return (
            <div
              key={label}
              style={{
                transform: `scale(${popScale})`,
                padding: "12px 8px",
                borderRadius: 14,
                border: `1.5px solid ${isSelected ? colors.borderBright : colors.border}`,
                background: isSelected ? "rgba(201,168,76,0.1)" : colors.bgGlass,
                textAlign: "center",
                boxShadow: isSelected ? `0 4px 16px rgba(201,168,76,0.1)` : "none",
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 4 }}>{emoji}</div>
              <div
                style={{
                  fontSize: 10,
                  color: isSelected ? colors.gold : colors.textSecondary,
                  fontWeight: isSelected ? 600 : 400,
                  lineHeight: 1.3,
                }}
              >
                {label}
              </div>
              {isSelected && (
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: colors.gold,
                    margin: "5px auto 0",
                    boxShadow: `0 0 6px ${colors.gold}`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// === STEP 3: Wellness Check-in ===
const OnboardingStep3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = spring({ frame, fps, config: SPRING.quick });

  const questions = [
    { q: "How often do you feel heard?", rating: 4 },
    { q: "Rate your communication level", rating: 3.5 },
    { q: "Satisfaction with quality time?", rating: null as number | null },
  ];

  const activeQ = Math.floor(interpolate(frame, [0, 80], [0, 2.5], { extrapolateRight: "clamp" }));

  return (
    <div style={{ padding: "60px 20px 20px", opacity: fadeIn, fontFamily: fonts.sans }}>
      <ProgressDots step={2} total={5} />
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontFamily: fonts.serif, fontSize: 18, color: colors.textPrimary, fontWeight: 600, marginBottom: 5 }}>
          Wellness Check-in
        </div>
        <div style={{ fontSize: 10, color: colors.textSecondary }}>Honest answers help us help you</div>
      </div>

      {questions.map(({ q, rating }, i) => {
        const isActive = i === activeQ;
        const isPast = i < activeQ;
        const cardScale = spring({
          frame: frame - i * 20,
          fps,
          config: SPRING.velvet,
        });

        // Rating bars fill animation
        const fillProgress = isPast || isActive
          ? interpolate(frame, [i * 25 + 10, i * 25 + 40], [0, 1], { extrapolateRight: "clamp" })
          : 0;

        return (
          <div
            key={q}
            style={{
              marginBottom: 10,
              padding: "12px",
              borderRadius: 14,
              border: `1.5px solid ${isActive ? colors.borderBright : colors.border}`,
              background: isActive ? "rgba(201,168,76,0.06)" : colors.bgGlass,
              opacity: isPast ? 0.45 : cardScale,
              transform: `scale(${Math.min(cardScale, 1)})`,
            }}
          >
            <div style={{ fontSize: 11, color: isActive ? colors.textPrimary : colors.textSecondary, marginBottom: 8, lineHeight: 1.3 }}>{q}</div>
            {rating && (
              <div style={{ display: "flex", gap: 3 }}>
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = star <= Math.ceil(rating) && fillProgress > (star - 1) / 5;
                  return (
                    <div
                      key={star}
                      style={{
                        flex: 1,
                        height: 4,
                        borderRadius: 2,
                        background: filled ? colors.gradientGold : "rgba(255,255,255,0.06)",
                        boxShadow: filled ? `0 0 4px rgba(201,168,76,0.3)` : "none",
                      }}
                    />
                  );
                })}
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

  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // Which step to show — transitions at specific frames
  const step = frame < 95 ? 0 : frame < 190 ? 1 : 2;
  const stepLocalFrame = step === 0 ? frame : step === 1 ? frame - 95 : frame - 190;

  // Phone position — slight drift to keep it alive
  const phoneFloat = 5 * Math.sin(frame * 0.03);
  const phoneScale = spring({ frame, fps, config: SPRING.velvet });

  // Step transition — phone pulses slightly between steps
  const stepTransitionPulse = step > 0
    ? interpolate((frame - (step === 1 ? 95 : 190)), [0, 8, 16], [1, 1.03, 1], { extrapolateRight: "clamp" })
    : 1;

  // Left panel text
  const titleOpacity = interpolate(frame, [5, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [5, 30], [25, 0], { extrapolateRight: "clamp", easing: ease.outCubic });

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
      <ParticleField intensity={0.6} />
      <GlowOrb x="65%" y="50%" size={600} color="rgba(155,142,196,0.18)" delay={20} />
      <GlowOrb x="20%" y="35%" size={450} color="rgba(201,168,76,0.18)" delay={0} />

      {/* === LEFT: COPY + PROGRESS === */}
      <div style={{ maxWidth: 440 }}>
        <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: 12,
              letterSpacing: 6,
              color: colors.gold,
              textTransform: "uppercase",
              marginBottom: 22,
            }}
          >
            Personalized Journey
          </div>
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize: 52,
              fontWeight: 300,
              lineHeight: 1.12,
              color: colors.textPrimary,
              marginBottom: 24,
            }}
          >
            Your story,{" "}
            <span style={{ background: colors.gradientGold, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              uniquely
            </span>{" "}
            understood
          </div>

          <GoldDivider width="80px" startFrame={25} />

          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: 15,
              color: colors.textSecondary,
              lineHeight: 1.7,
              marginTop: 24,
              marginBottom: 40,
              opacity: interpolate(frame, [25, 50], [0, 1], { extrapolateRight: "clamp" }),
              filter: `blur(${interpolate(frame, [25, 50], [4, 0], { extrapolateRight: "clamp" })}px)`,
            }}
          >
            Our intelligent onboarding learns about your relationship values,
            communication style, and wellness goals to create a truly personalized experience.
          </div>
        </div>

        {/* Animated step indicators */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {["Share your values", "Define what matters", "Check current wellness"].map((label, i) => {
            const isActive = i === step;
            const isPast = i < step;
            const indicatorProgress = spring({
              frame: frame - (i * 30 + 10),
              fps,
              config: SPRING.velvet,
            });
            const indicatorOpacity = interpolate(frame, [i * 10 + 10, i * 10 + 30], [0, 1], { extrapolateRight: "clamp" });

            return (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  opacity: indicatorOpacity,
                  transform: `translateX(${(1 - indicatorProgress) * 20}px)`,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    border: `2px solid ${isActive ? colors.gold : isPast ? colors.goldDim : colors.border}`,
                    background: isPast ? "rgba(201,168,76,0.15)" : isActive ? "rgba(201,168,76,0.06)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: isActive ? `0 0 15px rgba(201,168,76,0.2)` : "none",
                  }}
                >
                  {isPast ? (
                    <span style={{ color: colors.gold, fontSize: 14 }}>✓</span>
                  ) : (
                    <span style={{ fontSize: 12, color: isActive ? colors.gold : colors.textMuted, fontWeight: isActive ? 700 : 400 }}>{i + 1}</span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: 14,
                    color: isActive ? colors.textPrimary : isPast ? colors.textSecondary : colors.textMuted,
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {label}
                </div>
                {isActive && (
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: colors.gold,
                      marginLeft: 4,
                      boxShadow: `0 0 6px ${colors.gold}`,
                      opacity: 0.5 + 0.5 * Math.sin(frame * 0.15),
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* === RIGHT: PHONE (center stage) === */}
      <div
        style={{
          transform: `translateY(${phoneFloat}px) scale(${phoneScale * stepTransitionPulse})`,
        }}
      >
        <PhoneMockup scale={1.05} screenBloom bloomDelay={5}>
          {step === 0 && <OnboardingStep1 />}
          {step === 1 && <OnboardingStep2 />}
          {step === 2 && <OnboardingStep3 />}
        </PhoneMockup>
      </div>
    </div>
  );
};
