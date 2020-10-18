import React from "react";
import { Pressable, PressableProps, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "@shopify/restyle";

import { Theme } from "../../theme";

interface ButtonProps {
  onPress(): void;
  extraButtonStyles?: ViewStyle;
  pressableProps?: PressableProps;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  extraButtonStyles,
  pressableProps,
  children,
}) => {
  const theme = useTheme<Theme>();
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      ...extraButtonStyles,
    },
  });

  return (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.6 : 1,
        ...styles.container,
      })}
      android_ripple={{
        borderless: true,
        color: theme.colors.background5,
      }}
      {...{ onPress }}
      {...pressableProps}
    >
      {children}
    </Pressable>
  );
};

export default Button;
