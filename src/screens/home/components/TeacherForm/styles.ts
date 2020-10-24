import { BoxProps, useTheme } from "@shopify/restyle";
import { ViewStyle } from "react-native";

import { Theme } from "../../../../theme";

export const useStyles = () => {
  const theme = useTheme<Theme>();

  const containerStyles: BoxProps<Theme> = {
    flex: 1.8,
    backgroundColor: "background3",
    position: "relative",
  };

  const flatListStyles: ViewStyle = {
    marginTop: -theme.spacing.l,
    marginHorizontal: theme.spacing.s,
    borderRadius: theme.borderRadii.default,
    backgroundColor: theme.colors.title,
  };

  return {
    containerStyles,
    flatListStyles,
  };
};
