import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { LuxuryBackground } from "../components/LuxuryBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { DynamicElements } from "../components/DynamicElements";

const ConnectionLine: React.FC<{ x1: number; y1: number; x2: number; y2: number; progress: number; idx: number }> = ({ x1, y1, x2, y2, progress, idx }) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - 20;
  const d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  const len = 200;
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 320 340">
      <defs><linearGradient id={`connGrad${idx}`} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={colors.gold} stopOpacity="0.9" /><stop offset="100%" stopColor={colors.rose} stopOpacity="0.9" /></linearGradient></defs>
      <path d={d} fill="none" stroke={`url(#connGrad${idx})`} strokeWidth="1.5" strokeDasharray={len} strokeDashoffset={len * (1 - progress)} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 4px rgba(201,168,76,0.3))` }} />
    </svg>
  );
};

const ProfileCard: React.FC<{ emoji: string; name: string; age: number; trait: string; compat: number; x: number; y: number; delay: number }> = ({ emoji, name, age, trait, compat, x, y, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame: frame - delay, fps, config: { damping: 80, stiffness: 200, mass: 0.6 } });
  const opacity = interpolate(appear, [0, 1], [0, 1]);
  const float = Math.sin(frame * 0.03 + delay * 0.1) * 3;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${appear}) translateY(${float}px)`, opacity, width: 95, padding: "12px", borderRadius: 16, background: `linear-gradient(145deg, rgba(18,18,26,0.95), rgba(13,13,20,0.95))`, border: `1px solid ${colors.borderBright}`, boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.05)`, textAlign: "center" }}>
      <div style={{ fontSize: 30, marginBottom: 4 }}>{emoji}</div>
      <div style={{ fontFamily: fonts.serif, fontSize: 11, color: colors.textPrimary, fontWeight: 600 }}>{name}</div>
      <div style={{ fontFamily: fonts.sans, fontSize: 9, color: colors.textSecondary }}>{age} · {trait}</div>
      <div style={{ marginTop: 6, padding: "3px 10px", borderRadius: 12, background: `linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.08))`, fontSize: 9, color: colors.gold, fontWeight: 700, boxShadow: `0 0 8px rgba(201,168,76,0.1)` }}>{compat}% match</div>
    </div>
  );
};

const PhoneDiscoveryScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const profiles = [
    { emoji: "\uD83D\uDC68\u200D\uD83D\uDCBC", name: "James", age: 30, trait: "Communicator", compat: 94, x: 160, y: 150, delay: 20 },
    { emoji: "\uD83D\uDC69\u200D\uD83C\uDFA8", name: "Sophie", age: 27, trait: "Creative", compat: 81, x: 72, y: 240, delay: 35 },
    { emoji: "\uD83D\uDC68\u200D\uD83D\uDD2C", name: "Marcus", age: 32, trait: "Intellectual", compat: 76, x: 248, y: 240, delay: 50 },
    { emoji: "\uD83D\uDC69\u200D\u2695\uFE0F", name: "Elena", age: 29, trait: "Empath", compat: 88, x: 72, y: 140, delay: 65 },
    { emoji: "\uD83D\uDC68\u200D\uD83C\uDFAD", name: "Theo", age: 31, trait: "Adventurer", compat: 72, x: 248, y: 140, delay: 80 },
  ];
  const connProgress = interpolate(frame, [50, 100], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ padding: "60px 0 0", fontFamily: fonts.sans, background: `linear-gradient(180deg, #0D0D14, #0A0A0F)`, height: "100%", overflow: "hidden" }}>
      <div style={{ padding: "0 16px", marginBottom: 12 }}>
        <div style={{ fontFamily: fonts.serif, fontSize: 16, color: colors.textPrimary, fontWeight: 600, marginBottom: 2 }}>Discovery</div>
        <div style={{ fontSize: 9, color: colors.textSecondary }}>Compatibility-matched connections</div>
      </div>
      <div style={{ position: "relative", height: 330 }}>
        <div style={{ position: "absolute", left: "50%", top: 40, transform: "translate(-50%, 0)", zIndex: 10 }}>
          <div style={{ width: 58, height: 58, borderRadius: "50%", background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight}, ${colors.rose})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, boxShadow: `0 0 40px rgba(201,168,76,0.5), 0 0 80px rgba(201,168,76,0.2)`, border: `2px solid ${colors.borderBright}` }}>{"\uD83D\uDC69"}</div>
          <div style={{ textAlign: "center", marginTop: 4, fontSize: 9, color: colors.gold, fontWeight: 600 }}>You</div>
        </div>
        <ConnectionLine x1={160} y1={70} x2={160} y2={130} progress={connProgress} idx={0} />
        <ConnectionLine x1={160} y1={70} x2={72} y2={220} progress={connProgress * 0.9} idx={1} />
        <ConnectionLine x1={160} y1={70} x2={248} y2={220} progress={connProgress * 0.85} idx={2} />
        {profiles.map((p) => <ProfileCard key={p.name} {...p} />)}
      </div>
      <div style={{ padding: "0 16px", display: "flex", gap: 6, flexWrap: "wrap", opacity: interpolate(frame, [70, 90], [0, 1], { extrapolateRight: "clamp" }) }}>
        {["Values Aligned", "Growth Mindset", "Communicator"].map((tag) => (
          <div key={tag} style={{ padding: "5px 12px", borderRadius: 20, background: `linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))`, border: `1px solid ${colors.border}`, fontSize: 9, color: colors.gold, boxShadow: `0 0 8px rgba(201,168,76,0.08)` }}>{tag}</div>
        ))}
      </div>
    </div>
  );
};

