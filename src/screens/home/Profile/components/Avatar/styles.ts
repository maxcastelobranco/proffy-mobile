import { useTheme } from "@shopify/restyle";
import { ViewStyle } from "react-native";

import { Theme } from "../../../../../theme";
import responsivePixelSize from "../../../../../utils/responsivePixelSize";

export const useStyles = () => {
  const theme = useTheme<Theme>();
  const IMAGE_SIZE = responsivePixelSize(180);

  const containerStyles: ViewStyle = {
    backgroundColor: theme.colors.primary,
    paddingTop: theme.spacing.s,
    paddingHorizontal: theme.spacing.l,
    alignItems: "center",
  };

  return {
    IMAGE_SIZE,
    containerStyles,
  };
};
