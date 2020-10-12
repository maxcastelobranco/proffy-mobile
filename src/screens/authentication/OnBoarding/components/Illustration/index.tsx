import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { IllustrationProps } from "../types";
import CircleGrid from "../../../../../components/animatedComponents/CircleGrid";
import X from "../../../../../components/svgs/animatedSvgs/X";
import OutlinedCircle from "../../../../../components/svgs/animatedSvgs/OutlinedCircle";
import Search from "../../../../../components/svgs/animatedSvgs/Search";

import { styles } from "./styles";

const Illustration: React.FC<IllustrationProps> = ({
  SvgComponent,
  svgParticleColor,
  backgroundColor,
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    // @ts-ignore
    backgroundColor: backgroundColor.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <OutlinedCircle
        viewProps={{ style: styles.outlinedCircle1 }}
        svgProps={{ stroke: "white" }}
      />
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
      <OutlinedCircle
        viewProps={{ style: styles.outlinedCircle4 }}
        svgProps={{ stroke: "white" }}
      />
      <X
        viewProps={{ style: styles.union1 }}
        svgProps={{ stroke: svgParticleColor, fill: svgParticleColor }}
      />
      <X
        viewProps={{ style: styles.union2 }}
        svgProps={{ stroke: svgParticleColor, fill: svgParticleColor }}
      />
      <X
        viewProps={{ style: styles.union3 }}
        svgProps={{ stroke: svgParticleColor, fill: svgParticleColor }}
      />
      <X
        viewProps={{ style: styles.union4 }}
        svgProps={{ stroke: svgParticleColor, fill: svgParticleColor }}
      />
      <Search
        viewProps={{
          style: styles.search1,
        }}
        svgProps={{ stroke: svgParticleColor }}
      />
      <Search
        viewProps={{
          style: styles.search2,
        }}
        svgProps={{ stroke: svgParticleColor }}
      />
      <CircleGrid
        circleColor={svgParticleColor}
        rows={4}
        columns={7}
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
