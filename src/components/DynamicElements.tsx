import React from "react";
import { useCurrentFrame } from "remotion";
import { colors } from "../utils/colors";

/**
 * Large-scale animated 3D shapes and motion elements that fill the screen
 * with grand, dynamic movement. Use across scenes to eliminate dead space.
 */

// Large 3D rotating ring that sweeps across the viewport
const RotatingRing: React.FC<{
  x: string;
  y: string;
  size: number;
  speed: number;
  tiltX: number;
  tiltY: number;
  color: string;
  thickness?: number;
  delay?: number;
}> = ({ x, y, size, speed, tiltX, tiltY, color, thickness = 2, delay = 0 }) => {
  const frame = useCurrentFrame();
  const t = (frame + delay) * speed;
  const rotateZ = t * 40;
  const wobbleX = tiltX + Math.sin(t * 0.7) * 8;
  const wobbleY = tiltY + Math.cos(t * 0.5) * 8;
  const scale = 1 + 0.08 * Math.sin(t * 0.3);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        transform: `translate(-50%, -50%) perspective(800px) rotateX(${wobbleX}deg) rotateY(${wobbleY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
        transformStyle: "preserve-3d",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `${thickness}px solid ${color}`,
          boxShadow: `0 0 ${size * 0.15}px ${color}, inset 0 0 ${size * 0.08}px ${color}`,
        }}
      />
    </div>
  );
};

// Large flowing gradient ribbon that sweeps across the screen
const GradientRibbon: React.FC<{
  startY: string;
  speed: number;
  height: number;
  colors: string[];
  delay?: number;
  reverse?: boolean;
}> = ({ startY, speed, height, colors: ribbonColors, delay = 0, reverse = false }) => {
  const frame = useCurrentFrame();
  const t = (frame + delay) * speed;
  const xOffset = reverse ? 100 - (t % 200) : (t % 200) - 100;
  const yWave = Math.sin(t * 0.3) * 30;
  const opacity = 0.06 + 0.03 * Math.sin(t * 0.5);

  return (
    <div
      style={{
        position: "absolute",
        left: `${xOffset}%`,
        top: startY,
        width: "200%",
        height: height,
        background: `linear-gradient(90deg, transparent 0%, ${ribbonColors[0]} 20%, ${ribbonColors[1]} 50%, ${ribbonColors[0]} 80%, transparent 100%)`,
        transform: `translateY(${yWave}px) skewY(${Math.sin(t * 0.2) * 3}deg)`,
        opacity,
        filter: `blur(${height * 0.3}px)`,
        pointerEvents: "none",
      }}
    />
  );
};

// Large 3D floating geometric shape
const FloatingShape: React.FC<{
  x: string;
  y: string;
  size: number;
  shape: "diamond" | "hexagon" | "triangle";
  color: string;
  speed: number;
  delay?: number;
}> = ({ x, y, size, shape, color, speed, delay = 0 }) => {
  const frame = useCurrentFrame();
  const t = (frame + delay) * speed;
  const floatY = Math.sin(t * 0.4) * 25;
  const floatX = Math.cos(t * 0.3) * 15;
  const rotate = t * 20;
  const rotateX = Math.sin(t * 0.5) * 20;
  const rotateY = Math.cos(t * 0.4) * 20;
  const scale = 1 + 0.1 * Math.sin(t * 0.6);
  const opacity = 0.08 + 0.04 * Math.sin(t * 0.8);

  const clipPath =
    shape === "diamond"
      ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
      : shape === "hexagon"
      ? "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
      : "polygon(50% 0%, 100% 100%, 0% 100%)";

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        clipPath,
        background: `linear-gradient(135deg, ${color}, transparent)`,
        transform: `translate(calc(-50% + ${floatX}px), calc(-50% + ${floatY}px)) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotate}deg) scale(${scale})`,
        opacity,
        boxShadow: `0 0 ${size * 0.3}px ${color}`,
        pointerEvents: "none",
      }}
    />
  );
};

// Sweeping light rays emanating from a point
const LightRays: React.FC<{
  x: string;
  y: string;
  count: number;
  length: number;
  color: string;
  speed: number;
}> = ({ x, y, count, length, color, speed }) => {
  const frame = useCurrentFrame();
  const baseRotate = frame * speed;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 360 + baseRotate;
        const rayOpacity = 0.04 + 0.02 * Math.sin(frame * 0.03 + i * 1.5);
        const rayLength = length + Math.sin(frame * 0.02 + i) * length * 0.3;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: rayLength,
              height: 2,
              background: `linear-gradient(90deg, ${color}, transparent)`,
              transform: `rotate(${angle}deg)`,
              transformOrigin: "0 50%",
              opacity: rayOpacity,
            }}
          />
        );
      })}
    </div>
  );
};

// Animated pulse wave expanding from center
const PulseWave: React.FC<{
  x: string;
  y: string;
  maxSize: number;
  color: string;
  speed: number;
  count?: number;
}> = ({ x, y, maxSize, color, speed, count = 3 }) => {
  const frame = useCurrentFrame();

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const phase = ((frame * speed + (i * 100) / count) % 100) / 100;
        const size = phase * maxSize;
        const opacity = 0.12 * (1 - phase);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              border: `1.5px solid ${color}`,
              transform: "translate(-50%, -50%)",
              opacity,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};

// Preset configurations for different scene types
export const DynamicElements: React.FC<{
  variant?: "centered" | "split" | "grand";
  intensity?: number;
}> = ({ variant = "split", intensity = 1 }) => {
  if (variant === "centered") {
    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <RotatingRing x="50%" y="50%" size={600 * intensity} speed={0.008} tiltX={65} tiltY={0} color="rgba(201,168,76,0.12)" thickness={1.5} />
        <RotatingRing x="50%" y="50%" size={450 * intensity} speed={0.012} tiltX={70} tiltY={30} color="rgba(232,160,160,0.08)" thickness={1} delay={50} />
        <RotatingRing x="50%" y="50%" size={750 * intensity} speed={0.006} tiltX={60} tiltY={-20} color="rgba(155,142,196,0.06)" thickness={1} delay={100} />
        <PulseWave x="50%" y="50%" maxSize={900 * intensity} color="rgba(201,168,76,0.15)" speed={0.5} count={4} />
        <LightRays x="50%" y="50%" count={12} length={500 * intensity} color="rgba(201,168,76,0.08)" speed={0.15} />
        <FloatingShape x="15%" y="25%" size={120 * intensity} shape="hexagon" color="rgba(201,168,76,0.15)" speed={0.015} />
        <FloatingShape x="85%" y="75%" size={100 * intensity} shape="diamond" color="rgba(232,160,160,0.12)" speed={0.018} delay={40} />
        <FloatingShape x="10%" y="80%" size={90 * intensity} shape="triangle" color="rgba(155,142,196,0.1)" speed={0.02} delay={80} />
        <FloatingShape x="90%" y="20%" size={80 * intensity} shape="hexagon" color="rgba(201,168,76,0.1)" speed={0.016} delay={60} />
        <GradientRibbon startY="20%" speed={0.3} height={80} colors={["rgba(201,168,76,0.1)", "rgba(232,160,160,0.08)"]} />
        <GradientRibbon startY="70%" speed={0.25} height={60} colors={["rgba(155,142,196,0.08)", "rgba(201,168,76,0.06)"]} delay={50} reverse />
      </div>
    );
  }

  if (variant === "split") {
    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {/* Large ring in the center gap between left content and right phone */}
        <RotatingRing x="52%" y="45%" size={500 * intensity} speed={0.01} tiltX={68} tiltY={15} color="rgba(201,168,76,0.1)" thickness={1.5} />
        <RotatingRing x="48%" y="55%" size={380 * intensity} speed={0.014} tiltX={72} tiltY={-10} color="rgba(232,160,160,0.07)" thickness={1} delay={60} />
        {/* Side elements */}
        <FloatingShape x="3%" y="15%" size={140 * intensity} shape="hexagon" color="rgba(201,168,76,0.12)" speed={0.012} />
        <FloatingShape x="97%" y="85%" size={120 * intensity} shape="diamond" color="rgba(232,160,160,0.1)" speed={0.015} delay={30} />
        <FloatingShape x="5%" y="75%" size={100 * intensity} shape="triangle" color="rgba(155,142,196,0.08)" speed={0.018} delay={70} />
        <FloatingShape x="95%" y="15%" size={90 * intensity} shape="hexagon" color="rgba(201,168,76,0.08)" speed={0.02} delay={50} />
        {/* Gradient ribbons filling horizontal space */}
        <GradientRibbon startY="15%" speed={0.35} height={100} colors={["rgba(201,168,76,0.08)", "rgba(232,160,160,0.06)"]} />
        <GradientRibbon startY="80%" speed={0.28} height={80} colors={["rgba(155,142,196,0.06)", "rgba(201,168,76,0.05)"]} delay={40} reverse />
        <GradientRibbon startY="45%" speed={0.2} height={120} colors={["rgba(232,160,160,0.05)", "rgba(155,142,196,0.04)"]} delay={80} />
        {/* Pulse waves from the sides */}
        <PulseWave x="0%" y="50%" maxSize={600 * intensity} color="rgba(201,168,76,0.08)" speed={0.4} count={3} />
        <PulseWave x="100%" y="50%" maxSize={600 * intensity} color="rgba(232,160,160,0.06)" speed={0.35} count={3} />
        {/* Light rays from center */}
        <LightRays x="50%" y="50%" count={8} length={400 * intensity} color="rgba(201,168,76,0.05)" speed={0.1} />
      </div>
    );
  }

  // "grand" variant - maximum impact for CTA/brand scenes
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <RotatingRing x="50%" y="45%" size={700 * intensity} speed={0.008} tiltX={65} tiltY={0} color="rgba(201,168,76,0.15)" thickness={2} />
      <RotatingRing x="50%" y="50%" size={550 * intensity} speed={0.012} tiltX={70} tiltY={25} color="rgba(232,160,160,0.1)" thickness={1.5} delay={40} />
      <RotatingRing x="45%" y="55%" size={850 * intensity} speed={0.005} tiltX={60} tiltY={-15} color="rgba(155,142,196,0.07)" thickness={1} delay={80} />
      <RotatingRing x="55%" y="40%" size={400 * intensity} speed={0.016} tiltX={75} tiltY={40} color="rgba(201,168,76,0.08)" thickness={1} delay={120} />
      <PulseWave x="50%" y="50%" maxSize={1200 * intensity} color="rgba(201,168,76,0.12)" speed={0.4} count={5} />
      <LightRays x="50%" y="48%" count={16} length={600 * intensity} color="rgba(201,168,76,0.06)" speed={0.12} />
      <FloatingShape x="8%" y="20%" size={160 * intensity} shape="hexagon" color="rgba(201,168,76,0.15)" speed={0.012} />
      <FloatingShape x="92%" y="80%" size={140 * intensity} shape="diamond" color="rgba(232,160,160,0.12)" speed={0.015} delay={30} />
      <FloatingShape x="12%" y="80%" size={110 * intensity} shape="triangle" color="rgba(155,142,196,0.1)" speed={0.018} delay={60} />
      <FloatingShape x="88%" y="15%" size={130 * intensity} shape="hexagon" color="rgba(201,168,76,0.1)" speed={0.014} delay={90} />
      <FloatingShape x="50%" y="10%" size={100 * intensity} shape="diamond" color="rgba(232,160,160,0.08)" speed={0.02} delay={45} />
      <FloatingShape x="50%" y="90%" size={90 * intensity} shape="triangle" color="rgba(155,142,196,0.08)" speed={0.022} delay={75} />
      <GradientRibbon startY="10%" speed={0.4} height={120} colors={["rgba(201,168,76,0.1)", "rgba(232,160,160,0.08)"]} />
      <GradientRibbon startY="55%" speed={0.3} height={100} colors={["rgba(155,142,196,0.08)", "rgba(201,168,76,0.06)"]} delay={60} reverse />
      <GradientRibbon startY="85%" speed={0.35} height={80} colors={["rgba(232,160,160,0.07)", "rgba(201,168,76,0.05)"]} delay={30} />
    </div>
  );
};
