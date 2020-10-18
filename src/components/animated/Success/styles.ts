import { BoxProps, TextProps, useTheme } from "@shopify/restyle";
import { StyleSheet } from "react-native";

import { Theme } from "../../../theme";

export const useStyles = () => {
  const theme = useTheme<Theme>();

  const stylesheet = StyleSheet.create({
    button: {
      backgroundColor: theme.colors.secondary,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing.s,
      borderRadius: theme.borderRadii.default,
      position: "absolute",
      bottom: theme.spacing.l,
      left: theme.spacing.l,
      right: 0,
    },
  });

  const containerStyles: BoxProps<Theme> = {
    flex: 1,
    backgroundColor: "primary",
    paddingHorizontal: "l",
    alignItems: "center",
    justifyContent: "center",
  };

  const titleStyles: TextProps<Theme> = {
    variant: "successTitle",
    marginTop: "m",
    marginBottom: "m",
  };
  const descriptionStyles: TextProps<Theme> = {
    variant: "regularTextMedium",
    color: "baseText",
    textAlign: "center",
  };
  const buttonLabelStyles: TextProps<Theme> = {
    variant: "buttons",
    textAlign: "center",
  };

  return {
    stylesheet,
    containerStyles,
    titleStyles,
    descriptionStyles,
    buttonLabelStyles,
  };
};
