import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";

// === Cinematic Spring Configs ===
export const SPRING = {
  // Luxo Jr ball bounce — communicates mass and intention
  bounce: { damping: 12, stiffness: 120, mass: 0.8 },
  // Velvet slide — decelerates like a luxury watch on cloth
  velvet: { damping: 80, stiffness: 100, mass: 1.2 },
  // Snap — crisp, confident, Apple keynote energy
  snap: { damping: 20, stiffness: 300, mass: 0.5 },
  // Float — gentle, atmospheric, dreamy
  float: { damping: 100, stiffness: 60, mass: 1.5 },
  // Elastic — playful overshoot for UI elements
  elastic: { damping: 10, stiffness: 180, mass: 0.6 },
  // Heavy — dramatic entrance with weight
  heavy: { damping: 50, stiffness: 80, mass: 2 },
  // Quick — fast responsive micro-interactions
  quick: { damping: 25, stiffness: 400, mass: 0.3 },
} as const;

// === Easing Functions ===
export const ease = {
  // Cubic ease out — the "setting something gently on a table" feel
  outCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  // Quart ease out — more dramatic deceleration
  outQuart: (t: number) => 1 - Math.pow(1 - t, 4),
  // Expo ease out — explosive start, silk landing
  outExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  // Back ease out — slight overshoot then settle
  outBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  // Circ ease out — circular deceleration
  outCirc: (t: number) => Math.sqrt(1 - Math.pow(t - 1, 2)),
  // Sine ease in-out — smooth breathing rhythm
  inOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
} as const;

// === Hook-based Animations ===
export const useFadeIn = (startFrame = 0, duration = 30) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const useSlideUp = (startFrame = 0, distance = 60, config = SPRING.velvet) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - startFrame, fps, config });
  return {
    transform: `translateY(${(1 - progress) * distance}px)`,
    opacity: progress,
  };
};

export const useSlideIn = (
  startFrame = 0,
  distance = 100,
  direction: "left" | "right" = "right",
  config = SPRING.velvet
) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - startFrame, fps, config });
  const sign = direction === "left" ? -1 : 1;
  return {
    transform: `translateX(${sign * (1 - progress) * distance}px)`,
    opacity: progress,
  };
};

export const useScale = (startFrame = 0, config = SPRING.bounce) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - startFrame, fps, config });
};

// 3D perspective entrance — phone slides in with depth
export const use3DEntrance = (
  startFrame = 0,
  config = SPRING.heavy
) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - startFrame, fps, config });
  return {
    transform: `perspective(1200px) translateZ(${(1 - progress) * -200}px) rotateY(${(1 - progress) * 15}deg)`,
    opacity: interpolate(progress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
  };
};

// Continuous floating motion — never stops, always alive
export const useFloat = (amplitude = 8, speed = 0.03, phase = 0) => {
  const frame = useCurrentFrame();
  return {
    y: amplitude * Math.sin(frame * speed + phase),
    x: (amplitude * 0.5) * Math.cos(frame * speed * 0.7 + phase),
    rotation: amplitude * 0.15 * Math.sin(frame * speed * 0.5 + phase),
  };
};

// Breathing scale — subtle but always present
export const useBreathe = (minScale = 0.98, maxScale = 1.02, speed = 0.04) => {
  const frame = useCurrentFrame();
  return minScale + (maxScale - minScale) * (0.5 + 0.5 * Math.sin(frame * speed));
};

// Shimmer sweep across text/elements
export const useShimmer = (startFrame = 0, duration = 60, width = 200) => {
  const frame = useCurrentFrame();
  return interpolate(
    frame,
    [startFrame, startFrame + duration],
    [-width, width * 3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
};

// Stagger delay calculator for lists
export const stagger = (index: number, baseDelay = 0, interval = 8) =>
  baseDelay + index * interval;

// Raw spring function
export const springAnim = (
  frame: number,
  startFrame: number,
  fps: number,
  config = SPRING.velvet
) => {
  return spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config,
  });
};

// Typewriter effect — returns how many chars to show
export const typewriter = (
  frame: number,
  startFrame: number,
  textLength: number,
  charsPerFrame = 0.8
) => {
  const elapsed = Math.max(0, frame - startFrame);
  return Math.min(Math.floor(elapsed * charsPerFrame), textLength);
};

// Counter animation — smoothly counts up a number
export const animateCounter = (
  frame: number,
  startFrame: number,
  endFrame: number,
  from: number,
  to: number
) => {
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease.outQuart,
  });
  return Math.round(from + (to - from) * progress);
};

// Parallax layers — different elements move at different speeds
export const useParallax = (speed = 1) => {
  const frame = useCurrentFrame();
  return frame * speed * 0.5;
};
