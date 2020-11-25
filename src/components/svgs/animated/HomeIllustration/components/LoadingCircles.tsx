import React, { useEffect } from "react";
import {
  Easing,
  repeat,
  runOnUI,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { mix } from "react-native-redash";

import { AnimatedPath } from "../../reanimatedSvgComponents";

const LoadingCircles: React.FC = () => {
  const circle1AnimationDriver = useSharedValue(0);
  const circle2AnimationDriver = useSharedValue(0);
  const circle3AnimationDriver = useSharedValue(0);
  const circle1animatedProps = useAnimatedProps(() => {
    const circle1StrokeWidth = mix(circle1AnimationDriver.value, 0, 2.4);
    return {
      strokeWidth: circle1StrokeWidth,
      opacity: circle1AnimationDriver.value,
    };
  });
  const circle2animatedProps = useAnimatedProps(() => {
    const circle2StrokeWidth = mix(circle2AnimationDriver.value, 0, 2.4);
    return {
      strokeWidth: circle2StrokeWidth,
      opacity: circle2AnimationDriver.value,
    };
  });
  const circle3animatedProps = useAnimatedProps(() => {
    const circle3StrokeWidth = mix(circle3AnimationDriver.value, 0, 2.4);
    return {
      strokeWidth: circle3StrokeWidth,
      opacity: circle3AnimationDriver.value,
    };
  });
  useEffect(() => {
    runOnUI(() => {
      "worklet";
      circle1AnimationDriver.value = repeat(
        withTiming(1, {
          duration: 2000,
          easing: Easing.bezier(0.76, 0, 0.24, 1),
        }),
        -1,
        true
      );
      circle2AnimationDriver.value = repeat(
        withTiming(1, {
          duration: 2100,
          easing: Easing.bezier(0.76, 0, 0.24, 1),
        }),
        -1,
        true
      );
      circle3AnimationDriver.value = repeat(
        withTiming(1, {
          duration: 2200,
          easing: Easing.bezier(0.76, 0, 0.24, 1),
        }),
        -1,
        true
      );
    })();
  }, [circle1AnimationDriver, circle2AnimationDriver, circle3AnimationDriver]);

  return (
    <>
      <AnimatedPath
        id="LoadingCircle1"
        d="M148.9382,17.1289a1.8691,1.8691,0,1,1-1.9748-1.8032A1.8682,1.8682,0,0,1,148.9382,17.1289Z"
        transform="translate(0 -2.1379)"
        fill="#fff"
        stroke="#e3e5ee"
        animatedProps={circle1animatedProps}
      />
      <AnimatedPath
        id="LoadingCircle2"
        d="M155.2008,19.0246a1.8426,1.8426,0,1,1-.1124-3.6828,1.7627,1.7627,0,0,1,1.8861,1.7206A1.7911,1.7911,0,0,1,155.2008,19.0246Z"
        transform="translate(0 -2.1379)"
        fill="#fff"
        stroke="#e3e5ee"
        animatedProps={circle2animatedProps}
      />
      <AnimatedPath
        id="LoadingCircle3"
        d="M165.0857,17.1424a1.8743,1.8743,0,0,1-1.7787,1.8616,1.8317,1.8317,0,1,1-.0595-3.6606A1.8467,1.8467,0,0,1,165.0857,17.1424Z"
        transform="translate(0 -2.1379)"
        fill="#fff"
        stroke="#e3e5ee"
        animatedProps={circle3animatedProps}
      />
    </>
  );
};

export default LoadingCircles;
