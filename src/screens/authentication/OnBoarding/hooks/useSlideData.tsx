import { useTheme } from "@shopify/restyle";
import React from "react";

import { Theme } from "../../../../theme";
import Book from "../../../../components/svgs/animated/Book";
import Television from "../../../../components/svgs/animated/Television";
import { AnimatedSvgProps } from "../../../../components/svgs/animated/types";

interface SlideData {
  backgroundColor: string;
  svgParticleColor: string;
  SvgComponent: React.FC<AnimatedSvgProps>;
  descriptionText: string;
}

const useSlideData = (): SlideData[] => {
  const theme = useTheme<Theme>();

  return [
    {
      backgroundColor: theme.colors.primary,
      SvgComponent: Book,
      svgParticleColor: theme.colors.primaryLight,
      descriptionText: "Find lots of professors to teach you",
    },
    {
      backgroundColor: theme.colors.secondary,
      SvgComponent: Television,
      svgParticleColor: theme.colors.secondaryLight,
      descriptionText: "Or you can teach about the things you know best",
    },
  ];
};

export default useSlideData;
