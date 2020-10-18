import { Dimensions, StyleSheet } from "react-native";

import responsivePixelSize from "../../../../../utils/responsivePixelSize";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    minHeight: responsivePixelSize(350),
    width,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  outlinedCircle1: {
    position: "absolute",
    top: responsivePixelSize(89),
    left: responsivePixelSize(103),
  },
  outlinedCircle2: {
    position: "absolute",
    top: responsivePixelSize(172),
    right: responsivePixelSize(64),
  },
  outlinedCircle3: {
    position: "absolute",
    top: responsivePixelSize(72),
    left: responsivePixelSize(72),
  },
  x1: {
    position: "absolute",
    top: responsivePixelSize(181),
    left: responsivePixelSize(62),
  },
  x2: {
    position: "absolute",
    bottom: responsivePixelSize(45),
    left: responsivePixelSize(138),
  },
  search1: {
    position: "absolute",
    bottom: responsivePixelSize(52),
    right: responsivePixelSize(60),
  },
  search2: {
    position: "absolute",
    top: responsivePixelSize(40),
    right: responsivePixelSize(210),
  },
  circleGrid1: {
    position: "absolute",
    top: responsivePixelSize(40),
    right: responsivePixelSize(24),
  },
  circleGrid2: {
    position: "absolute",
    bottom: responsivePixelSize(40),
    left: responsivePixelSize(52),
  },
});
