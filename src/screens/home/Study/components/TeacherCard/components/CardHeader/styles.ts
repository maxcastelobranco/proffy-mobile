import { BoxProps, TextProps } from "@shopify/restyle";
import { ImageStyle } from "react-native";

import { Theme } from "../../../../../../../theme";
import responsivePixelSize from "../../../../../../../utils/responsivePixelSize";

const AVATAR_WIDTH = responsivePixelSize(80);

export const useStyles = () => {
  const containerStyles: BoxProps<Theme> = {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "xs",
  };
  const avatarStyles: ImageStyle = {
    width: AVATAR_WIDTH,
    height: (AVATAR_WIDTH * 9) / 16,
    borderRadius: AVATAR_WIDTH / 2,
    resizeMode: "contain",
  };
  const titleContainerStyles: BoxProps<Theme> = {
    marginLeft: "s",
  };
  const nameStyles: TextProps<Theme> = {
    variant: "usernameBig",
    color: "titleDark",
  };
  const subjectStyles: TextProps<Theme> = {
    variant: "regularTextMedium",
    color: "baseTextDark",
  };

  return {
    containerStyles,
    avatarStyles,
    titleContainerStyles,
    nameStyles,
    subjectStyles,
  };
};
