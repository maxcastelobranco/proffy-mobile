import React from "react";
import { TextProps, useTheme } from "@shopify/restyle";
import { useSpring } from "react-native-redash";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { StyleSheet } from "react-native";

import { Theme, Text } from "../../../../../theme";
import responsivePixelSize from "../../../../../utils/responsivePixelSize";

interface TooltipProps {
  errorMessage: string | undefined;
  showTooltip: boolean;
}

const ARROW_SIZE = responsivePixelSize(16);

const Tooltip: React.FC<TooltipProps> = ({ errorMessage, showTooltip }) => {
  const theme = useTheme<Theme>();
  const textStyles: TextProps<Theme> = {
    variant: "regularTextSmall",
    color: "background4",
  };

  const stylesheet = StyleSheet.create({
    container: {
      zIndex: 100,
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
    arrow: {
      width: ARROW_SIZE,
      height: ARROW_SIZE,
      backgroundColor: theme.colors.danger,
      position: "absolute",
      bottom: -ARROW_SIZE / 2,
      right: ARROW_SIZE,
      transform: [
        {
          rotate: "45deg",
        },
      ],
    },
  });

  const showTooltipTransition = useSpring(showTooltip);

  const animatedTooltipStyle = useAnimatedStyle(() => {
    return {
      opacity: showTooltipTransition.value,
      transform: [{ scale: showTooltipTransition.value }],
    };
  });

  const animatedArrowStyle = useAnimatedStyle(() => {
    return {
      opacity: showTooltipTransition.value,
    };
  });

  return (
    <Animated.View style={[stylesheet.container, animatedTooltipStyle]}>
      <Text {...textStyles}>{errorMessage}</Text>
      <Animated.View style={[stylesheet.arrow, animatedArrowStyle]} />
    </Animated.View>
  );
};

export default Tooltip;
