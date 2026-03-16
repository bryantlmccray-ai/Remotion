import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { LuxuryBackground } from "../components/LuxuryBackground";

interface TestimonialData {
  quote: string;
  names: string;
  duration: string;
  stars: number;
  delay: number;
}

const testimonials: TestimonialData[] = [
  {
    quote:
      "Monark transformed how we communicate. We went from arguing daily to truly understanding each other.",
    names: "Alexandra & James",
    duration: "Together 3 years",
    stars: 5,
    delay: 0,
  },
  {
    quote:
      "The AI coaching feels like having a therapist in your pocket. It\u2019s helped us grow so much.",
    names: "Sophie & Marcus",
    duration: "Together 5 years",
    stars: 5,
    delay: 12,
  },
  {
    quote:
      "The weekly check-ins became our favorite ritual. We look forward to them every week.",
    names: "Elena & Theo",
    duration: "Together 2 years",
    stars: 5,
    delay: 24,
  },
];

const StarRating: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`,
            boxShadow: `0 0 6px rgba(201,168,76,0.4)`,
          }}
        />
      ))}
    </div>
  );
};

const TestimonialCard: React.FC<{
  data: TestimonialData;
  index: number;
}> = ({ data, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: frame - 20 - data.delay,
    fps,
    config: { damping: 70, stiffness: 140, mass: 0.8 },
  });
  const scale = interpolate(appear, [0, 1], [0.7, 1]);
  const opacity = interpolate(appear, [0, 1], [0, 1]);

  // 3D tilt animation - each card has a unique phase
  const tiltY = Math.sin(frame * 0.018 + index * 2.1) * 6;
  const tiltX = Math.cos(frame * 0.022 + index * 1.7) * 3;

  // Float animation at different phases
  const floatY = Math.sin(frame * 0.025 + index * 2.5) * 6;

  return (
    <div
      style={{
        opacity,
        transform: `perspective(800px) rotateY(${tiltY}deg) rotateX(${tiltX}deg) scale(${scale}) translateY(${floatY}px)`,
        width: 360,
        padding: "36px 32px",
        borderRadius: 24,
        background: `linear-gradient(145deg, rgba(201,168,76,0.08), rgba(232,160,160,0.04), rgba(18,18,26,0.95))`,
        border: `1px solid ${index === 1 ? colors.borderBright : colors.border}`,
        backdropFilter: "blur(16px)",
        boxShadow: `0 8px 40px rgba(0,0,0,0.4), 0 0 30px rgba(201,168,76,0.06), inset 0 1px 0 rgba(255,255,255,0.05)`,
        position: "relative" as const,
        overflow: "hidden",
      }}
    >
      {/* Decorative quote mark */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 20,
          fontSize: 64,
          fontFamily: fonts.serif,
          lineHeight: 1,
          background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: 0.15,
          pointerEvents: "none",
        }}
      >
        {"\u201C"}
      </div>

      <StarRating count={data.stars} />

      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 16,
          color: colors.textPrimary,
          lineHeight: 1.65,
          marginBottom: 24,
          fontWeight: 300,
          fontStyle: "italic",
        }}
      >
        &ldquo;{data.quote}&rdquo;
      </div>

      {/* Divider */}
      <div
        style={{
          width: 40,
          height: 1,
          background: `linear-gradient(90deg, ${colors.gold}, transparent)`,
          marginBottom: 16,
        }}
      />

      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 13,
          color: colors.textPrimary,
          fontWeight: 600,
          marginBottom: 4,
        }}
      >
        {data.names}
      </div>
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 11,
          color: colors.textSecondary,
        }}
      >
        {data.duration}
      </div>
    </div>
  );
};

export const Scene10_Testimonials: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [5, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [15, 45], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [15, 45], [30, 0], {
    extrapolateRight: "clamp",
  });

  const badgesOpacity = interpolate(frame, [80, 105], [0, 1], {
    extrapolateRight: "clamp",
  });
  const badgesY = interpolate(frame, [80, 105], [20, 0], {
    extrapolateRight: "clamp",
  });

  const badges = [
    "Featured in TechCrunch",
    "App Store Best of 2026",
    "100K+ Downloads",
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: colors.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeIn,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <LuxuryBackground variant="warm" />

      {/* Subtitle */}
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 12,
          letterSpacing: 6,
          color: colors.gold,
          textTransform: "uppercase",
          marginBottom: 20,
          opacity: subtitleOpacity,
          textShadow: `0 0 20px rgba(201,168,76,0.3)`,
          zIndex: 2,
        }}
      >
        Real Stories
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 52,
          fontWeight: 300,
          lineHeight: 1.15,
          color: colors.textPrimary,
          textAlign: "center",
          marginBottom: 60,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          zIndex: 2,
        }}
      >
        Loved by{" "}
        <span
          style={{
            background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight}, ${colors.rose})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          50,000+
        </span>{" "}
        couples worldwide
      </div>

      {/* Testimonial Cards */}
      <div
        style={{
          display: "flex",
          gap: 32,
          alignItems: "center",
          marginBottom: 60,
          zIndex: 2,
        }}
      >
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.names} data={t} index={i} />
        ))}
      </div>

      {/* Trust Badges */}
      <div
        style={{
          display: "flex",
          gap: 16,
          opacity: badgesOpacity,
          transform: `translateY(${badgesY}px)`,
          zIndex: 2,
        }}
      >
        {badges.map((badge) => (
          <div
            key={badge}
            style={{
              padding: "10px 24px",
              borderRadius: 30,
              background: `linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.04))`,
              border: `1px solid ${colors.border}`,
              fontFamily: fonts.sans,
              fontSize: 12,
              color: colors.textSecondary,
              letterSpacing: 1,
              backdropFilter: "blur(8px)",
              boxShadow: `0 4px 16px rgba(0,0,0,0.2), 0 0 12px rgba(201,168,76,0.05)`,
            }}
          >
            {badge}
          </div>
        ))}
      </div>
    </div>
  );
};
