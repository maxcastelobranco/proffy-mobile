import React, { useState } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "@shopify/restyle";

import { Theme } from "../../theme";

interface ButtonProps {
  onPress(): void;
  extraButtonStyles?: ViewStyle;
}

const RippleButton: React.FC<ButtonProps> = ({
  onPress,
  extraButtonStyles,
  children,
}) => {
  const [radius, setRadius] = useState(-1);
  const theme = useTheme<Theme>();
  const stylesheet = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.borderRadii.default,
      padding: theme.spacing.xs,
      ...extraButtonStyles,
    },
    pressed: {
      opacity: 0.6,
      shadowColor: theme.colors.titleDark,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
  });

  return (
    <Pressable
      style={({ pressed }) => {
        return pressed
          ? {
              ...stylesheet.container,
              ...stylesheet.pressed,
            }
          : {
              ...stylesheet.container,
            };
      }}
      onLayout={({
        nativeEvent: {
          layout: { width, height },
        },
      }) => setRadius(Math.sqrt(width ** 2 + height ** 2))}
      android_ripple={{
        radius: radius !== -1 ? radius : undefined,
        color: theme.colors.background5,
      }}
      {...{ onPress }}
    >
      {children}
    </Pressable>
  );
};

export default RippleButton;
