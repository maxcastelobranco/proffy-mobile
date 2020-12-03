import { BoxProps, TextProps } from "@shopify/restyle";
import { Dimensions, ViewStyle } from "react-native";

import theme, { Theme } from "../../../../../theme";

const { width, height } = Dimensions.get("window");
export const CARD_HEIGHT = height * 0.62;
export const CARD_WIDTH = width - theme.spacing.l * 2;

export const useStyles = () => {
  const containerStyles: BoxProps<Theme> = {
    justifyContent: "space-between",
    width: CARD_WIDTH,
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
    CARD_WIDTH,
    CARD_HEIGHT,
  };
};
