import React, { useEffect } from "react";
import {
  Easing,
  withRepeat,
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
      strokeWidth: mix(animationDriver.value, 3.2, 4),
    };
  });

  useEffect(() => {
    runOnUI(() => {
      "worklet";
      animationDriver.value = withRepeat(
        withTiming(1, {
          duration: 1000,
          easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
        -1,
        true
      );
    })();
  }, [animationDriver]);

  return (
    <AnimatedSvg
      animatedProps={animatedSvgProps}
      viewBox="0 0 80 80"
      fill="none"
    >
      <AnimatedPath
        animatedProps={animatedPathProps}
        d="M53.333 70H26.667C17.463 70 10 62.537 10 53.333V26.667C10 17.463 17.463 10 26.667 10h26.666C62.537 10 70 17.463 70 26.667v26.666C70 62.537 62.537 70 53.333 70z"
        stroke={theme.colors.secondary}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        animatedProps={animatedPathProps}
        d="M47.556 36.667l-9.443 9.443-5.667-5.667"
        stroke={theme.colors.secondary}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </AnimatedSvg>
  );
};

export default OutlinedCheck;
