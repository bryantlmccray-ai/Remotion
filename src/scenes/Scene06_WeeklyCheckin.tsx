import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { PhoneMockup } from "../components/PhoneMockup";
import { GoldDivider } from "../components/GoldDivider";

const RadarChart: React.FC<{ frame: number }> = ({ frame }) => {
  const progress = interpolate(frame, [0, 80], [0, 1], { extrapolateRight: "clamp" });
  const size = 120;
  const center = size / 2;
  const radius = 46;
  const categories = ["Intimacy", "Trust", "Communication", "Support", "Growth"];
  const values = [0.85, 0.78, 0.92, 0.88, 0.75];

  const points = categories.map((_, i) => {
    const angle = (i / categories.length) * 2 * Math.PI - Math.PI / 2;
    const r = radius * values[i] * progress;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      labelX: center + (radius + 14) * Math.cos(angle),
      labelY: center + (radius + 14) * Math.sin(angle),
      label: categories[i],
    };
  });

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  // Grid rings
  const gridRings = [0.33, 0.66, 1];

  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid */}
        {gridRings.map((r, ri) =>
          categories.map((_, i) => {
            const angle1 = (i / categories.length) * 2 * Math.PI - Math.PI / 2;
            const angle2 = ((i + 1) / categories.length) * 2 * Math.PI - Math.PI / 2;
            return (
              <line
                key={`${ri}-${i}`}
                x1={center + radius * r * Math.cos(angle1)}
                y1={center + radius * r * Math.sin(angle1)}
                x2={center + radius * r * Math.cos(angle2)}
                y2={center + radius * r * Math.sin(angle2)}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
            );
          })
        )}
        {/* Spokes */}
        {categories.map((_, i) => {
          const angle = (i / categories.length) * 2 * Math.PI - Math.PI / 2;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={center + radius * Math.cos(angle)}
              y2={center + radius * Math.sin(angle)}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          );
        })}
        {/* Filled area */}
        <path d={pathD} fill="rgba(201,168,76,0.2)" stroke={colors.gold} strokeWidth="1.5" />
        {/* Data points */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill={colors.gold} />
        ))}
      </svg>
      {/* Labels */}
      {points.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.labelX,
            top: p.labelY,
            fontSize: 7,
            color: colors.textSecondary,
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
          }}
        >
          {p.label}
        </div>
      ))}
    </div>
  );
};

const WellnessBar: React.FC<{ label: string; value: number; color: string; frame: number; delay: number }> = ({
  label, value, color, frame, delay,
}) => {
  const progress = interpolate(frame, [delay, delay + 50], [0, value], { extrapolateRight: "clamp" });
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <div style={{ fontSize: 10, color: colors.textSecondary, fontFamily: fonts.sans }}>{label}</div>
        <div style={{ fontSize: 10, color, fontFamily: fonts.sans, fontWeight: 600 }}>{Math.round(progress * 100)}%</div>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${progress * 100}%`,
            background: color,
            borderRadius: 2,
            transition: "width 0.1s",
          }}
        />
      </div>
    </div>
  );
};

const PhoneCheckinScreen: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ padding: "60px 16px 16px", fontFamily: fonts.sans, background: colors.bg, height: "100%", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ fontFamily: fonts.serif, fontSize: 16, color: colors.textPrimary, fontWeight: 600 }}>Weekly Check-in</div>
          <div style={{ fontSize: 9, color: colors.textMuted }}>Week of March 10, 2026</div>
        </div>
        <div
          style={{
            padding: "4px 10px",
            borderRadius: 20,
            background: "rgba(201,168,76,0.15)",
            border: `1px solid ${colors.border}`,
            fontSize: 9,
            color: colors.gold,
          }}
        >
          Synced ✓
        </div>
      </div>

      {/* Wellness score */}
      <div
        style={{
          padding: "14px",
          borderRadius: 14,
          background: colors.gradientCard,
          border: `1px solid ${colors.borderBright}`,
          marginBottom: 14,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 9, color: colors.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
          Relationship Health Score
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            background: colors.gradientGold,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          {Math.round(interpolate(frame, [10, 60], [0, 84], { extrapolateRight: "clamp" }))}
        </div>
        <div style={{ fontSize: 9, color: colors.textSecondary }}>Above average · Improving</div>
      </div>

      {/* Radar */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 9, color: colors.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
          Dimension Analysis
        </div>
        <RadarChart frame={frame} />
      </div>

      {/* Bars */}
      <WellnessBar label="Emotional Connection" value={0.88} color={colors.gradientGold} frame={frame} delay={20} />
      <WellnessBar label="Quality Time" value={0.72} color={colors.rose} frame={frame} delay={30} />
      <WellnessBar label="Conflict Resolution" value={0.65} color={colors.olive} frame={frame} delay={40} />
    </div>
  );
};

export const Scene06_WeeklyCheckin: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const phoneSlide = spring({ frame, fps, config: { damping: 70, stiffness: 120, mass: 0.9 } });
  const phoneY = interpolate(phoneSlide, [0, 1], [100, 0]);

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
      <GlowOrb x="25%" y="55%" size={600} color="rgba(201,168,76,0.25)" delay={0} />
      <GlowOrb x="75%" y="35%" size={450} color="rgba(192,128,138,0.2)" delay={60} />

      {/* Left text */}
      <div style={{ maxWidth: 420 }}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            letterSpacing: 5,
            color: colors.olive,
            textTransform: "uppercase",
            marginBottom: 20,
            opacity: interpolate(frame, [10, 40], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          Weekly Wellness
        </div>
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 52,
            fontWeight: 300,
            lineHeight: 1.15,
            color: colors.textPrimary,
            marginBottom: 24,
            opacity: interpolate(frame, [15, 45], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [15, 45], [30, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          Measure what{" "}
          <span style={{ background: "linear-gradient(135deg, #C0808A, #D4A0A8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            truly matters
          </span>
        </div>

        <GoldDivider width="80px" />

        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 15,
            color: colors.textSecondary,
            lineHeight: 1.7,
            marginTop: 24,
            marginBottom: 40,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          Our weekly check-in system goes beyond surface-level questions, measuring emotional connection, intimacy, communication, and five other key wellness dimensions.
        </div>

        {/* Feature list */}
        {[
          { icon: "📊", title: "8-Dimension Analysis", desc: "Holistic view of relationship health" },
          { icon: "🤝", title: "Partner Sync", desc: "Compare responses, find alignment" },
          { icon: "📈", title: "Trend Tracking", desc: "See how you grow over weeks & months" },
          { icon: "💡", title: "AI Recommendations", desc: "Actionable tips based on your data" },
        ].map(({ icon, title, desc }, i) => {
          const opacity = interpolate(frame, [40 + i * 12, 65 + i * 12], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div key={title} style={{ opacity, display: "flex", gap: 12, marginBottom: 14, alignItems: "center" }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div>
                <div style={{ fontFamily: fonts.serif, fontSize: 14, color: colors.textPrimary }}>{title}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textSecondary }}>{desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right phone */}
      <div style={{ transform: `translateY(${phoneY}px)` }}>
        <PhoneMockup scale={1}>
          <PhoneCheckinScreen />
        </PhoneMockup>
      </div>
    </div>
  );
};
