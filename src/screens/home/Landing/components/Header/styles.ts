import { BoxProps, TextProps } from "@shopify/restyle";

import { Theme } from "../../../../../theme";
import responsivePixelSize from "../../../../../utils/responsivePixelSize";

export const useStyles = () => {
  const AVATAR_SIZE = responsivePixelSize(50);

  const containerStyles: BoxProps<Theme> = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "l",
    paddingHorizontal: "l",
  };
  const userStyles: BoxProps<Theme> = {
    flexDirection: "row",
    alignItems: "center",
  };
  const avatarStyles: BoxProps<Theme> = {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    backgroundColor: "primaryDark",
  };
  const usernameStyles: TextProps<Theme> = {
    variant: "usernameSmall",
    marginLeft: "s",
  };
  const logoutButtonStyles: BoxProps<Theme> = {
    borderRadius: "default",
    padding: "s",
    backgroundColor: "primaryDark",
  };

  return {
    AVATAR_SIZE,
    containerStyles,
    userStyles,
    avatarStyles,
    usernameStyles,
    logoutButtonStyles,
  };
};
