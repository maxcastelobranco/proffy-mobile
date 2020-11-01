import { BoxProps } from "@shopify/restyle";
import { StyleSheet } from "react-native";

import { Theme } from "../../../../../../theme";
import responsivePixelSize from "../../../../../../utils/responsivePixelSize";

const CONTAINER_HEIGHT = responsivePixelSize(320);

export const useStyles = () => {
  const containerStyles: BoxProps<Theme> = {
    height: CONTAINER_HEIGHT,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "baseTextDark",
  };

  return {
    containerStyles,
    CONTAINER_HEIGHT,
  };
};
