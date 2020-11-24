import { BoxProps } from "@shopify/restyle";

import { Theme } from "../../../../../theme";
import responsivePixelSize from "../../../../../utils/responsivePixelSize";

export const useStyles = () => {
  const containerStyles: BoxProps<Theme> = {
    marginTop: "m",
    height: responsivePixelSize(220),
    position: "relative",
  };

  return {
    containerStyles,
  };
};
