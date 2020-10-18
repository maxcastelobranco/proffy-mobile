import React from "react";
import { BoxProps, useTheme } from "@shopify/restyle";

import { Box, Text, Theme } from "../../../../../theme";
import responsivePixelSize from "../../../../../utils/responsivePixelSize";
import CircleGrid from "../../../../../components/animated/CircleGrid";
import Proffy from "../../../../../components/svgs/static/Proffy";
import OutlinedCircle from "../../../../../components/svgs/animated/OutlinedCircle";
import X from "../../../../../components/svgs/animated/X";

const Illustration: React.FC = () => {
  const theme = useTheme<Theme>();
  const containerStyles: BoxProps<Theme> = {
    height: responsivePixelSize(379),
    backgroundColor: "primary",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Box {...containerStyles}>
      <OutlinedCircle
        viewProps={{ style: { position: "absolute", top: 60, right: 108 } }}
        svgProps={{ stroke: theme.colors.secondaryLight }}
      />
      <OutlinedCircle
        viewProps={{ style: { position: "absolute", bottom: 55, left: 145 } }}
        svgProps={{ stroke: theme.colors.secondaryLight }}
      />
      <X
        viewProps={{ style: { position: "absolute", bottom: 100, left: 47 } }}
        svgProps={{
          stroke: theme.colors.secondaryLight,
          fill: theme.colors.secondaryLight,
        }}
      />
      <X
        viewProps={{ style: { position: "absolute", bottom: 165, right: 58 } }}
        svgProps={{
          stroke: theme.colors.secondaryLight,
          fill: theme.colors.secondaryLight,
        }}
      />
      <CircleGrid
        rows={4}
        columns={7}
        circleColor={theme.colors.primaryLight}
        {...{ position: "absolute", top: 30, left: 34 }}
      />
      <CircleGrid
        rows={3}
        columns={2}
        circleColor={theme.colors.primaryLight}
        {...{ position: "absolute", bottom: 30, right: 34 }}
      />
      <Proffy />
      <Text variant="logo">Your online study platform</Text>
    </Box>
  );
};

export default React.memo(Illustration);
