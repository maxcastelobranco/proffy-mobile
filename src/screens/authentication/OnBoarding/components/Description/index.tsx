import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { Text } from "../../../../../theme";
import { DescriptionProps } from "../types";

import { useStyles } from "./styles";

const Description: React.FC<DescriptionProps> = ({
  descriptionText,
  index,
  opacity,
}) => {
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const { stylesheet, titleStyles, numerationStyles } = useStyles();

  return (
    <Animated.View style={[stylesheet.container, animatedStyle]}>
      <Text {...numerationStyles}>{`0${index + 1}.`}</Text>
      <Text {...titleStyles}>{descriptionText}</Text>
    </Animated.View>
  );
};

export default Description;
