import { BoxProps, TextProps, useTheme } from "@shopify/restyle";
import { Dimensions, ViewStyle } from "react-native";

import { Theme } from "../../../../../theme";
import responsivePixelSize from "../../../../../utils/responsivePixelSize";

const { width } = Dimensions.get("window");
export const CARD_HEIGHT = responsivePixelSize(600);

export const useStyles = () => {
  const theme = useTheme<Theme>();

  const containerStyles: BoxProps<Theme> = {
    justifyContent: "space-between",
    maxWidth: width - theme.spacing.l * 2,
    height: CARD_HEIGHT,
    paddingVertical: "s",
    paddingHorizontal: "ms",
    backgroundColor: "title",
    borderRadius: "default",
    marginBottom: "m",
  };
  const boxShadowStyle: ViewStyle = {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  };
  const bioStyles: TextProps<Theme> = {
    variant: "regularTextSmall",
    color: "baseTextDark",
    textAlign: "justify",
    marginBottom: "xs",
  };

  return {
    containerStyles,
    boxShadowStyle,
    bioStyles,
  };
};
