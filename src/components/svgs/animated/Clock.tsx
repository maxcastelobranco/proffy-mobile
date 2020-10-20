import React from "react";
import Animated, {
  Easing,
  repeat,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { mix } from "react-native-redash";

import responsivePixelSize from "../../../utils/responsivePixelSize";
import theme from "../../../theme";
import { transformOrigin } from "../../../utils/transformOrigin";

import { AnimatedSvgProps } from "./types";

const POINTER_HEIGHT = responsivePixelSize(2);
const CANVAS_SIZE = responsivePixelSize(40);
const LONG_POINTER_WIDTH = CANVAS_SIZE * 0.18;
const SHORT_POINTER_WIDTH = CANVAS_SIZE * 0.14;

const Clock: React.FC<AnimatedSvgProps> = ({ viewProps, svgProps }) => {
  const styles = StyleSheet.create({
    longPointer: {
      position: "absolute",
      width: LONG_POINTER_WIDTH,
      height: POINTER_HEIGHT,
      top: CANVAS_SIZE / 2 - POINTER_HEIGHT / 2,
      left: CANVAS_SIZE / 2,
      backgroundColor: theme.colors.title,
      borderRadius: POINTER_HEIGHT / 2,
    },
    shortPointer: {
      position: "absolute",
      width: SHORT_POINTER_WIDTH,
      height: POINTER_HEIGHT,
      top: CANVAS_SIZE / 2 - POINTER_HEIGHT / 2,
      left: CANVAS_SIZE / 2,
      backgroundColor: theme.colors.title,
      borderRadius: POINTER_HEIGHT / 2,
    },
  });

  const shortPointerAnimationDriver = useSharedValue(0);
  const longPointerAnimationDriver = useSharedValue(0);

  const shortPointerAnimatedStyles = useAnimatedStyle(() => {
    const shortPointerRotate = transformOrigin(
      { x: -SHORT_POINTER_WIDTH / 2, y: 0 },
      {
        rotate: `${mix(
          shortPointerAnimationDriver.value,
          -Math.PI,
          Math.PI
        )}rad`,
      }
    );
    return {
      transform: shortPointerRotate,
    };
  });

  const longPointerAnimatedStyles = useAnimatedStyle(() => {
    const longPointerRotate = transformOrigin(
      { x: -LONG_POINTER_WIDTH / 2, y: 0 },
      {
        rotate: `${mix(
          longPointerAnimationDriver.value,
          -Math.PI,
          Math.PI
        )}rad`,
      }
    );
    return {
      transform: longPointerRotate,
    };
  });

  runOnUI(() => {
    "worklet";
    shortPointerAnimationDriver.value = repeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    );
    longPointerAnimationDriver.value = repeat(
      withTiming(1, {
        duration: 60000,
        easing: Easing.linear,
      }),
      -1
    );
  })();

  return (
    <Animated.View {...viewProps} style={[viewProps?.style]}>
      <Svg
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        viewBox="0 0 19.97 19.95"
        {...svgProps}
      >
        <Path
          d="M15.45 11.28A5.61 5.61 0 104.53 8.701a5.61 5.61 0 0010.92 2.579s0 0 0 0z"
          fill="#6842c2"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10 4.37v.54M10 15.05v.53M15.59 10h-.54M4.9 10h-.53"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
      <Animated.View style={[styles.longPointer, longPointerAnimatedStyles]} />
      <Animated.View
        style={[styles.shortPointer, shortPointerAnimatedStyles]}
      />
    </Animated.View>
  );
};

export default Clock;
