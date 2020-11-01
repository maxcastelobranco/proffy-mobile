import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { BoxProps, useTheme } from "@shopify/restyle";
import { RectButton } from "react-native-gesture-handler";

import { Box, Theme } from "../../theme";

interface ButtonProps {
  onPress(): void;
  extraButtonStyles?: ViewStyle;
}

const RippleButton: React.FC<ButtonProps> = ({
  onPress,
  extraButtonStyles,
  children,
}) => {
  const theme = useTheme<Theme>();
  const stylesheet = StyleSheet.create({
    button: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.borderRadii.default,
      padding: theme.spacing.s,
      ...extraButtonStyles,
    },
  });
  const containerStyles: BoxProps<Theme> = {
    borderRadius: "default",
    overflow: "hidden",
  };

  return (
    <Box {...containerStyles}>
      <RectButton style={stylesheet.button} {...{ onPress }}>
        {children}
      </RectButton>
    </Box>
  );
};

export default RippleButton;
