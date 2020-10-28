import { BoxProps, TextProps, useTheme } from "@shopify/restyle";
import { StyleSheet, ViewStyle } from "react-native";

import { Theme } from "../../../theme";
import { INPUT_HEIGHT } from "../Input";

export const useStyles = (open: boolean) => {
  const theme = useTheme<Theme>();

  const containerStyles: BoxProps<Theme> = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "default",
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomRightRadius: open ? "zero" : "default",
    borderBottomLeftRadius: open ? "zero" : "default",
    padding: "s",
    height: INPUT_HEIGHT,
  };
  const contentContainerStyle: ViewStyle = {
    paddingBottom: theme.spacing.m,
  };
  const labelStyles: TextProps<Theme> = {
    variant: "regularTextSmall",
    color: "complementTextDark",
    marginVertical: "xs",
  };
  const chooseTextStyles: TextProps<Theme> = {
    variant: "regularTextMedium",
    color: "inputText",
  };
  const optionTextStyles: TextProps<Theme> = {
    variant: "regularTextMedium",
    color: "baseTextDark",
  };
  const selectedOptionTextStyles: TextProps<Theme> = {
    variant: "regularTextMedium",
    fontFamily: "Poppins-SemiBold",
    color: "baseTextDark",
  };

  return {
    containerStyles,
    contentContainerStyle,
    labelStyles,
    chooseTextStyles,
    optionTextStyles,
    selectedOptionTextStyles,
  };
};
