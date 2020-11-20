import { StyleSheet, ViewStyle } from "react-native";
import { BoxProps, TextProps, useTheme } from "@shopify/restyle";

import { Theme } from "../../../../theme";

export const useStyles = () => {
  const theme = useTheme<Theme>();
  const headerStyles: BoxProps<Theme> = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: "xs",
    paddingHorizontal: "s",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "baseTextDark",
  };

  const labelStyles: TextProps<Theme> = {
    variant: "buttons",
    color: "titleDark",
  };

  const childrenContainerStyles: ViewStyle = {
    paddingHorizontal: theme.spacing.l,
  };

  return {
    headerStyles,
    labelStyles,
    childrenContainerStyles,
  };
};
