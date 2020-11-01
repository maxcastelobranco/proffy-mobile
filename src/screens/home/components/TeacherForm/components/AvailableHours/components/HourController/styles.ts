import { BoxProps, TextProps } from "@shopify/restyle";
import { StyleSheet } from "react-native";

import { Theme } from "../../../../../../../../theme";
import { INPUT_HEIGHT } from "../../../../../../../../components/animated/Input";
import { GOLDEN_RATIO } from "../../../../../../../../utils/constants";

export const useStyles = () => {
  const labelStyles: TextProps<Theme> = {
    variant: "regularTextSmall",
    color: "complementTextDark",
    marginVertical: "xs",
  };
  const chooseTextStyles: TextProps<Theme> = {
    variant: "regularTextMedium",
    color: "inputText",
  };
  const valueContainerStyles: BoxProps<Theme> = {
    justifyContent: "center",
    width: INPUT_HEIGHT * GOLDEN_RATIO,
    height: INPUT_HEIGHT * 0.6,
    paddingHorizontal: "s",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: "default",
  };

  return {
    labelStyles,
    chooseTextStyles,
    valueContainerStyles,
  };
};
