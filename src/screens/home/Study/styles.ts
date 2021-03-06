import { BoxProps, TextProps, useTheme } from "@shopify/restyle";
import { ViewStyle } from "react-native";

import { Theme } from "../../../theme";
import responsivePixelSize from "../../../utils/responsivePixelSize";

import { HEADER_CONTAINER_HEIGHT } from "./shared";

export const useStyles = () => {
  const theme = useTheme<Theme>();
  const headerContainerStyles: BoxProps<Theme> = {
    height: HEADER_CONTAINER_HEIGHT,
    backgroundColor: "primary",
  };
  const titleContainerStyles: BoxProps<Theme> = {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "primary",
    paddingHorizontal: "l",
  };
  const pageTitleStyles: TextProps<Theme> = {
    variant: "usernameBig",
    marginTop: "m",
    marginBottom: "xs",
  };
  const favoriteProffysStyles: TextProps<Theme> = {
    variant: "regularTextMedium",
    color: "baseText",
    marginTop: "m",
    marginBottom: "xs",
  };
  const cardContainerStyles: ViewStyle = {
    flex: 1,
    marginTop: -theme.spacing.xl,
    alignSelf: "center",
  };
  const skeletonContainerStyle: ViewStyle = {
    position: "absolute",
    left: theme.spacing.l,
    top: responsivePixelSize(230),
  };

  return {
    headerContainerStyles,
    titleContainerStyles,
    pageTitleStyles,
    favoriteProffysStyles,
    cardContainerStyles,
    skeletonContainerStyle,
  };
};
