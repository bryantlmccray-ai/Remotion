import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { warm, warmGradients, warmFonts } from "./utils/warmColors";
import { PentagonParticles } from "./components/PentagonParticles";

// ─── TIMING (30fps, 1 minute = 1800 frames) ──────────────────────────
// Scene 1: The Arrival        0:00–0:08  → frames 0–240
// Scene 2: The Statement      0:08–0:18  → frames 240–540
// Scene 3: Phone Enters       0:18–0:30  → frames 540–900
// Scene 4: Dead Zone Alive    0:20–0:45  → frames 600–1350 (layered)
// Scene 5: Pull Together      0:45–0:55  → frames 1350–1650
// Scene 6: The Exit           0:55–1:01  → frames 1650–1830

export const WEEKLY_WELLNESS_DURATION = 1830; // 61s at 30fps

// ─── HELPER: clamp interpolation ──────────────────────────────────────
const ci = (
  frame: number,
  from: number,
  to: number,
  outputFrom: number,
  outputTo: number,
) =>
  interpolate(frame, [from, to], [outputFrom, outputTo], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// ─── SVG PENTAGON PATH ────────────────────────────────────────────────
const pentagonPoints = (cx: number, cy: number, r: number) =>
  Array.from({ length: 5 }, (_, i) => {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");

// ─── STENCIL TEXT (letter by letter, fast) ────────────────────────────
const StencilText: React.FC<{
  text: string;
  startFrame: number;
  style?: React.CSSProperties;
}> = ({ text, startFrame, style }) => {
  const frame = useCurrentFrame();
  const perLetter = 2; // frames per letter — fast stamp

  return (
    <div style={{ display: "flex", ...style }}>
      {text.split("").map((ch, i) => {
        const letterStart = startFrame + i * perLetter;
        const opacity = ci(frame, letterStart, letterStart + 3, 0, 1);
        const scale = ci(frame, letterStart, letterStart + 3, 1.3, 1);
        return (
          <span
            key={i}
            style={{
              opacity,
              transform: `scale(${scale})`,
              display: "inline-block",
              whiteSpace: "pre",
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
};

// ─── DRAWING WORDMARK (calligraphic stroke) ───────────────────────────
const DrawingWordmark: React.FC<{
  startFrame: number;
  drawDuration: number;
  opacity?: number;
  fontSize?: number;
}> = ({ startFrame, drawDuration, opacity = 1, fontSize = 72 }) => {
  const frame = useCurrentFrame();
  // The wordmark "draws" via a clip-path that reveals left to right
  const reveal = ci(frame, startFrame, startFrame + drawDuration, 0, 100);

  return (
    <div
      style={{
        fontFamily: warmFonts.display,
        fontSize,
        fontWeight: 700,
        letterSpacing: "0.08em",
        color: warm.primary,
        opacity,
        clipPath: `inset(0 ${100 - reveal}% 0 0)`,
        textAlign: "center",
      }}
    >
      MONARK
    </div>
  );
};

// ─── HEARTBEAT RIPPLES (60 BPM = 30-frame cycle) ─────────────────────
const HeartbeatRipples: React.FC<{
  startFrame: number;
  fadeOutFrame?: number;
  settleFrame?: number;
}> = ({ startFrame, fadeOutFrame = 9999, settleFrame = 9999 }) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);
  const fadeOut = ci(frame, fadeOutFrame, fadeOutFrame + 60, 1, 0);
  // During "settle" phase, ripples shrink to smallest circumference
  const settleScale = ci(frame, settleFrame, settleFrame + 90, 1, 0.3);
  const baseScale = frame >= settleFrame ? settleScale : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "60%",
        transform: "translate(-50%, -50%)",
        opacity: fadeOut,
        pointerEvents: "none",
      }}
    >
      {[0, 15].map((offset) => {
        // 60 BPM → 1 beat/sec → 30 frames per cycle
        const cycle = ((f + offset) % 30) / 30;
        const scale = (0.5 + cycle * 1.5) * baseScale;
        const opacity = 0.25 * (1 - cycle);
        return (
          <div
            key={offset}
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              border: `2px solid ${warm.primaryLight}`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};

// ─── ROTATING PENTAGON WIREFRAME (1 RPM, nearly invisible) ────────────
const RotatingPentagonWireframe: React.FC<{
  startFrame: number;
  fadeOutFrame?: number;
}> = ({ startFrame, fadeOutFrame = 9999 }) => {
  const frame = useCurrentFrame();
  const fadeIn = ci(frame, startFrame, startFrame + 60, 0, 1);
  const fadeOut = ci(frame, fadeOutFrame, fadeOutFrame + 60, 1, 0);
  // 1 RPM = 360° per 60s = 6°/s = 0.2°/frame at 30fps
  const rotation = (frame - startFrame) * 0.2;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "60%",
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        opacity: fadeIn * fadeOut * 0.12,
        pointerEvents: "none",
      }}
    >
      <svg width="360" height="360" viewBox="0 0 360 360">
        <polygon
          points={pentagonPoints(180, 180, 170)}
          fill="none"
          stroke={warm.primaryLight}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

// ─── PHONE RADAR CHART (draws sides one at a time) ────────────────────
const AnimatedRadarChart: React.FC<{ startFrame: number }> = ({
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const size = 140;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 54;
  const categories = ["Intimacy", "Trust", "Communication", "Support", "Growth"];
  const values = [0.85, 0.78, 0.92, 0.88, 0.75];

  // Each side draws in sequence: 18 frames per side, 6 frame gap → ~120 frames total
  const vertices = categories.map((_, i) => {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
    const r = radius * values[i];
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      labelX: cx + (radius + 18) * Math.cos(angle),
      labelY: cy + (radius + 18) * Math.sin(angle),
    };
  });

  // Grid
  const gridRings = [0.33, 0.66, 1];

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        margin: "0 auto",
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid rings */}
        {gridRings.map((r) => (
          <polygon
            key={r}
            points={pentagonPoints(cx, cy, radius * r)}
            fill="none"
            stroke={warm.muted}
            strokeWidth="0.5"
            opacity="0.4"
          />
        ))}
        {/* Spokes */}
        {categories.map((_, i) => {
          const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={cx + radius * Math.cos(angle)}
              y2={cy + radius * Math.sin(angle)}
              stroke={warm.muted}
              strokeWidth="0.5"
              opacity="0.3"
            />
          );
        })}
        {/* Data shape — each side draws one at a time */}
        {vertices.map((v, i) => {
          const next = vertices[(i + 1) % 5];
          const sideStart = startFrame + i * 24;
          const progress = ci(frame, sideStart, sideStart + 18, 0, 1);
          if (progress <= 0) return null;
          const endX = v.x + (next.x - v.x) * progress;
          const endY = v.y + (next.y - v.y) * progress;
          return (
            <line
              key={`side-${i}`}
              x1={v.x}
              y1={v.y}
              x2={endX}
              y2={endY}
              stroke={warm.primary}
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}
        {/* Vertex dots — appear when their side starts */}
        {vertices.map((v, i) => {
          const dotOpacity = ci(frame, startFrame + i * 24, startFrame + i * 24 + 8, 0, 1);
          return (
            <circle
              key={`dot-${i}`}
              cx={v.x}
              cy={v.y}
              r={3}
              fill={warm.primary}
              opacity={dotOpacity}
            />
          );
        })}
        {/* Fill area — appears after all sides drawn */}
        {frame > startFrame + 5 * 24 && (
          <polygon
            points={vertices.map((v) => `${v.x},${v.y}`).join(" ")}
            fill={warm.primary}
            opacity={ci(frame, startFrame + 120, startFrame + 150, 0, 0.15)}
          />
        )}
      </svg>
      {/* Labels */}
      {categories.map((cat, i) => {
        const v = vertices[i];
        const labelOpacity = ci(frame, startFrame + i * 24 + 5, startFrame + i * 24 + 15, 0, 1);
        return (
          <div
            key={cat}
            style={{
              position: "absolute",
              left: v.labelX,
              top: v.labelY,
              transform: "translate(-50%, -50%)",
              fontSize: 7,
              fontFamily: warmFonts.body,
              color: warm.mutedForeground,
              opacity: labelOpacity,
              whiteSpace: "nowrap",
            }}
          >
            {cat}
          </div>
        );
      })}
    </div>
  );
};

// ─── WELLNESS BAR (fills with deceleration) ───────────────────────────
const WellnessBar: React.FC<{
  label: string;
  value: number;
  color: string;
  startFrame: number;
}> = ({ label, value, color, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring-based fill for organic deceleration
  const springProgress = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: { damping: 60, stiffness: 80, mass: 1.2 },
  });
  const fillWidth = springProgress * value * 100;
  const displayValue = Math.round(springProgress * value * 100);
  const barOpacity = ci(frame, startFrame - 5, startFrame + 10, 0, 1);

  return (
    <div style={{ marginBottom: 10, opacity: barOpacity }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3,
        }}
      >
        <div
          style={{
            fontSize: 9,
            color: warm.mutedForeground,
            fontFamily: warmFonts.body,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 9,
            color: warm.foreground,
            fontFamily: warmFonts.body,
            fontWeight: 600,
          }}
        >
          {displayValue}%
        </div>
      </div>
      <div
        style={{
          height: 5,
          borderRadius: 3,
          background: warm.muted,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${fillWidth}%`,
            background: color,
            borderRadius: 3,
          }}
        />
      </div>
    </div>
  );
};

// ─── PHONE SCREEN (builds UI in sequence) ─────────────────────────────
const PhoneCheckinScreen: React.FC<{ phoneArrivalFrame: number }> = ({
  phoneArrivalFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.max(0, frame - phoneArrivalFrame);

  // Screen "warm bloom" — candle behind frosted glass
  const screenBloom = ci(frame, phoneArrivalFrame + 15, phoneArrivalFrame + 45, 0, 1);

  // Header slides down from top
  const headerSlide = spring({
    frame: Math.max(0, f - 20),
    fps,
    config: { damping: 70, stiffness: 120, mass: 0.8 },
  });
  const headerY = interpolate(headerSlide, [0, 1], [-40, 0]);

  // Score "84" counts up with hesitation at 79
  const scoreRaw = ci(frame, phoneArrivalFrame + 40, phoneArrivalFrame + 100, 0, 84);
  // Hesitate near 79: slow down between 75-79, then accelerate to 84
  let displayScore: number;
  if (scoreRaw <= 75) {
    displayScore = Math.round(scoreRaw);
  } else if (scoreRaw <= 79) {
    // Stretch this range — hesitate
    const hesitateProgress = (scoreRaw - 75) / 4;
    displayScore = Math.round(75 + hesitateProgress * 2); // only goes 75-77 during this range
  } else {
    // Accelerate to 84
    const accelProgress = (scoreRaw - 79) / 5;
    displayScore = Math.round(77 + accelProgress * 7); // 77→84
  }

  // Score pulse when landing
  const scoreLanded = frame > phoneArrivalFrame + 100;
  const scorePulse = scoreLanded
    ? 1 + 0.03 * Math.sin((frame - phoneArrivalFrame - 100) * 0.3) *
        Math.max(0, 1 - (frame - phoneArrivalFrame - 100) / 30)
    : 1;

  // Radar starts after score
  const radarStart = phoneArrivalFrame + 90;

  // Bars start after radar
  const barsStart = phoneArrivalFrame + 210;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: warm.card,
        fontFamily: warmFonts.body,
        padding: "52px 16px 16px",
        overflow: "hidden",
        opacity: screenBloom,
      }}
    >
      {/* Warm bloom overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 40%, ${warm.primaryLight}22 0%, transparent 70%)`,
          opacity: ci(frame, phoneArrivalFrame + 15, phoneArrivalFrame + 50, 0.8, 0.2),
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div
        style={{
          transform: `translateY(${headerY}px)`,
          opacity: ci(frame, phoneArrivalFrame + 20, phoneArrivalFrame + 35, 0, 1),
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: warmFonts.display,
              fontSize: 15,
              color: warm.foreground,
              fontWeight: 600,
            }}
          >
            Weekly Check-in
          </div>
          <div style={{ fontSize: 8, color: warm.mutedForeground }}>
            Week of March 10, 2026
          </div>
        </div>
        <div
          style={{
            padding: "3px 8px",
            borderRadius: 12,
            background: `${warm.primary}18`,
            border: `1px solid ${warm.primary}30`,
            fontSize: 8,
            color: warm.primary,
          }}
        >
          Synced ✓
        </div>
      </div>

      {/* Wellness Score Card */}
      <div
        style={{
          padding: 12,
          borderRadius: 12,
          background: warm.background,
          border: `1px solid ${warm.muted}`,
          marginBottom: 12,
          textAlign: "center",
          boxShadow: `0 2px 8px ${warm.shadow1}`,
          opacity: ci(frame, phoneArrivalFrame + 30, phoneArrivalFrame + 50, 0, 1),
        }}
      >
        <div
          style={{
            fontSize: 8,
            color: warm.mutedForeground,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 6,
            fontFamily: warmFonts.caption,
            fontWeight: 700,
          }}
        >
          Relationship Health Score
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            fontFamily: warmFonts.display,
            background: warmGradients.gold,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
            marginBottom: 4,
            transform: `scale(${scorePulse})`,
          }}
        >
          {displayScore}
        </div>
        <div
          style={{
            fontSize: 8,
            color: warm.mutedForeground,
            fontFamily: warmFonts.body,
          }}
        >
          Above average · Improving
        </div>
      </div>

      {/* Radar Chart */}
      <div
        style={{
          marginBottom: 12,
          opacity: ci(frame, radarStart - 10, radarStart + 10, 0, 1),
        }}
      >
        <div
          style={{
            fontSize: 8,
            color: warm.mutedForeground,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 6,
            fontFamily: warmFonts.caption,
            fontWeight: 700,
          }}
        >
          Dimension Analysis
        </div>
        <AnimatedRadarChart startFrame={radarStart} />
      </div>

      {/* Wellness Bars */}
      <WellnessBar
        label="Emotional Connection"
        value={0.88}
        color={warmGradients.gold}
        startFrame={barsStart}
      />
      <WellnessBar
        label="Quality Time"
        value={0.72}
        color={warmGradients.roseAccent}
        startFrame={barsStart + 18}
      />
      <WellnessBar
        label="Conflict Resolution"
        value={0.65}
        color={warmGradients.cta}
        startFrame={barsStart + 36}
      />
    </div>
  );
};

// ─── PHONE MOCKUP (warm version with weight) ──────────────────────────
const WarmPhoneMockup: React.FC<{
  children: React.ReactNode;
  scale?: number;
  style?: React.CSSProperties;
}> = ({ children, scale = 1, style }) => {
  const phoneW = 300 * scale;
  const phoneH = 640 * scale;
  const borderR = 40 * scale;
  const border = 3 * scale;

  return (
    <div
      style={{
        width: phoneW,
        height: phoneH,
        borderRadius: borderR,
        border: `${border}px solid ${warm.accent}44`,
        background: warm.card,
        position: "relative",
        overflow: "hidden",
        boxShadow: `
          0 0 0 ${border}px ${warm.background},
          0 30px 80px ${warm.shadow3},
          0 8px 30px ${warm.shadow2},
          0 0 40px ${warm.primary}10
        `,
        ...style,
      }}
    >
      {/* Notch */}
      <div
        style={{
          position: "absolute",
          top: 12 * scale,
          left: "50%",
          transform: "translateX(-50%)",
          width: 90 * scale,
          height: 24 * scale,
          borderRadius: 12 * scale,
          background: warm.foreground,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5 * scale,
        }}
      >
        <div
          style={{
            width: 8 * scale,
            height: 8 * scale,
            borderRadius: "50%",
            background: warm.accent,
          }}
        />
        <div
          style={{
            width: 50 * scale,
            height: 5 * scale,
            borderRadius: 3 * scale,
            background: warm.accent,
          }}
        />
      </div>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
};

// ─── FEATURE ICON (surfaces from deep water, drifts to position) ──────
const SurfacingFeatureIcon: React.FC<{
  icon: string;
  title: string;
  desc: string;
  startFrame: number;
  finalX: number;
  finalY: number;
}> = ({ icon, title, desc, startFrame, finalX, finalY }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const springProg = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: { damping: 50, stiffness: 60, mass: 1.4 },
  });

  // Start from center-bottom, drift to final position
  const startX = 50;
  const startY = 75;
  const x = interpolate(springProg, [0, 1], [startX, finalX]);
  const y = interpolate(springProg, [0, 1], [startY, finalY]);
  const opacity = ci(frame, startFrame, startFrame + 20, 0, 1);
  const scale = interpolate(springProg, [0, 1], [0.6, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 20px",
        borderRadius: 16,
        background: `${warm.card}ee`,
        border: `1px solid ${warm.muted}`,
        boxShadow: `0 4px 20px ${warm.shadow2}`,
        backdropFilter: "blur(8px)",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: `${warm.primary}15`,
          border: `1px solid ${warm.primary}25`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontFamily: warmFonts.display,
            fontSize: 14,
            color: warm.foreground,
            fontWeight: 600,
            marginBottom: 2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: warmFonts.body,
            fontSize: 11,
            color: warm.mutedForeground,
          }}
        >
          {desc}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// ─── MAIN COMPOSITION ─────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════

export const WeeklyWellnessPixar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── SCENE TIMING CONSTANTS ──────────────────────────────────────────
  const S1_START = 0;
  const S1_END = 240;
  const S2_START = 240;
  const S2_END = 540;
  const S3_START = 540;
  const S4_START = 600;
  const S5_START = 1350;
  const S5_END = 1650;
  const S6_START = 1650;
  const S6_END = 1830;

  // ── GLOBAL: Background color transitions ────────────────────────────
  // Starts dark (black), warms up to linen, exhales to white at end
  const bgDarkToWarm = ci(frame, S1_START, S1_START + 120, 0, 1);
  const bgWarmToWhite = ci(frame, S6_START, S6_END, 0, 1);

  // ── GLOBAL: Pentagon particle speed (slows during Scene 5) ──────────
  const particleSpeed = frame >= S5_START
    ? ci(frame, S5_START, S5_START + 90, 1, 0.2)
    : 1;

  // ── SCENE 1: The Arrival ────────────────────────────────────────────
  // Warm light rises from bottom
  const lightRise = ci(frame, S1_START + 30, S1_START + 120, 120, 0);
  const lightOpacity = ci(frame, S1_START + 20, S1_START + 90, 0, 0.6);
  // Wordmark draws itself
  const wordmarkOpacity = ci(frame, S1_START + 40, S1_START + 60, 0, 1);
  // Wordmark fades out for Scene 2
  const wordmarkS1Fade = ci(frame, S2_START - 30, S2_START, 1, 0);

  // ── SCENE 2: The Statement ──────────────────────────────────────────
  const statementOpacity = ci(frame, S2_START, S2_START + 15, 0, 1);

  // "Measure what" drops in on a downward arc
  const measureSpring = spring({
    frame: Math.max(0, frame - (S2_START + 40)),
    fps,
    config: { damping: 65, stiffness: 100, mass: 1 },
  });
  const measureY = interpolate(measureSpring, [0, 1], [-40, 0]);
  const measureOpacity = ci(frame, S2_START + 35, S2_START + 55, 0, 1);

  // "truly matters" rises from below
  const trulySpring = spring({
    frame: Math.max(0, frame - (S2_START + 70)),
    fps,
    config: { damping: 60, stiffness: 80, mass: 1.2 },
  });
  const trulyY = interpolate(trulySpring, [0, 1], [30, 0]);
  const trulyOpacity = ci(frame, S2_START + 65, S2_START + 90, 0, 1);

  // Horizontal rule draws left to right
  const ruleWidth = ci(frame, S2_START + 95, S2_START + 130, 0, 80);

  // Body copy: soft focus → sharp
  const bodyBlur = ci(frame, S2_START + 110, S2_START + 150, 6, 0);
  const bodyOpacity = ci(frame, S2_START + 110, S2_START + 150, 0, 1);

  // ── SCENE 3: Phone enters from off-screen right ────────────────────
  const phoneSpring = spring({
    frame: Math.max(0, frame - S3_START),
    fps,
    config: { damping: 55, stiffness: 70, mass: 1.3 },
  });
  // Glides in on a subtle arc
  const phoneX = interpolate(phoneSpring, [0, 1], [600, 0]);
  // Slight arc — dip down then settle
  const phoneArcY = interpolate(phoneSpring, [0, 0.5, 1], [20, -8, 0]);
  const phoneOpacity = ci(frame, S3_START, S3_START + 15, 0, 1);

  // ── SCENE 5: Pull together (tilt toward each other) ─────────────────
  const tiltProgress = ci(frame, S5_START, S5_START + 120, 0, 1);
  const leftTilt = tiltProgress * 2;    // degrees
  const rightTilt = tiltProgress * -2;  // degrees

  // ── SCENE 6: Exit ───────────────────────────────────────────────────
  // Content fades out
  const exitFade = ci(frame, S6_START, S6_START + 60, 1, 0);
  // Final wordmark fades in
  const finalWordmarkOpacity = ci(frame, S6_START + 30, S6_START + 90, 0, 1);
  // Exhale to white
  const whiteOverlay = ci(frame, S6_START + 120, S6_END, 0, 1);

  // ── LEFT CONTENT VISIBILITY (present from Scene 2 through Scene 6) ──
  const leftContentOpacity =
    ci(frame, S2_START, S2_START + 15, 0, 1) *
    ci(frame, S6_START, S6_START + 60, 1, 0);

  // ── PHONE VISIBILITY ───────────────────────────────────────────────
  const phoneContentOpacity = phoneOpacity * exitFade;

  return (
    <AbsoluteFill>
      {/* ═══ BACKGROUND ═══ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: interpolate(
            bgDarkToWarm,
            [0, 1],
            [0, 1],
          )
            ? `color-mix(in srgb, #1a1510 ${Math.round((1 - bgDarkToWarm) * 100)}%, ${warm.background} ${Math.round(bgDarkToWarm * 100)}%)`
            : "#1a1510",
        }}
      />
      {/* Warm-to-white transition at exit */}
      {bgWarmToWhite > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: warm.warmWhite,
            opacity: bgWarmToWhite,
          }}
        />
      )}

      {/* ═══ AMBIENT LIGHT SOURCE (Scene 1) ═══ */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          transform: `translate(-50%, ${lightRise}%)`,
          width: 800,
          height: 600,
          background: `radial-gradient(ellipse at 50% 100%, ${warm.primary}40 0%, ${warm.primaryLight}15 40%, transparent 70%)`,
          opacity: lightOpacity,
          pointerEvents: "none",
        }}
      />

      {/* ═══ PENTAGON PARTICLES (always present from Scene 1) ═══ */}
      <PentagonParticles
        count={35}
        speedMultiplier={particleSpeed}
      />

      {/* ═══ SCENE 1: Drawing Wordmark ═══ */}
      {frame < S2_START + 30 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: wordmarkOpacity * wordmarkS1Fade,
          }}
        >
          <DrawingWordmark
            startFrame={S1_START + 60}
            drawDuration={80}
            fontSize={80}
          />
        </div>
      )}

      {/* ═══ SCENE 4: Dead Zone Comes Alive (layered behind content) ═══ */}
      {frame >= S4_START - 30 && (
        <>
          <HeartbeatRipples
            startFrame={S4_START}
            fadeOutFrame={S6_START}
            settleFrame={S5_START}
          />
          <RotatingPentagonWireframe
            startFrame={S4_START + 30}
            fadeOutFrame={S6_START}
          />
        </>
      )}

      {/* ═══ MAIN CONTENT LAYER (Scenes 2–5) ═══ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 100px",
          opacity: exitFade,
        }}
      >
        {/* ── LEFT SIDE: Copy ── */}
        <div
          style={{
            maxWidth: 480,
            opacity: leftContentOpacity,
            transform: `rotate(${leftTilt}deg)`,
            transformOrigin: "right center",
          }}
        >
          {/* "WEEKLY WELLNESS" — stencils in letter by letter */}
          <StencilText
            text="WEEKLY WELLNESS"
            startFrame={S2_START + 10}
            style={{
              fontFamily: warmFonts.caption,
              fontSize: 13,
              letterSpacing: "0.14em",
              color: warm.mutedForeground,
              fontWeight: 700,
              marginBottom: 24,
            }}
          />

          {/* "Measure what" — drops in on arc */}
          <div
            style={{
              fontFamily: warmFonts.display,
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.15,
              color: warm.foreground,
              opacity: measureOpacity,
              transform: `translateY(${measureY}px)`,
            }}
          >
            Measure what
          </div>

          {/* "truly matters" — rises from below, warm mauve/rose, backlit glow */}
          <div
            style={{
              fontFamily: warmFonts.display,
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.15,
              color: warm.dustyRose,
              opacity: trulyOpacity,
              transform: `translateY(${trulyY}px)`,
              textShadow: `0 0 40px ${warm.dustyRose}40`,
              marginBottom: 28,
            }}
          >
            truly matters
          </div>

          {/* Horizontal rule — draws left to right */}
          <div
            style={{
              height: 2,
              width: ruleWidth,
              background: warmGradients.gold,
              borderRadius: 1,
              marginBottom: 28,
            }}
          />

          {/* Body copy — soft focus → sharp */}
          <div
            style={{
              fontFamily: warmFonts.body,
              fontSize: 16,
              color: warm.mutedForeground,
              lineHeight: 1.65,
              letterSpacing: "0.015em",
              maxWidth: 400,
              opacity: bodyOpacity,
              filter: `blur(${bodyBlur}px)`,
              marginBottom: 40,
            }}
          >
            Our weekly check-in goes beyond surface-level questions, measuring
            emotional connection, intimacy, communication, and five other key
            wellness dimensions.
          </div>
        </div>

        {/* ── RIGHT SIDE: Phone ── */}
        <div
          style={{
            opacity: phoneContentOpacity,
            transform: `translateX(${phoneX}px) translateY(${phoneArcY}px) rotate(${rightTilt}deg)`,
            transformOrigin: "left center",
          }}
        >
          <WarmPhoneMockup scale={0.95}>
            <PhoneCheckinScreen phoneArrivalFrame={S3_START} />
          </WarmPhoneMockup>
        </div>
      </div>

      {/* ═══ SCENE 4: Surfacing Feature Icons ═══ */}
      {frame >= S4_START + 60 && frame < S6_START && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: exitFade,
          }}
        >
          <SurfacingFeatureIcon
            icon="📊"
            title="8-Dimension Analysis"
            desc="Holistic view of relationship health"
            startFrame={S4_START + 80}
            finalX={18}
            finalY={78}
          />
          <SurfacingFeatureIcon
            icon="🤝"
            title="Partner Sync"
            desc="Compare responses, find alignment"
            startFrame={S4_START + 140}
            finalX={18}
            finalY={86}
          />
          <SurfacingFeatureIcon
            icon="📈"
            title="Trend Tracking"
            desc="See how you grow over weeks & months"
            startFrame={S4_START + 200}
            finalX={18}
            finalY={94}
          />
        </div>
      )}

      {/* ═══ SCENE 6: Final Wordmark — Homecoming ═══ */}
      {frame >= S6_START && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: finalWordmarkOpacity,
          }}
        >
          <div
            style={{
              fontFamily: warmFonts.display,
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: warm.primary,
              textAlign: "center",
            }}
          >
            MONARK
          </div>
        </div>
      )}

      {/* ═══ SCENE 6: Exhale to White overlay ═══ */}
      {whiteOverlay > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: warm.warmWhite,
            opacity: whiteOverlay,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
