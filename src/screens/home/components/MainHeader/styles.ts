import { BoxProps, TextProps } from "@shopify/restyle";

import { Theme } from "../../../../theme";

export const useStyles = () => {
  const containerStyles: BoxProps<Theme> = {
    paddingHorizontal: "l",
    paddingVertical: "m",
    backgroundColor: "primaryDark",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  };
  const labelStyles: TextProps<Theme> = {
    variant: "headerTitle",
  };

  return {
    containerStyles,
    labelStyles,
  };
};
