import React from "react";
import { Pressable, ViewStyle } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useTiming, mixColor, useSpring } from "react-native-redash";
import { useTheme } from "@shopify/restyle";

import { Theme } from "../../../theme";

import { useStyles } from "./styles";

interface AnimatedBackgroundButtonProps {
  enabled: boolean;
  enabledBackgroundColor: string;
  disabledBackgroundColor: string;
  enabledLabelColor: string;
  disabledLabelColor: string;
  label: string;
  disabledLabel: string;
  onPress(): void;
  extraStyles?: ViewStyle;
}

const AnimatedBackgroundButton: React.FC<AnimatedBackgroundButtonProps> = ({
  enabled,
  enabledBackgroundColor,
  disabledBackgroundColor,
  enabledLabelColor,
  disabledLabelColor,
  label,
  disabledLabel,
  onPress,
  extraStyles,
}) => {
  const theme = useTheme<Theme>();
  const styles = useStyles();

  const enabledTimingTransition = useTiming(enabled, {
    duration: 500,
    easing: Easing.bezier(0, 0.55, 0.45, 1),
  });
  const enabledSpringTransition = useSpring(enabled);

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: mixColor(
        enabledTimingTransition.value,
        disabledBackgroundColor,
        enabledBackgroundColor
      ) as string,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        enabledTimingTransition.value,
        [0, 0.5, 1],
        [1, 0, 1]
      ),
      color: mixColor(
        enabledTimingTransition.value,
        disabledLabelColor,
        enabledLabelColor
      ) as string,
      transform: [
        {
          scale: interpolate(
            enabledSpringTransition.value,
            [0, 0.5, 1],
            [1, 0, 1]
          ),
        },
      ],
    };
  });

  return (
    <Pressable
      onPress={() => {
        enabled && onPress();
      }}
    >
      <Animated.View style={[styles.button, extraStyles, animatedViewStyle]}>
        <Animated.Text
          style={[
            {
              ...theme.textVariants.buttons,
              color: undefined,
            },
            animatedTextStyle,
          ]}
        >
          {enabled ? label : disabledLabel}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

export default AnimatedBackgroundButton;
