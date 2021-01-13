import Animated from "react-native-reanimated";
import React from "react";

import { AnimatedSvgProps } from "../../../../components/svgs/animated/types";

export interface SlideProps {
  SvgComponent: React.FC<AnimatedSvgProps>;
  svgParticleColor: string;
  // backgroundColor: Animated.SharedValue<string>;
  backgroundColor: Animated.SharedValue<React.ReactText>;
  translationX: Animated.SharedValue<number>;
  descriptionText: string;
  index: number;
  shouldDisplayIllustration: boolean;
}

type UnusedIllustrationProps =
  | "translationX"
  | "descriptionText"
  | "index"
  | "shouldDisplayIllustration";
export type IllustrationProps = Omit<SlideProps, UnusedIllustrationProps>;

type UnusedDescriptionProps =
  | "backgroundColor"
  | "SvgComponent"
  | "svgParticleColor"
  | "shouldDisplayIllustration";
export type DescriptionProps = Omit<SlideProps, UnusedDescriptionProps>;
