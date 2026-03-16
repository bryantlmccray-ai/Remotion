import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts } from "./utils/colors";
import { PentagonParticles } from "./components/PentagonParticles";
import { RippleCircles } from "./components/RippleCircles";

/**
 * MonArk "Weekly Wellness" — Pixar Short Film / Disney Motion Design
 *
 * Timeline (30fps, 1830 frames = 61s):
 *   Scene 1: The Arrival       0:00–0:08  (frames 0–240)
 *   Scene 2: The Statement      0:08–0:18  (frames 240–540)
 *   Scene 3: Phone Enters       0:18–0:30  (frames 540–900)
 *   Scene 4: Dead Zone Alive    0:20–0:45  (frames 600–1350) — layered under Scene 3+
 *   Scene 5: Pull Together      0:45–0:55  (frames 1350–1650)
 *   Scene 6: The Exit           0:55–1:01  (frames 1650–1830)
 */

export const TOTAL_DURATION = 1830;

// ─── Helper: easeOut cubic ───────────────────────────────────────
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// ─── Helper: clamp interpolate shorthand ─────────────────────────
const ci = (
  frame: number,
  input: [number, number],
  output: [number, number]
) =>
  interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// ═══════════════════════════════════════════════════════════════════
// AMBIENT LAYER: Warm Linen Background
// ═══════════════════════════════════════════════════════════════════
const WarmBackground: React.FC = () => {
  const frame = useCurrentFrame();
  // Very subtle breathing warmth shift
  const warmth = Math.sin(frame * 0.008) * 0.02;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg,
          rgba(245,240,232,${1 + warmth}) 0%,
          rgba(237,231,219,1) 40%,
          rgba(250,247,242,${1 - warmth}) 100%)`,
      }}
    />
  );
};

// ═══════════════════════════════════════════════════════════════════
// AMBIENT LAYER: Large Rotating Pentagon Wireframe (barely visible)
// ═══════════════════════════════════════════════════════════════════
const PentagonWireframe: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  const frame = useCurrentFrame();
  const size = 600;
  const center = size / 2;
  const radius = size / 2 - 20;
  // 1 RPM = 6 degrees per second = 0.2 degrees per frame at 30fps
  const rotation = frame * 0.2;

  const points = Array.from({ length: 5 }, (_, i) => {
    const angle = ((i * 72 - 90 + rotation) * Math.PI) / 180;
    return `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`;
  }).join(" ");

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "60%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        opacity: 0.04 * opacity,
      }}
    >
      <svg width={size} height={size}>
        <polygon
          points={points}
          fill="none"
          stroke={colors.gold}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// SCENE 1: The Arrival (frames 0–240)
// Pull back from darkness. Warm light rises. Wordmark draws itself.
// ═══════════════════════════════════════════════════════════════════
const SceneArrival: React.FC = () => {
  const frame = useCurrentFrame();

  // Black overlay pulls back — like waking up
  const darknessOpacity = ci(frame, [0, 60], [1, 0]);

  // Warm ambient light rises from bottom
  const lightRise = ci(frame, [10, 80], [100, 40]);
  const lightOpacity = ci(frame, [10, 60], [0, 0.6]);

  // Wordmark draws itself — calligraphy stroke reveal via clip-path
  const strokeProgress = ci(frame, [40, 140], [0, 100]);
  const wordmarkOpacity = ci(frame, [35, 50], [0, 1]);

  // Tagline fades in after wordmark
  const taglineOpacity = ci(frame, [150, 200], [0, 1]);
  const taglineY = ci(frame, [150, 200], [15, 0]);

  return (
    <AbsoluteFill>
      {/* Warm light source rising from bottom */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: `${lightRise}%`,
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.05) 40%, transparent 70%)`,
          opacity: lightOpacity,
          pointerEvents: "none",
        }}
      />

      {/* MonArk wordmark — draws itself */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
          opacity: wordmarkOpacity,
        }}
      >
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 96,
            fontWeight: 300,
            letterSpacing: 18,
            color: colors.gold,
            clipPath: `inset(0 ${100 - strokeProgress}% 0 0)`,
            textShadow: `0 0 40px rgba(201,168,76,0.3)`,
          }}
        >
          MONARK
        </div>
      </div>

      {/* Tagline below wordmark */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "55%",
          transform: `translate(-50%, ${taglineY}px)`,
          opacity: taglineOpacity,
          fontFamily: fonts.sans,
          fontSize: 18,
          letterSpacing: 6,
          color: colors.textSecondary,
          textTransform: "uppercase",
        }}
      >
        Relationship Wellness
      </div>

      {/* Darkness overlay — pulls back */}
      <AbsoluteFill
        style={{
          background: "#1A1510",
          opacity: darknessOpacity,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════
// SCENE 2: The Statement (frames 240–540)
// "WEEKLY WELLNESS" stencils in. Copy lands with weight.
// ═══════════════════════════════════════════════════════════════════
const SceneStatement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "WEEKLY WELLNESS" stencils in fast, like a stamp
  const stencilProgress = ci(frame, [0, 18], [0, 100]);
  const stencilOpacity = ci(frame, [0, 8], [0, 1]);

  // "Measure what" drops in on downward arc — lands with felt thud
  // Anticipation: drops 4px past, then settles (Disney squash)
  const measureDrop = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.7 },
  });
  const measureY = interpolate(measureDrop, [0, 1], [40, 0]);
  const measureOpacity = ci(frame, [40, 55], [0, 1]);

  // "truly matters" rises from below — backlit rose glow
  const trulyRise = spring({
    frame: frame - 70,
    fps,
    config: { damping: 14, stiffness: 160, mass: 0.8 },
  });
  const trulyY = interpolate(trulyRise, [0, 1], [30, 0]);
  const trulyOpacity = ci(frame, [70, 90], [0, 1]);

  // Horizontal rule draws itself left to right
  const ruleWidth = ci(frame, [100, 140], [0, 120]);

  // Body copy — soft focus → sharp
  const bodyOpacity = ci(frame, [130, 170], [0, 1]);
  const bodyBlur = ci(frame, [130, 160], [4, 0]);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 120,
          top: "50%",
          transform: "translateY(-50%)",
          maxWidth: 580,
        }}
      >
        {/* WEEKLY WELLNESS — stencils in */}
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 15,
            letterSpacing: 8,
            color: colors.gold,
            textTransform: "uppercase",
            marginBottom: 32,
            opacity: stencilOpacity,
            clipPath: `inset(0 ${100 - stencilProgress}% 0 0)`,
          }}
        >
          Weekly Wellness
        </div>

        {/* "Measure what" — drops in with weight */}
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 72,
            fontWeight: 300,
            lineHeight: 1.05,
            color: colors.textPrimary,
            opacity: measureOpacity,
            transform: `translateY(${measureY}px)`,
          }}
        >
          Measure what
        </div>

        {/* "truly matters" — rises with rose backlight */}
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 72,
            fontWeight: 300,
            lineHeight: 1.05,
            color: colors.rose,
            opacity: trulyOpacity,
            transform: `translateY(${trulyY}px)`,
            textShadow: `0 0 30px rgba(196,132,138,0.3), 0 0 60px rgba(196,132,138,0.1)`,
            marginBottom: 36,
          }}
        >
          truly matters
        </div>

        {/* Thin horizontal rule — sommelier reveal */}
        <div
          style={{
            width: ruleWidth,
            height: 1.5,
            background: `linear-gradient(90deg, ${colors.gold}, rgba(201,168,76,0.2))`,
            marginBottom: 32,
          }}
        />

        {/* Body copy — focus pull */}
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 17,
            lineHeight: 1.75,
            color: colors.textSecondary,
            opacity: bodyOpacity,
            filter: `blur(${bodyBlur}px)`,
            maxWidth: 460,
          }}
        >
          Our weekly check-in goes beyond surface questions, measuring
          emotional connection, intimacy, communication, and five other
          key wellness dimensions.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════
