import { Dimensions } from "react-native";
import Animated, { withSpring, withTiming } from "react-native-reanimated";
import React from "react";

import { CARD_HEIGHT, CARD_WIDTH } from "./components/TeacherCard/styles";

interface AnimateNextCardLoadingParams {
  translationX: Animated.SharedValue<number>;
  destiny: number;
  opacity: Animated.SharedValue<number>;
  scale: Animated.SharedValue<number>;
  skeletonOpacity: Animated.SharedValue<number>;
  timingConfig: Animated.WithTimingConfig;
}
interface AnimateNextCardParams {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  length: number;
  destiny: number;
  translationX: Animated.SharedValue<number>;
  opacity: Animated.SharedValue<number>;
  scale: Animated.SharedValue<number>;
  timingConfig: Animated.WithTimingConfig;
}

export interface FormValues {
  subject: string;
  weekday: string;
  hour: number;
}

const { height } = Dimensions.get("window");

export const HEADER_CONTAINER_HEIGHT = height * 0.4;
export const ALPHA = Math.PI / 12;
export const DELTA_X = CARD_WIDTH / 2;
export const MAX_TRANSLATE = Math.round(
  CARD_WIDTH * Math.cos(ALPHA) + CARD_HEIGHT * Math.sin(ALPHA)
);
export const SNAP_POINTS = [-MAX_TRANSLATE, 0, MAX_TRANSLATE];

export const showSuccessNotification = (
  successNotification: Animated.SharedValue<number>
) => {
  "worklet";
  successNotification.value = withSpring(1);
  setTimeout(() => {
    successNotification.value = withSpring(0);
  }, 2000);
};
export const animateNextCardLoading = ({
  translationX,
  destiny,
  opacity,
  scale,
  skeletonOpacity,
  timingConfig,
}: AnimateNextCardLoadingParams) => {
  "worklet";
  translationX.value = withTiming(destiny, timingConfig, () => {
    opacity.value = 0;
    scale.value = 0;
    translationX.value = 0;
  });
  skeletonOpacity.value = withTiming(1, timingConfig);
  setTimeout(() => {
    skeletonOpacity.value = withTiming(0, timingConfig, () => {
      opacity.value = withTiming(1, timingConfig);
      scale.value = withSpring(1);
    });
  }, 500);
};

export const animateNextCard = ({
  index,
  setIndex,
  length,
  translationX,
  destiny,
  timingConfig,
  opacity,
  scale,
}: AnimateNextCardParams) => {
  "worklet";
  setIndex((index + 1) % length);
  translationX.value = withTiming(destiny, timingConfig, () => {
    opacity.value = 0;
    scale.value = 0;
    translationX.value = 0;
    opacity.value = withTiming(1, timingConfig);
    scale.value = withSpring(1);
  });
};
