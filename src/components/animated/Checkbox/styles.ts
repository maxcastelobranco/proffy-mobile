import { TextProps, useTheme } from "@shopify/restyle";
import { StyleSheet } from "react-native";

import { Theme } from "../../../theme";
import responsivePixelSize from "../../../utils/responsivePixelSize";

const CHECKBOX_SIZE = responsivePixelSize(32);

export const useStyles = () => {
  const theme = useTheme<Theme>();

  const styles = StyleSheet.create({
    contentContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: theme.borderRadii.default,
      marginTop: theme.spacing.s,
    },
    checkbox: {
      alignItems: "center",
      justifyContent: "center",
      width: CHECKBOX_SIZE,
      height: CHECKBOX_SIZE,
      borderRadius: theme.borderRadii.default,
    },
  });

  const textStyles: TextProps<Theme> = {
    variant: "regularTextMedium",
    color: "complementTextDark",
    marginLeft: "s",
  };

  return {
    styles,
    textStyles,
  };
};
