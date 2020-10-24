import { BoxProps } from "@shopify/restyle";
import { StyleSheet } from "react-native";

import { Theme } from "../../../../../theme";
import responsivePixelSize from "../../../../../utils/responsivePixelSize";

export const useStyles = () => {
  const IMAGE_SIZE = responsivePixelSize(180);

  // const stylesheet = StyleSheet.create({
  //   image: {
  //     width: IMAGE_SIZE,
  //     height: IMAGE_SIZE,
  //     borderRadius: IMAGE_SIZE / 2,
  //   },
  // });
  const containerStyles: BoxProps<Theme> = {
    flex: 1,
    backgroundColor: "primary",
    paddingTop: "s",
    paddingHorizontal: "l",
    alignItems: "center",
  };

  return {
    IMAGE_SIZE,
    // stylesheet,
    containerStyles,
  };
};
