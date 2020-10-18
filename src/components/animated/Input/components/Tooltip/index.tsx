import React from "react";
import { TextProps, useTheme } from "@shopify/restyle";
import { useSpring } from "react-native-redash";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { StyleSheet } from "react-native";

import { Theme, Text } from "../../../../../theme";

interface TooltipProps {
  errorMessage: string | undefined;
  showTooltip: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ errorMessage, showTooltip }) => {
  const theme = useTheme<Theme>();
  const textStyles: TextProps<Theme> = {
    variant: "regularTextSmall",
    color: "background4",
  };

  const styles = StyleSheet.create({
    container: {
      width: errorMessage ? errorMessage.length * 8 : 0,
      padding: theme.spacing.xs,
      backgroundColor: theme.colors.danger,
      position: "absolute",
      top: -16,
      right: 20,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.borderRadii.default,
    },
  });

  const showTooltipTransition = useSpring(showTooltip);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: showTooltipTransition.value,
      transform: [{ scale: showTooltipTransition.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text {...textStyles}>{errorMessage}</Text>
    </Animated.View>
  );
};

export default Tooltip;
