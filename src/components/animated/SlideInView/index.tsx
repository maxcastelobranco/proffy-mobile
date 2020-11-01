import React, { PropsWithChildren, useEffect } from "react";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type SlideInViewGeneric = { id: string; mountState: MountState };
export type MountState = "unmounted" | "unmounting" | "mounting" | "mounted";

interface SlideInViewProps<T extends SlideInViewGeneric> {
  id: string;
  state: T[];
  setState: React.Dispatch<React.SetStateAction<T[]>>;
  viewHeight: number;
}

function SlideInView<T extends SlideInViewGeneric>({
  id,
  state,
  setState,
  viewHeight,
  children,
}: PropsWithChildren<SlideInViewProps<T>>) {
  const animationDriver = useSharedValue(-1);
  const index = state.findIndex((item) => item.id === id);
  const currentState = state[index];

  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [-1, 0, 1];
    return {
      height: interpolate(animationDriver.value, inputRange, [
        0,
        viewHeight,
        0,
      ]),
      opacity: interpolate(animationDriver.value, inputRange, [0, 1, 0]),
      transform: [
        {
          scale: interpolate(animationDriver.value, inputRange, [0, 1, 0]),
        },
        {
          translateX: interpolate(animationDriver.value, inputRange, [
            -500,
            0,
            500,
          ]),
        },
      ],
    };
  });

  useEffect(() => {
    const timingConfig: Animated.WithTimingConfig = {
      easing: Easing.bezier(0.85, 0, 0.15, 1),
      duration: 500,
    };

    if (currentState.mountState === "unmounting") {
      animationDriver.value = withTiming(1, timingConfig, () => {
        setState((prevState) =>
          prevState.map((item) =>
            item.id === id
              ? {
                  ...item,
                  mountState: "unmounted",
                }
              : item
          )
        );
      });
    } else if (currentState.mountState === "mounting") {
      animationDriver.value = withTiming(0, timingConfig, () => {
        setState((prevState) =>
          prevState.map((item) =>
            item.id === id
              ? {
                  ...item,
                  mountState: "mounted",
                }
              : item
          )
        );
      });
    }
  }, [animationDriver, currentState.mountState, id, setState, state]);

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

export default SlideInView;
