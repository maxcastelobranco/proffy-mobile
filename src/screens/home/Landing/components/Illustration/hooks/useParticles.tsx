import React from "react";
import { useTheme } from "@shopify/restyle";
import * as faker from "faker";

import Gear from "../../../../../../components/svgs/animated/Gear";
import responsivePixelSize from "../../../../../../utils/responsivePixelSize";
import Graph from "../../../../../../components/svgs/animated/Graph";
import LoadingCircles from "../../../../../../components/svgs/animated/LoadingCircles";
import SpeechBalloon from "../../../../../../components/svgs/animated/SpeechBalloon";
import Clock from "../../../../../../components/svgs/animated/Clock";
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
      key={faker.random.uuid()}
      viewProps={{
        style: {
          position: "absolute",
          top: responsivePixelSize(12),
          right: responsivePixelSize(160),
        },
      }}
    />,

    <Graph
      key={faker.random.uuid()}
      viewProps={{
        style: {
          position: "absolute",
          bottom: responsivePixelSize(60),
          right: responsivePixelSize(182),
        },
      }}
    />,
    <LoadingCircles
      key={faker.random.uuid()}
      extraStyles={{
        position: "absolute",
        top: responsivePixelSize(50),
        left: responsivePixelSize(271),
      }}
    />,
    <SpeechBalloon
      key={faker.random.uuid()}
      extraStyles={{
        position: "absolute",
        top: responsivePixelSize(65),
        left: responsivePixelSize(46),
      }}
    />,
    <Clock
      key={faker.random.uuid()}
      viewProps={{
        style: {
          position: "absolute",
          top: responsivePixelSize(52),
          right: responsivePixelSize(45),
        },
      }}
    />,
    <CircleGrid
      key={faker.random.uuid()}
      rows={2}
      columns={4}
      circleColor={theme.colors.primaryLight}
      circleSize={CIRCLE_SIZE}
      {...{
        position: "absolute",
        bottom: responsivePixelSize(16),
        left: responsivePixelSize(170),
      }}
    />,
    <CircleGrid
      key={faker.random.uuid()}
      rows={2}
      columns={3}
      circleColor={theme.colors.primaryLight}
      circleSize={CIRCLE_SIZE}
      {...{
        position: "absolute",
        top: responsivePixelSize(22),
        right: responsivePixelSize(54),
      }}
    />,
    <OutlinedCircle
      key={faker.random.uuid()}
      viewProps={{
        style: {
          position: "absolute",
          top: responsivePixelSize(112),
          left: responsivePixelSize(24),
        },
      }}
      svgProps={{
        stroke: theme.colors.secondary,
        width: SVG_PARTICLE_SIZE,
        height: SVG_PARTICLE_SIZE,
      }}
    />,
    <OutlinedCircle
      key={faker.random.uuid()}
      viewProps={{
        style: {
          position: "absolute",
          top: responsivePixelSize(124),
          right: responsivePixelSize(28),
        },
      }}
      svgProps={{
        stroke: theme.colors.secondary,
        width: SVG_PARTICLE_SIZE,
        height: SVG_PARTICLE_SIZE,
      }}
    />,
    <X
      key={faker.random.uuid()}
      viewProps={{
        style: {
          position: "absolute",
          bottom: responsivePixelSize(12),
          right: responsivePixelSize(180),
        },
      }}
      svgProps={{
        stroke: theme.colors.secondary,
        width: SVG_PARTICLE_SIZE,
        height: SVG_PARTICLE_SIZE,
      }}
    />,
    <X
      key={faker.random.uuid()}
      viewProps={{
        style: {
          position: "absolute",
          top: responsivePixelSize(12),
          left: responsivePixelSize(114),
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
