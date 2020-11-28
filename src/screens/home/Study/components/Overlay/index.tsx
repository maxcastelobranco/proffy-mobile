import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { mix } from "react-native-redash";

interface OverlayProps {
  show: Animated.SharedValue<number>;
}

const Overlay: React.FC<OverlayProps> = ({ show }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: mix(show.value, 0, 0.6),
    };
  });
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "#000",
        },
        animatedStyle,
      ]}
    />
  );
};

export default Overlay;
