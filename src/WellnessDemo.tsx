import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Scene01_BrandReveal } from "./scenes/Scene01_BrandReveal";
import { Scene02_SplashScreen } from "./scenes/Scene02_SplashScreen";
import { Scene03_LandingPage } from "./scenes/Scene03_LandingPage";
import { Scene04_Onboarding } from "./scenes/Scene04_Onboarding";
import { Scene05_ProfileCreation } from "./scenes/Scene05_ProfileCreation";
import { Scene06_WeeklyCheckin } from "./scenes/Scene06_WeeklyCheckin";
import { Scene07_AIInsights } from "./scenes/Scene07_AIInsights";
import { Scene08_Discovery } from "./scenes/Scene08_Discovery";
import { Scene09_CTA } from "./scenes/Scene09_CTA";
import { FadeTransition, GoldWipeTransition, BlurTransition } from "./components/SceneTransition";

// Scene durations at 30fps — FAST pacing, ~4 sec per scene
const SCENES = [
  { component: Scene01_BrandReveal, duration: 120, label: "The Arrival", transition: "fade" },         // 4s
  { component: Scene02_SplashScreen, duration: 105, label: "The Pulse", transition: "blur" },           // 3.5s
  { component: Scene03_LandingPage, duration: 120, label: "The Statement", transition: "gold-wipe" },   // 4s
  { component: Scene04_Onboarding, duration: 150, label: "The Journey", transition: "blur" },           // 5s (3 steps)
  { component: Scene05_ProfileCreation, duration: 120, label: "Your Profile", transition: "gold-wipe" },// 4s
  { component: Scene06_WeeklyCheckin, duration: 120, label: "Weekly Wellness", transition: "blur" },    // 4s
  { component: Scene07_AIInsights, duration: 120, label: "AI Coach", transition: "gold-wipe" },         // 4s
  { component: Scene08_Discovery, duration: 120, label: "Discovery", transition: "blur" },              // 4s
  { component: Scene09_CTA, duration: 135, label: "The Finale", transition: "fade" },                   // 4.5s
];

export const TOTAL_DURATION = SCENES.reduce((sum, s) => sum + s.duration, 0);
// Total: ~37 seconds — fast, punchy, dynamic

const TransitionOverlay: React.FC<{ type: string; duration: number }> = ({ type, duration }) => {
  switch (type) {
    case "gold-wipe":
      return <GoldWipeTransition durationIn={12} durationOut={10} totalFrames={duration} />;
    case "blur":
      return <BlurTransition durationIn={10} durationOut={10} totalFrames={duration} />;
    case "fade":
    default:
      return <FadeTransition durationIn={10} durationOut={10} totalFrames={duration} />;
  }
};

const SceneWithTransition: React.FC<{
  Scene: React.FC;
  duration: number;
  transition: string;
}> = ({ Scene, duration, transition }) => (
  <AbsoluteFill>
    <Scene />
    <TransitionOverlay type={transition} duration={duration} />
  </AbsoluteFill>
);

export const WellnessDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0B0E17" }}>
      <Series>
        {SCENES.map(({ component: SceneComp, duration, label, transition }) => (
          <Series.Sequence key={label} durationInFrames={duration}>
            <SceneWithTransition Scene={SceneComp} duration={duration} transition={transition} />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
