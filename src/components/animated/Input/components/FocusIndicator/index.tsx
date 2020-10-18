import React from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSpring } from "react-native-redash";

import theme from "../../../../../theme";

interface FocusIndicatorProps {
  focused: boolean;
}

const FocusIndicator: React.FC<FocusIndicatorProps> = ({ focused }) => {
  const styles = StyleSheet.create({
    focusIndicator: {
      flex: 1,
      position: "absolute",
      top: 12,
      bottom: 12,
      left: 0,
      width: 2,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadii.default,
    },
  });

  const focusedTransition = useSpring(focused);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: focusedTransition.value,
      transform: [{ scale: focusedTransition.value }],
    };
  });

  return <Animated.View style={[styles.focusIndicator, animatedStyle]} />;
};

export default FocusIndicator;
