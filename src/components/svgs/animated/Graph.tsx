import React, { useMemo, useState } from "react";
import Animated, {
  Easing,
  repeat,
  runOnUI,
  useAnimatedProps,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { mix } from "react-native-redash";
import { useTheme } from "@shopify/restyle";

import { Theme } from "../../../theme";
import responsivePixelSize from "../../../utils/responsivePixelSize";

import { AnimatedSvgProps } from "./types";
import { AnimatedPath } from "./reanimatedSvgComponents";

const ASPECT_RATIO = 22.24 / 39.65;
const CANVAS_WIDTH = responsivePixelSize(60);
const CANVAS_HEIGHT = CANVAS_WIDTH * ASPECT_RATIO;

const Graph: React.FC<AnimatedSvgProps> = ({ viewProps, svgProps }) => {
  const theme = useTheme<Theme>();
  const graphRef = useAnimatedRef<typeof AnimatedPath>();
  const [pathLength, setPathLength] = useState(0);
  const animationDriver = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: mix(animationDriver.value, 0.1, pathLength - 0.1),
    };
  });

  runOnUI(() => {
    "worklet";
    animationDriver.value = repeat(
      withTiming(1, {
        duration: 2400,
        easing: Easing.bezier(0.65, 0, 0.35, 1),
      }),
      -1,
      true
    );
  })();

  const stylesheet = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primaryDark,
      borderRadius: theme.borderRadii.default / 2,
    },
  });

  return (
    <Animated.View style={[viewProps?.style, stylesheet.container]}>
      <Svg
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        viewBox="0 0 39.65 22.24"
        {...svgProps}
      >
        <Path
          d="M36.65 22.24H3a3 3 0 01-3-3V3a3 3 0 013-3h33.65a3 3 0 013 3v16.24a3 3 0 01-3 3z"
          fill={theme.colors.primaryDark}
        />
        <AnimatedPath
          animatedProps={animatedProps}
          ref={graphRef}
          onLayout={() => setPathLength(graphRef.current.getTotalLength)}
          d="M3.57 16.49c3.13 0 3.13-3.73 6.27-3.73s3.14-5 6.27-5 3.14 1.9 6.28 1.9 3.13-4.6 6.27-4.6 3.13 7.22 6.27 7.22"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
        />
      </Svg>
    </Animated.View>
  );
};

export default Graph;
