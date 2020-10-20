import { Dimensions } from "react-native";
import { BoxProps } from "@shopify/restyle";

import { Theme } from "../../../../../theme";

const { height } = Dimensions.get("window");

export const useStyles = () => {
  const containerStyles: BoxProps<Theme> = {
    height: height / 3,
    position: "relative",
  };

  return {
    containerStyles,
  };
};
