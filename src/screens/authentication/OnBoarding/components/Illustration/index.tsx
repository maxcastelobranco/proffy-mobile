import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { IllustrationProps } from "../types";
import CircleGrid from "../../../../../components/animated/CircleGrid";
import X from "../../../../../components/svgs/animated/X";
import OutlinedCircle from "../../../../../components/svgs/animated/OutlinedCircle";
import Search from "../../../../../components/svgs/animated/Search";

import { styles } from "./styles";

const Illustration: React.FC<IllustrationProps> = ({
  SvgComponent,
  svgParticleColor,
  backgroundColor,
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value as string,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <OutlinedCircle
        viewProps={{ style: styles.outlinedCircle1 }}
        svgProps={{ stroke: "white" }}
      />
      <OutlinedCircle
        viewProps={{ style: styles.outlinedCircle2 }}
        svgProps={{ stroke: "white" }}
      />
      <OutlinedCircle
        viewProps={{ style: styles.outlinedCircle3 }}
        svgProps={{ stroke: "white" }}
      />
      <X
        viewProps={{ style: styles.x1 }}
        svgProps={{ stroke: svgParticleColor, fill: svgParticleColor }}
      />
      <X
        viewProps={{ style: styles.x2 }}
        svgProps={{ stroke: svgParticleColor, fill: svgParticleColor }}
      />
      <Search
        viewProps={{
          style: styles.search1,
        }}
        svgProps={{ stroke: svgParticleColor }}
      />
      <CircleGrid
        circleColor={svgParticleColor}
        rows={3}
        columns={6}
        {...styles.circleGrid1}
      />
      <CircleGrid
        circleColor={svgParticleColor}
        rows={3}
        columns={2}
        {...styles.circleGrid2}
      />
      <SvgComponent />
    </Animated.View>
  );
};

export default React.memo(Illustration);
