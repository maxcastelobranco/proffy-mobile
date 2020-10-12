import Animated from "react-native-reanimated";
import { Color } from "react-native-redash";
import React from "react";

import { AnimatedSvgProps } from "../../../../components/svgs/animatedSvgs/types";

export interface SlideProps {
  SvgComponent: React.FC<AnimatedSvgProps>;
  svgParticleColor: string;
  backgroundColor: Animated.SharedValue<Color>;
  opacity: Animated.SharedValue<number>;
  descriptionText: string;
  index: number;
}

type UnusedIllustrationProps = "opacity" | "descriptionText" | "index";
export type IllustrationProps = Omit<SlideProps, UnusedIllustrationProps>;

type UnusedDescriptionProps =
  | "backgroundColor"
  | "SvgComponent"
  | "svgParticleColor";
export type DescriptionProps = Omit<SlideProps, UnusedDescriptionProps>;
