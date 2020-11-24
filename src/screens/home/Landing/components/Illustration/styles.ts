import { BoxProps } from "@shopify/restyle";

import { Theme } from "../../../../../theme";
import responsivePixelSize from "../../../../../utils/responsivePixelSize";

export const useStyles = () => {
  const containerStyles: BoxProps<Theme> = {
    height: responsivePixelSize(300),
    position: "relative",
  };

  return {
    containerStyles,
  };
};
