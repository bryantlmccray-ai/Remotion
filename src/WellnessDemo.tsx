import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Scene01_BrandReveal } from "./scenes/Scene01_BrandReveal";
import { Scene02_SplashScreen } from "./scenes/Scene02_SplashScreen";
import { Scene03_LandingPage } from "./scenes/Scene03_LandingPage";
import { Scene04_Onboarding } from "./scenes/Scene04_Onboarding";
import { Scene05_ProfileCreation } from "./scenes/Scene05_ProfileCreation";
import { Scene06_WeeklyCheckin } from "./scenes/Scene06_WeeklyCheckin";
import { Scene07_AIInsights } from "./scenes/Scene07_AIInsights";
import { Scene08_Compatibility } from "./scenes/Scene08_Compatibility";
import { Scene09_Discovery } from "./scenes/Scene09_Discovery";
import { Scene10_Testimonials } from "./scenes/Scene10_Testimonials";
import { Scene11_CTA } from "./scenes/Scene11_CTA";
import { FadeTransition } from "./components/SceneTransition";

// Scene durations at 30fps — 11 scenes, ~80 seconds total
const SCENES = [
  { component: Scene01_BrandReveal, duration: 150, label: "Brand Reveal" },             // 5s
  { component: Scene02_SplashScreen, duration: 120, label: "Splash Screen" },            // 4s
  { component: Scene03_LandingPage, duration: 210, label: "Landing Page" },              // 7s
  { component: Scene04_Onboarding, duration: 300, label: "Onboarding Journey" },         // 10s
  { component: Scene05_ProfileCreation, duration: 210, label: "Profile Creation" },      // 7s
  { component: Scene06_WeeklyCheckin, duration: 240, label: "Weekly Check-in" },         // 8s
  { component: Scene07_AIInsights, duration: 240, label: "AI Insights" },                // 8s
  { component: Scene08_Compatibility, duration: 240, label: "Compatibility Dashboard" }, // 8s  NEW
  { component: Scene09_Discovery, duration: 210, label: "Discovery" },                   // 7s
  { component: Scene10_Testimonials, duration: 240, label: "Testimonials" },             // 8s  NEW
  { component: Scene11_CTA, duration: 240, label: "Call to Action" },                    // 8s
];

export const TOTAL_DURATION = SCENES.reduce((sum, s) => sum + s.duration, 0);
// Total: ~80 seconds

const SceneWithTransition: React.FC<{ Scene: React.FC; duration: number }> = ({ Scene, duration }) => (
  <AbsoluteFill>
    <Scene />
    <FadeTransition durationIn={20} durationOut={20} totalFrames={duration} />
  </AbsoluteFill>
);

export const WellnessDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Series>
        {SCENES.map(({ component: SceneComp, duration, label }) => (
          <Series.Sequence key={label} durationInFrames={duration}>
            <SceneWithTransition Scene={SceneComp} duration={duration} />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
