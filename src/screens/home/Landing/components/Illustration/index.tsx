import React from "react";
import { useTheme } from "@shopify/restyle";

import { Box, Theme } from "../../../../../theme";
import HomeIllustration from "../../../../../components/svgs/static/HomeIllustration";
import Gear from "../../../../../components/svgs/animated/Gear";
import responsivePixelSize from "../../../../../utils/responsivePixelSize";
import Play from "../../../../../components/svgs/animated/Play";
import Graph from "../../../../../components/svgs/animated/Graph";
import LoadingCircles from "../../../../../components/svgs/animated/LoadingCircles";
import SpeechBalloon from "../../../../../components/svgs/animated/SpeechBalloon";
import Clock from "../../../../../components/svgs/animated/Clock";
import CircleGrid from "../../../../../components/animated/CircleGrid";
import X from "../../../../../components/svgs/animated/X";
import OutlinedCircle from "../../../../../components/svgs/animated/OutlinedCircle";

import { useStyles } from "./styles";

const CIRCLE_SIZE = responsivePixelSize(2);
const SVG_PARTICLE_SIZE = responsivePixelSize(8);

const Illustration: React.FC = () => {
  const theme = useTheme<Theme>();
  const { containerStyles } = useStyles();

  return (
    <Box {...containerStyles}>
      <HomeIllustration />
      <Gear
        viewProps={{
          style: {
            position: "absolute",
            top: responsivePixelSize(20),
            right: responsivePixelSize(100),
          },
        }}
      />
      <Play
        viewProps={{
          style: {
            position: "absolute",
            top: responsivePixelSize(58),
            right: responsivePixelSize(118),
          },
        }}
      />
      <Play
        viewProps={{
          style: {
            zIndex: -1,
            position: "absolute",
            top: responsivePixelSize(104),
            right: responsivePixelSize(118),
          },
        }}
      />
      <Play
        viewProps={{
          style: {
            position: "absolute",
            top: responsivePixelSize(150),
            right: responsivePixelSize(118),
          },
        }}
      />
      <Graph
        viewProps={{
          style: {
            position: "absolute",
            bottom: responsivePixelSize(52),
            right: responsivePixelSize(130),
          },
        }}
      />
      <LoadingCircles
        extraStyles={{
          position: "absolute",
          top: responsivePixelSize(48),
          left: responsivePixelSize(210),
        }}
      />
      <SpeechBalloon
        extraStyles={{
          position: "absolute",
          top: responsivePixelSize(59),
          left: responsivePixelSize(26),
        }}
      />
      <Clock
        viewProps={{
          style: {
            position: "absolute",
            top: responsivePixelSize(42),
            right: responsivePixelSize(24),
          },
        }}
      />
      <CircleGrid
        rows={2}
        columns={4}
        circleColor={theme.colors.primaryLight}
        circleSize={CIRCLE_SIZE}
        {...{
          position: "absolute",
          bottom: responsivePixelSize(16),
          left: responsivePixelSize(128),
        }}
      />
      <CircleGrid
        rows={2}
        columns={3}
        circleColor={theme.colors.primaryLight}
        circleSize={CIRCLE_SIZE}
        {...{
          position: "absolute",
          top: responsivePixelSize(22),
          right: responsivePixelSize(54),
        }}
      />
      <OutlinedCircle
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
      />
      <OutlinedCircle
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
      />
      <X
        viewProps={{
          style: {
            position: "absolute",
            bottom: responsivePixelSize(12),
            right: responsivePixelSize(140),
          },
        }}
        svgProps={{
          stroke: theme.colors.secondary,
          width: SVG_PARTICLE_SIZE,
          height: SVG_PARTICLE_SIZE,
        }}
      />
      <X
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
      />
    </Box>
  );
};

export default Illustration;
