import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { PhoneMockup } from "../components/PhoneMockup";

const RIFRadar: React.FC<{ frame: number }> = ({ frame }) => {
  const progress = interpolate(frame, [10, 80], [0, 1], { extrapolateRight: "clamp" });
  const size = 140;
  const center = size / 2;
  const radius = 56;

  const dimensions = [
    { label: "Emotional", value: 0.92, color: colors.rose },
    { label: "Social", value: 0.71, color: colors.gold },
    { label: "Growth", value: 0.88, color: colors.olive },
    { label: "Adventure", value: 0.65, color: colors.goldLight },
    { label: "Loyalty", value: 0.95, color: colors.accent },
    { label: "Creative", value: 0.78, color: colors.accentLight },
  ];

  const points = dimensions.map((d, i) => {
    const angle = (i / dimensions.length) * 2 * Math.PI - Math.PI / 2;
    const r = radius * d.value * progress;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      labelX: center + (radius + 16) * Math.cos(angle),
      labelY: center + (radius + 16) * Math.sin(angle),
      ...d,
    };
  });

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto 8px" }}>
      <svg width={size} height={size}>
        {[0.33, 0.66, 1].map((r) =>
          dimensions.map((_, i) => {
            const a1 = (i / dimensions.length) * 2 * Math.PI - Math.PI / 2;
            const a2 = ((i + 1) / dimensions.length) * 2 * Math.PI - Math.PI / 2;
            return (
              <line key={`${r}-${i}`} x1={center + radius * r * Math.cos(a1)} y1={center + radius * r * Math.sin(a1)} x2={center + radius * r * Math.cos(a2)} y2={center + radius * r * Math.sin(a2)} stroke="rgba(67,54,39,0.08)" strokeWidth="1" />
            );
          })
        )}
        {dimensions.map((_, i) => {
          const angle = (i / dimensions.length) * 2 * Math.PI - Math.PI / 2;
          return <line key={i} x1={center} y1={center} x2={center + radius * Math.cos(angle)} y2={center + radius * Math.sin(angle)} stroke="rgba(67,54,39,0.06)" strokeWidth="1" />;
        })}
        <path d={pathD} fill="rgba(166,147,95,0.12)" stroke={colors.gold} strokeWidth="1.5" />
        {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={3} fill={p.color} />)}
      </svg>
      {points.map((p, i) => (
        <div key={i} style={{ position: "absolute", left: p.labelX, top: p.labelY, fontSize: 7, color: p.color, transform: "translate(-50%, -50%)", whiteSpace: "nowrap", fontWeight: 600 }}>
          {p.label}
        </div>
      ))}
    </div>
  );
};

const MatchQualityBar: React.FC<{ label: string; value: number; maxValue: number; color: string; frame: number; delay: number }> = ({
  label, value, maxValue, color, frame, delay,
}) => {
  const progress = interpolate(frame, [delay, delay + 40], [0, value / maxValue], { extrapolateRight: "clamp" });
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <div style={{ fontSize: 9, color: colors.textSecondary }}>{label}</div>
        <div style={{ fontSize: 9, color, fontWeight: 600 }}>{Math.round(progress * maxValue)}%</div>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: "rgba(67,54,39,0.06)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress * 100}%`, background: color, borderRadius: 2 }} />
      </div>
    </div>
  );
};

