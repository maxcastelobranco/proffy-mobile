import { BoxProps, TextProps } from "@shopify/restyle";

import { Theme } from "../../../../../theme";

export const useStyles = () => {
  const containerStyles: BoxProps<Theme> = {
    backgroundColor: "background3",
    paddingHorizontal: "ml",
    paddingTop: "s",
  };
  const rowStyles: BoxProps<Theme> = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "xs",
    marginBottom: "ms",
  };
  const createAccountStyles: TextProps<Theme> = {
    variant: "regularTextSmall",
    color: "primary",
  };
  const forgotPasswordStyles: TextProps<Theme> = {
    variant: "regularTextMedium",
    color: "complementTextDark",
  };

  return {
    containerStyles,
    rowStyles,
    createAccountStyles,
    forgotPasswordStyles,
  };
};
