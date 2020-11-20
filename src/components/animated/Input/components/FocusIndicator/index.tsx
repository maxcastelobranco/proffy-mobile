import React from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { mixColor, useSpring } from "react-native-redash";
import { useTheme } from "@shopify/restyle";

import { Theme } from "../../../../../theme";

interface FocusIndicatorProps {
  focused: boolean;
  error?: 0 | 1;
}

const FocusIndicator: React.FC<FocusIndicatorProps> = ({ focused, error }) => {
  const theme = useTheme<Theme>();
  const styles = StyleSheet.create({
    focusIndicator: {
      flex: 1,
      position: "absolute",
      top: 12,
      bottom: 12,
      left: 0,
      width: 2,
      borderRadius: theme.borderRadii.default,
    },
  });

  const focusedTransition = useSpring(focused);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        error === undefined
          ? theme.colors.primary
          : mixColor(error, theme.colors.primary, theme.colors.danger),
      opacity: focusedTransition.value,
      transform: [{ scale: focusedTransition.value }],
    };
  });

  return <Animated.View style={[styles.focusIndicator, animatedStyle]} />;
};

export default FocusIndicator;
