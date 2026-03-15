import React from "react";
import { colors } from "../utils/colors";

export const GoldDivider: React.FC<{ width?: string }> = ({ width = "60px" }) => (
  <div
    style={{
      width,
      height: 1,
      background: colors.gradientGold,
      borderRadius: 1,
      margin: "0 auto",
    }}
  />
);
