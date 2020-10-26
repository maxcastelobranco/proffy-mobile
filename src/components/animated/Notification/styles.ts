import { StyleSheet } from "react-native";
import { TextProps, useTheme } from "@shopify/restyle";

import { Theme } from "../../../theme";
import responsivePixelSize from "../../../utils/responsivePixelSize";

const NOTIFICATION_WIDTH = responsivePixelSize(300);
const NOTIFICATION_HEIGHT = responsivePixelSize(NOTIFICATION_WIDTH * 0.4);

export const useStyles = () => {
  const theme = useTheme<Theme>();

  const styleSheet = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.danger,
      width: NOTIFICATION_WIDTH,
      height: NOTIFICATION_HEIGHT,
      borderRadius: theme.borderRadii.default,
      padding: theme.spacing.s,
      position: "absolute",
      top: -responsivePixelSize(379) + theme.spacing.s,
      left: theme.spacing.s,
      flexDirection: "row",
      alignItems: "center",
    },
  });

  const messageStyles: TextProps<Theme> = {
    variant: "regularTextMedium",
    color: "title",
    padding: "s",
  };

  return {
    styleSheet,
    messageStyles,
    NOTIFICATION_WIDTH,
  };
};
