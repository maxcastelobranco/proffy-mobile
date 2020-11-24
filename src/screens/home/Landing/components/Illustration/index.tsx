import React from "react";

import { Box } from "../../../../../theme";
import HomeIllustration from "../../../../../components/svgs/static/HomeIllustration";

import { useStyles } from "./styles";
import { useParticles } from "./hooks/useParticles";

const Illustration: React.FC = () => {
  const { containerStyles } = useStyles();

  const particles = useParticles();

  return (
    <Box {...containerStyles}>
      <HomeIllustration />
      {particles.map((Particle) => Particle)}
    </Box>
  );
};

export default Illustration;
