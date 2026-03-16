import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { LuxuryBackground } from "../components/LuxuryBackground";

const StatPill: React.FC<{ num: string; label: string; delay: number; index: number }> = ({ num, label, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame: frame - delay, fps, config: { damping: 80, stiffness: 200, mass: 0.6 } });
  const float = Math.sin(frame * 0.03 + delay * 0.1) * 3;

  // 3D tilt per pill: center pill (index 1) is flat, others tilt outward
  const tiltY = (index - 1) * 5;

  return (
    <div
      style={{
        opacity: appear,
        transform: `perspective(800px) rotateY(${tiltY}deg) scale(${appear}) translateY(${float}px)`,
        padding: "24px 36px",
        borderRadius: 22,
        background: `linear-gradient(145deg, rgba(201,168,76,0.1), rgba(155,142,196,0.05))`,
        border: `1px solid ${colors.borderBright}`,
        textAlign: "center",
        backdropFilter: "blur(12px)",
        boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 24px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 44,
          fontWeight: 700,
          background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight}, ${colors.rose})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1,
          marginBottom: 8,
          filter: `drop-shadow(0 0 12px rgba(201,168,76,0.3))`,
        }}
      >
        {num}
      </div>
      <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textSecondary, letterSpacing: 2 }}>{label}</div>
    </div>
  );
};

