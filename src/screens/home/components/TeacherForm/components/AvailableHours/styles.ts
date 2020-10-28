import { BoxProps, TextProps, useTheme } from "@shopify/restyle";
import { StyleSheet, ViewStyle } from "react-native";

import { Theme } from "../../../../../../theme";

export const useStyles = () => {
  const theme = useTheme<Theme>();
  const containerStyles: BoxProps<Theme> = {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "baseTextDark",
  };
  const buttonStyles: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: theme.spacing.s,
  };
  const buttonTextStyles: TextProps<Theme> = {
    variant: "buttons",
    marginLeft: "xs",
  };

  return {
    containerStyles,
    buttonStyles,
    buttonTextStyles,
  };
};
