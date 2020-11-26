import React, { useEffect } from "react";
import { BoxProps } from "@shopify/restyle";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  repeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { StyleSheet, ViewStyle } from "react-native";

import { Box, Theme } from "../../../theme";

type OmittedBoxProps = "width" | "height";

interface SkeletonProps {
  width: number;
  height: number;
  boxProps?: Omit<BoxProps<Theme>, OmittedBoxProps>;
  overrideThemeStyle?: ViewStyle;
}

const colors = ["transparent", "rgba(255, 255, 255, 0.4)", "transparent"];
const timingConfig: Animated.WithTimingConfig = {
  duration: 1600,
  easing: Easing.bezier(0.22, 1, 0.36, 1),
};

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  boxProps,
  overrideThemeStyle,
}) => {
  const containerStyles: BoxProps<Theme> = {
    overflow: "hidden",
    width,
    height,
  };

  const translateX = useSharedValue(-width);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  useEffect(() => {
    runOnUI(() => {
      "worklet";
      translateX.value = repeat(withTiming(width, timingConfig), -1);
    })();
  }, [translateX, width]);

  return (
    <Box {...containerStyles} {...boxProps} style={overrideThemeStyle}>
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          {...{ colors }}
          start={[0, 0]}
          end={[1, 0]}
        />
      </Animated.View>
    </Box>
  );
};

export default Skeleton;
