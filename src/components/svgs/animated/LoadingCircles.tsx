import React, { useEffect } from "react";
import { BoxProps, useTheme } from "@shopify/restyle";
import Animated, {
  Easing,
  repeat,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { mix } from "react-native-redash";
import { StyleSheet } from "react-native";

import { Box, Theme } from "../../../theme";

interface LoadingCirclesProps {
  extraStyles?: BoxProps<Theme>;
}

const LoadingCircles: React.FC<LoadingCirclesProps> = ({ extraStyles }) => {
  const theme = useTheme<Theme>();
  const CIRCLE_SIZE = 4;
  const CONTAINER_WIDTH = CIRCLE_SIZE * 3 + theme.spacing.xs;

  const stylesheet = StyleSheet.create({
    circleStyles: {
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      backgroundColor: "white",
      borderRadius: CIRCLE_SIZE / 2,
    },
  });
  const containerStyles: BoxProps<Theme> = {
    flexDirection: "row",
    justifyContent: "space-between",
    width: CONTAINER_WIDTH,
    ...extraStyles,
  };

  const circle1AnimationDriver = useSharedValue(0);
  const circle2AnimationDriver = useSharedValue(0);
  const circle3AnimationDriver = useSharedValue(0);

  useEffect(() => {
    runOnUI(() => {
      "worklet";
      circle1AnimationDriver.value = repeat(
        withTiming(1, {
          duration: 2000,
          easing: Easing.bezier(0.76, 0, 0.24, 1),
        }),
        -1,
        true
      );
      circle2AnimationDriver.value = repeat(
        withTiming(1, {
          duration: 2100,
          easing: Easing.bezier(0.76, 0, 0.24, 1),
        }),
        -1,
        true
      );
      circle3AnimationDriver.value = repeat(
        withTiming(1, {
          duration: 2200,
          easing: Easing.bezier(0.76, 0, 0.24, 1),
        }),
        -1,
        true
      );
    })();
  }, [circle1AnimationDriver, circle2AnimationDriver, circle3AnimationDriver]);

  const circle1animatedStyles = useAnimatedStyle(() => {
    const circle1Scale = mix(circle1AnimationDriver.value, 0.2, 1.2);
    return {
      transform: [{ scale: circle1Scale }],
    };
  });
  const circle2animatedStyles = useAnimatedStyle(() => {
    const circle2Scale = mix(circle2AnimationDriver.value, 0.2, 1.2);
    return {
      transform: [{ scale: circle2Scale }],
    };
  });
  const circle3animatedStyles = useAnimatedStyle(() => {
    const circle3Scale = mix(circle3AnimationDriver.value, 0.2, 1.2);
    return {
      transform: [{ scale: circle3Scale }],
    };
  });

  return (
    <Box {...containerStyles}>
      <Animated.View style={[stylesheet.circleStyles, circle1animatedStyles]} />
      <Animated.View style={[stylesheet.circleStyles, circle2animatedStyles]} />
      <Animated.View style={[stylesheet.circleStyles, circle3animatedStyles]} />
    </Box>
  );
};

export default LoadingCircles;
