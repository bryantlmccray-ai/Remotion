import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { PhoneMockup } from "../components/PhoneMockup";
import { GoldDivider } from "../components/GoldDivider";
import { SPRING, ease, animateCounter } from "../utils/animations";

/**
 * SCENE 6 — WEEKLY CHECK-IN (0:32–0:40)
 *
 * The flagship feature. Data visualization comes alive.
 * Radar chart draws itself. Score counter ticks up.
 * Wellness bars fill with satisfying momentum.
 * Phone is on the right, text on left with lavender accents.
 */

const RadarChart: React.FC<{ frame: number }> = ({ frame }) => {
  const drawProgress = interpolate(frame, [5, 70], [0, 1], {
    extrapolateRight: "clamp",
    easing: ease.outQuart,
  });
  const size = 130;
  const center = size / 2;
  const radius = 48;
  const categories = ["Intimacy", "Trust", "Comm", "Support", "Growth"];
  const values = [0.85, 0.78, 0.92, 0.88, 0.75];

  // Ambient rotation — the chart slowly turns
  const chartRotation = frame * 0.15;

  const points = categories.map((_, i) => {
    const angle = (i / categories.length) * 2 * Math.PI - Math.PI / 2 + (chartRotation * Math.PI) / 180;
    const r = radius * values[i] * drawProgress;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      labelX: center + (radius + 16) * Math.cos(angle),
      labelY: center + (radius + 16) * Math.sin(angle),
      label: categories[i],
    };
  });

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  const gridRings = [0.33, 0.66, 1];

  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid lines */}
        {gridRings.map((r, ri) =>
          categories.map((_, i) => {
            const angle1 = (i / categories.length) * 2 * Math.PI - Math.PI / 2 + (chartRotation * Math.PI) / 180;
            const angle2 = ((i + 1) / categories.length) * 2 * Math.PI - Math.PI / 2 + (chartRotation * Math.PI) / 180;
            return (
              <line
                key={`${ri}-${i}`}
                x1={center + radius * r * Math.cos(angle1)}
                y1={center + radius * r * Math.sin(angle1)}
                x2={center + radius * r * Math.cos(angle2)}
                y2={center + radius * r * Math.sin(angle2)}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.8"
              />
            );
          })
        )}
        {/* Spokes */}
        {categories.map((_, i) => {
          const angle = (i / categories.length) * 2 * Math.PI - Math.PI / 2 + (chartRotation * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={center + radius * Math.cos(angle)}
              y2={center + radius * Math.sin(angle)}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.8"
            />
          );
        })}
        {/* Filled area — glows */}
        {drawProgress > 0.05 && (
          <path
            d={pathD}
            fill="rgba(201,168,76,0.15)"
            stroke={colors.gold}
            strokeWidth="1.5"
            filter="url(#radarGlow)"
          />
        )}
        {/* Data point dots */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={3}
            fill={colors.goldLight}
            opacity={drawProgress > 0.3 ? 1 : 0}
          />
        ))}
        <defs>
          <filter id="radarGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
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
            opacity: drawProgress > 0.5 ? 1 : 0,
          }}
        >
          {p.label}
        </div>
      ))}
    </div>
  );
};

