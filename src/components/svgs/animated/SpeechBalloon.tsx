/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import Animated, {
  Easing,
  repeat,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { BoxProps, useTheme } from "@shopify/restyle";
import { mix } from "react-native-redash";
import { ViewStyle } from "react-native";

import { Box, Theme } from "../../../theme";
import { randomBetween } from "../../../utils/randomBetween";
import responsivePixelSize from "../../../utils/responsivePixelSize";

interface SpeechBalloonProps {
  extraStyles?: BoxProps<Theme>;
}

const WIDTH = responsivePixelSize(36);
const HEIGHT = responsivePixelSize(2);
const FROM = -WIDTH * 4;
const TO = WIDTH * 4;

const SpeechBalloon: React.FC<SpeechBalloonProps> = ({ extraStyles }) => {
  const theme = useTheme<Theme>();

  const containerStyles: BoxProps<Theme> = {
    height: HEIGHT * 3 + theme.spacing.xs,
    width: WIDTH,
    justifyContent: "space-between",
    overflow: "hidden",
    ...extraStyles,
  };
  const lineStyles: BoxProps<Theme> = {
    height: HEIGHT,
    width: WIDTH,
    borderRadius: "default",
    backgroundColor: "title",
  };
  const baseOverlayViewStyles: ViewStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    height: HEIGHT,
    width: randomBetween(6, 10),
    backgroundColor: theme.colors.primaryDark,
  };
  const animationDriver = useSharedValue(0);

  const row1Styles = Array.from(Array(10).keys()).map((index) => ({
    ...baseOverlayViewStyles,
    left: -randomBetween(12, 20) * (index + 1),
  }));

  const row2top = HEIGHT + theme.spacing.xs / 2;
  const row2Styles = Array.from(Array(10).keys()).map((index) => ({
    ...baseOverlayViewStyles,
    top: row2top,
    left: -randomBetween(12, 20) * (index + 1),
  }));

  const row3top = HEIGHT * 2 + theme.spacing.xs;
  const row3Styles = Array.from(Array(10).keys()).map((index) => ({
    ...baseOverlayViewStyles,
    top: row3top,
    left: -randomBetween(12, 20) * (index + 1),
  }));

  const row1AnimatedStyles = row1Styles.map(() =>
    useAnimatedStyle(() => {
      const translateX = mix(animationDriver.value, FROM, TO);
      return {
        transform: [{ translateX }],
      };
    })
  );
  const row2AnimatedStyles = row2Styles.map(() =>
    useAnimatedStyle(() => {
      const translateX = mix(animationDriver.value, FROM, TO);
      return {
        transform: [{ translateX }],
      };
    })
  );
  const row3AnimatedStyles = Object.keys(row1Styles).map(() =>
    useAnimatedStyle(() => {
      const translateX = mix(animationDriver.value, FROM, TO);
      return {
        transform: [{ translateX }],
      };
    })
  );

  useEffect(() => {
    runOnUI(() => {
      "worklet";
      animationDriver.value = repeat(
        withTiming(1, {
          duration: 8000,
          easing: Easing.bezier(0.37, 0, 0.63, 1),
        }),
        -1,
        true
      );
    })();
  }, [animationDriver]);

  return (
    <Box {...containerStyles}>
      <Box {...lineStyles} />
      {row1Styles.map((style, index) => (
        <Animated.View key={index} style={[style, row1AnimatedStyles[index]]} />
      ))}
      <Box {...lineStyles} />
      {row2Styles.map((style, index) => (
        <Animated.View key={index} style={[style, row2AnimatedStyles[index]]} />
      ))}
      <Box {...lineStyles} />
      {row3Styles.map((style, index) => (
        <Animated.View key={index} style={[style, row3AnimatedStyles[index]]} />
      ))}
    </Box>
  );
};

export default SpeechBalloon;
