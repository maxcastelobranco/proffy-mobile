import { Dimensions, StyleSheet } from "react-native";
import { BoxProps, useTheme } from "@shopify/restyle";
import React from "react";

import { Box, Theme } from "../../../theme";

const { width } = Dimensions.get("window");

export const useStyles = (slideDataLength: number) => {
  const theme = useTheme<Theme>();

  const stylesheet = StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    longArrowContainer: {
      flex: 0.1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: width * slideDataLength,
      marginBottom: theme.spacing.ml,
      backgroundColor: theme.colors.background3,
    },
  });
  const containerStyles: BoxProps<Theme> = {
    flex: 1,
    backgroundColor: "background3",
  };
  const progressIndicatorContainerStyles: BoxProps<Theme> = {
    position: "absolute",
    bottom: theme.spacing.s / 2,
    left: 0,
    flexDirection: "row",
    marginBottom: "l",
    paddingLeft: "l",
  };

  return {
    stylesheet,
    containerStyles,
    progressIndicatorContainerStyles,
  };
};
