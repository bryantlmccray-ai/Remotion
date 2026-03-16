import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { PhoneMockup } from "../components/PhoneMockup";

interface Moment {
  avatar: string;
  name: string;
  time: string;
  text: string;
  image?: string;
  likes: number;
  comments: number;
  tag: string;
}

const MOMENTS: Moment[] = [
  {
    avatar: "👩🏾‍🎨",
    name: "Amara & Kai",
    time: "2h ago",
    text: "We talked for 4 hours on our first call. MonArk's RIF score was right — 96% aligned and every minute proved it.",
    likes: 47,
    comments: 12,
    tag: "First Connection",
  },
  {
    avatar: "👨🏻‍💻",
    name: "Jordan & Mia",
    time: "5h ago",
    text: "The curated date was at this hidden jazz lounge in the village. It felt like the app actually knew us.",
    likes: 83,
    comments: 24,
    tag: "Curated Date",
  },
  {
    avatar: "👩🏽",
    name: "Priya & Theo",
    time: "1d ago",
    text: "Six months of real connection. This isn't an app — it's a movement. Thank you MonArk for matching us on depth, not just photos.",
    likes: 214,
    comments: 56,
    tag: "Milestone",
  },
];

const MomentCard: React.FC<{ moment: Moment; index: number }> = ({ moment, index }) => {
  const frame = useCurrentFrame();
  const delay = 15 + index * 25;
  const appear = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
  const slideY = interpolate(frame, [delay, delay + 20], [20, 0], { extrapolateRight: "clamp" });

  const likeAnim = Math.round(interpolate(frame, [delay + 10, delay + 40], [0, moment.likes], { extrapolateRight: "clamp" }));

  return (
    <div
      style={{
        opacity: appear,
        transform: `translateY(${slideY}px)`,
        padding: "14px",
        borderRadius: 16,
        background: colors.bgGlass,
        border: `1px solid ${colors.border}`,
        marginBottom: 10,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "rgba(201,168,76,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            border: `1px solid ${colors.border}`,
          }}
        >
          {moment.avatar}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: colors.textPrimary, fontWeight: 600 }}>{moment.name}</div>
          <div style={{ fontSize: 8, color: colors.textMuted }}>{moment.time}</div>
        </div>
        <div
          style={{
            padding: "2px 8px",
            borderRadius: 12,
            background: "rgba(201,168,76,0.12)",
            fontSize: 8,
            color: colors.gold,
            letterSpacing: 0.5,
          }}
        >
          {moment.tag}
        </div>
      </div>

      {/* Text */}
      <div style={{ fontSize: 10, color: colors.textSecondary, lineHeight: 1.6, marginBottom: 10 }}>
        {moment.text}
      </div>

      {/* Engagement */}
      <div style={{ display: "flex", gap: 16, fontSize: 9, color: colors.textMuted }}>
        <span>❤️ {likeAnim}</span>
        <span>💬 {moment.comments}</span>
        <span style={{ marginLeft: "auto", color: colors.gold, fontSize: 8 }}>Share your moment →</span>
      </div>
    </div>
  );
};

const PhoneMomentsScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const scrollY = interpolate(frame, [40, 200], [0, -60], { extrapolateRight: "clamp" });

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
      <div style={{ padding: "56px 14px 14px", transform: `translateY(${scrollY}px)` }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: fonts.serif, fontSize: 16, color: colors.textPrimary, fontWeight: 600 }}>
              MonArk Moments
            </div>
            <div style={{ fontSize: 9, color: colors.textSecondary }}>Real stories from real connections</div>
          </div>
          <div
            style={{
              padding: "5px 12px",
              borderRadius: 20,
              background: colors.gradientGold,
              fontSize: 9,
              fontWeight: 700,
              color: "#0A0A0F",
            }}
          >
            + Share
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "hidden" }}>
          {["All", "First Date", "Milestones", "Curated", "Growth"].map((tab, i) => (
            <div
              key={tab}
              style={{
                padding: "5px 12px",
                borderRadius: 20,
                background: i === 0 ? "rgba(201,168,76,0.15)" : "transparent",
                border: `1px solid ${i === 0 ? colors.borderBright : colors.border}`,
                fontSize: 9,
                color: i === 0 ? colors.gold : colors.textSecondary,
                whiteSpace: "nowrap",
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Moment cards */}
        {MOMENTS.map((m, i) => (
          <MomentCard key={i} moment={m} index={i} />
        ))}
      </div>
    </div>
  );
};

export const Scene07_MonArkMoments: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const phoneSlide = spring({ frame, fps, config: { damping: 70, stiffness: 120, mass: 0.9 } });
  const phoneY = interpolate(phoneSlide, [0, 1], [100, 0]);

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
      <GlowOrb x="25%" y="50%" size={550} color="rgba(232,160,160,0.2)" delay={0} />
      <GlowOrb x="80%" y="40%" size={400} color="rgba(201,168,76,0.2)" delay={50} />

      {/* Left text */}
      <div style={{ maxWidth: 420 }}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            letterSpacing: 5,
            color: colors.roseLight,
            textTransform: "uppercase",
            marginBottom: 20,
            opacity: interpolate(frame, [5, 35], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          Community
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
          Stories of{" "}
          <span style={{ background: colors.gradientRose, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            real connection
          </span>
        </div>

        <div style={{ width: 80, height: 1, background: colors.gradientRose, marginBottom: 24 }} />

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
          MonArk Moments is a curated feed of real connection stories from our community.
          First dates, milestones, and growth moments — shared by members who found
          something real through depth-first matching.
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 24,
            opacity: interpolate(frame, [50, 80], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {[
            { num: "2,400+", label: "Stories Shared" },
            { num: "89%", label: "Second Date Rate" },
            { num: "340+", label: "Relationships Formed" },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: fonts.serif,
                  fontSize: 28,
                  fontWeight: 700,
                  background: colors.gradientGold,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {num}
              </div>
              <div style={{ fontSize: 11, color: colors.textSecondary }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right phone */}
      <div style={{ transform: `translateY(${phoneY}px)` }}>
        <PhoneMockup scale={1}>
          <PhoneMomentsScreen />
        </PhoneMockup>
      </div>
    </div>
  );
};
