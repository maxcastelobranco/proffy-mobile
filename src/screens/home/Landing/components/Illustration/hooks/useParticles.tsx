import React from "react";
import { useTheme } from "@shopify/restyle";

import Gear from "../../../../../../components/svgs/animated/HomeIllustration/components/Gear";
import responsivePixelSize from "../../../../../../utils/responsivePixelSize";
import SpeechBalloon from "../../../../../../components/svgs/animated/SpeechBalloon";
import Clock from "../../../../../../components/svgs/animated/HomeIllustration/components/Clock";
import CircleGrid from "../../../../../../components/animated/CircleGrid";
import OutlinedCircle from "../../../../../../components/svgs/animated/OutlinedCircle";
import X from "../../../../../../components/svgs/animated/X";
import { Theme } from "../../../../../../theme";

const CIRCLE_SIZE = responsivePixelSize(2);
const SVG_PARTICLE_SIZE = responsivePixelSize(8);

export const useParticles = () => {
  const theme = useTheme<Theme>();

  return [
    <Gear
      key="0"
      viewProps={{
        style: {
          position: "absolute",
          top: responsivePixelSize(-12),
          right: responsivePixelSize(150),
        },
      }}
    />,
    <SpeechBalloon
      key="1"
      extraStyles={{
        position: "absolute",
        top: responsivePixelSize(6),
        left: responsivePixelSize(33),
      }}
    />,
    <Clock
      key="2"
      viewProps={{
        style: {
          position: "absolute",
          top: responsivePixelSize(52),
          right: responsivePixelSize(25),
        },
      }}
    />,
    <CircleGrid
      key="3"
      rows={2}
      columns={4}
      circleColor={theme.colors.primaryLight}
      circleSize={CIRCLE_SIZE}
      {...{
        position: "absolute",
        bottom: responsivePixelSize(16),
        left: responsivePixelSize(140),
      }}
    />,
    <OutlinedCircle
      key="4"
      viewProps={{
        style: {
          position: "absolute",
          top: responsivePixelSize(112),
          left: responsivePixelSize(34),
        },
      }}
      svgProps={{
        stroke: theme.colors.secondary,
        width: SVG_PARTICLE_SIZE,
        height: SVG_PARTICLE_SIZE,
      }}
    />,
    <X
      key="5"
      viewProps={{
        style: {
          position: "absolute",
          bottom: responsivePixelSize(12),
          right: responsivePixelSize(150),
        },
      }}
      svgProps={{
        stroke: theme.colors.secondary,
        width: SVG_PARTICLE_SIZE,
        height: SVG_PARTICLE_SIZE,
      }}
    />,
  ];
};
