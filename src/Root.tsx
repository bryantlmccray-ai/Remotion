import React from "react";
import { Composition } from "remotion";
import { WellnessDemo, TOTAL_DURATION } from "./WellnessDemo";
import { WeeklyWellnessPixar, WEEKLY_WELLNESS_DURATION } from "./WeeklyWellnessPixar";

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
        id="WeeklyWellnessPixar"
        component={WeeklyWellnessPixar}
        durationInFrames={WEEKLY_WELLNESS_DURATION}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
