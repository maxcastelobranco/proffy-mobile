import { Dimensions, StyleSheet } from "react-native";
import { BoxProps, useTheme } from "@shopify/restyle";

import { Theme } from "../../../../../theme";

const { width } = Dimensions.get("window");

export const useStyles = () => {
  const theme = useTheme<Theme>();
  const stylesheet = StyleSheet.create({
    numerationStyles: {
      ...theme.textVariants.onBoardingNumeration,
      color: theme.colors.baseTextDark,
      marginBottom: theme.spacing.m,
    },
    titleStyles: {
      ...theme.textVariants.onBoardingTitle,
      color: theme.colors.baseTextDark,
      marginRight: theme.spacing.l,
    },
  });
  const containerStyles: BoxProps<Theme> = {
    flex: 1,
    maxWidth: width,
    backgroundColor: "background3",
    paddingHorizontal: "l",
    paddingTop: "xxl",
  };

  return {
    stylesheet,
    containerStyles,
  };
};
