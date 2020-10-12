import { useTheme } from "@shopify/restyle";
import React, { useMemo } from "react";

import { Theme } from "../../../../theme";
import Book from "../../../../components/svgs/animatedSvgs/Book";
import Television from "../../../../components/svgs/animatedSvgs/Television";
import { AnimatedSvgProps } from "../../../../components/svgs/animatedSvgs/types";

interface SlideData {
  backgroundColor: string;
  svgParticleColor: string;
  SvgComponent: React.FC<AnimatedSvgProps>;
  descriptionText: string;
}

const useSlideData = (): SlideData[] => {
  const theme = useTheme<Theme>();

  return useMemo(
    () => [
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
    ],
    [
      theme.colors.primary,
      theme.colors.primaryLight,
      theme.colors.secondary,
      theme.colors.secondaryLight,
    ]
  );
};

export default useSlideData;
