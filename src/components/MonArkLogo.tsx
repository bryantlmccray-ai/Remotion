import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { colors, fonts } from "../utils/colors";

interface MonArkLogoProps {
  size?: number;
  animate?: boolean;
  animateDelay?: number;
  showTagline?: boolean;
  style?: React.CSSProperties;
}

/**
 * MonArk Logo — MA monogram inside a compass rose circle
 * with cardinal point marks (N/S/E/W lines), inside a clean ring.
 * "Date well." tagline in italic serif.
 * Sandy gold on deep navy/charcoal.
 */
export const MonArkLogo: React.FC<MonArkLogoProps> = ({
  size = 160,
  animate = true,
  animateDelay = 0,
  showTagline = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - animateDelay);

  // Animation progress
  const ringDraw = animate
    ? interpolate(f, [0, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const cardinalDraw = animate
    ? interpolate(f, [10, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const monogramFade = animate
    ? interpolate(f, [18, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const taglineFade = animate
    ? interpolate(f, [30, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  // Subtle ambient rotation on the compass rose
  const compassRotation = animate ? Math.sin(frame * 0.012) * 2 : 0;

  const r = size / 2;
  const ringR = r * 0.88;
  const cardinalLen = size * 0.08;
  const cardinalGap = ringR + 2;
  const innerRoseR = r * 0.28;

  // Ring circumference for stroke-dasharray animation
  const ringCircumference = 2 * Math.PI * ringR;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: size * 0.1,
        ...style,
      }}
    >
      <div style={{ position: "relative", width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ transform: `rotate(${compassRotation}deg)` }}
        >
          <defs>
            <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.gold} />
              <stop offset="50%" stopColor={colors.goldLight} />
              <stop offset="100%" stopColor={colors.gold} />
            </linearGradient>
          </defs>

          {/* === OUTER RING — draws itself === */}
          <circle
            cx={r}
            cy={r}
            r={ringR}
            fill="none"
            stroke="url(#logoGold)"
            strokeWidth={1.5}
            strokeDasharray={ringCircumference}
            strokeDashoffset={ringCircumference * (1 - ringDraw)}
            opacity={0.9}
          />

          {/* === CARDINAL POINT MARKS (N/S/E/W) === */}
          {/* North */}
          <line
            x1={r} y1={r - cardinalGap}
            x2={r} y2={r - cardinalGap - cardinalLen}
            stroke={colors.gold}
            strokeWidth={1.5}
            strokeLinecap="round"
            opacity={cardinalDraw}
          />
          {/* South */}
          <line
            x1={r} y1={r + cardinalGap}
            x2={r} y2={r + cardinalGap + cardinalLen}
            stroke={colors.gold}
            strokeWidth={1.5}
            strokeLinecap="round"
            opacity={cardinalDraw}
          />
          {/* East */}
          <line
            x1={r + cardinalGap} y1={r}
            x2={r + cardinalGap + cardinalLen} y2={r}
            stroke={colors.gold}
            strokeWidth={1.5}
            strokeLinecap="round"
            opacity={cardinalDraw}
          />
          {/* West */}
          <line
            x1={r - cardinalGap} y1={r}
            x2={r - cardinalGap - cardinalLen} y2={r}
            stroke={colors.gold}
            strokeWidth={1.5}
            strokeLinecap="round"
            opacity={cardinalDraw}
          />

          {/* === COMPASS ROSE inner points (diagonal ticks) === */}
          {[45, 135, 225, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const tickLen = cardinalLen * 0.6;
            const tickGap = ringR * 0.85;
            return (
              <line
                key={deg}
                x1={r + tickGap * Math.cos(rad)}
                y1={r + tickGap * Math.sin(rad)}
                x2={r + (tickGap + tickLen) * Math.cos(rad)}
                y2={r + (tickGap + tickLen) * Math.sin(rad)}
                stroke={colors.gold}
                strokeWidth={1}
                strokeLinecap="round"
                opacity={cardinalDraw * 0.5}
              />
            );
          })}

          {/* === INNER COMPASS ROSE (diamond/star shape) === */}
          {cardinalDraw > 0.3 && (
            <g opacity={cardinalDraw * 0.25}>
              {/* 4-pointed star inside */}
              <polygon
                points={`
                  ${r},${r - innerRoseR}
                  ${r + innerRoseR * 0.25},${r}
                  ${r},${r + innerRoseR}
                  ${r - innerRoseR * 0.25},${r}
                `}
                fill={colors.gold}
                opacity={0.15}
              />
              <polygon
                points={`
                  ${r - innerRoseR},${r}
                  ${r},${r - innerRoseR * 0.25}
                  ${r + innerRoseR},${r}
                  ${r},${r + innerRoseR * 0.25}
                `}
                fill={colors.gold}
                opacity={0.15}
              />
            </g>
          )}

          {/* === THIN INNER RING === */}
          <circle
            cx={r}
            cy={r}
            r={ringR * 0.55}
            fill="none"
            stroke={colors.gold}
            strokeWidth={0.5}
            opacity={cardinalDraw * 0.3}
          />
        </svg>

        {/* === MA MONOGRAM (HTML overlay for crisp text) === */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: monogramFade,
            transform: `scale(${0.85 + monogramFade * 0.15})`,
          }}
        >
          <span
            style={{
              fontFamily: fonts.serif,
              fontSize: size * 0.28,
              fontWeight: 700,
              color: colors.gold,
              letterSpacing: size * 0.02,
              lineHeight: 1,
              textShadow: `0 0 ${size * 0.15}px rgba(201,168,76,0.3)`,
            }}
          >
            MA
          </span>
        </div>
      </div>

      {/* === "Date well." TAGLINE === */}
      {showTagline && (
        <div
          style={{
            opacity: taglineFade,
            transform: `translateY(${(1 - taglineFade) * 8}px)`,
          }}
        >
          <span
            style={{
              fontFamily: fonts.serif,
              fontSize: size * 0.1,
              fontStyle: "italic",
              fontWeight: 300,
              color: colors.gold,
              letterSpacing: size * 0.015,
              opacity: 0.8,
            }}
          >
            Date well.
          </span>
        </div>
      )}
    </div>
  );
};
