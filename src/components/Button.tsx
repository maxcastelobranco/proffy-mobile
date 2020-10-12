import React, { useMemo } from "react";
import { Pressable, PressableProps, StyleSheet, ViewStyle } from "react-native";
import { BoxProps, useTheme } from "@shopify/restyle";

import { Box, Theme } from "../theme";

interface ButtonProps {
  onPress(): void;
  extraButtonStyles?: ViewStyle;
  contentContainerStyles?: BoxProps<Theme>;
  pressableProps?: PressableProps;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  extraButtonStyles,
  contentContainerStyles,
  pressableProps,
  children,
}) => {
  const theme = useTheme<Theme>();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          borderRadius: theme.borderRadii.default,
          padding: theme.spacing.s,
          alignItems: "center",
          justifyContent: "center",
          ...extraButtonStyles,
        },
      }),
    [extraButtonStyles, theme.borderRadii.default, theme.spacing.s]
  );

  return (
    <Pressable
      style={({ pressed }) => ({
        ...styles.container,
        opacity: pressed ? 0.7 : 1,
      })}
      android_ripple={{
        borderless: true,
      }}
      {...{ onPress }}
      {...pressableProps}
    >
      <Box {...contentContainerStyles}>{children}</Box>
    </Pressable>
  );
};

export default Button;