const WellnessBar: React.FC<{
  label: string;
  value: number;
  color: string;
  frame: number;
  delay: number;
}> = ({ label, value, color, frame, delay }) => {
  const fillProgress = interpolate(frame, [delay, delay + 40], [0, value], {
    extrapolateRight: "clamp",
    easing: ease.outQuart,
  });
  const barOpacity = interpolate(frame, [delay - 5, delay + 5], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ marginBottom: 9, opacity: barOpacity }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <div style={{ fontSize: 9, color: colors.textSecondary, fontFamily: fonts.sans }}>{label}</div>
        <div style={{ fontSize: 9, color: colors.textGold, fontFamily: fonts.sans, fontWeight: 600 }}>
          {Math.round(fillProgress * 100)}%
        </div>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${fillProgress * 100}%`,
            background: color,
            borderRadius: 2,
            boxShadow: `0 0 8px ${typeof color === "string" && color.startsWith("#") ? color + "40" : "rgba(201,168,76,0.2)"}`,
          }}
        />
      </div>
    </div>
  );
};

const PhoneCheckinScreen: React.FC = () => {
  const frame = useCurrentFrame();

  // Animated counter for the health score
  const score = animateCounter(frame, 15, 55, 0, 84);

  return (
    <div style={{ padding: "60px 16px 16px", fontFamily: fonts.sans, background: colors.bg, height: "100%", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <div style={{ fontFamily: fonts.serif, fontSize: 15, color: colors.textPrimary, fontWeight: 600 }}>Weekly Check-in</div>
          <div style={{ fontSize: 8, color: colors.textMuted }}>Week of March 10, 2026</div>
        </div>
        <div
          style={{
            padding: "3px 8px",
            borderRadius: 16,
            background: colors.emeraldDim,
            border: `1px solid rgba(74,222,128,0.3)`,
            fontSize: 8,
            color: colors.emerald,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: colors.emerald, boxShadow: `0 0 6px ${colors.emerald}` }} />
          Synced
        </div>
      </div>

      {/* Wellness score card */}
      <div
        style={{
          padding: "14px",
          borderRadius: 14,
          background: colors.gradientCard,
          border: `1px solid ${colors.borderBright}`,
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 8, color: colors.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
          Relationship Health
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            background: colors.gradientGold,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
            marginBottom: 4,
            filter: `drop-shadow(0 0 8px rgba(201,168,76,0.3))`,
          }}
        >
          {score}
        </div>
        <div style={{ fontSize: 8, color: colors.textSecondary }}>Above average · Improving ↑</div>
      </div>

      {/* Radar Chart */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 8, color: colors.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
          Dimension Analysis
        </div>
        <RadarChart frame={frame} />
      </div>

      {/* Wellness Bars */}
      <WellnessBar label="Emotional Connection" value={0.88} color={colors.gradientGold} frame={frame} delay={25} />
      <WellnessBar label="Quality Time" value={0.72} color={colors.rose} frame={frame} delay={35} />
      <WellnessBar label="Conflict Resolution" value={0.65} color={colors.lavender} frame={frame} delay={45} />
    </div>
  );
};

export const Scene06_WeeklyCheckin: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // Phone rises from below — dramatic entrance
  const phoneRise = spring({ frame, fps, config: SPRING.heavy });
  const phoneY = interpolate(phoneRise, [0, 1], [120, 0]);
  const phoneFloat = 5 * Math.sin(frame * 0.03);

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
      <GlowOrb x="25%" y="55%" size={600} color="rgba(201,168,76,0.2)" delay={0} />
      <GlowOrb x="75%" y="35%" size={450} color="rgba(155,142,196,0.18)" delay={60} />

      {/* === LEFT TEXT === */}
      <div style={{ maxWidth: 430 }}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            letterSpacing: 6,
            color: colors.lavenderLight,
            textTransform: "uppercase",
            marginBottom: 22,
            opacity: interpolate(frame, [5, 25], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          Weekly Wellness
        </div>
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 52,
            fontWeight: 300,
            lineHeight: 1.12,
            color: colors.textPrimary,
            marginBottom: 24,
            opacity: interpolate(frame, [10, 35], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [10, 35], [25, 0], { extrapolateRight: "clamp", easing: ease.outCubic })}px)`,
          }}
        >
          Measure what{" "}
          <span style={{ background: colors.gradientLavender, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            truly matters
          </span>
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
            opacity: interpolate(frame, [30, 55], [0, 1], { extrapolateRight: "clamp" }),
            filter: `blur(${interpolate(frame, [30, 55], [4, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          Our weekly check-in system goes beyond surface-level questions, measuring
          emotional connection, intimacy, communication, and five key wellness dimensions.
        </div>

        {/* Feature list */}
        {[
          { icon: "📊", title: "8-Dimension Analysis", desc: "Holistic view of relationship health" },
          { icon: "🤝", title: "Partner Sync", desc: "Compare responses, find alignment" },
          { icon: "📈", title: "Trend Tracking", desc: "See growth over weeks & months" },
          { icon: "💡", title: "AI Recommendations", desc: "Actionable tips based on your data" },
        ].map(({ icon, title, desc }, i) => {
          const fProgress = spring({ frame: frame - (45 + i * 10), fps, config: SPRING.velvet });
          const fOpacity = interpolate(frame, [45 + i * 10, 60 + i * 10], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={title}
              style={{
                opacity: fOpacity,
                transform: `translateX(${(1 - fProgress) * 25}px)`,
                display: "flex",
                gap: 12,
                marginBottom: 12,
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 20 }}>{icon}</span>
              <div>
                <div style={{ fontFamily: fonts.serif, fontSize: 14, color: colors.textPrimary, fontWeight: 600 }}>{title}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textSecondary }}>{desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* === RIGHT: PHONE === */}
      <div style={{ transform: `translateY(${phoneY + phoneFloat}px)` }}>
        <PhoneMockup scale={1.05} screenBloom bloomDelay={8}>
          <PhoneCheckinScreen />
        </PhoneMockup>
      </div>
    </div>
  );
};
