import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { LuxuryBackground } from "../components/LuxuryBackground";
import { PhoneMockup } from "../components/PhoneMockup";

const CompatibilityBar: React.FC<{
  label: string;
  value: number;
  frame: number;
  delay: number;
}> = ({ label, value, frame, delay }) => {
  const progress = interpolate(frame, [delay, delay + 50], [0, value], {
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <div
          style={{
            fontSize: 9,
            color: colors.textSecondary,
            fontFamily: fonts.sans,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 9,
            color: colors.rose,
            fontFamily: fonts.sans,
            fontWeight: 600,
          }}
        >
          {Math.round(progress)}%
        </div>
      </div>
      <div
        style={{
          height: 5,
          borderRadius: 3,
          background: "rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${colors.rose}, ${colors.gold})`,
            borderRadius: 3,
            boxShadow: `0 0 8px rgba(232,160,160,0.3)`,
          }}
        />
      </div>
    </div>
  );
};

const PhoneCompatibilityScreen: React.FC = () => {
  const frame = useCurrentFrame();

  const scoreValue = Math.round(
    interpolate(frame, [15, 70], [0, 94], { extrapolateRight: "clamp" })
  );
  const ringProgress = interpolate(frame, [15, 70], [0, 94], {
    extrapolateRight: "clamp",
  });
  const ringRotate = interpolate(frame, [0, 150], [0, 360], {
    extrapolateRight: "clamp",
  });

  const dimensions = [
    { label: "Values", value: 92, delay: 25 },
    { label: "Communication", value: 88, delay: 32 },
    { label: "Intimacy", value: 85, delay: 39 },
    { label: "Trust", value: 96, delay: 46 },
    { label: "Growth", value: 78, delay: 53 },
  ];

  const strengths = ["Shared Vision", "Deep Trust", "Open Communication"];

  const strengthsOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        padding: "60px 16px 16px",
        fontFamily: fonts.sans,
        background: `linear-gradient(180deg, #0D0D14, #0A0A0F)`,
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 16,
            color: colors.textPrimary,
            fontWeight: 600,
            marginBottom: 2,
          }}
        >
          Compatibility Report
        </div>
        <div style={{ fontSize: 9, color: colors.textSecondary }}>
          Alexandra & James
        </div>
      </div>

      {/* Circular Score */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 110,
            height: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `perspective(600px) rotateY(${Math.sin(frame * 0.015) * 8}deg)`,
          }}
        >
          {/* Conic gradient ring */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: `conic-gradient(from ${ringRotate}deg, ${colors.rose}, ${colors.gold}, ${colors.roseLight}, ${colors.rose})`,
              mask: "radial-gradient(circle, transparent 42px, black 43px, black 55px, transparent 56px)",
              WebkitMask:
                "radial-gradient(circle, transparent 42px, black 43px, black 55px, transparent 56px)",
              opacity: ringProgress / 94,
              boxShadow: `0 0 20px rgba(232,160,160,0.3)`,
            }}
          />
          {/* Inner bg */}
          <div
            style={{
              position: "absolute",
              width: 84,
              height: 84,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(232,160,160,0.08) 0%, transparent 70%)`,
            }}
          />
          {/* Score text */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                background: `linear-gradient(135deg, ${colors.rose}, ${colors.roseLight}, ${colors.gold})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1,
                filter: `drop-shadow(0 0 12px rgba(232,160,160,0.3))`,
              }}
            >
              {scoreValue}%
            </div>
            <div
              style={{
                fontSize: 7,
                color: colors.textMuted,
                marginTop: 2,
              }}
            >
              Overall Match
            </div>
          </div>
        </div>
      </div>

      {/* Dimension Bars */}
      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            fontSize: 9,
            color: colors.rose,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Compatibility Dimensions
        </div>
        {dimensions.map((d) => (
          <CompatibilityBar
            key={d.label}
            label={d.label}
            value={d.value}
            frame={frame}
            delay={d.delay}
          />
        ))}
      </div>

      {/* Strengths */}
      <div style={{ opacity: strengthsOpacity }}>
        <div
          style={{
            fontSize: 9,
            color: colors.rose,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Strengths
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {strengths.map((s) => (
            <div
              key={s}
              style={{
                padding: "5px 12px",
                borderRadius: 20,
                background: `linear-gradient(135deg, rgba(232,160,160,0.15), rgba(201,168,76,0.08))`,
                border: `1px solid rgba(232,160,160,0.15)`,
                fontSize: 8,
                color: colors.roseLight,
                boxShadow: `0 0 8px rgba(232,160,160,0.08)`,
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Scene08_Compatibility: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const phoneSlide = spring({
    frame,
    fps,
    config: { damping: 70, stiffness: 120, mass: 0.9 },
  });
  const phoneY = interpolate(phoneSlide, [0, 1], [100, 0]);
  const phoneFloat = Math.sin(frame * 0.03) * 5;

  const dividerWidth = interpolate(frame, [45, 70], [0, 100], {
    extrapolateRight: "clamp",
  });

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

      {/* Left text */}
      <div style={{ maxWidth: 440, zIndex: 2 }}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            letterSpacing: 6,
            color: colors.rose,
            textTransform: "uppercase",
            marginBottom: 24,
            opacity: interpolate(frame, [10, 40], [0, 1], {
              extrapolateRight: "clamp",
            }),
            textShadow: `0 0 20px rgba(232,160,160,0.3)`,
          }}
        >
          Deep Analysis
        </div>
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 54,
            fontWeight: 300,
            lineHeight: 1.12,
            color: colors.textPrimary,
            marginBottom: 28,
            opacity: interpolate(frame, [15, 45], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [15, 45], [30, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          Understand your{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${colors.rose}, ${colors.roseLight}, ${colors.gold})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            compatibility
          </span>{" "}
          on a deeper level
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

        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 15,
            color: colors.textSecondary,
            lineHeight: 1.7,
            marginBottom: 44,
            opacity: interpolate(frame, [30, 60], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Our AI-powered compatibility engine analyzes your relationship across
          multiple dimensions, revealing the hidden dynamics that make your bond
          unique and highlighting areas for deeper growth together.
        </div>

        {/* Feature cards */}
        {[
          {
            icon: "💎",
            title: "Core Values Match",
            desc: "Alignment on life's fundamental priorities",
          },
          {
            icon: "💬",
            title: "Communication Sync",
            desc: "How naturally your styles complement",
          },
          {
            icon: "🌊",
            title: "Emotional Wavelength",
            desc: "Deep empathy and emotional resonance",
          },
        ].map(({ icon, title, desc }, i) => {
          const opacity = interpolate(
            frame,
            [40 + i * 14, 65 + i * 14],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          const x = interpolate(
            frame,
            [40 + i * 14, 65 + i * 14],
            [-20, 0],
            { extrapolateRight: "clamp" }
          );
          return (
            <div
              key={title}
              style={{
                opacity,
                transform: `translateX(${x}px) perspective(800px) rotateY(${2 - i * 0.8}deg) rotateX(${1 - i * 0.3}deg)`,
                display: "flex",
                gap: 14,
                marginBottom: 14,
                alignItems: "center",
                padding: "12px 16px",
                borderRadius: 14,
                background: `linear-gradient(135deg, rgba(232,160,160,0.06), rgba(201,168,76,0.03))`,
                border: `1px solid rgba(232,160,160,0.1)`,
                boxShadow: `0 4px 16px rgba(0,0,0,0.2)`,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: `linear-gradient(135deg, rgba(232,160,160,0.15), rgba(232,160,160,0.05))`,
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
                <div
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: 14,
                    color: colors.textPrimary,
                    fontWeight: 600,
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: 12,
                    color: colors.textSecondary,
                  }}
                >
                  {desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right phone */}
      <div
        style={{
          transform: `translateY(${phoneY + phoneFloat}px)`,
          zIndex: 2,
        }}
      >
        <PhoneMockup
          scale={1.05}
          rotateY={-8 + Math.sin(frame * 0.02) * 5}
          rotateX={3}
          perspective={1000}
        >
          <PhoneCompatibilityScreen />
        </PhoneMockup>
      </div>
    </div>
  );
};
