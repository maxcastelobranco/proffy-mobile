import { BoxProps, TextProps, useTheme } from "@shopify/restyle";
import { Dimensions } from "react-native";

import { Theme } from "../../../theme";
import responsivePixelSize from "../../../utils/responsivePixelSize";

const { width } = Dimensions.get("window");

export const useStyles = () => {
  const theme = useTheme<Theme>();
  const headerStyles: BoxProps<Theme> = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "m",
    paddingHorizontal: "l",
  };
  const descriptionContainerStyles: BoxProps<Theme> = {
    position: "absolute",
    left: theme.spacing.l,
    right: theme.spacing.l,
    top: responsivePixelSize(180),
  };
  const slideStyles: BoxProps<Theme> = {
    minWidth: width,
    paddingHorizontal: "l",
  };
  const progressIndicatorContainerStyles: BoxProps<Theme> = {
    flexDirection: "row",
  };
  const titleStyles: TextProps<Theme> = {
    variant: "regularTitle",
    color: "titleDark",
  };
  const descriptionStyles: TextProps<Theme> = {
    variant: "regularTextMedium",
    color: "baseTextDark",
    marginTop: "s",
  };
  const slideTitleStyles: TextProps<Theme> = {
    variant: "regularTitle",
    fontSize: responsivePixelSize(24),
    color: "titleDark",
    marginBottom: "s",
  };

  return {
    headerStyles,
    descriptionContainerStyles,
    slideStyles,
    progressIndicatorContainerStyles,
    titleStyles,
    descriptionStyles,
    slideTitleStyles,
  };
};
