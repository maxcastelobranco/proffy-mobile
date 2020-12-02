import React, { useEffect } from "react";
import Animated, {
  Easing,
  withRepeat,
  runOnUI,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { mix } from "react-native-redash";

import { AnimatedSvgProps } from "./types";
import { AnimatedPath, AnimatedSvg } from "./reanimatedSvgComponents";

const Search: React.FC<AnimatedSvgProps> = ({ viewProps, svgProps }) => {
  const animationDriver = useSharedValue(0);
  const animatedProps = useAnimatedProps(() => ({
    strokeWidth: mix(animationDriver.value, 0.2, 2),
  }));
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: mix(animationDriver.value, 0.6, 1.4) }],
  }));

  useEffect(() => {
    runOnUI(() => {
      "worklet";
      animationDriver.value = withRepeat(
        withTiming(1, {
          duration: 3000,
          easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
        -1,
        true
      );
    })();
  }, [animationDriver]);

  return (
    <Animated.View {...viewProps} style={[viewProps?.style, animatedStyles]}>
      <AnimatedSvg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...svgProps}
      >
        <AnimatedPath
          d="M9 1a8 8 0 11-8 8 8 8 0 018-8zm10 18l-4.35-4.35"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          animatedProps={animatedProps}
        />
      </AnimatedSvg>
    </Animated.View>
  );
};

export default Search;
