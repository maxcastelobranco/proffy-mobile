import React, { useEffect } from "react";
import Animated, {
  Easing,
  repeat,
  runOnUI,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { AnimatedSvgProps } from "./types";
import {
  AnimatedG,
  AnimatedPath,
  AnimatedSvg,
} from "./reanimatedSvgComponents";

const Play: React.FC<AnimatedSvgProps> = ({ viewProps, svgProps }) => {
  const opacity = useSharedValue(0);
  const animatedProps = useAnimatedProps(() => {
    return {
      opacity: opacity.value,
    };
  });
  useEffect(() => {
    runOnUI(() => {
      "worklet";
      opacity.value = repeat(
        withTiming(1, {
          duration: 1000,
          easing: Easing.linear,
        }),
        -1,
        true
      );
    })();
  }, [opacity]);

  return (
    <Animated.View
      {...viewProps}
      style={[
        { backgroundColor: "#e6e6f0", borderRadius: 20 },
        viewProps?.style,
      ]}
    >
      <AnimatedSvg
        width={20}
        height={20}
        viewBox="0 0 17.68 17.67"
        {...svgProps}
      >
        <AnimatedG
          opacity={0.24}
          fill="#e6e6f0"
          stroke="#6842c2"
          strokeWidth={1}
          strokeMiterlimit={10}
        >
          <AnimatedPath d="M8.84 16.67A7.84 7.84 0 101 8.83h0a7.84 7.84 0 007.84 7.84z" />
          <AnimatedPath
            animatedProps={animatedProps}
            d="M12.05 8.06L7.58 5.48a.74.74 0 00-1.11.64v5.16a.739.739 0 001.11.64l4.47-2.58c.366-.17.534-.582.364-.948a.603.603 0 00-.364-.332z"
          />
        </AnimatedG>
      </AnimatedSvg>
    </Animated.View>
  );
};

export default Play;
