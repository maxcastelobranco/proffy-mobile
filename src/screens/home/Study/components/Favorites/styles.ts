import { BoxProps, TextProps, useTheme } from "@shopify/restyle";
import { ViewStyle } from "react-native";

import { Theme } from "../../../../../theme";

export const useStyles = () => {
  const theme = useTheme<Theme>();
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

  return {
    titleContainerStyles,
    pageTitleStyles,
    favoriteProffysStyles,
    cardContainerStyles,
  };
};
