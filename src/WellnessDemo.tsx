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

// Scene durations at 30fps — paced for cinematic impact
const SCENES = [
  { component: Scene01_BrandReveal, duration: 150, label: "The Arrival", transition: "fade" },           // 5s
  { component: Scene02_SplashScreen, duration: 120, label: "The Pulse", transition: "blur" },             // 4s
  { component: Scene03_LandingPage, duration: 195, label: "The Statement", transition: "gold-wipe" },     // 6.5s
  { component: Scene04_Onboarding, duration: 310, label: "The Journey", transition: "blur" },             // ~10.3s
  { component: Scene05_ProfileCreation, duration: 210, label: "Your Identity", transition: "gold-wipe" }, // 7s
  { component: Scene06_WeeklyCheckin, duration: 240, label: "Weekly Wellness", transition: "blur" },      // 8s
  { component: Scene07_AIInsights, duration: 220, label: "AI Coach", transition: "gold-wipe" },           // ~7.3s
  { component: Scene08_Discovery, duration: 210, label: "Discovery", transition: "blur" },                // 7s
  { component: Scene09_CTA, duration: 215, label: "The Finale", transition: "fade" },                     // ~7.2s
];

export const TOTAL_DURATION = SCENES.reduce((sum, s) => sum + s.duration, 0);
// Total: ~62 seconds

const TransitionOverlay: React.FC<{ type: string; duration: number }> = ({ type, duration }) => {
  switch (type) {
    case "gold-wipe":
      return <GoldWipeTransition durationIn={20} durationOut={18} totalFrames={duration} />;
    case "blur":
      return <BlurTransition durationIn={18} durationOut={16} totalFrames={duration} />;
    case "fade":
    default:
      return <FadeTransition durationIn={15} durationOut={15} totalFrames={duration} />;
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
    <AbsoluteFill style={{ background: "#07070C" }}>
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
