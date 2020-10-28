import { BoxProps } from "@shopify/restyle";

import { Theme } from "../../../../../theme";
import responsivePixelSize from "../../../../../utils/responsivePixelSize";

export const useStyles = () => {
  const IMAGE_SIZE = responsivePixelSize(180);

  const containerStyles: BoxProps<Theme> = {
    flex: 1,
    backgroundColor: "primary",
    paddingTop: "s",
    paddingHorizontal: "l",
    alignItems: "center",
  };

  return {
    IMAGE_SIZE,
    containerStyles,
  };
};
