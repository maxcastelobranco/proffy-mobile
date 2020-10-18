import { Dimensions, StyleSheet } from "react-native";
import { TextProps, useTheme } from "@shopify/restyle";

import { Theme } from "../../../../../theme";

const { width } = Dimensions.get("window");

export const useStyles = () => {
  const theme = useTheme<Theme>();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      maxWidth: width,
      backgroundColor: theme.colors.background3,
      paddingHorizontal: theme.spacing.l,
      paddingTop: theme.spacing.xxl,
    },
  });
  const numerationStyles: TextProps<Theme> = {
    variant: "onBoardingNumeration",
    marginBottom: "m",
  };
  const titleStyles: TextProps<Theme> = {
    variant: "onBoardingTitle",
    marginRight: "l",
  };

  return {
    styles,
    numerationStyles,
    titleStyles,
  };
};
