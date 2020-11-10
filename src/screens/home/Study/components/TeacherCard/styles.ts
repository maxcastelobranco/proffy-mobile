import { BoxProps, TextProps, useTheme } from "@shopify/restyle";
import { Dimensions, ImageStyle, ViewStyle } from "react-native";

import { Theme } from "../../../../../theme";
import responsivePixelSize from "../../../../../utils/responsivePixelSize";

const AVATAR_WIDTH = responsivePixelSize(80);
const ICON_CONTAINER_SIZE = responsivePixelSize(40);

const { width } = Dimensions.get("window");
export const CARD_HEIGHT = responsivePixelSize(600);

export const useStyles = () => {
  const theme = useTheme<Theme>();

  const containerStyles: BoxProps<Theme> = {
    justifyContent: "space-between",
    maxWidth: width - theme.spacing.l * 2,
    height: CARD_HEIGHT,
    paddingVertical: "s",
    paddingHorizontal: "ms",
    backgroundColor: "title",
    borderRadius: "default",
    marginBottom: "m",
  };
  const boxShadowStyle: ViewStyle = {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  };
  const headerStyles: BoxProps<Theme> = {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "xs",
  };
  const rowStyles: BoxProps<Theme> = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "s",
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
  const bioStyles: TextProps<Theme> = {
    variant: "regularTextSmall",
    color: "baseTextDark",
    textAlign: "justify",
    marginBottom: "xs",
  };
  const myHourStyles: TextProps<Theme> = {
    variant: "regularTextMedium",
    color: "baseTextDark",
  };
  const moneyStyles: TextProps<Theme> = {
    variant: "smallTitle",
    color: "primary",
  };
  const buttonStyles: ViewStyle = {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: ICON_CONTAINER_SIZE,
    borderRadius: theme.borderRadii.default,
    marginTop: theme.spacing.xs,
    paddingHorizontal: theme.spacing.m,
    marginHorizontal: theme.spacing.xs,
    backgroundColor: theme.colors.secondary,
  };
  const getInTouchStyles: TextProps<Theme> = {
    variant: "smallTitle",
    color: "title",
    marginLeft: "xs",
  };
  const heartContainerStyles: ViewStyle = {
    alignItems: "center",
    justifyContent: "center",
    height: ICON_CONTAINER_SIZE,
    width: ICON_CONTAINER_SIZE,
    marginTop: theme.spacing.xs,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadii.default,
  };
  const heartBrokenContainerStyles: ViewStyle = {
    alignItems: "center",
    justifyContent: "center",
    height: ICON_CONTAINER_SIZE,
    width: ICON_CONTAINER_SIZE,
    marginTop: theme.spacing.xs,
    backgroundColor: theme.colors.danger,
    borderRadius: theme.borderRadii.default,
  };
  const avatarStyles: ImageStyle = {
    width: AVATAR_WIDTH,
    height: (AVATAR_WIDTH * 9) / 16,
    borderRadius: AVATAR_WIDTH / 2,
    resizeMode: "contain",
  };

  return {
    containerStyles,
    boxShadowStyle,
    headerStyles,
    rowStyles,
    titleContainerStyles,
    nameStyles,
    subjectStyles,
    bioStyles,
    myHourStyles,
    moneyStyles,
    buttonStyles,
    heartContainerStyles,
    heartBrokenContainerStyles,
    getInTouchStyles,
    avatarStyles,
  };
};
