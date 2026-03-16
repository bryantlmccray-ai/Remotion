import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../utils/colors";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { PhoneMockup } from "../components/PhoneMockup";

const TypingIndicator: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "4px 0" }}>
    {[0, 1, 2].map((d) => (
      <div
        key={d}
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: colors.accent,
          opacity: 0.4 + 0.6 * Math.sin(frame * 0.2 + d * 1.2),
        }}
      />
    ))}
  </div>
);

interface ChatMessage {
  sender: "match" | "user";
  text: string;
  startFrame: number;
}

const MESSAGES: ChatMessage[] = [
  { sender: "match", text: "Hey! I saw we matched on emotional depth — that's rare for me to find", startFrame: 20 },
  { sender: "match", text: "What does vulnerability look like for you?", startFrame: 65 },
  { sender: "user", text: "I think it's letting someone see your real self, not the curated version", startFrame: 110 },
  { sender: "user", text: "What drew you to MonArk?", startFrame: 155 },
  { sender: "match", text: "Honestly? I was tired of surface-level apps. This felt different from the first question 💜", startFrame: 200 },
];

const ChatBubble: React.FC<{ message: ChatMessage; matchName: string }> = ({ message, matchName }) => {
  const frame = useCurrentFrame();
  const isMatch = message.sender === "match";

  const appear = interpolate(frame, [message.startFrame, message.startFrame + 15], [0, 1], { extrapolateRight: "clamp" });
  const slideY = interpolate(frame, [message.startFrame, message.startFrame + 15], [12, 0], { extrapolateRight: "clamp" });

  const charProgress = interpolate(
    frame,
    [message.startFrame + 5, message.startFrame + 5 + message.text.length * 0.8],
    [0, message.text.length],
    { extrapolateRight: "clamp" }
  );
  const displayText = message.text.slice(0, Math.floor(charProgress));

  if (appear <= 0) return null;

  return (
    <div
      style={{
        opacity: appear,
        transform: `translateY(${slideY}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: isMatch ? "flex-start" : "flex-end",
        marginBottom: 8,
      }}
    >
      {isMatch && (
        <div style={{ fontSize: 8, color: colors.textMuted, marginBottom: 3, marginLeft: 12 }}>{matchName}</div>
      )}
      <div
        style={{
          maxWidth: "80%",
          padding: "10px 14px",
          borderRadius: isMatch ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
          background: isMatch ? "rgba(127,90,56,0.08)" : "rgba(166,147,95,0.12)",
          border: `1px solid ${isMatch ? "rgba(127,90,56,0.15)" : "rgba(166,147,95,0.2)"}`,
          fontSize: 11,
          color: colors.textPrimary,
          lineHeight: 1.5,
        }}
      >
        {displayText}
        {Math.floor(charProgress) < message.text.length && (
          <span style={{ opacity: frame % 20 < 10 ? 1 : 0, color: isMatch ? colors.accent : colors.gold }}>|</span>
        )}
      </div>
    </div>
  );
};

const PhoneChatScreen: React.FC = () => {
  const frame = useCurrentFrame();

  const showTyping1 = frame > 5 && frame < 20;
  const showTyping2 = frame > 50 && frame < 65;
  const showTyping3 = frame > 185 && frame < 200;

  return (
    <div style={{ width: "100%", height: "100%", background: colors.bgCard, display: "flex", flexDirection: "column", fontFamily: fonts.sans }}>
      <div
        style={{
          padding: "50px 16px 12px",
          borderBottom: `1px solid ${colors.border}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(166,147,95,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            border: `1.5px solid ${colors.borderBright}`,
          }}
        >
          👩🏾‍🎨
        </div>
        <div>
          <div style={{ fontSize: 13, color: colors.textPrimary, fontWeight: 600 }}>Amara</div>
          <div style={{ fontSize: 9, color: colors.olive, display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: colors.olive }} />
            Online now
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <div
            style={{
              padding: "4px 10px",
              borderRadius: 20,
              background: "rgba(166,147,95,0.1)",
              border: `1px solid ${colors.border}`,
              fontSize: 9,
              color: colors.gold,
              fontWeight: 600,
            }}
          >
            96% Match
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: "16px 14px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ textAlign: "center", fontSize: 9, color: colors.textMuted, marginBottom: 16, letterSpacing: 1 }}>Today</div>
        {MESSAGES.map((msg, i) => (
          <ChatBubble key={i} message={msg} matchName="Amara" />
        ))}
        {(showTyping1 || showTyping2 || showTyping3) && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 4 }}>
            <div
              style={{
                padding: "8px 14px",
                borderRadius: "16px 16px 16px 4px",
                background: "rgba(127,90,56,0.06)",
                border: `1px solid rgba(127,90,56,0.12)`,
              }}
            >
              <TypingIndicator frame={frame} />
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          padding: "10px 14px 24px",
          borderTop: `1px solid ${colors.border}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 24,
            background: colors.bgGlass,
            border: `1px solid ${colors.border}`,
            fontSize: 11,
            color: colors.textMuted,
          }}
        >
          Type a message...
        </div>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: colors.gradientGold,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            color: colors.bgCard,
            boxShadow: "0 4px 16px rgba(166,147,95,0.2)",
          }}
        >
          ↑
        </div>
      </div>
    </div>
  );
};

export const Scene05_LiveChat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const phoneScale = spring({ frame, fps, config: { damping: 70, stiffness: 120, mass: 0.9 } });
  const phoneX = interpolate(phoneScale, [0, 1], [200, 0]);

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
      <GlowOrb x="30%" y="50%" size={500} color="rgba(94,110,74,0.08)" delay={0} />
      <GlowOrb x="75%" y="35%" size={450} color="rgba(166,147,95,0.1)" delay={40} />

      <div style={{ maxWidth: 420 }}>
        <div
          style={{
            fontFamily: fonts.sans, fontSize: 12, letterSpacing: 5, color: colors.rose,
            textTransform: "uppercase", marginBottom: 20,
            opacity: interpolate(frame, [5, 35], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          Real Conversation
        </div>
        <div
          style={{
            fontFamily: fonts.serif, fontSize: 52, fontWeight: 300, lineHeight: 1.15, color: colors.textPrimary,
            marginBottom: 24,
            opacity: interpolate(frame, [15, 45], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [15, 45], [30, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          No small talk.{" "}
          <span style={{ background: colors.gradientRose, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Just depth.
          </span>
        </div>
        <div style={{ width: 80, height: 1, background: colors.gradientRose, marginBottom: 24 }} />
        <div
          style={{
            fontFamily: fonts.sans, fontSize: 15, color: colors.textSecondary, lineHeight: 1.7, marginBottom: 40,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          MonArk's chat experience is designed for meaningful exchange.
          Conversation prompts based on your shared RIF dimensions guide
          you past the awkward phase and into authentic connection.
        </div>

        {[
          { icon: "💬", title: "Guided Openers", desc: "AI-crafted prompts from shared values" },
          { icon: "🔒", title: "Safe Space", desc: "Screenshot-protected, encrypted end-to-end" },
          { icon: "✨", title: "Connection Score", desc: "See compatibility grow in real time" },
          { icon: "📅", title: "Date Planning", desc: "Seamlessly transition to your curated date" },
        ].map(({ icon, title, desc }, i) => (
          <div
            key={title}
            style={{
              opacity: interpolate(frame, [40 + i * 10, 65 + i * 10], [0, 1], { extrapolateRight: "clamp" }),
              display: "flex", gap: 12, marginBottom: 14, alignItems: "center",
            }}
          >
            <span style={{ fontSize: 20 }}>{icon}</span>
            <div>
              <div style={{ fontFamily: fonts.serif, fontSize: 14, color: colors.textPrimary }}>{title}</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textSecondary }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ transform: `translateX(${phoneX}px) scale(${phoneScale})` }}>
        <PhoneMockup scale={1}>
          <PhoneChatScreen />
        </PhoneMockup>
      </div>
    </div>
  );
};
