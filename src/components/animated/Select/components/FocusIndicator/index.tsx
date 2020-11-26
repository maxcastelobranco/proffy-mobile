import { useTheme } from "@shopify/restyle";
import React from "react";
import { ViewStyle } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSpring, useTiming } from "react-native-redash";

import { Theme } from "../../../../../theme";

interface FocusIndicatorProps {
  focused: boolean;
}

const FocusIndicator: React.FC<FocusIndicatorProps> = ({ focused }) => {
  const theme = useTheme<Theme>();
  const focusIndicatorStyles: ViewStyle = {
    flex: 1,
    position: "absolute",
    top: 12,
    bottom: 12,
    left: 0,
    width: 2,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadii.default,
  };

  const focusedTimingTransition = useTiming(focused);
  const focusedSpringTransition = useSpring(focused);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: focusedTimingTransition.value,
      transform: [
        {
          scale: focusedSpringTransition.value,
        },
      ],
    };
  });

  return <Animated.View style={[focusIndicatorStyles, animatedStyle]} />;
};

export default FocusIndicator;