export const Scene11_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Animated hearts orbiting — more of them, different sizes
  const hearts = [
    { emoji: "\uD83D\uDC9B", offset: 0, radius: 300, speed: 1.2, size: 28, opacity: 0.4 },
    { emoji: "\uD83C\uDF39", offset: Math.PI, radius: 300, speed: 1.2, size: 24, opacity: 0.3 },
    { emoji: "\uD83D\uDCAB", offset: Math.PI / 2, radius: 350, speed: 0.8, size: 20, opacity: 0.25 },
    { emoji: "\u2728", offset: Math.PI * 1.5, radius: 340, speed: 0.9, size: 18, opacity: 0.2 },
  ];

  // Main title
  const titleScale = spring({ frame, fps, config: { damping: 60, stiffness: 100, mass: 1 } });
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // Tagline
  const tagOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });
  const tagY = interpolate(frame, [30, 60], [20, 0], { extrapolateRight: "clamp" });

  // CTA button pulse
  const btnScale = 1 + 0.04 * Math.sin(frame * 0.12);
  const btnGlow = 0.3 + 0.2 * Math.sin(frame * 0.08);

  const statsOpacity = interpolate(frame, [50, 80], [0, 1], { extrapolateRight: "clamp" });

  // Final shimmer
  const shimmerX = interpolate(frame, [60, 120], [-200, 500], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Expanding rings from center
  const ring1 = (frame * 0.4) % 100;
  const ring2 = ((frame * 0.4) + 50) % 100;

  // 3D rotation for logo section
  const logoRotateY = Math.sin(frame * 0.02) * 8;
  const logoRotateX = Math.cos(frame * 0.015) * 5;

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
      <LuxuryBackground variant="warm" intensity={1.2} />

      {/* Expanding concentric rings */}
      {[ring1, ring2].map((r, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: r * 14,
            height: r * 14,
            borderRadius: "50%",
            border: `1px solid ${colors.gold}`,
            transform: "translate(-50%, -50%)",
            opacity: 0.06 * (1 - r / 100),
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Orbiting emojis */}
      {hearts.map((h, i) => {
        const angle = frame * h.speed * (Math.PI / 180) + h.offset;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(${h.radius * Math.cos(angle)}px, ${h.radius * 0.45 * Math.sin(angle)}px)`,
              fontSize: h.size,
              opacity: h.opacity,
              filter: "blur(1px)",
              pointerEvents: "none",
            }}
          >
            {h.emoji}
          </div>
        );
      })}

      {/* Main logo with 3D perspective wrapper */}
      <div
        style={{
          perspective: 600,
          zIndex: 2,
        }}
      >
        <div
          style={{
            transform: `scale(${titleScale}) rotateY(${logoRotateY}deg) rotateX(${logoRotateX}deg)`,
            opacity: titleOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 44,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              border: `2px solid ${colors.borderBright}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 28,
              background: `radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.03) 60%, transparent 80%)`,
              boxShadow: `0 0 80px rgba(201,168,76,0.3), 0 0 160px rgba(201,168,76,0.1), inset 0 0 40px rgba(201,168,76,0.05)`,
            }}
          >
            <svg width="48" height="44" viewBox="0 0 48 44" fill="none">
              <path
                d="M24 40C24 40 2 26 2 14C2 7.4 7.4 2 14 2C17.6 2 20.8 3.6 24 6.4C27.2 3.6 30.4 2 34 2C40.6 2 46 7.4 46 14C46 26 24 40 24 40Z"
                fill="url(#heartGradCTA11)"
              />
              <defs>
                <linearGradient id="heartGradCTA11" x1="2" y1="2" x2="46" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#C9A84C" />
                  <stop offset="0.5" stopColor="#E8C97A" />
                  <stop offset="1" stopColor="#E8A0A0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div style={{ position: "relative", overflow: "hidden" }}>
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 84,
                fontWeight: 300,
                letterSpacing: 24,
                color: colors.textPrimary,
                textTransform: "uppercase",
                lineHeight: 1,
                textShadow: `0 0 60px rgba(201,168,76,0.3), 0 0 120px rgba(201,168,76,0.1)`,
              }}
            >
              MONARK
            </div>
            {/* Shimmer */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)`,
                transform: `translateX(${shimmerX}px)`,
                width: 140,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
          textAlign: "center",
          marginBottom: 54,
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 32,
            fontWeight: 300,
            color: colors.textPrimary,
            marginBottom: 14,
          }}
        >
          Your love story deserves{" "}
          <span style={{ background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight}, ${colors.rose})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            extraordinary care
          </span>
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 15, color: colors.textSecondary, letterSpacing: 3 }}>
          Join 50,000+ couples building a lasting, fulfilling relationship
        </div>
      </div>

      {/* Stats with 3D tilt */}
      <div style={{ display: "flex", gap: 28, marginBottom: 54, opacity: statsOpacity, zIndex: 2 }}>
        <StatPill num="50K+" label="Couples Thriving" delay={55} index={0} />
        <StatPill num="4.9\u2605" label="App Store Rating" delay={65} index={1} />
        <StatPill num="95%" label="Report Improvement" delay={75} index={2} />
      </div>

      {/* CTA Button with 3D depth */}
      <div
        style={{
          transform: `scale(${btnScale})`,
          opacity: interpolate(frame, [70, 90], [0, 1], { extrapolateRight: "clamp" }),
          position: "relative",
          zIndex: 2,
          perspective: 800,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -12,
            borderRadius: 50,
            background: `linear-gradient(135deg, ${colors.gold}, ${colors.rose})`,
            opacity: btnGlow * 0.25,
            filter: "blur(20px)",
          }}
        />
        <div
          style={{
            position: "relative",
            background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight}, ${colors.gold})`,
            borderRadius: 50,
            padding: "22px 64px",
            boxShadow: `0 8px 40px rgba(201,168,76,${btnGlow}), 0 0 80px rgba(201,168,76,0.15), 0 20px 40px rgba(0,0,0,0.3)`,
            transform: `translateZ(20px)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: 17,
              fontWeight: 700,
              color: "#0A0A0F",
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Begin Your Journey
          </div>
        </div>
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 44,
          fontFamily: fonts.sans,
          fontSize: 12,
          letterSpacing: 4,
          color: colors.textMuted,
          textTransform: "uppercase",
          opacity: interpolate(frame, [90, 120], [0, 0.6], { extrapolateRight: "clamp" }),
        }}
      >
        monark.app &middot; Your Love. Elevated.
      </div>
    </div>
  );
};