// PHONE UI: Check-in Screen (builds itself inside the phone)
// ═══════════════════════════════════════════════════════════════════
const PhoneCheckinScreen: React.FC<{ buildFrame: number }> = ({
  buildFrame,
}) => {
  const f = buildFrame;

  // Header slides down from top
  const headerY = ci(f, [0, 25], [-40, 0]);
  const headerOpacity = ci(f, [0, 20], [0, 1]);

  // Score counts up — hesitates at 79, accelerates, lands on 84
  let scoreValue: number;
  if (f < 30) {
    scoreValue = 0;
  } else if (f < 80) {
    // Count from 0 to 79, then slow
    const p = easeOut(ci(f, [30, 75], [0, 1]));
    scoreValue = Math.round(p * 79);
  } else if (f < 95) {
    // Hesitate at 79
    scoreValue = 79;
  } else {
    // Quick burst to 84
    const p = easeOut(ci(f, [95, 110], [0, 1]));
    scoreValue = 79 + Math.round(p * 5);
  }
  const scoreOpacity = ci(f, [25, 40], [0, 1]);
  // Soft pulse when score lands on 84
  const scorePulse =
    f >= 108 && f <= 120
      ? 1 + Math.sin((f - 108) * 0.5) * 0.04
      : 1;

  // Pentagon radar draws sides one at a time
  const radarProgress = ci(f, [50, 140], [0, 5]); // 0 to 5 sides

  // Wellness bars fill with staggered delay
  const bar1Progress = ci(f, [130, 180], [0, 0.88]);
  const bar2Progress = ci(f, [145, 195], [0, 0.72]);
  const bar3Progress = ci(f, [160, 210], [0, 0.65]);

  // Radar chart
  const radarSize = 130;
  const radarCenter = radarSize / 2;
  const radarRadius = 50;
  const categories = ["Intimacy", "Trust", "Communication", "Support", "Growth"];
  const values = [0.85, 0.78, 0.92, 0.88, 0.75];

  const radarPoints = categories.map((_, i) => {
    const angle = (i / 5) * 2 * Math.PI - Math.PI / 2;
    const r = radarRadius * values[i];
    return {
      x: radarCenter + r * Math.cos(angle),
      y: radarCenter + r * Math.sin(angle),
      lx: radarCenter + (radarRadius + 18) * Math.cos(angle),
      ly: radarCenter + (radarRadius + 18) * Math.sin(angle),
      label: categories[i],
    };
  });

  // Build path progressively — each side takes ~1 unit of radarProgress
  const visiblePoints = radarPoints.slice(
    0,
    Math.min(5, Math.ceil(radarProgress))
  );
  const partialPath =
    visiblePoints.length > 0
      ? visiblePoints
          .map((p, i) => {
            if (i === visiblePoints.length - 1 && radarProgress % 1 !== 0) {
              // Partial last segment
              const prev =
                radarPoints[
                  (i - 1 + radarPoints.length) % radarPoints.length
                ];
              const frac = radarProgress % 1;
              const px = prev.x + (p.x - prev.x) * frac;
              const py = prev.y + (p.y - prev.y) * frac;
              return `${i === 0 ? "M" : "L"} ${px} ${py}`;
            }
            return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
          })
          .join(" ") + (radarProgress >= 5 ? " Z" : "")
      : "";

  return (
    <div
      style={{
        padding: "55px 16px 16px",
        fontFamily: fonts.sans,
        background: "linear-gradient(180deg, #FAF7F2, #F5F0E8)",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Header slides down */}
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize: 16,
              color: colors.textPrimary,
              fontWeight: 600,
            }}
          >
            Weekly Check-in
          </div>
          <div style={{ fontSize: 9, color: colors.textMuted }}>
            Week of March 10, 2026
          </div>
        </div>
        <div
          style={{
            padding: "5px 12px",
            borderRadius: 20,
            background: colors.goldSoft,
            border: `1px solid ${colors.border}`,
            fontSize: 9,
            color: colors.goldDim,
          }}
        >
          Synced
        </div>
      </div>

      {/* Score card */}
      <div
        style={{
          padding: 16,
          borderRadius: 16,
          background: "rgba(201,168,76,0.06)",
          border: `1px solid ${colors.border}`,
          marginBottom: 14,
          textAlign: "center",
          opacity: scoreOpacity,
        }}
      >
        <div
          style={{
            fontSize: 9,
            color: colors.goldDim,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Relationship Health Score
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            background: colors.gradientGold,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
            marginBottom: 6,
            transform: `scale(${scorePulse})`,
          }}
        >
          {scoreValue}
        </div>
        <div style={{ fontSize: 9, color: colors.textSecondary }}>
          Above average · Improving
        </div>
      </div>

      {/* Radar chart */}
      <div style={{ marginBottom: 14, position: "relative" }}>
        <div
          style={{
            fontSize: 9,
            color: colors.goldDim,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Dimension Analysis
        </div>
        <div
          style={{
            position: "relative",
            width: radarSize,
            height: radarSize,
            margin: "0 auto",
          }}
        >
          <svg width={radarSize} height={radarSize}>
            <defs>
              <linearGradient id="rf" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.gold} stopOpacity="0.2" />
                <stop
                  offset="100%"
                  stopColor={colors.rose}
                  stopOpacity="0.1"
                />
              </linearGradient>
            </defs>
            {/* Grid */}
            {[0.33, 0.66, 1].map((r) =>
              categories.map((_, i) => {
                const a1 = (i / 5) * 2 * Math.PI - Math.PI / 2;
                const a2 = ((i + 1) / 5) * 2 * Math.PI - Math.PI / 2;
                return (
                  <line
                    key={`g-${r}-${i}`}
                    x1={radarCenter + radarRadius * r * Math.cos(a1)}
                    y1={radarCenter + radarRadius * r * Math.sin(a1)}
                    x2={radarCenter + radarRadius * r * Math.cos(a2)}
                    y2={radarCenter + radarRadius * r * Math.sin(a2)}
                    stroke="rgba(44,37,32,0.08)"
                    strokeWidth="0.5"
                  />
                );
              })
            )}
            {/* Spokes */}
            {categories.map((_, i) => {
              const angle = (i / 5) * 2 * Math.PI - Math.PI / 2;
              return (
                <line
                  key={`s-${i}`}
                  x1={radarCenter}
                  y1={radarCenter}
                  x2={radarCenter + radarRadius * Math.cos(angle)}
                  y2={radarCenter + radarRadius * Math.sin(angle)}
                  stroke="rgba(44,37,32,0.06)"
                  strokeWidth="0.5"
                />
              );
            })}
            {/* Data path — draws progressively */}
            {partialPath && (
              <path
                d={partialPath}
                fill={radarProgress >= 5 ? "url(#rf)" : "none"}
                stroke={colors.gold}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
            {/* Vertices — appear as each side completes */}
            {radarPoints.map((p, i) =>
              i < Math.floor(radarProgress) ? (
                <circle
                  key={`v-${i}`}
                  cx={p.x}
                  cy={p.y}
                  r={3}
                  fill={colors.gold}
                />
              ) : null
            )}
          </svg>
          {/* Labels */}
          {radarPoints.map((p, i) => (
            <div
              key={`l-${i}`}
              style={{
                position: "absolute",
                left: p.lx,
                top: p.ly,
                fontSize: 7,
                color: colors.textMuted,
                transform: "translate(-50%, -50%)",
                whiteSpace: "nowrap",
                opacity: i < Math.floor(radarProgress) ? 1 : 0,
              }}
            >
              {p.label}
            </div>
          ))}
        </div>
      </div>

      {/* Wellness bars — staggered fill */}
      {[
        {
          label: "Emotional Connection",
          progress: bar1Progress,
          color: colors.gradientGold,
        },
        { label: "Quality Time", progress: bar2Progress, color: colors.rose },
        {
          label: "Conflict Resolution",
          progress: bar3Progress,
          color: colors.lavender,
        },
      ].map(({ label, progress, color }) => (
        <div key={label} style={{ marginBottom: 10 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: colors.textSecondary,
                fontFamily: fonts.sans,
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontSize: 10,
                color: colors.goldDim,
                fontFamily: fonts.sans,
                fontWeight: 600,
              }}
            >
              {Math.round(progress * 100)}%
            </div>
          </div>
          <div
            style={{
              height: 5,
              borderRadius: 3,
              background: "rgba(44,37,32,0.06)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress * 100}%`,
                background: color,
                borderRadius: 3,
                transition: "width 0.05s ease-out",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// SCENE 3: The Phone Enters the Room (frames 540–900)
// Phone glides in from right with mass, decelerates, micro-bounce.
// Screen lights up like a candle behind frosted glass.
// ═══════════════════════════════════════════════════════════════════
const ScenePhoneEnters: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone enters from off-screen right, arcing inward
  // Micro-bounce: low damping for that Pixar ball feel
  const slideProgress = spring({
    frame: frame,
    fps,
    config: { damping: 14, stiffness: 80, mass: 1.2 },
  });

  // Phone X: starts 600px off-screen, settles to final position
  const phoneX = interpolate(slideProgress, [0, 1], [600, 0]);
  // Subtle arc: rises then settles
  const phoneArc = Math.sin(slideProgress * Math.PI) * -30;

  // Screen bloom — warm glow that fades in after phone settles
  const bloomOpacity = ci(frame, [40, 80], [0, 0.4]);
  const bloomScale = ci(frame, [40, 70], [0.8, 1]);

  // UI build starts after phone mostly settled (frame ~50 relative)
  const uiBuildFrame = Math.max(0, frame - 50);

  // Gentle float after settled
  const float = frame > 60 ? Math.sin((frame - 60) * 0.025) * 4 : 0;

  return (
    <AbsoluteFill>
      {/* Phone container — positioned right-center */}
      <div
        style={{
          position: "absolute",
          right: 140,
          top: "50%",
          transform: `translate(${phoneX}px, calc(-50% + ${phoneArc + float}px))`,
        }}
      >
        {/* Warm bloom behind phone */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 500,
            height: 700,
            transform: `translate(-50%, -50%) scale(${bloomScale})`,
            borderRadius: "50%",
            background: `radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.02) 50%, transparent 70%)`,
            opacity: bloomOpacity,
            pointerEvents: "none",
          }}
        />

        {/* Phone device */}
        <div
          style={{
            width: 340,
            height: 720,
            borderRadius: 46,
            border: `3px solid ${colors.borderBright}`,
            background: colors.bgCream,
            position: "relative",
            overflow: "hidden",
            boxShadow: `
              0 40px 100px rgba(44,37,32,0.15),
              0 0 40px rgba(201,168,76,0.08),
              inset 0 1px 0 rgba(255,255,255,0.6)
            `,
          }}
        >
          {/* Notch */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: "50%",
              transform: "translateX(-50%)",
              width: 100,
              height: 28,
              borderRadius: 14,
              background: colors.bgWarm,
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "rgba(44,37,32,0.08)",
              }}
            />
            <div
              style={{
                width: 60,
                height: 6,
                borderRadius: 3,
                background: "rgba(44,37,32,0.08)",
              }}
            />
          </div>

          {/* Phone screen content */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <PhoneCheckinScreen buildFrame={uiBuildFrame} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════
// SCENE 4: The Dead Zone Comes Alive (frames 600–1350)
// Ripples, wireframe, feature icons surfacing from deep water.
// ═══════════════════════════════════════════════════════════════════
const SceneDeadZoneAlive: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const features = [
    { icon: "📊", title: "8-Dimension Analysis", delay: 60 },
    { icon: "🤝", title: "Partner Sync", delay: 120 },
    { icon: "📈", title: "Trend Tracking", delay: 180 },
  ];

  return (
    <AbsoluteFill>
      {/* Ripple circles — heartbeat rhythm */}
      <RippleCircles x="45%" y="68%" maxRadius={250} />

      {/* Feature icons — surface from deep water, drift to left-aligned positions */}
      {features.map(({ icon, title, delay }, i) => {
        const surfaceProgress = spring({
          frame: frame - delay,
          fps,
          config: { damping: 20, stiffness: 60, mass: 1.0 },
        });

        // Start at center, drift to final left-aligned position
        const startX = 45; // center %
        const endX = 8 + i * 0.5; // left-aligned %
        const xPos = interpolate(surfaceProgress, [0, 1], [startX, endX]);

        const startY = 75; // deep
        const endY = 68 + i * 8; // stacked vertically
        const yPos = interpolate(surfaceProgress, [0, 1], [startY, endY]);

        const opacity = ci(frame, [delay, delay + 30], [0, 1]);
        const scale = interpolate(surfaceProgress, [0, 1], [0.6, 1]);

        // Gentle float after settled
        const settled = frame > delay + 60;
        const floatY = settled
          ? Math.sin((frame - delay) * 0.03 + i) * 2
          : 0;

        return (
          <div
            key={title}
            style={{
              position: "absolute",
              left: `${xPos}%`,
              top: `${yPos + floatY * 0.1}%`,
              opacity,
              transform: `scale(${scale}) translateY(${floatY}px)`,
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 22px",
              borderRadius: 16,
              background: `rgba(245,240,232,0.85)`,
              border: `1px solid ${colors.border}`,
              boxShadow: `0 8px 30px rgba(44,37,32,0.06)`,
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: colors.goldSoft,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              {icon}
            </div>
            <div>
              <div
                style={{
                  fontFamily: fonts.serif,
                  fontSize: 16,
                  color: colors.textPrimary,
                  fontWeight: 600,
                }}
              >
                {title}
              </div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════
// SCENE 5: The Pull Together (frames 1350–1650)
// Phone and copy tilt toward each other. Everything gets quiet.
// ═══════════════════════════════════════════════════════════════════
const ScenePullTogether: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle tilt: copy leans right ~2deg, phone leans left ~2deg
  const tiltProgress = ci(frame, [0, 90], [0, 1]);
  const copyTilt = easeOut(tiltProgress) * 2; // degrees
  const phoneTilt = easeOut(tiltProgress) * -2;

  // Ripples settle to smallest
  const rippleScale = interpolate(tiltProgress, [0, 1], [1, 0.4]);

  // Particles slow down (handled by opacity reduction)
  const quietness = ci(frame, [0, 120], [1, 0.5]);

  return (
    <AbsoluteFill>
      {/* Tilt overlay for copy side */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "50%",
          height: "100%",
          transform: `rotate(${copyTilt}deg)`,
          transformOrigin: "right center",
          pointerEvents: "none",
        }}
      />

      {/* Tilt overlay for phone side */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "50%",
          height: "100%",
          transform: `rotate(${phoneTilt}deg)`,
          transformOrigin: "left center",
          pointerEvents: "none",
        }}
      />

      {/* Settling ripples */}
      <RippleCircles
        x="45%"
        y="68%"
        maxRadius={250 * rippleScale}
        opacity={quietness}
      />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════
// SCENE 6: The Exit (frames 1650–1830)
// Wordmark homecoming. Pentagon particle exhale. Fade to white.
// ═══════════════════════════════════════════════════════════════════
const SceneExit: React.FC = () => {
  const frame = useCurrentFrame();

  // All other elements fade out
  const contentFade = ci(frame, [0, 40], [1, 0]);

  // Wordmark fades back in, centered, full-width — homecoming
  const wordmarkOpacity = ci(frame, [30, 80], [0, 1]);
  const wordmarkScale = ci(frame, [30, 80], [0.9, 1]);

  // Final fade to white (not black — warmth, not closure)
  const whiteOverlay = ci(frame, [130, 180], [0, 1]);

  return (
    <AbsoluteFill>
      {/* Content fade out */}
      <AbsoluteFill style={{ opacity: contentFade }} />

      {/* Centered wordmark — homecoming */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "48%",
          transform: `translate(-50%, -50%) scale(${wordmarkScale})`,
          opacity: wordmarkOpacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 108,
            fontWeight: 300,
            letterSpacing: 20,
            color: colors.gold,
            textShadow: `0 0 50px rgba(201,168,76,0.2)`,
          }}
        >
          MONARK
        </div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 16,
            letterSpacing: 8,
            color: colors.textMuted,
            marginTop: 16,
          }}
        >
          YOUR LOVE STORY, ELEVATED
        </div>
      </div>

      {/* Exhale to white */}
      <AbsoluteFill
        style={{
          background: "#FFFFFF",
          opacity: whiteOverlay,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════
// PERSISTENT COPY LAYER (visible from Scene 2 onward, through Scene 5)
// ═══════════════════════════════════════════════════════════════════
const PersistentCopy: React.FC<{ globalFrame: number }> = ({ globalFrame }) => {
  // Copy appears in Scene 2 (frame 240) and persists through Scene 5 (frame 1650)
  const fadeIn = ci(globalFrame, [240, 280], [0, 1]);
  const fadeOut = ci(globalFrame, [1580, 1650], [1, 0]);
  const opacity = Math.min(fadeIn, fadeOut);

  if (opacity <= 0) return null;

  // Scene 2 internal frame for animation timing
  const s2Frame = Math.max(0, globalFrame - 240);

  // Stencil
  const stencilProgress = ci(s2Frame, [0, 18], [0, 100]);
  const stencilOpacity = ci(s2Frame, [0, 8], [0, 1]);

  // Measure what
  const measureOpacity = ci(s2Frame, [40, 55], [0, 1]);
  const measureY = ci(s2Frame, [40, 70], [40, 0]);

  // truly matters
  const trulyOpacity = ci(s2Frame, [70, 90], [0, 1]);
  const trulyY = ci(s2Frame, [70, 100], [30, 0]);

  // Rule
  const ruleWidth = ci(s2Frame, [100, 140], [0, 120]);

  // Body
  const bodyOpacity = ci(s2Frame, [130, 170], [0, 1]);
  const bodyBlur = ci(s2Frame, [130, 160], [4, 0]);

  // Pull Together tilt (Scene 5, frame 1350+)
  const tiltProgress = ci(globalFrame, [1350, 1500], [0, 1]);
  const copyTilt = easeOut(tiltProgress) * 1.5;

  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        top: "50%",
        transform: `translateY(-50%) rotate(${copyTilt}deg)`,
        transformOrigin: "right center",
        maxWidth: 580,
        opacity,
        zIndex: 5,
      }}
    >
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 15,
          letterSpacing: 8,
          color: colors.gold,
          textTransform: "uppercase",
          marginBottom: 32,
          opacity: stencilOpacity,
          clipPath: `inset(0 ${100 - stencilProgress}% 0 0)`,
        }}
      >
        Weekly Wellness
      </div>

      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 72,
          fontWeight: 300,
          lineHeight: 1.05,
          color: colors.textPrimary,
          opacity: measureOpacity,
          transform: `translateY(${measureY}px)`,
        }}
      >
        Measure what
      </div>

      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 72,
          fontWeight: 300,
          lineHeight: 1.05,
          color: colors.rose,
          opacity: trulyOpacity,
          transform: `translateY(${trulyY}px)`,
          textShadow: `0 0 30px rgba(196,132,138,0.25), 0 0 60px rgba(196,132,138,0.08)`,
          marginBottom: 36,
        }}
      >
        truly matters
      </div>

      <div
        style={{
          width: ruleWidth,
          height: 1.5,
          background: `linear-gradient(90deg, ${colors.gold}, rgba(201,168,76,0.15))`,
          marginBottom: 32,
        }}
      />

      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 17,
          lineHeight: 1.75,
          color: colors.textSecondary,
          opacity: bodyOpacity,
          filter: `blur(${bodyBlur}px)`,
          maxWidth: 460,
        }}
      >
        Our weekly check-in goes beyond surface questions, measuring emotional
        connection, intimacy, communication, and five other key wellness
        dimensions.
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// PERSISTENT PHONE LAYER (enters Scene 3, persists through Scene 5)
// ═══════════════════════════════════════════════════════════════════
const PersistentPhone: React.FC<{ globalFrame: number }> = ({
  globalFrame,
}) => {
  const { fps } = useVideoConfig();

  // Phone enters at frame 540, persists to 1650
  const fadeIn = ci(globalFrame, [540, 545], [0, 1]);
  const fadeOut = ci(globalFrame, [1580, 1650], [1, 0]);
  const opacity = Math.min(fadeIn, fadeOut);

  if (opacity <= 0) return null;

  const phoneFrame = Math.max(0, globalFrame - 540);

  // Entrance: glide from off-screen with Pixar micro-bounce
  const slideProgress = spring({
    frame: phoneFrame,
    fps,
    config: { damping: 14, stiffness: 80, mass: 1.2 },
  });

  const phoneX = interpolate(slideProgress, [0, 1], [600, 0]);
  const phoneArc = Math.sin(slideProgress * Math.PI) * -30;

  // Screen bloom
  const bloomOpacity = ci(phoneFrame, [40, 80], [0, 0.35]);

  // UI build starts after phone settles
  const uiBuildFrame = Math.max(0, phoneFrame - 50);

  // Gentle float
  const float =
    phoneFrame > 60 ? Math.sin((phoneFrame - 60) * 0.025) * 4 : 0;

  // Pull Together tilt (Scene 5)
  const tiltProgress = ci(globalFrame, [1350, 1500], [0, 1]);
  const phoneTilt = easeOut(tiltProgress) * -1.5;

  return (
    <div
      style={{
        position: "absolute",
        right: 140,
        top: "50%",
        transform: `translate(${phoneX}px, calc(-50% + ${phoneArc + float}px)) rotate(${phoneTilt}deg)`,
        transformOrigin: "left center",
        opacity,
        zIndex: 5,
      }}
    >
      {/* Warm bloom */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 500,
          height: 700,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 60%)`,
          opacity: bloomOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Phone device */}
      <div
        style={{
          width: 340,
          height: 720,
          borderRadius: 46,
          border: `3px solid ${colors.borderBright}`,
          background: colors.bgCream,
          position: "relative",
          overflow: "hidden",
          boxShadow: `
            0 40px 100px rgba(44,37,32,0.12),
            0 0 40px rgba(201,168,76,0.06),
            inset 0 1px 0 rgba(255,255,255,0.6)
          `,
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 100,
            height: 28,
            borderRadius: 14,
            background: colors.bgWarm,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "rgba(44,37,32,0.08)",
            }}
          />
          <div
            style={{
              width: 60,
              height: 6,
              borderRadius: 3,
              background: "rgba(44,37,32,0.08)",
            }}
          />
        </div>

        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <PhoneCheckinScreen buildFrame={uiBuildFrame} />
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ═══════════════════════════════════════════════════════════════════
export const WellnessDemo: React.FC = () => {
  const frame = useCurrentFrame();

  // Pentagon particles fade in during Scene 1
  const particleFade = ci(frame, [30, 120], [0, 1]);
  // Pentagon wireframe fades in during Scene 4
  const wireframeFade = ci(frame, [600, 700], [0, 1]);
  const wireframeFadeOut = ci(frame, [1600, 1700], [1, 0]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* ── LAYER 0: Warm linen background (always) ── */}
      <WarmBackground />

      {/* ── LAYER 1: Pentagon particles (always, from Scene 1) ── */}
      <PentagonParticles fadeIn={particleFade} />

      {/* ── LAYER 2: Pentagon wireframe (Scene 4 onward) ── */}
      <PentagonWireframe opacity={Math.min(wireframeFade, wireframeFadeOut)} />

      {/* ── SCENE 1: The Arrival (frames 0–240) ── */}
      <Sequence from={0} durationInFrames={260}>
        <SceneArrival />
      </Sequence>

      {/* ── PERSISTENT COPY: Scene 2 through Scene 5 ── */}
      <PersistentCopy globalFrame={frame} />

      {/* ── PERSISTENT PHONE: Scene 3 through Scene 5 ── */}
      <PersistentPhone globalFrame={frame} />

      {/* ── SCENE 4: Dead Zone Comes Alive (frames 600–1350) ── */}
      <Sequence from={600} durationInFrames={750}>
        <SceneDeadZoneAlive />
      </Sequence>

      {/* ── SCENE 6: The Exit (frames 1650–1830) ── */}
      <Sequence from={1650} durationInFrames={180}>
        <SceneExit />
      </Sequence>
    </AbsoluteFill>
  );
};
