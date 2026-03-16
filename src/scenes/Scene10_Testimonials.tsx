import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { LuxuryBackground } from "../components/LuxuryBackground";
import { DynamicElements } from "../components/DynamicElements";

interface TestimonialData {
  quote: string;
  names: string;
  duration: string;
  stars: number;
  delay: number;
}

const testimonials: TestimonialData[] = [
  { quote: "Monark transformed how we communicate. We went from arguing daily to truly understanding each other.", names: "Alexandra & James", duration: "Together 3 years", stars: 5, delay: 0 },
  { quote: "The AI coaching feels like having a therapist in your pocket. It\u2019s helped us grow so much.", names: "Sophie & Marcus", duration: "Together 5 years", stars: 5, delay: 12 },
  { quote: "The weekly check-ins became our favorite ritual. We look forward to them every week.", names: "Elena & Theo", duration: "Together 2 years", stars: 5, delay: 24 },
];

const StarRating: React.FC<{ count: number }> = ({ count }) => (
  <div style={{ display: "flex", gap: 5, marginBottom: 16 }}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`, boxShadow: `0 0 8px rgba(201,168,76,0.4)` }} />
    ))}
  </div>
);

const TestimonialCard: React.FC<{ data: TestimonialData; index: number }> = ({ data, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame: frame - 20 - data.delay, fps, config: { damping: 70, stiffness: 140, mass: 0.8 } });
  const scale = interpolate(appear, [0, 1], [0.7, 1]);
  const opacity = interpolate(appear, [0, 1], [0, 1]);
  const tiltY = Math.sin(frame * 0.018 + index * 2.1) * 8;
  const tiltX = Math.cos(frame * 0.022 + index * 1.7) * 4;
  const floatY = Math.sin(frame * 0.025 + index * 2.5) * 8;

  return (
    <div
      style={{
        opacity,
        transform: `perspective(800px) rotateY(${tiltY}deg) rotateX(${tiltX}deg) scale(${scale}) translateY(${floatY}px)`,
        width: 380,
        padding: "40px 36px",
        borderRadius: 28,
        background: `linear-gradient(145deg, rgba(201,168,76,0.1), rgba(232,160,160,0.05), rgba(18,18,26,0.95))`,
        border: `1px solid ${index === 1 ? colors.borderBright : colors.border}`,
        backdropFilter: "blur(16px)",
        boxShadow: `0 10px 50px rgba(0,0,0,0.4), 0 0 40px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.05)`,
        position: "relative" as const,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 14, left: 22, fontSize: 72, fontFamily: fonts.serif, lineHeight: 1, background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", opacity: 0.18, pointerEvents: "none" }}>{"\u201C"}</div>
      <StarRating count={data.stars} />
      <div style={{ fontFamily: fonts.serif, fontSize: 18, color: colors.textPrimary, lineHeight: 1.65, marginBottom: 28, fontWeight: 300, fontStyle: "italic" }}>&ldquo;{data.quote}&rdquo;</div>
      <div style={{ width: 48, height: 1.5, background: `linear-gradient(90deg, ${colors.gold}, transparent)`, marginBottom: 18 }} />
      <div style={{ fontFamily: fonts.sans, fontSize: 15, color: colors.textPrimary, fontWeight: 600, marginBottom: 5 }}>{data.names}</div>
      <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textSecondary }}>{data.duration}</div>
    </div>
  );
};

export const Scene10_Testimonials: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [5, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleOpacity = interpolate(frame, [15, 45], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [15, 45], [30, 0], { extrapolateRight: "clamp" });
  const badgesOpacity = interpolate(frame, [80, 105], [0, 1], { extrapolateRight: "clamp" });
  const badgesY = interpolate(frame, [80, 105], [20, 0], { extrapolateRight: "clamp" });
  const badges = ["Featured in TechCrunch", "App Store Best of 2026", "100K+ Downloads"];

  return (
    <div style={{ width: "100%", height: "100%", background: colors.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: fadeIn, position: "relative", overflow: "hidden" }}>
      <LuxuryBackground variant="warm" intensity={1.2} />
      <DynamicElements variant="centered" intensity={0.8} />

      <div style={{ fontFamily: fonts.sans, fontSize: 14, letterSpacing: 7, color: colors.gold, textTransform: "uppercase", marginBottom: 24, opacity: subtitleOpacity, textShadow: `0 0 25px rgba(201,168,76,0.4)`, zIndex: 2 }}>
        Real Stories
      </div>

      <div style={{ fontFamily: fonts.serif, fontSize: 62, fontWeight: 300, lineHeight: 1.12, color: colors.textPrimary, textAlign: "center", marginBottom: 64, opacity: titleOpacity, transform: `translateY(${titleY}px)`, zIndex: 2 }}>
        Loved by{" "}
        <span style={{ background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight}, ${colors.rose})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>50,000+</span>{" "}
        couples worldwide
      </div>

      <div style={{ display: "flex", gap: 36, alignItems: "center", marginBottom: 64, zIndex: 2 }}>
        {testimonials.map((t, i) => <TestimonialCard key={t.names} data={t} index={i} />)}
      </div>

      <div style={{ display: "flex", gap: 18, opacity: badgesOpacity, transform: `translateY(${badgesY}px)`, zIndex: 2 }}>
        {badges.map((badge) => (
          <div key={badge} style={{ padding: "12px 28px", borderRadius: 30, background: `linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.05))`, border: `1px solid ${colors.border}`, fontFamily: fonts.sans, fontSize: 13, color: colors.textSecondary, letterSpacing: 1, backdropFilter: "blur(8px)", boxShadow: `0 4px 20px rgba(0,0,0,0.2), 0 0 16px rgba(201,168,76,0.06)` }}>{badge}</div>
        ))}
      </div>
    </div>
  );
};
