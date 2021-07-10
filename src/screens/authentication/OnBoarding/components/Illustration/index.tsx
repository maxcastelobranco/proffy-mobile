import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { IllustrationProps } from "../types";
import CircleGrid from "../../../../../components/animated/CircleGrid";
import X from "../../../../../components/svgs/animated/X";
import OutlinedCircle from "../../../../../components/svgs/animated/OutlinedCircle";
import Search from "../../../../../components/svgs/animated/Search";

import { stylesheet } from "./styles";

const Illustration: React.FC<IllustrationProps> = ({
  SvgComponent,
  svgParticleColor,
  backgroundColor,
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value as string,
  }));

  return (
    <Animated.View style={[stylesheet.container, animatedStyle]}>
      <OutlinedCircle
        viewProps={{ style: stylesheet.outlinedCircle1 }}
        svgProps={{ stroke: "white" }}
      />
      <OutlinedCircle
        viewProps={{ style: stylesheet.outlinedCircle2 }}
        svgProps={{ stroke: "white" }}
      />
      <OutlinedCircle
        viewProps={{ style: stylesheet.outlinedCircle3 }}
        svgProps={{ stroke: "white" }}
      />
      <X
        viewProps={{ style: stylesheet.x1 }}
        svgProps={{ stroke: svgParticleColor, fill: svgParticleColor }}
      />
      <X
        viewProps={{ style: stylesheet.x2 }}
        svgProps={{ stroke: svgParticleColor, fill: svgParticleColor }}
      />
      <Search
        viewProps={{
          style: stylesheet.search1,
        }}
        svgProps={{ stroke: svgParticleColor }}
      />
      <CircleGrid
        circleColor={svgParticleColor}
        rows={3}
        columns={6}
        {...stylesheet.circleGrid1}
      />
      <CircleGrid
        circleColor={svgParticleColor}
        rows={3}
        columns={2}
        {...stylesheet.circleGrid2}
      />
      <SvgComponent />
    </Animated.View>
  );
};

export default Illustration;
