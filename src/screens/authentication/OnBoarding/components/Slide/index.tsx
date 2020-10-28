import React from "react";

import Illustration from "../Illustration";
import Description from "../Description";
import { SlideProps } from "../types";
import { Box } from "../../../../../theme";
import Loading from "../../../../../components/static/Loading";

const Slide: React.FC<SlideProps> = ({
  SvgComponent,
  svgParticleColor,
  backgroundColor,
  opacity,
  descriptionText,
  index,
  shouldDisplayIllustration,
}) => {
  return (
    <Box flex={1}>
      {shouldDisplayIllustration ? (
        <Illustration
          {...{ SvgComponent, svgParticleColor, backgroundColor }}
        />
      ) : (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Loading color="primary" />
        </Box>
      )}
      <Description {...{ descriptionText, index, opacity }} />
    </Box>
  );
};

export default Slide;
