import { BoxProps, useTheme, TextProps } from "@shopify/restyle";
import { Dimensions } from "react-native";

import { Theme } from "../../../theme";
import responsivePixelSize from "../../../utils/responsivePixelSize";

const { width } = Dimensions.get("window");

export const useStyles = () => {
  const theme = useTheme<Theme>();
  const OPTION_WIDTH = (width - theme.spacing.l * 2) / 2 - theme.spacing.xs;

  const containerStyles: BoxProps<Theme> = {
    flex: 1,
    backgroundColor: "primary",
  };
  const welcomeStyles: BoxProps<Theme> = {
    flex: 1,
    backgroundColor: "background3",
    marginTop: "s",
    padding: "l",
  };
  const titleStyles: TextProps<Theme> = {
    variant: "regularTextBig",
    color: "baseTextDark",
  };
  const semiBoldTitleStyles: TextProps<Theme> = {
    variant: "regularTextBig",
    fontFamily: "Poppins-SemiBold",
    color: "baseTextDark",
  };
  const optionContainerStyles: BoxProps<Theme> = {
    height: responsivePixelSize(200),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "m",
  };

  const studyOptionStyles: BoxProps<Theme> = {
    flex: 1,
    width: OPTION_WIDTH,
    backgroundColor: "primaryDark",
    borderRadius: "default",
    alignItems: "center",
    justifyContent: "center",
  };
  const teachOptionStyles: BoxProps<Theme> = {
    flex: 1,
    width: OPTION_WIDTH,
    backgroundColor: "secondary",
    borderRadius: "default",
    alignItems: "center",
    justifyContent: "center",
  };
  const optionTitle: TextProps<Theme> = {
    variant: "buttons",
    fontFamily: "Archivo-Bold",
    marginTop: "xs",
  };
  const connectionTextStyles: TextProps<Theme> = {
    variant: "regularTextSmall",
    color: "baseTextDark",
    marginTop: "s",
  };

  return {
    containerStyles,
    welcomeStyles,
    titleStyles,
    semiBoldTitleStyles,
    optionContainerStyles,
    studyOptionStyles,
    teachOptionStyles,
    optionTitle,
    connectionTextStyles,
  };
};
