import { ViewStyle } from "react-native";
import { useTheme } from "@shopify/restyle";

import { Theme } from "../../../theme";

export const useStyles = () => {
  const theme = useTheme<Theme>();
  const teacherFormContainerStyles: ViewStyle = {
    flex: 1.8,
    backgroundColor: theme.colors.background3,
  };

  return {
    teacherFormContainerStyles,
  };
};
