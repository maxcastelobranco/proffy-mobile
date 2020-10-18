import React from "react";
import {
  Easing,
  repeat,
  runOnUI,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@shopify/restyle";
import { mix } from "react-native-redash";

import { Theme } from "../../../theme";
import responsivePixelSize from "../../../utils/responsivePixelSize";

import { AnimatedPath, AnimatedSvg } from "./reanimatedSvgComponents";

const SVG_SIZE = responsivePixelSize(80);

const OutlinedCheck: React.FC = () => {
  const theme = useTheme<Theme>();

  const animationDriver = useSharedValue(0);

  const animatedSvgProps = useAnimatedProps(() => {
    const svgSize = mix(animationDriver.value, SVG_SIZE * 0.8, SVG_SIZE);

    return {
      width: svgSize,
      height: svgSize,
    };
  });

  const animatedPathProps = useAnimatedProps(() => {
    return {
      strokeWidth: mix(animationDriver.value, SVG_SIZE * 0.8, SVG_SIZE),
    };
  });

  runOnUI(() => {
    "worklet";
    animationDriver.value = repeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.bezier(0.65, 0, 0.35, 1),
      }),
      -1,
      true
    );
  })();

  return (
    <AnimatedSvg
      viewBox="0 0 60 60"
      stroke={theme.colors.secondary}
      animatedProps={animatedSvgProps}
    >
      {/*outline*/}
      <AnimatedPath
        d="M55 27.7V30c-.008 13.807-11.207 24.994-25.014 24.986C16.179 54.978 4.992 43.779 5 29.971 5.008 16.164 16.207 4.978 30.014 4.986A25 25 0 0140.175 7.15"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        animatedProps={animatedPathProps}
      />
      {/*check*/}
      <AnimatedPath
        d="M55 10L30 35.025l-7.5-7.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        animatedProps={animatedPathProps}
      />
    </AnimatedSvg>
  );
};

export default React.memo(OutlinedCheck);
