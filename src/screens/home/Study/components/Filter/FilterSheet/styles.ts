import { Dimensions, ViewStyle } from "react-native";
import { useTheme } from "@shopify/restyle";

import { Theme } from "../../../../../../theme";
import responsivePixelSize from "../../../../../../utils/responsivePixelSize";

const { width } = Dimensions.get("window");
const SHEET_HEIGHT = responsivePixelSize(800);

export const useStyles = () => {
  const theme = useTheme<Theme>();
  const containerStyles: ViewStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width,
    height: SHEET_HEIGHT,
    backgroundColor: theme.colors.background4,
    borderTopRightRadius: responsivePixelSize(24),
    borderTopLeftRadius: responsivePixelSize(24),
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  };

  const extraButtonStyles: ViewStyle = {
    flex: 0,
    marginBottom: theme.spacing.s,
  };

  return {
    SHEET_HEIGHT,
    containerStyles,
    extraButtonStyles,
  };
};
