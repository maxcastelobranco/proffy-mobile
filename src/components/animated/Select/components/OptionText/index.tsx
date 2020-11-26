import React from "react";
import { useTheme } from "@shopify/restyle";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { mix, useTiming } from "react-native-redash";

import { Theme } from "../../../../../theme";

interface OptionTextProps {
  focused: boolean;
  option: string;
}

const OptionText: React.FC<OptionTextProps> = ({ focused, option }) => {
  const theme = useTheme<Theme>();

  const focusedTransition = useTiming(focused);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: mix(focusedTransition.value, 0.4, 1),
    };
  });

  return (
    <Animated.Text
      style={[
        {
          ...theme.textVariants.regularTextMedium,
          color: theme.colors.baseTextDark,
        },
        animatedStyle,
      ]}
    >
      {option}
    </Animated.Text>
  );
};

export default OptionText;
