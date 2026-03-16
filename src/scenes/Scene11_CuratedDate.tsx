import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { PhoneMockup } from "../components/PhoneMockup";

interface DateStop {
  time: string;
  venue: string;
  type: string;
  desc: string;
  icon: string;
  detail: string;
}

const DATE_STOPS: DateStop[] = [
  {
    time: "6:30 PM",
    venue: "The Met Rooftop",
    type: "Art & Cocktails",
    desc: "Start with the Basquiat exhibit — you both flagged art as a core interest",
    icon: "🎨",
    detail: "Rooftop bar · Sunset views · Art conversation starters prepared",
  },
  {
    time: "8:15 PM",
    venue: "Via Carota",
    type: "Intimate Dinner",
    desc: "Candlelit Italian in the Village — reserved the corner booth",
    icon: "🕯️",
    detail: "Italian · Wine pairing selected · Conversation prompts for depth",
  },
  {
    time: "10:00 PM",
    venue: "Smalls Jazz Club",
    type: "Live Music",
    desc: "End the night with live jazz — Amara mentioned it's her favorite",
    icon: "🎵",
    detail: "Underground jazz · Intimate venue · Perfect for connection",
  },
];

const DateStopCard: React.FC<{ stop: DateStop; index: number }> = ({ stop, index }) => {
  const frame = useCurrentFrame();
  const delay = 15 + index * 25;
  const appear = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
  const slideY = interpolate(frame, [delay, delay + 20], [15, 0], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        opacity: appear,
        transform: `translateY(${slideY}px)`,
        display: "flex",
        gap: 10,
        marginBottom: 10,
        position: "relative",
      }}
    >
      {/* Timeline connector */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 28, flexShrink: 0 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "rgba(201,168,76,0.15)",
            border: `1.5px solid ${colors.borderBright}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
          }}
        >
          {stop.icon}
        </div>
        {index < DATE_STOPS.length - 1 && (
          <div style={{ width: 1, flex: 1, minHeight: 20, background: `linear-gradient(180deg, ${colors.gold}, transparent)`, marginTop: 4 }} />
        )}
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "10px 12px",
          borderRadius: 12,
          background: colors.bgGlass,
          border: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div style={{ fontSize: 8, color: colors.gold, fontWeight: 600, letterSpacing: 1 }}>{stop.time}</div>
          <div
            style={{
              padding: "2px 6px",
              borderRadius: 8,
              background: "rgba(201,168,76,0.1)",
              fontSize: 7,
              color: colors.goldLight,
            }}
          >
            {stop.type}
          </div>
        </div>
        <div style={{ fontFamily: fonts.serif, fontSize: 12, color: colors.textPrimary, fontWeight: 600, marginBottom: 3 }}>
          {stop.venue}
        </div>
        <div style={{ fontSize: 9, color: colors.textSecondary, lineHeight: 1.5, marginBottom: 4 }}>
          {stop.desc}
        </div>
        <div style={{ fontSize: 8, color: colors.textMuted, fontStyle: "italic" }}>
          {stop.detail}
        </div>
      </div>
    </div>
  );
};

const PhoneDateScreen: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: colors.bg,
        fontFamily: fonts.sans,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "56px 14px 14px" }}>
        {/* Header */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: fonts.serif, fontSize: 16, color: colors.textPrimary, fontWeight: 600 }}>
                Your Curated Date
              </div>
              <div style={{ fontSize: 9, color: colors.textSecondary }}>Saturday, March 21</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "rgba(201,168,76,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  border: `1px solid ${colors.border}`,
                }}
              >
                👩🏾‍🎨
              </div>
              <div style={{ fontSize: 9, color: colors.gold }}>with Amara</div>
            </div>
          </div>
        </div>

        {/* MonArk's Note */}
        <div
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            background: "rgba(155,142,196,0.08)",
            border: `1px solid rgba(155,142,196,0.2)`,
            marginBottom: 14,
            opacity: interpolate(frame, [5, 25], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 12 }}>✨</span>
            <div style={{ fontSize: 8, color: colors.lavender, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>
              MonArk's Take
            </div>
          </div>
          <div style={{ fontSize: 9, color: colors.textSecondary, lineHeight: 1.6 }}>
            You both score high on creative fire and emotional depth. This evening
            moves from shared wonder → intimate conversation → shared experience.
            The progression mirrors how your RIF profiles align.
          </div>
        </div>

        {/* Date stops */}
        {DATE_STOPS.map((stop, i) => (
          <DateStopCard key={i} stop={stop} index={i} />
        ))}

        {/* Confirm button */}
        <div
          style={{
            marginTop: 12,
            background: colors.gradientGold,
            borderRadius: 24,
            padding: "12px",
            textAlign: "center",
            boxShadow: "0 8px 24px rgba(201,168,76,0.3)",
            opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ color: "#0A0A0F", fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
            Confirm & Share with Amara
          </div>
        </div>
      </div>
    </div>
  );
};

export const Scene11_CuratedDate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const phoneSlide = spring({ frame, fps, config: { damping: 70, stiffness: 120, mass: 0.9 } });
  const phoneX = interpolate(phoneSlide, [0, 1], [-200, 0]);

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
      <ParticleField />
      <GlowOrb x="70%" y="50%" size={550} color="rgba(201,168,76,0.2)" delay={0} />
      <GlowOrb x="20%" y="35%" size={400} color="rgba(232,160,160,0.18)" delay={40} />

      {/* Left phone */}
      <div style={{ transform: `translateX(${phoneX}px) scale(${phoneSlide})` }}>
        <PhoneMockup scale={1}>
          <PhoneDateScreen />
        </PhoneMockup>
      </div>

      {/* Right content */}
      <div style={{ maxWidth: 440 }}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            letterSpacing: 5,
            color: colors.gold,
            textTransform: "uppercase",
            marginBottom: 20,
            opacity: interpolate(frame, [10, 40], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          AI-Curated Experiences
        </div>
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 52,
            fontWeight: 300,
            lineHeight: 1.15,
            color: colors.textPrimary,
            marginBottom: 24,
            opacity: interpolate(frame, [15, 45], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [15, 45], [30, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          Dates designed{" "}
          <span
            style={{
              background: colors.gradientGold,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            for you
          </span>
        </div>

        <div style={{ width: 80, height: 1, background: colors.gradientGold, marginBottom: 24 }} />

        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 15,
            color: colors.textSecondary,
            lineHeight: 1.7,
            marginBottom: 40,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          MonArk doesn't just match you — it crafts the perfect evening.
          Three curated stops based on your shared interests, RIF alignment,
          and your city's best hidden gems. Every detail considered.
        </div>

        {/* Date philosophy cards */}
        {[
          {
            icon: "🧬",
            title: "RIF-Informed",
            desc: "Every venue and activity maps to your shared dimensions",
          },
          {
            icon: "🗺️",
            title: "Three-Stop Journey",
            desc: "A curated arc: discover → connect → bond",
          },
          {
            icon: "💬",
            title: "Conversation Guides",
            desc: "AI-crafted prompts for each stop to go deeper",
          },
          {
            icon: "✨",
            title: "MonArk's Voice",
            desc: "Personalized notes explaining why each moment matters",
          },
        ].map(({ icon, title, desc }, i) => (
          <div
            key={title}
            style={{
              opacity: interpolate(frame, [40 + i * 10, 65 + i * 10], [0, 1], { extrapolateRight: "clamp" }),
              display: "flex",
              gap: 14,
              marginBottom: 16,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: "rgba(201,168,76,0.12)",
                border: `1px solid ${colors.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              {icon}
            </div>
            <div>
              <div style={{ fontFamily: fonts.serif, fontSize: 15, color: colors.textPrimary, fontWeight: 600, marginBottom: 2 }}>{title}</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textSecondary, lineHeight: 1.5 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
