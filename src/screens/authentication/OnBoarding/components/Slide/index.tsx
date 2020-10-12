import React from "react";

import Illustration from "../Illustration";
import Description from "../Description";
import { SlideProps } from "../types";
import { Box } from "../../../../../theme";

const Slide: React.FC<SlideProps> = ({
  SvgComponent,
  svgParticleColor,
  backgroundColor,
  opacity,
  descriptionText,
  index,
}) => {
  return (
    <Box flex={1}>
      <Illustration {...{ SvgComponent, svgParticleColor, backgroundColor }} />
      <Description {...{ descriptionText, index, opacity }} />
    </Box>
  );
};

export default Slide;
