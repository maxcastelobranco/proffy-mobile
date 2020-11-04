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
  const flatListStyles: ViewStyle = {
    marginTop: -theme.spacing.l,
  };
  const flatListContentContainerStyles: ViewStyle = {
    flex: 1,
    justifyContent: "center",
  };

  return {
    titleContainerStyles,
    pageTitleStyles,
    favoriteProffysStyles,
    flatListStyles,
    flatListContentContainerStyles,
  };
};
