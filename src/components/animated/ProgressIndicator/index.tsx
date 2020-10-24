import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { interpolateColor } from "react-native-redash";
import { useTheme } from "@shopify/restyle";

import { Theme } from "../../../theme";

import { useStyles } from "./styles";

interface ProgressIndicatorProps {
  index: number;
  currentIndex: Animated.SharedValue<number>;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  index,
  currentIndex,
}) => {
  const theme = useTheme<Theme>();
  const styles = useStyles(index);

  const inputRange = [0, 1];
  const outputRange = [theme.colors.primary, theme.colors.secondary];

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      currentIndex.value,
      [index - 1, index, index + 1],
      [0.4, 1, 0.4],
      Extrapolate.CLAMP
    ),
    backgroundColor: interpolateColor(
      currentIndex.value,
      inputRange,
      outputRange
    ) as string,
    transform: [
      {
        scale: interpolate(
          currentIndex.value,
          [index - 1, index, index + 1],
          [0.8, 1.2, 0.8],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  return <Animated.View style={[styles.progressIndicator, animatedStyle]} />;
};

export default ProgressIndicator;
