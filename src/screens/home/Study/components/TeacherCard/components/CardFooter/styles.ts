import { BoxProps, TextProps, useTheme } from "@shopify/restyle";
import { ViewStyle } from "react-native";

import responsivePixelSize from "../../../../../../../utils/responsivePixelSize";
import { Theme } from "../../../../../../../theme";

const ICON_CONTAINER_SIZE = responsivePixelSize(40);

export const useStyles = () => {
  const theme = useTheme<Theme>();

  const rowStyles: BoxProps<Theme> = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "s",
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

  return {
    rowStyles,
    myHourStyles,
    moneyStyles,
    buttonStyles,
    getInTouchStyles,
    heartContainerStyles,
    heartBrokenContainerStyles,
  };
};
