import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { LuxuryBackground } from "../components/LuxuryBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { DynamicElements } from "../components/DynamicElements";

const RadarChart: React.FC<{ frame: number }> = ({ frame }) => {
  const progress = interpolate(frame, [0, 80], [0, 1], { extrapolateRight: "clamp" });
  const size = 130;
  const center = size / 2;
  const radius = 50;
  const categories = ["Intimacy", "Trust", "Communication", "Support", "Growth"];
  const values = [0.85, 0.78, 0.92, 0.88, 0.75];
  const points = categories.map((_, i) => {
    const angle = (i / categories.length) * 2 * Math.PI - Math.PI / 2;
    const r = radius * values[i] * progress;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle), labelX: center + (radius + 16) * Math.cos(angle), labelY: center + (radius + 16) * Math.sin(angle), label: categories[i] };
  });
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  const gridRings = [0.33, 0.66, 1];
  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs><linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={colors.gold} stopOpacity="0.25" /><stop offset="100%" stopColor={colors.lavender} stopOpacity="0.15" /></linearGradient></defs>
        {gridRings.map((r, ri) => categories.map((_, i) => { const a1 = (i / categories.length) * 2 * Math.PI - Math.PI / 2; const a2 = ((i + 1) / categories.length) * 2 * Math.PI - Math.PI / 2; return <line key={`${ri}-${i}`} x1={center + radius * r * Math.cos(a1)} y1={center + radius * r * Math.sin(a1)} x2={center + radius * r * Math.cos(a2)} y2={center + radius * r * Math.sin(a2)} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />; }))}
        {categories.map((_, i) => { const angle = (i / categories.length) * 2 * Math.PI - Math.PI / 2; return <line key={i} x1={center} y1={center} x2={center + radius * Math.cos(angle)} y2={center + radius * Math.sin(angle)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />; })}
        <path d={pathD} fill="url(#radarFill)" stroke={colors.gold} strokeWidth="1.5" />
        {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={colors.gold} style={{ filter: `drop-shadow(0 0 4px ${colors.gold})` }} />)}
      </svg>
      {points.map((p, i) => <div key={i} style={{ position: "absolute", left: p.labelX, top: p.labelY, fontSize: 7, color: colors.textSecondary, transform: "translate(-50%, -50%)", whiteSpace: "nowrap" }}>{p.label}</div>)}
    </div>
  );
};

const WellnessBar: React.FC<{ label: string; value: number; color: string; frame: number; delay: number }> = ({ label, value, color, frame, delay }) => {
  const progress = interpolate(frame, [delay, delay + 50], [0, value], { extrapolateRight: "clamp" });
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <div style={{ fontSize: 10, color: colors.textSecondary, fontFamily: fonts.sans }}>{label}</div>
        <div style={{ fontSize: 10, color: colors.gold, fontFamily: fonts.sans, fontWeight: 600 }}>{Math.round(progress * 100)}%</div>
      </div>
      <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress * 100}%`, background: color, borderRadius: 3, boxShadow: `0 0 8px ${typeof color === 'string' && color.startsWith('#') ? color + '40' : 'rgba(201,168,76,0.3)'}` }} />
      </div>
    </div>
  );
};

const PhoneCheckinScreen: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ padding: "60px 16px 16px", fontFamily: fonts.sans, background: `linear-gradient(180deg, #0D0D14, #0A0A0F)`, height: "100%", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ fontFamily: fonts.serif, fontSize: 16, color: colors.textPrimary, fontWeight: 600 }}>Weekly Check-in</div>
          <div style={{ fontSize: 9, color: colors.textMuted }}>Week of March 10, 2026</div>
        </div>
        <div style={{ padding: "5px 12px", borderRadius: 20, background: `linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))`, border: `1px solid ${colors.border}`, fontSize: 9, color: colors.gold }}>Synced ✓</div>
      </div>
      <div style={{ padding: "16px", borderRadius: 16, background: `linear-gradient(145deg, rgba(201,168,76,0.1), rgba(155,142,196,0.05))`, border: `1px solid ${colors.borderBright}`, marginBottom: 14, textAlign: "center", boxShadow: `0 4px 24px rgba(0,0,0,0.3), 0 0 30px rgba(201,168,76,0.06)` }}>
        <div style={{ fontSize: 9, color: colors.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Relationship Health Score</div>
        <div style={{ fontSize: 52, fontWeight: 700, background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight}, ${colors.rose})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, marginBottom: 6, filter: `drop-shadow(0 0 16px rgba(201,168,76,0.3))` }}>
          {Math.round(interpolate(frame, [10, 60], [0, 84], { extrapolateRight: "clamp" }))}
        </div>
        <div style={{ fontSize: 9, color: colors.textSecondary }}>Above average · Improving</div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 9, color: colors.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Dimension Analysis</div>
        <RadarChart frame={frame} />
      </div>
      <WellnessBar label="Emotional Connection" value={0.88} color={`linear-gradient(90deg, ${colors.gold}, ${colors.goldLight})`} frame={frame} delay={20} />
      <WellnessBar label="Quality Time" value={0.72} color={colors.rose} frame={frame} delay={30} />
      <WellnessBar label="Conflict Resolution" value={0.65} color={colors.lavender} frame={frame} delay={40} />
    </div>
  );
};

