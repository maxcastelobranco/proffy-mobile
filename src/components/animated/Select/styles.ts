import { BoxProps, TextProps } from "@shopify/restyle";
import { StyleSheet } from "react-native";

import { Theme } from "../../../theme";
import { INPUT_HEIGHT } from "../Input";

export const useStyles = () => {
  const containerStyles: BoxProps<Theme> = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "default",
    borderWidth: StyleSheet.hairlineWidth,
    padding: "s",
    height: INPUT_HEIGHT * 0.6,
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
    labelStyles,
    chooseTextStyles,
    optionTextStyles,
    selectedOptionTextStyles,
  };
};
