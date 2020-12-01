import React, { useEffect } from "react";
import Animated, {
  Easing,
  interpolate,
  repeat,
  runOnUI,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { mix } from "react-native-redash";

import { AnimatedSvgProps } from "./types";
import { AnimatedPath, AnimatedSvg } from "./reanimatedSvgComponents";

const OutlinedCircle: React.FC<AnimatedSvgProps> = ({
  viewProps,
  svgProps,
}) => {
  const animationDriver = useSharedValue(0);
  const animatedProps = useAnimatedProps(() => ({
    strokeWidth: mix(animationDriver.value, 0.2, 2),
  }));

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: mix(animationDriver.value, 1, 0),
    transform: [{ scale: mix(animationDriver.value, 0.2, 3) }],
  }));

  useEffect(() => {
    runOnUI(() => {
      "worklet";
      animationDriver.value = repeat(
        withTiming(1, {
          duration: 3000,
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        -1
      );
    })();
  }, [animationDriver]);

  return (
    <Animated.View {...viewProps} style={[viewProps?.style, animatedStyles]}>
      <AnimatedSvg width={12} height={12} viewBox="0 0 12 12" {...svgProps}>
        <AnimatedPath
          d="M5.844 10.665C3.174 10.665 1 8.505 1 5.834a4.84 4.84 0 014.844-4.832c2.669 0 4.843 2.16 4.843 4.832a4.845 4.845 0 01-4.843 4.83z"
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          animatedProps={animatedProps}
        />
      </AnimatedSvg>
    </Animated.View>
  );
};

export default OutlinedCircle;