export const Scene06_WeeklyCheckin: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const phoneSlide = spring({ frame, fps, config: { damping: 70, stiffness: 120, mass: 0.9 } });
  const phoneY = interpolate(phoneSlide, [0, 1], [100, 0]);
  const phoneFloat = Math.sin(frame * 0.03) * 6;
  const dividerWidth = interpolate(frame, [45, 70], [0, 120], { extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", background: colors.bg, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 70px", opacity: fadeIn, position: "relative", overflow: "hidden" }}>
      <LuxuryBackground variant="cool" intensity={1.1} />
      <DynamicElements variant="split" />

      <div style={{ maxWidth: 480, zIndex: 2 }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 14, letterSpacing: 7, color: colors.lavender, textTransform: "uppercase", marginBottom: 28, opacity: interpolate(frame, [10, 40], [0, 1], { extrapolateRight: "clamp" }), textShadow: `0 0 25px rgba(155,142,196,0.4)` }}>
          Weekly Wellness
        </div>
        <div style={{ fontFamily: fonts.serif, fontSize: 64, fontWeight: 300, lineHeight: 1.08, color: colors.textPrimary, marginBottom: 32, opacity: interpolate(frame, [15, 45], [0, 1], { extrapolateRight: "clamp" }), transform: `translateY(${interpolate(frame, [15, 45], [30, 0], { extrapolateRight: "clamp" })}px)` }}>
          Measure what{" "}
          <span style={{ background: `linear-gradient(135deg, ${colors.lavender}, ${colors.lavenderLight}, ${colors.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>truly matters</span>
        </div>

        <div style={{ width: dividerWidth, height: 2.5, background: `linear-gradient(90deg, ${colors.lavender}, ${colors.gold}, transparent)`, marginBottom: 28, boxShadow: `0 0 14px rgba(155,142,196,0.4)` }} />

        <div style={{ fontFamily: fonts.sans, fontSize: 16, color: colors.textSecondary, lineHeight: 1.7, marginBottom: 48, opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }) }}>
          Our weekly check-in system goes beyond surface-level questions, measuring emotional connection, intimacy, communication, and five other key wellness dimensions.
        </div>

        {[
          { icon: "📊", title: "8-Dimension Analysis", desc: "Holistic view of relationship health" },
          { icon: "🤝", title: "Partner Sync", desc: "Compare responses, find alignment" },
          { icon: "📈", title: "Trend Tracking", desc: "See how you grow over weeks & months" },
          { icon: "💡", title: "AI Recommendations", desc: "Actionable tips based on your data" },
        ].map(({ icon, title, desc }, i) => {
          const opacity = interpolate(frame, [40 + i * 12, 65 + i * 12], [0, 1], { extrapolateRight: "clamp" });
          const x = interpolate(frame, [40 + i * 12, 65 + i * 12], [-20, 0], { extrapolateRight: "clamp" });
          return (
            <div key={title} style={{ opacity, transform: `translateX(${x}px) perspective(800px) rotateY(${2 - i * 0.5}deg)`, display: "flex", gap: 16, marginBottom: 16, alignItems: "center", padding: "14px 18px", borderRadius: 16, background: `linear-gradient(135deg, rgba(155,142,196,0.06), rgba(201,168,76,0.03))`, border: `1px solid rgba(155,142,196,0.1)`, boxShadow: `0 4px 20px rgba(0,0,0,0.2), 0 0 12px rgba(155,142,196,0.03)` }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: `linear-gradient(135deg, rgba(155,142,196,0.15), rgba(155,142,196,0.05))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontFamily: fonts.serif, fontSize: 16, color: colors.textPrimary, fontWeight: 600 }}>{title}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 13, color: colors.textSecondary }}>{desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ transform: `translateY(${phoneY + phoneFloat}px)`, zIndex: 2 }}>
        <PhoneMockup scale={1.1} rotateY={-6 + Math.sin(frame * 0.025) * 5} rotateX={2 + Math.cos(frame * 0.02) * 2} perspective={1000}>
          <PhoneCheckinScreen />
        </PhoneMockup>
      </div>
    </div>
  );
};
