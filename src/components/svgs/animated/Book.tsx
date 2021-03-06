import React, { useEffect } from "react";
import Animated, {
  Easing,
  withRepeat,
  runOnUI,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { mix } from "react-native-redash";

import { AnimatedSvgProps } from "./types";
import { AnimatedPath, AnimatedSvg } from "./reanimatedSvgComponents";

interface BookProps extends AnimatedSvgProps {
  reverse?: boolean;
}

const Book: React.FC<BookProps> = ({ viewProps, svgProps, reverse }) => {
  const animationDriver = useSharedValue(0);
  const animatedProps = useAnimatedProps(() => ({
    strokeWidth: mix(animationDriver.value, 4.5, 5.5),
  }));
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(mix(animationDriver.value, 0.9, 1.1)) },
      {
        translateY: reverse
          ? mix(animationDriver.value, 5, -5)
          : mix(animationDriver.value, -5, 5),
      },
    ],
  }));

  useEffect(() => {
    runOnUI(() => {
      "worklet";
      animationDriver.value = withRepeat(
        withTiming(1, {
          duration: 1200,
          easing: Easing.bezier(0.37, 0, 0.63, 1),
        }),
        -1,
        true
      );
    })();
  }, [animationDriver]);

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
          d="M15 18h27c4.774 0 9.352 1.967 12.728 5.467C58.104 26.968 60 31.716 60 36.667V102c0-3.713-1.422-7.274-3.954-9.9C53.514 89.475 50.08 88 46.5 88H15V18zM105 18H78c-4.774 0-9.352 1.967-12.728 5.467C61.896 26.968 60 31.716 60 36.667V102c0-3.713 1.422-7.274 3.954-9.9C66.486 89.475 69.92 88 73.5 88H105V18z"
          strokeLinecap="round"
          strokeLinejoin="round"
          animatedProps={animatedProps}
        />
      </AnimatedSvg>
    </Animated.View>
  );
};

export default Book;
