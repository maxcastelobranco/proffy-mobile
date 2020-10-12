import React from "react";
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

const Television: React.FC<AnimatedSvgProps> = ({ viewProps, svgProps }) => {
  const animationDriver = useSharedValue(0);
  const animatedProps = useAnimatedProps(() => ({
    strokeWidth: mix(animationDriver.value, 4.5, 5.5),
  }));
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { scale: mix(animationDriver.value, 0.9, 1.1) },
      {
        translateY: mix(animationDriver.value, -5, 5),
      },
    ],
  }));

  runOnUI(() => {
    "worklet";
    animationDriver.value = repeat(
      withTiming(1, {
        duration: 1200,
        easing: Easing.bezier(0.37, 0, 0.63, 1),
      }),
      -1,
      true
    );
  })();

  return (
    <Animated.View style={[viewProps?.style, animatedStyles]}>
      <AnimatedSvg
        width={120}
        height={120}
        viewBox="0 0 120 120"
        fill="none"
        stroke="#fff"
        {...svgProps}
      >
        <AnimatedPath
          d="M101.25 18.75h-82.5a7.5 7.5 0 00-7.5 7.5V75a7.5 7.5 0 007.5 7.5h82.5a7.5 7.5 0 007.5-7.5V26.25a7.5 7.5 0 00-7.5-7.5z"
          strokeLinejoin="round"
          animatedProps={animatedProps}
        />
        <AnimatedPath
          d="M60 97.5v-15M60 18.75v-7.5M93.75 108.75l-7.5-26.25M26.25 108.75l7.5-26.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          animatedProps={animatedProps}
        />
      </AnimatedSvg>
    </Animated.View>
  );
};

export default React.memo(Television);
