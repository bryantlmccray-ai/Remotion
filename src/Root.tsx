import React from "react";
import { Composition } from "remotion";
import { WellnessDemo, TOTAL_DURATION } from "./WellnessDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WellnessDemo"
        component={WellnessDemo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="WellnessDemoVertical"
        component={WellnessDemo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
    </>
  );
};
