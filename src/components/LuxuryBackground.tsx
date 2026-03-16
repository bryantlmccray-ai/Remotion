import React from "react";
import { useCurrentFrame } from "remotion";
import { colors } from "../utils/colors";

/**
 * Full-screen luxury animated background — DYNAMIC VERSION
 * Much bolder, larger elements with more visible motion
 */

// Large vivid animated orbs — BIGGER and more visible
const AnimOrb: React.FC<{
  x: string; y: string; size: number; color: string;
  drift?: number; speed?: number; delay?: number;
}> = ({ x, y, size, color, drift = 30, speed = 0.02, delay = 0 }) => {
  const frame = useCurrentFrame();
  const t = (frame + delay) * speed;
  const dx = Math.sin(t) * drift;
  const dy = Math.cos(t * 0.7) * drift * 0.6;
  const scale = 1 + 0.15 * Math.sin(t * 1.3);
  const opacity = 0.55 + 0.2 * Math.sin(t * 0.8);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${scale})`,
        opacity,
        filter: `blur(${size * 0.18}px)`,
        pointerEvents: "none",
      }}
    />
  );
};

// Animated geometric grid — MORE VISIBLE
const GeometricGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const sweep = (frame * 0.4) % 100;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.09 }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`h${i}`}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${(i + 1) * 8}%`,
            height: 1,
            background: `linear-gradient(90deg, transparent 0%, ${colors.gold} ${sweep}%, transparent ${sweep + 20}%, transparent 100%)`,
          }}
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`v${i}`}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${(i + 1) * 12}%`,
            width: 1,
            background: `linear-gradient(180deg, transparent 0%, ${colors.gold} ${sweep}%, transparent ${sweep + 20}%, transparent 100%)`,
          }}
        />
      ))}
    </div>
  );
};

// Floating diamonds — BIGGER
const FloatingDiamonds: React.FC = () => {
  const frame = useCurrentFrame();

  const diamonds = [
    { x: 10, y: 15, size: 28, speed: 0.015, delay: 0, color: colors.gold },
    { x: 88, y: 72, size: 34, speed: 0.012, delay: 40, color: colors.rose },
    { x: 45, y: 85, size: 22, speed: 0.018, delay: 80, color: colors.lavender },
    { x: 75, y: 20, size: 26, speed: 0.014, delay: 20, color: colors.gold },
    { x: 25, y: 60, size: 20, speed: 0.02, delay: 60, color: colors.rose },
    { x: 60, y: 40, size: 18, speed: 0.016, delay: 100, color: colors.goldLight },
    { x: 92, y: 45, size: 24, speed: 0.013, delay: 30, color: colors.lavender },
    { x: 5, y: 80, size: 26, speed: 0.017, delay: 50, color: colors.gold },
    { x: 50, y: 10, size: 30, speed: 0.011, delay: 70, color: colors.rose },
    { x: 35, y: 35, size: 20, speed: 0.019, delay: 90, color: colors.lavenderLight },
    { x: 70, y: 65, size: 24, speed: 0.014, delay: 110, color: colors.goldLight },
    { x: 15, y: 45, size: 22, speed: 0.016, delay: 35, color: colors.rose },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {diamonds.map((d, i) => {
        const t = (frame + d.delay) * d.speed;
        const dy = Math.sin(t) * 20;
        const dx = Math.cos(t * 0.7) * 10;
        const rotate = frame * 0.4 + i * 45;
        const opacity = 0.15 + 0.1 * Math.sin(t * 2);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.size,
              height: d.size,
              border: `1.5px solid ${d.color}`,
              transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`,
              opacity,
              boxShadow: `0 0 ${d.size * 0.6}px ${d.color}`,
            }}
          />
        );
      })}
    </div>
  );
};

// Dense particle field — MORE and BIGGER
const LuxuryParticles: React.FC = () => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: 100 }, (_, i) => ({
    x: (i * 137.508) % 100,
    y: (i * 73.21) % 100,
    size: 2 + (i % 4) * 1.2,
    speed: 0.007 + (i % 7) * 0.003,
    opacity: 0.25 + (i % 5) * 0.1,
    hue: i % 3 === 0 ? colors.gold : i % 3 === 1 ? colors.rose : colors.lavenderLight,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p, i) => {
        const y = (p.y + frame * p.speed * 100) % 115 - 7;
        const drift = Math.sin(frame * 0.01 + i * 0.5) * 3;
        const pulse = 0.5 + 0.5 * Math.sin(frame * 0.04 + i);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x + drift}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: p.hue,
              opacity: p.opacity * pulse,
              boxShadow: `0 0 ${p.size * 4}px ${p.hue}`,
            }}
          />
        );
      })}
    </div>
  );
};

