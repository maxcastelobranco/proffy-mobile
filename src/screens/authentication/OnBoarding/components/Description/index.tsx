import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Dimensions } from "react-native";

import { Box } from "../../../../../theme";
import { DescriptionProps } from "../types";

import { useStyles } from "./styles";

const { width } = Dimensions.get("window");

const Description: React.FC<DescriptionProps> = ({
  descriptionText,
  index,
  translationX,
}) => {
  const { stylesheet, containerStyles } = useStyles();
  const animatedNumerationStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translationX.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [0, 1, 0]
      ),
    };
  });
  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translationX.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [0, 1, 0]
      ),
    };
  });

  return (
    <Box {...containerStyles}>
      <Animated.Text
        style={[stylesheet.numerationStyles, animatedNumerationStyle]}
      >{`0${index + 1}.`}</Animated.Text>
      <Animated.Text style={[stylesheet.titleStyles, animatedTitleStyle]}>
        {descriptionText}
      </Animated.Text>
    </Box>
  );
};

export default Description;
