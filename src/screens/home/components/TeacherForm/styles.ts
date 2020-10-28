import { useTheme } from "@shopify/restyle";
import { ViewStyle } from "react-native";

import { Theme } from "../../../../theme";

export const useStyles = () => {
  const theme = useTheme<Theme>();

  const flatListStyles: ViewStyle = {
    marginTop: -theme.spacing.l,
    marginHorizontal: theme.spacing.s,
    borderRadius: theme.borderRadii.default,
    backgroundColor: theme.colors.title,
  };

  return {
    flatListStyles,
  };
};