// Animated corner accents — BIGGER
const CornerAccents: React.FC = () => {
  const frame = useCurrentFrame();
  const len = 80 + Math.sin(frame * 0.02) * 20;
  const opacity = 0.2 + 0.08 * Math.sin(frame * 0.03);

  const cornerStyle = (position: React.CSSProperties): React.CSSProperties => ({
    position: "absolute",
    width: len,
    height: len,
    pointerEvents: "none",
    opacity,
    ...position,
  });

  return (
    <>
      <div style={cornerStyle({ top: 30, left: 30 })}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 1.5, background: colors.gradientGold }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: 1.5, height: "100%", background: colors.gradientGold }} />
      </div>
      <div style={cornerStyle({ top: 30, right: 30 })}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "100%", height: 1.5, background: colors.gradientGold }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: 1.5, height: "100%", background: colors.gradientGold }} />
      </div>
      <div style={cornerStyle({ bottom: 30, left: 30 })}>
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 1.5, background: colors.gradientGold }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 1.5, height: "100%", background: colors.gradientGold }} />
      </div>
      <div style={cornerStyle({ bottom: 30, right: 30 })}>
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "100%", height: 1.5, background: colors.gradientGold }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 1.5, height: "100%", background: colors.gradientGold }} />
      </div>
    </>
  );
};

// Sweeping light beam — WIDER and more visible
const LightBeam: React.FC = () => {
  const frame = useCurrentFrame();
  const angle = -20 + Math.sin(frame * 0.008) * 10;
  const x = -20 + (frame * 0.18) % 140;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: "-20%",
        width: 350,
        height: "140%",
        background: `linear-gradient(90deg, transparent, rgba(201,168,76,0.05), rgba(232,160,160,0.03), transparent)`,
        transform: `rotate(${angle}deg)`,
        pointerEvents: "none",
      }}
    />
  );
};

// NEW: Animated flowing arcs that sweep across the screen
const FlowingArcs: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.08 }}
      viewBox="0 0 1920 1080"
      preserveAspectRatio="none"
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const yBase = 200 + i * 180;
        const wave = Math.sin(frame * 0.015 + i * 1.2) * 80;
        const cp1x = 400 + Math.sin(frame * 0.01 + i) * 200;
        const cp2x = 1500 + Math.cos(frame * 0.012 + i) * 200;
        return (
          <path
            key={i}
            d={`M -100 ${yBase + wave} C ${cp1x} ${yBase - 100 + wave} ${cp2x} ${yBase + 100 + wave} 2020 ${yBase + wave}`}
            fill="none"
            stroke={i % 3 === 0 ? colors.gold : i % 3 === 1 ? colors.rose : colors.lavender}
            strokeWidth={1.5 - i * 0.15}
          />
        );
      })}
    </svg>
  );
};

