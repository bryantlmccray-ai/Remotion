import React from "react";
import { Composition } from "remotion";
import { WellnessDemo, TOTAL_DURATION } from "./WellnessDemo";
import { LuxuryDemo, LUXURY_TOTAL_DURATION } from "./LuxuryDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LuxuryDemo"
        component={LuxuryDemo}
        durationInFrames={LUXURY_TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="WellnessDemo"
        component={WellnessDemo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
