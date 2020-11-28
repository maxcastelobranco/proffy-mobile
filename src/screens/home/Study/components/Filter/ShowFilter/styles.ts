import { BoxProps, TextProps } from "@shopify/restyle";
import { ViewStyle } from "react-native";

import { Theme } from "../../../../../../theme";

export const useStyles = () => {
  const containerStyles: BoxProps<Theme> = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "xxl",
    borderBottomWidth: 2,
    borderBottomColor: "primaryLight",
    marginHorizontal: "l",
  };
  const descriptionStyles: TextProps<Theme> = {
    variant: "filterDescription",
  };

  const extraButtonStyles: ViewStyle = {
    flex: 0,
  };

  return {
    containerStyles,
    descriptionStyles,
    extraButtonStyles,
  };
};
