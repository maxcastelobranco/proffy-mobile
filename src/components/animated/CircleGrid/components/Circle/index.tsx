import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  repeat,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  delay,
  Easing,
} from "react-native-reanimated";
import { mix } from "react-native-redash";

import responsivePixelSize from "../../../../../utils/responsivePixelSize";

interface CircleProps {
  i: number;
  j: number;
  circleColor: string;
  circleSize?: number;
}

const CIRCLE_SIZE = responsivePixelSize(5);

const Circle: React.FC<CircleProps> = ({
  circleColor,
  circleSize = CIRCLE_SIZE,
  i,
  j,
}) => {
  const styles = StyleSheet.create({
    circle: {
      width: circleSize,
      height: circleSize,
      borderRadius: circleSize / 2,
      backgroundColor: circleColor,
      marginTop: i === 0 ? 0 : circleSize * 3,
      marginLeft: j === 0 ? 0 : circleSize * 3,
    },
  });
  const circleAnimationDriver = useSharedValue(0);
  const circleAnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: mix(circleAnimationDriver.value, 0.01, 2.4),
      },
    ],
  }));

  useEffect(() => {
    runOnUI(() => {
      "worklet";
      circleAnimationDriver.value = delay(
        (i + j) * 200,
        repeat(
          withTiming(1, {
            duration: 2000,
            easing: Easing.bezier(0.87, 0, 0.13, 1),
          }),
          -1,
          true
        )
      );
    })();
  }, [circleAnimationDriver, i, j]);

  return <Animated.View style={[styles.circle, circleAnimatedStyles]} />;
};

export default Circle;
