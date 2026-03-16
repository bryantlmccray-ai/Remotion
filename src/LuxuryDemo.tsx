import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Scene01_Splash } from "./scenes/Scene01_Splash";
import { Scene02_Landing } from "./scenes/Scene02_Landing";
import { Scene03_Onboarding } from "./scenes/Scene03_Onboarding";
import { Scene04_YourThree } from "./scenes/Scene04_YourThree";
import { Scene05_LiveChat } from "./scenes/Scene05_LiveChat";
import { Scene06_InvestorBrief } from "./scenes/Scene06_InvestorBrief";
import { Scene07_MonArkMoments } from "./scenes/Scene07_MonArkMoments";
import { Scene08_Insights } from "./scenes/Scene08_Insights";
import { Scene09_Patterns } from "./scenes/Scene09_Patterns";
import { Scene10_MockProfile } from "./scenes/Scene10_MockProfile";
import { Scene11_CuratedDate } from "./scenes/Scene11_CuratedDate";
import { FadeTransition } from "./components/SceneTransition";

// Scene durations at 30fps
const SCENES = [
  { component: Scene01_Splash, duration: 180, label: "Splash" },               // 6s
  { component: Scene02_Landing, duration: 210, label: "Landing" },              // 7s
  { component: Scene03_Onboarding, duration: 270, label: "Onboarding" },        // 9s
  { component: Scene04_YourThree, duration: 210, label: "Your Three" },         // 7s
  { component: Scene05_LiveChat, duration: 270, label: "Live Chat" },           // 9s
  { component: Scene06_InvestorBrief, duration: 210, label: "Investor Brief" }, // 7s
  { component: Scene07_MonArkMoments, duration: 240, label: "MonArk Moments" }, // 8s
  { component: Scene08_Insights, duration: 240, label: "Insights" },            // 8s
  { component: Scene09_Patterns, duration: 240, label: "Patterns" },            // 8s
  { component: Scene10_MockProfile, duration: 210, label: "Mock Profile" },     // 7s
  { component: Scene11_CuratedDate, duration: 240, label: "Curated Date" },     // 8s
];

export const LUXURY_TOTAL_DURATION = SCENES.reduce((sum, s) => sum + s.duration, 0);
// Total: ~84 seconds

const SceneWithTransition: React.FC<{ Scene: React.FC; duration: number }> = ({ Scene, duration }) => (
  <AbsoluteFill>
    <Scene />
    <FadeTransition durationIn={20} durationOut={20} totalFrames={duration} />
  </AbsoluteFill>
);

export const LuxuryDemo: React.FC = () => {
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
