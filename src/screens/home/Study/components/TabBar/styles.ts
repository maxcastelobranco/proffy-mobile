import { BoxProps } from "@shopify/restyle";
import { ViewStyle } from "react-native";

import { Theme } from "../../../../../theme";
import responsivePixelSize from "../../../../../utils/responsivePixelSize";

export const TABBAR_HEIGHT = responsivePixelSize(74);

export const useStyles = () => {
  const containerStyles: BoxProps<Theme> = {
    height: TABBAR_HEIGHT,
    flexDirection: "row",
  };
  const focusedUnderlayStyles: BoxProps<Theme> = {
    flex: 1,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: 2,
    backgroundColor: "primary",
  };
  const buttonStyles: ViewStyle = {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  };

  return {
    containerStyles,
    focusedUnderlayStyles,
    buttonStyles,
  };
};
