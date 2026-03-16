import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { LuxuryBackground } from "../components/LuxuryBackground";
import { DynamicElements } from "../components/DynamicElements";

const StatPill: React.FC<{ num: string; label: string; delay: number; index: number }> = ({ num, label, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame: frame - delay, fps, config: { damping: 80, stiffness: 200, mass: 0.6 } });
  const float = Math.sin(frame * 0.03 + delay * 0.1) * 4;
  const tiltY = (index - 1) * 6;

  return (
    <div
      style={{
        opacity: appear,
        transform: `perspective(800px) rotateY(${tiltY}deg) scale(${appear}) translateY(${float}px)`,
        padding: "28px 44px",
        borderRadius: 24,
        background: `linear-gradient(145deg, rgba(201,168,76,0.12), rgba(155,142,196,0.06))`,
        border: `1px solid ${colors.borderBright}`,
        textAlign: "center",
        backdropFilter: "blur(12px)",
        boxShadow: `0 10px 40px rgba(0,0,0,0.3), 0 0 30px rgba(201,168,76,0.1), inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 52,
          fontWeight: 700,
          background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight}, ${colors.rose})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1,
          marginBottom: 10,
          filter: `drop-shadow(0 0 16px rgba(201,168,76,0.4))`,
        }}
      >
        {num}
      </div>
      <div style={{ fontFamily: fonts.sans, fontSize: 13, color: colors.textSecondary, letterSpacing: 2 }}>{label}</div>
    </div>
  );
};

export const Scene11_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // MORE hearts/emojis orbiting — bigger, faster
  const hearts = [
    { emoji: "\uD83D\uDC9B", offset: 0, radius: 350, speed: 1.5, size: 34, opacity: 0.45 },
    { emoji: "\uD83C\uDF39", offset: Math.PI, radius: 350, speed: 1.5, size: 30, opacity: 0.35 },
    { emoji: "\uD83D\uDCAB", offset: Math.PI / 2, radius: 400, speed: 1.0, size: 26, opacity: 0.3 },
    { emoji: "\u2728", offset: Math.PI * 1.5, radius: 390, speed: 1.1, size: 24, opacity: 0.25 },
    { emoji: "\uD83D\uDC96", offset: Math.PI / 4, radius: 320, speed: 1.3, size: 28, opacity: 0.35 },
    { emoji: "\uD83C\uDF1F", offset: Math.PI * 1.25, radius: 430, speed: 0.8, size: 22, opacity: 0.2 },
  ];

  const titleScale = spring({ frame, fps, config: { damping: 55, stiffness: 90, mass: 1 } });
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const tagOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });
  const tagY = interpolate(frame, [30, 60], [25, 0], { extrapolateRight: "clamp" });
  const btnScale = 1 + 0.05 * Math.sin(frame * 0.12);
  const btnGlow = 0.35 + 0.25 * Math.sin(frame * 0.08);
  const statsOpacity = interpolate(frame, [50, 80], [0, 1], { extrapolateRight: "clamp" });
  const shimmerX = interpolate(frame, [60, 120], [-200, 500], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // MORE expanding rings
  const ringCount = 4;
  const rings = Array.from({ length: ringCount }).map((_, i) => ((frame * 0.5 + i * (100 / ringCount)) % 100));

  const logoRotateY = Math.sin(frame * 0.025) * 10;
  const logoRotateX = Math.cos(frame * 0.018) * 6;

  return (
    <div style={{ width: "100%", height: "100%", background: colors.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: fadeIn, position: "relative", overflow: "hidden" }}>
      <LuxuryBackground variant="warm" intensity={1.4} />
      <DynamicElements variant="grand" intensity={1.2} />

      {/* Expanding concentric rings — MORE */}
      {rings.map((r, i) => (
        <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: r * 16, height: r * 16, borderRadius: "50%", border: `${i % 2 === 0 ? 1.5 : 1}px solid ${i % 2 === 0 ? colors.gold : colors.rose}`, transform: "translate(-50%, -50%)", opacity: 0.08 * (1 - r / 100), pointerEvents: "none" }} />
      ))}

      {/* Orbiting emojis — MORE, BIGGER */}
      {hearts.map((h, i) => {
        const angle = frame * h.speed * (Math.PI / 180) + h.offset;
        return (
          <div key={i} style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(${h.radius * Math.cos(angle)}px, ${h.radius * 0.45 * Math.sin(angle)}px)`, fontSize: h.size, opacity: h.opacity, filter: "blur(0.5px)", pointerEvents: "none" }}>{h.emoji}</div>
        );
      })}

      {/* Main logo with 3D perspective — BIGGER */}
      <div style={{ perspective: 600, zIndex: 2 }}>
        <div style={{ transform: `scale(${titleScale}) rotateY(${logoRotateY}deg) rotateX(${logoRotateX}deg)`, opacity: titleOpacity, display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 48, transformStyle: "preserve-3d" }}>
          <div style={{ width: 130, height: 130, borderRadius: "50%", border: `2.5px solid ${colors.borderBright}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32, background: `radial-gradient(circle, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.04) 60%, transparent 80%)`, boxShadow: `0 0 100px rgba(201,168,76,0.4), 0 0 200px rgba(201,168,76,0.15), inset 0 0 50px rgba(201,168,76,0.06)` }}>
            <svg width="56" height="52" viewBox="0 0 48 44" fill="none">
              <path d="M24 40C24 40 2 26 2 14C2 7.4 7.4 2 14 2C17.6 2 20.8 3.6 24 6.4C27.2 3.6 30.4 2 34 2C40.6 2 46 7.4 46 14C46 26 24 40 24 40Z" fill="url(#heartGradCTA11)" />
              <defs><linearGradient id="heartGradCTA11" x1="2" y1="2" x2="46" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#C9A84C" /><stop offset="0.5" stopColor="#E8C97A" /><stop offset="1" stopColor="#E8A0A0" /></linearGradient></defs>
            </svg>
          </div>

          <div style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ fontFamily: fonts.serif, fontSize: 100, fontWeight: 300, letterSpacing: 28, color: colors.textPrimary, textTransform: "uppercase", lineHeight: 1, textShadow: `0 0 80px rgba(201,168,76,0.4), 0 0 160px rgba(201,168,76,0.15)` }}>MONARK</div>
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)`, transform: `translateX(${shimmerX}px)`, width: 160, pointerEvents: "none" }} />
          </div>
        </div>
      </div>

      {/* Tagline — BIGGER */}
      <div style={{ opacity: tagOpacity, transform: `translateY(${tagY}px)`, textAlign: "center", marginBottom: 58, zIndex: 2 }}>
        <div style={{ fontFamily: fonts.serif, fontSize: 38, fontWeight: 300, color: colors.textPrimary, marginBottom: 16 }}>
          Your love story deserves{" "}
          <span style={{ background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight}, ${colors.rose})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>extraordinary care</span>
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 17, color: colors.textSecondary, letterSpacing: 3 }}>Join 50,000+ couples building a lasting, fulfilling relationship</div>
      </div>

      {/* Stats — BIGGER */}
      <div style={{ display: "flex", gap: 32, marginBottom: 58, opacity: statsOpacity, zIndex: 2 }}>
        <StatPill num="50K+" label="Couples Thriving" delay={55} index={0} />
        <StatPill num="4.9\u2605" label="App Store Rating" delay={65} index={1} />
        <StatPill num="95%" label="Report Improvement" delay={75} index={2} />
      </div>

      {/* CTA Button — BIGGER with more glow */}
      <div style={{ transform: `scale(${btnScale})`, opacity: interpolate(frame, [70, 90], [0, 1], { extrapolateRight: "clamp" }), position: "relative", zIndex: 2, perspective: 800 }}>
        <div style={{ position: "absolute", inset: -16, borderRadius: 50, background: `linear-gradient(135deg, ${colors.gold}, ${colors.rose})`, opacity: btnGlow * 0.3, filter: "blur(24px)" }} />
        <div style={{ position: "relative", background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight}, ${colors.gold})`, borderRadius: 50, padding: "26px 76px", boxShadow: `0 10px 50px rgba(201,168,76,${btnGlow}), 0 0 100px rgba(201,168,76,0.2), 0 24px 48px rgba(0,0,0,0.3)`, transform: `translateZ(20px)`, transformStyle: "preserve-3d" }}>
          <div style={{ fontFamily: fonts.sans, fontSize: 19, fontWeight: 700, color: "#0A0A0F", letterSpacing: 4, textTransform: "uppercase" }}>Begin Your Journey</div>
        </div>
      </div>

      {/* Bottom tagline */}
      <div style={{ position: "absolute", bottom: 44, fontFamily: fonts.sans, fontSize: 14, letterSpacing: 5, color: colors.textMuted, textTransform: "uppercase", opacity: interpolate(frame, [90, 120], [0, 0.6], { extrapolateRight: "clamp" }) }}>
        monark.app &middot; Your Love. Elevated.
      </div>
    </div>
  );
};