export const LuxuryBackground: React.FC<{
  variant?: "default" | "warm" | "cool" | "rose";
  showGrid?: boolean;
  showCorners?: boolean;
  intensity?: number;
}> = ({ variant = "default", showGrid = true, showCorners = true, intensity = 1 }) => {
  const orbConfigs = {
    default: [
      { x: "15%", y: "20%", size: 800, color: "rgba(201,168,76,0.55)", drift: 50, speed: 0.015, delay: 0 },
      { x: "85%", y: "75%", size: 700, color: "rgba(232,160,160,0.45)", drift: 45, speed: 0.012, delay: 60 },
      { x: "50%", y: "10%", size: 600, color: "rgba(155,142,196,0.4)", drift: 35, speed: 0.018, delay: 30 },
      { x: "70%", y: "40%", size: 500, color: "rgba(201,168,76,0.35)", drift: 40, speed: 0.02, delay: 90 },
      { x: "30%", y: "80%", size: 450, color: "rgba(232,160,160,0.35)", drift: 30, speed: 0.016, delay: 45 },
      { x: "50%", y: "50%", size: 550, color: "rgba(201,168,76,0.25)", drift: 35, speed: 0.013, delay: 70 },
    ],
    warm: [
      { x: "20%", y: "30%", size: 900, color: "rgba(201,168,76,0.6)", drift: 55, speed: 0.013, delay: 0 },
      { x: "80%", y: "60%", size: 800, color: "rgba(232,160,160,0.5)", drift: 50, speed: 0.015, delay: 50 },
      { x: "50%", y: "85%", size: 600, color: "rgba(201,168,76,0.4)", drift: 40, speed: 0.02, delay: 25 },
      { x: "60%", y: "15%", size: 550, color: "rgba(232,160,160,0.35)", drift: 45, speed: 0.017, delay: 80 },
      { x: "40%", y: "50%", size: 500, color: "rgba(201,168,76,0.3)", drift: 35, speed: 0.014, delay: 60 },
    ],
    cool: [
      { x: "25%", y: "40%", size: 900, color: "rgba(155,142,196,0.55)", drift: 50, speed: 0.014, delay: 0 },
      { x: "75%", y: "25%", size: 700, color: "rgba(155,142,196,0.45)", drift: 45, speed: 0.016, delay: 40 },
      { x: "50%", y: "75%", size: 600, color: "rgba(201,168,76,0.4)", drift: 40, speed: 0.02, delay: 70 },
      { x: "85%", y: "65%", size: 500, color: "rgba(232,160,160,0.35)", drift: 35, speed: 0.018, delay: 20 },
      { x: "40%", y: "50%", size: 550, color: "rgba(155,142,196,0.3)", drift: 30, speed: 0.015, delay: 55 },
    ],
    rose: [
      { x: "30%", y: "35%", size: 900, color: "rgba(232,160,160,0.55)", drift: 50, speed: 0.013, delay: 0 },
      { x: "70%", y: "60%", size: 800, color: "rgba(232,160,160,0.45)", drift: 45, speed: 0.015, delay: 60 },
      { x: "50%", y: "15%", size: 600, color: "rgba(201,168,76,0.4)", drift: 40, speed: 0.02, delay: 30 },
      { x: "85%", y: "30%", size: 500, color: "rgba(155,142,196,0.35)", drift: 35, speed: 0.017, delay: 90 },
      { x: "20%", y: "70%", size: 550, color: "rgba(232,160,160,0.3)", drift: 30, speed: 0.014, delay: 45 },
    ],
  };

  const gradients = {
    default: `radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.1) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 30%, rgba(232,160,160,0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 90%, rgba(155,142,196,0.06) 0%, transparent 50%),
              linear-gradient(180deg, #0D0D14 0%, #0A0A12 30%, #0E0B16 60%, #0A0A0F 100%)`,
    warm: `radial-gradient(ellipse at 30% 40%, rgba(201,168,76,0.12) 0%, transparent 60%),
           radial-gradient(ellipse at 70% 70%, rgba(232,160,160,0.1) 0%, transparent 50%),
           radial-gradient(ellipse at 50% 10%, rgba(201,168,76,0.08) 0%, transparent 50%),
           linear-gradient(180deg, #0D0B08 0%, #0F0A0A 40%, #0A0A0F 100%)`,
    cool: `radial-gradient(ellipse at 25% 50%, rgba(155,142,196,0.12) 0%, transparent 60%),
           radial-gradient(ellipse at 75% 30%, rgba(155,142,196,0.08) 0%, transparent 50%),
           radial-gradient(ellipse at 50% 80%, rgba(201,168,76,0.06) 0%, transparent 50%),
           linear-gradient(180deg, #0A0A14 0%, #0D0B18 40%, #0A0A0F 100%)`,
    rose: `radial-gradient(ellipse at 30% 50%, rgba(232,160,160,0.12) 0%, transparent 60%),
           radial-gradient(ellipse at 70% 30%, rgba(232,160,160,0.08) 0%, transparent 50%),
           radial-gradient(ellipse at 50% 80%, rgba(201,168,76,0.08) 0%, transparent 50%),
           linear-gradient(180deg, #0F0A0C 0%, #0D0A10 40%, #0A0A0F 100%)`,
  };

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* Base gradient mesh */}
      <div style={{ position: "absolute", inset: 0, background: gradients[variant] }} />

      {/* Light beam */}
      <LightBeam />

      {/* Flowing arcs */}
      <FlowingArcs />

      {/* Grid lines */}
      {showGrid && <GeometricGrid />}

      {/* Floating diamonds */}
      <FloatingDiamonds />

      {/* Glow orbs */}
      {orbConfigs[variant].map((orb, i) => (
        <AnimOrb key={i} {...orb} drift={orb.drift * intensity} />
      ))}

      {/* Particles */}
      <LuxuryParticles />

      {/* Corner accents */}
      {showCorners && <CornerAccents />}

      {/* Top/bottom vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, rgba(10,10,15,0.25) 0%, transparent 15%, transparent 85%, rgba(10,10,15,0.25) 100%)`,
        }}
      />
    </div>
  );
};