const PhoneInsightsScreen: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ padding: "56px 14px 14px", fontFamily: fonts.sans, background: colors.bgCard, height: "100%", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <div style={{ fontFamily: fonts.serif, fontSize: 16, color: colors.textPrimary, fontWeight: 600 }}>RIF Insights</div>
          <div style={{ fontSize: 9, color: colors.textMuted }}>Your Relational Intelligence</div>
        </div>
        <div style={{ padding: "4px 10px", borderRadius: 20, background: "rgba(94,110,74,0.1)", border: `1px solid rgba(94,110,74,0.2)`, fontSize: 9, color: colors.olive }}>
          Updated today
        </div>
      </div>

      <div style={{ padding: "12px", borderRadius: 14, background: colors.gradientCard, border: `1px solid ${colors.borderBright}`, marginBottom: 12, textAlign: "center" }}>
        <div style={{ fontSize: 8, color: colors.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Your RIF Score</div>
        <div style={{ fontSize: 44, fontWeight: 700, background: colors.gradientGold, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, marginBottom: 4 }}>
          {Math.round(interpolate(frame, [15, 60], [0, 84], { extrapolateRight: "clamp" }))}
        </div>
        <div style={{ fontSize: 9, color: colors.textSecondary }}>Top 12% of members</div>
      </div>

      <RIFRadar frame={frame} />

      <div style={{ fontSize: 8, color: colors.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, marginTop: 4 }}>
        Match Quality Metrics
      </div>
      <MatchQualityBar label="Values Alignment" value={94} maxValue={100} color={colors.gold} frame={frame} delay={40} />
      <MatchQualityBar label="Communication Style" value={88} maxValue={100} color={colors.rose} frame={frame} delay={50} />
      <MatchQualityBar label="Attachment Compat." value={91} maxValue={100} color={colors.olive} frame={frame} delay={60} />
      <MatchQualityBar label="Growth Orientation" value={85} maxValue={100} color={colors.accent} frame={frame} delay={70} />
    </div>
  );
};

export const Scene08_Insights: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const phoneSlide = spring({ frame, fps, config: { damping: 70, stiffness: 120, mass: 0.9 } });
  const phoneX = interpolate(phoneSlide, [0, 1], [200, 0]);

  return (
    <div
      style={{
        width: "100%", height: "100%", background: colors.gradientBg,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 80px", opacity: fadeIn, position: "relative", overflow: "hidden",
      }}
    >
      <ParticleField />
      <GlowOrb x="30%" y="45%" size={600} color="rgba(94,110,74,0.1)" delay={0} />
      <GlowOrb x="80%" y="60%" size={400} color="rgba(166,147,95,0.1)" delay={50} />

      <div style={{ maxWidth: 430 }}>
        <div
          style={{
            fontFamily: fonts.sans, fontSize: 12, letterSpacing: 5, color: colors.olive,
            textTransform: "uppercase", marginBottom: 20,
            opacity: interpolate(frame, [5, 35], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          RIF Intelligence
        </div>
        <div
          style={{
            fontFamily: fonts.serif, fontSize: 52, fontWeight: 300, lineHeight: 1.15,
            color: colors.textPrimary, marginBottom: 24,
            opacity: interpolate(frame, [15, 45], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [15, 45], [30, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          Know your{" "}
          <span style={{ background: colors.gradientGold, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            relational DNA
          </span>
        </div>
        <div style={{ width: 80, height: 1, background: colors.gradientGold, marginBottom: 24 }} />
        <div
          style={{
            fontFamily: fonts.sans, fontSize: 15, color: colors.textSecondary, lineHeight: 1.7, marginBottom: 40,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          Your RIF profile maps 6 core dimensions of how you connect, love, and grow.
          See your strengths, understand your patterns, and discover why certain
          matches resonate deeply while others don't.
        </div>

        {[
          { icon: "🧬", title: "6 Dimensions Mapped", desc: "Emotional, Social, Growth, Adventure, Loyalty, Creative" },
          { icon: "📊", title: "Match Quality Scores", desc: "See exactly why you click with each match" },
          { icon: "🔍", title: "Pattern Detection", desc: "AI spots relationship patterns you might miss" },
          { icon: "📈", title: "Growth Tracking", desc: "Watch your relational intelligence evolve" },
        ].map(({ icon, title, desc }, i) => (
          <div key={title} style={{ opacity: interpolate(frame, [40 + i * 10, 65 + i * 10], [0, 1], { extrapolateRight: "clamp" }), display: "flex", gap: 12, marginBottom: 14, alignItems: "center" }}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            <div>
              <div style={{ fontFamily: fonts.serif, fontSize: 14, color: colors.textPrimary }}>{title}</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textSecondary }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ transform: `translateX(${phoneX}px)` }}>
        <PhoneMockup scale={1}><PhoneInsightsScreen /></PhoneMockup>
      </div>
    </div>
  );
};