export const Scene09_Discovery: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const phoneScale = spring({ frame, fps, config: { damping: 70, stiffness: 120, mass: 0.9 } });
  const phoneFloat = Math.sin(frame * 0.03) * 6;
  const dividerWidth = interpolate(frame, [45, 70], [0, 120], { extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", background: colors.bg, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 70px", opacity: fadeIn, position: "relative", overflow: "hidden" }}>
      <LuxuryBackground variant="rose" intensity={1.1} />
      <DynamicElements variant="split" />

      {/* Decorative connection web */}
      <svg style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none", opacity: 0.06 }} viewBox="0 0 1920 1080">
        {Array.from({ length: 15 }).map((_, i) => {
          const x1 = 150 + (i * 137) % 1600;
          const y1 = 80 + (i * 83) % 920;
          const x2 = 150 + ((i + 3) * 137) % 1600;
          const y2 = 80 + ((i + 3) * 83) % 920;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 2 === 0 ? colors.rose : colors.gold} strokeWidth="1.2" />;
        })}
        {Array.from({ length: 10 }).map((_, i) => {
          const cx = 150 + (i * 211) % 1600;
          const cy = 100 + (i * 127) % 880;
          return <circle key={i} cx={cx} cy={cy} r="4" fill={i % 2 === 0 ? colors.rose : colors.gold} opacity="0.5" />;
        })}
      </svg>

      <div style={{ maxWidth: 480, zIndex: 2 }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 14, letterSpacing: 7, color: colors.rose, textTransform: "uppercase", marginBottom: 28, opacity: interpolate(frame, [5, 35], [0, 1], { extrapolateRight: "clamp" }), textShadow: `0 0 25px rgba(232,160,160,0.4)` }}>
          Smart Discovery
        </div>
        <div style={{ fontFamily: fonts.serif, fontSize: 64, fontWeight: 300, lineHeight: 1.08, color: colors.textPrimary, marginBottom: 32, opacity: interpolate(frame, [15, 45], [0, 1], { extrapolateRight: "clamp" }), transform: `translateY(${interpolate(frame, [15, 45], [30, 0], { extrapolateRight: "clamp" })}px)` }}>
          Find connections that{" "}
          <span style={{ background: `linear-gradient(135deg, ${colors.rose}, ${colors.roseLight}, ${colors.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>truly resonate</span>
        </div>

        <div style={{ width: dividerWidth, height: 2.5, background: `linear-gradient(90deg, ${colors.rose}, ${colors.gold}, transparent)`, marginBottom: 28, boxShadow: `0 0 14px rgba(232,160,160,0.4)` }} />

        <div style={{ fontFamily: fonts.sans, fontSize: 16, color: colors.textSecondary, lineHeight: 1.7, marginBottom: 48, opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }) }}>
          Our compatibility engine goes beyond surface attraction, matching you on values, communication styles, life goals, and emotional intelligence profiles.
        </div>

        {[
          { icon: "\uD83E\uDDEC", title: "Deep Compatibility", desc: "12-dimension matching algorithm" },
          { icon: "\uD83C\uDFAF", title: "Values-First", desc: "Aligned on what matters most" },
          { icon: "\uD83C\uDF10", title: "Curated Network", desc: "Quality over quantity, always" },
          { icon: "\uD83D\uDD10", title: "Safe Space", desc: "Verified, respectful community" },
        ].map(({ icon, title, desc }, i) => {
          const opacity = interpolate(frame, [40 + i * 10, 65 + i * 10], [0, 1], { extrapolateRight: "clamp" });
          const x = interpolate(frame, [40 + i * 10, 65 + i * 10], [-20, 0], { extrapolateRight: "clamp" });
          return (
            <div key={title} style={{ opacity, transform: `translateX(${x}px) perspective(800px) rotateY(${2 - i * 0.8}deg)`, display: "flex", gap: 16, marginBottom: 16, alignItems: "center", padding: "14px 18px", borderRadius: 16, background: `linear-gradient(135deg, rgba(232,160,160,0.06), rgba(201,168,76,0.03))`, border: `1px solid rgba(232,160,160,0.1)`, boxShadow: `0 4px 20px rgba(0,0,0,0.2), 0 0 12px rgba(232,160,160,0.03)` }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: `linear-gradient(135deg, rgba(232,160,160,0.15), rgba(232,160,160,0.05))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontFamily: fonts.serif, fontSize: 16, color: colors.textPrimary, fontWeight: 600 }}>{title}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 13, color: colors.textSecondary }}>{desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ transform: `scale(${phoneScale}) translateY(${phoneFloat}px)`, zIndex: 2 }}>
        <PhoneMockup scale={1.1} rotateY={-6 + Math.sin(frame * 0.025) * 4} rotateX={2} perspective={1000}>
          <PhoneDiscoveryScreen />
        </PhoneMockup>
      </div>
    </div>
  );
};
