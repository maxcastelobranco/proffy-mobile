import { Dimensions, StyleSheet } from "react-native";
import { useTheme } from "@shopify/restyle";

import { Theme } from "../../../theme";

const { width } = Dimensions.get("window");

export const useStyles = (slideDataLength: number) => {
  const theme = useTheme<Theme>();

  return StyleSheet.create({
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
    },
  });
};
