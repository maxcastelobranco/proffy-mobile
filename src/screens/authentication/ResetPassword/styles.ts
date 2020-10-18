import { BoxProps, TextProps } from "@shopify/restyle";

import { Theme } from "../../../theme";

export const useStyles = () => {
  const containerStyles: BoxProps<Theme> = {
    paddingHorizontal: "l",
  };
  const chevronContainerStyles: BoxProps<Theme> = {
    flexDirection: "row",
    marginTop: "s",
  };
  const pageDescriptionStyles: BoxProps<Theme> = {
    marginTop: "l",
  };
  const titleStyles: TextProps<Theme> = {
    variant: "regularTitleDark",
    marginBottom: "s",
  };
  const descriptionStyles: TextProps<Theme> = {
    variant: "regularTextMedium",
    color: "baseTextDark",
    marginBottom: "m",
  };

  return {
    containerStyles,
    chevronContainerStyles,
    pageDescriptionStyles,
    titleStyles,
    descriptionStyles,
  };
};
