import React, { useEffect } from "react";
import Animated, {
  Easing,
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

const X: React.FC<AnimatedSvgProps> = ({ viewProps, svgProps }) => {
  const animationDriver = useSharedValue(0);
  const animatedProps = useAnimatedProps(() => ({
    strokeWidth: mix(animationDriver.value, 0.2, 3),
  }));
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { scale: mix(animationDriver.value, 0.2, 2) },
      {
        rotate: `${mix(animationDriver.value, -(Math.PI / 2), Math.PI * 2)}rad`,
      },
    ],
  }));

  useEffect(() => {
    runOnUI(() => {
      "worklet";
      animationDriver.value = repeat(
        withTiming(1, {
          duration: 2000,
          easing: Easing.bezier(0.76, 0, 0.24, 1),
        }),
        -1,
        true
      );
    })();
  }, [animationDriver]);

  return (
    <Animated.View {...viewProps} style={[viewProps?.style, animatedStyles]}>
      <AnimatedSvg width={12} height={12} viewBox="0 0 12 12" {...svgProps}>
        <AnimatedPath
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={2}
          d="M9 3L3 9M3 3l6 6"
          animatedProps={animatedProps}
        />
      </AnimatedSvg>
    </Animated.View>
  );
};

export default X;
