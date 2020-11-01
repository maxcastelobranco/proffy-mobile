import { StyleSheet, ViewStyle } from "react-native";
import { BoxProps, TextProps } from "@shopify/restyle";

import theme, { Theme } from "../../../../theme";

export const useStyles = () => {
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
