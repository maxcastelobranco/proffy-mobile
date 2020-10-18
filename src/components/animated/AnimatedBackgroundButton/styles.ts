import { useTheme } from "@shopify/restyle";
import { StyleSheet } from "react-native";

import { Theme } from "../../../theme";

export const useStyles = () => {
  const theme = useTheme<Theme>();

  return StyleSheet.create({
    button: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.borderRadii.default,
      paddingVertical: theme.spacing.ml,
    },
  });
};
