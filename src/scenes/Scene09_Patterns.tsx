import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";

interface PatternEvent {
  week: string;
  label: string;
  type: "positive" | "neutral" | "insight";
  value?: number;
}

const TIMELINE: PatternEvent[] = [
  { week: "W1", label: "First RIF assessment completed", type: "neutral" },
  { week: "W2", label: "Emotional openness ↑ 18%", type: "positive", value: 18 },
  { week: "W3", label: "Conflict avoidance pattern detected", type: "insight" },
  { week: "W4", label: "Attachment style: Secure-leaning", type: "neutral" },
  { week: "W5", label: "Communication consistency ↑ 24%", type: "positive", value: 24 },
  { week: "W6", label: "Growth drive accelerating", type: "positive", value: 12 },
  { week: "W7", label: "Vulnerability window expanding", type: "insight" },
  { week: "W8", label: "RIF score improved to 84", type: "positive", value: 8 },
];

const TimelineEvent: React.FC<{ event: PatternEvent; index: number }> = ({ event, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 40 + index * 12;
  const appear = spring({ frame: frame - delay, fps, config: { damping: 80, stiffness: 200, mass: 0.6 } });

  const dotColor = event.type === "positive" ? colors.olive : event.type === "insight" ? colors.accent : colors.gold;

  return (
    <div style={{ opacity: interpolate(appear, [0, 1], [0, 1]), transform: `translateX(${(1 - appear) * 30}px)`, display: "flex", alignItems: "flex-start", gap: 16, position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20, flexShrink: 0 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: dotColor, boxShadow: `0 0 8px ${dotColor}40`, zIndex: 2 }} />
        {index < TIMELINE.length - 1 && <div style={{ width: 1, height: 32, background: "rgba(67,54,39,0.08)", marginTop: 2 }} />}
      </div>
      <div style={{ paddingBottom: 8, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 10, color: colors.textMuted, fontFamily: fonts.sans, letterSpacing: 1.5, fontWeight: 600 }}>{event.week}</span>
          {event.value && <span style={{ fontSize: 9, color: colors.olive, fontWeight: 700 }}>+{event.value}%</span>}
        </div>
        <div style={{ fontSize: 13, color: colors.textPrimary, fontFamily: fonts.sans, lineHeight: 1.4 }}>{event.label}</div>
      </div>
    </div>
  );
};

const BehaviorHeatmap: React.FC<{ frame: number }> = ({ frame }) => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const weeks = 8;
  const data = [
    [0.3, 0.5, 0.8, 0.6, 0.2, 0.9, 0.7],
    [0.4, 0.7, 0.6, 0.8, 0.5, 0.3, 0.6],
    [0.6, 0.8, 0.9, 0.7, 0.4, 0.8, 0.5],
    [0.5, 0.6, 0.7, 0.9, 0.8, 0.4, 0.7],
    [0.7, 0.9, 0.8, 0.6, 0.7, 0.9, 0.8],
    [0.8, 0.7, 0.5, 0.8, 0.9, 0.6, 0.9],
    [0.6, 0.8, 0.9, 0.7, 0.8, 0.7, 0.6],
    [0.9, 0.8, 0.7, 0.9, 0.6, 0.8, 0.9],
  ];
  const revealProgress = interpolate(frame, [60, 140], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div>
      <div style={{ display: "flex", gap: 2, marginBottom: 4, marginLeft: 24 }}>
        {days.map((d) => <div key={d} style={{ width: 16, textAlign: "center", fontSize: 8, color: colors.textMuted }}>{d}</div>)}
      </div>
      {data.map((week, wi) => (
        <div key={wi} style={{ display: "flex", gap: 2, alignItems: "center", marginBottom: 2, opacity: revealProgress > wi / weeks ? 1 : 0 }}>
          <div style={{ width: 20, fontSize: 7, color: colors.textMuted, textAlign: "right" }}>W{wi + 1}</div>
          {week.map((val, di) => (
            <div key={di} style={{ width: 16, height: 16, borderRadius: 3, background: `rgba(166,147,95,${val * 0.5})`, border: "1px solid rgba(166,147,95,0.08)" }} />
          ))}
        </div>
      ))}
    </div>
  );
};

export const Scene09_Patterns: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });

  // Deep Taupe for this "dark" analytical scene
  return (
    <div
      style={{
        width: "100%", height: "100%", background: colors.deepTaupe,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 80px", opacity: fadeIn, position: "relative", overflow: "hidden",
      }}
    >
      <GlowOrb x="25%" y="50%" size={600} color="rgba(94,110,74,0.08)" delay={0} />
      <GlowOrb x="75%" y="40%" size={400} color="rgba(166,147,95,0.06)" delay={30} />

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(166,147,95,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(166,147,95,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px", pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 480 }}>
        <div
          style={{
            fontFamily: fonts.sans, fontSize: 12, letterSpacing: 5, color: colors.goldLight,
            textTransform: "uppercase", marginBottom: 20,
            opacity: interpolate(frame, [5, 35], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          Behavioral Intelligence
        </div>
        <div
          style={{
            fontFamily: fonts.serif, fontSize: 48, fontWeight: 300, lineHeight: 1.15,
            color: "#F5EDE4", marginBottom: 24,
            opacity: interpolate(frame, [10, 40], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [10, 40], [25, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          Your patterns,{" "}
          <span style={{ background: colors.gradientGold, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            decoded
          </span>
        </div>
        <div style={{ width: 80, height: 1, background: colors.gradientGold, marginBottom: 24 }} />
        <div
          style={{
            fontFamily: fonts.sans, fontSize: 14, color: "rgba(245,237,228,0.6)", lineHeight: 1.7, marginBottom: 32,
            opacity: interpolate(frame, [20, 50], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          MonArk's behavioral engine tracks your relational growth over time,
          spotting patterns in communication, vulnerability, and attachment
          that help you understand how you show up in connection.
        </div>
        <div style={{ maxHeight: 380, overflow: "hidden" }}>
          {TIMELINE.map((event, i) => <TimelineEvent key={i} event={event} index={i} />)}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
        <div
          style={{
            padding: "24px", borderRadius: 20, background: "rgba(245,237,228,0.04)",
            border: `1px solid rgba(166,147,95,0.15)`,
            opacity: interpolate(frame, [40, 70], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ fontSize: 10, color: "rgba(245,237,228,0.4)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
            Engagement Heatmap
          </div>
          <BehaviorHeatmap frame={frame} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontSize: 8, color: "rgba(245,237,228,0.3)" }}>Low</span>
            <div style={{ display: "flex", gap: 2 }}>
              {[0.1, 0.25, 0.35, 0.45, 0.6].map((v) => (
                <div key={v} style={{ width: 12, height: 8, borderRadius: 2, background: `rgba(166,147,95,${v})` }} />
              ))}
            </div>
            <span style={{ fontSize: 8, color: "rgba(245,237,228,0.3)" }}>High</span>
          </div>
        </div>

        <div
          style={{
            padding: "20px 24px", borderRadius: 16, background: "rgba(127,90,56,0.12)",
            border: `1px solid rgba(171,123,84,0.25)`, maxWidth: 280,
            opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [100, 130], [15, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 16 }}>🧠</span>
            <div style={{ fontSize: 10, color: colors.goldLight, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>Key Insight</div>
          </div>
          <div style={{ fontSize: 12, color: "#F5EDE4", lineHeight: 1.6, fontFamily: fonts.sans }}>
            Your vulnerability window expands most mid-week. Scheduling deeper conversations on Wednesdays could strengthen connections by up to 30%.
          </div>
        </div>
      </div>
    </div>
  );
};
