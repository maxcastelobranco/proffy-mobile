import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Dimensions } from "react-native";

import { Text } from "../../../../../theme";
import { DescriptionProps } from "../types";

import { useStyles } from "./styles";

const { width } = Dimensions.get("window");

const Description: React.FC<DescriptionProps> = ({
  descriptionText,
  index,
  translationX,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translationX.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [0, 1, 0]
      ),
    };
  });
  const { stylesheet, titleStyles, numerationStyles } = useStyles();

  return (
    <Animated.View style={[stylesheet.container, animatedStyle]}>
      <Text {...numerationStyles}>{`0${index + 1}.`}</Text>
      <Text {...titleStyles}>{descriptionText}</Text>
    </Animated.View>
  );
};

export default Description;
