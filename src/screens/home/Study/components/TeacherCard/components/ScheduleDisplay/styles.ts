import { BoxProps, TextProps } from "@shopify/restyle";
import { StyleSheet } from "react-native";

import { Theme } from "../../../../../../../theme";

export const useStyles = () => {
  const containerStyles: BoxProps<Theme> = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "s",
    borderRadius: "default",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "background1",
  };
  const textStyles: TextProps<Theme> = {
    variant: "smallTitle",
  };

  return {
    containerStyles,
    textStyles,
  };
};
