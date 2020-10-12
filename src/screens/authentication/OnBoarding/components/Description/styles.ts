import { Dimensions, StyleSheet } from "react-native";
import { TextProps, useTheme } from "@shopify/restyle";
import { useMemo } from "react";

import { Theme } from "../../../../../theme";

const { width } = Dimensions.get("window");

export const useStyles = () => {
  const theme = useTheme<Theme>();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          maxWidth: width,
          backgroundColor: theme.colors.background3,
          paddingHorizontal: theme.spacing.l,
          paddingTop: theme.spacing.xxl,
        },
      }),
    [theme.colors.background3, theme.spacing.l, theme.spacing.xxl]
  );
  const numerationStyles: TextProps<Theme> = useMemo(
    () => ({
      variant: "onBoardingNumeration",
      marginBottom: "m",
    }),
    []
  );
  const titleStyles: TextProps<Theme> = useMemo(
    () => ({
      variant: "onBoardingTitle",
      marginRight: "l",
    }),
    []
  );

  return {
    styles,
    numerationStyles,
    titleStyles,
  };
};
