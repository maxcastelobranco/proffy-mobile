import { BoxProps, TextProps } from "@shopify/restyle";

import { Theme } from "../../../theme";
import { INPUT_HEIGHT } from "../Input";

export const useStyles = () => {
  const rectButtonContainerStyles: BoxProps<Theme> = {
    overflow: "hidden",
    borderRadius: "default",
  };
  const containerStyles: BoxProps<Theme> = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "default",
    borderWidth: 1,
    borderColor: "background1",
    padding: "s",
    height: INPUT_HEIGHT * 0.6,
  };
  const labelStyles: TextProps<Theme> = {
    variant: "regularTextSmall",
    color: "complementTextDark",
    marginVertical: "xs",
  };
  const chooseTextStyles: TextProps<Theme> = {
    variant: "regularTextMedium",
    color: "inputText",
  };

  return {
    rectButtonStyles: rectButtonContainerStyles,
    containerStyles,
    labelStyles,
    chooseTextStyles,
  };
};
