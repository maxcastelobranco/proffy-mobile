import React from "react";
import { useTheme } from "@shopify/restyle";
import * as faker from "faker";

import OutlinedCircle from "../../../../components/svgs/animated/OutlinedCircle";
import responsivePixelSize from "../../../../utils/responsivePixelSize";
import X from "../../../../components/svgs/animated/X";
import CircleGrid from "../../../../components/animated/CircleGrid";
import { Theme } from "../../../../theme";

export const useParticles = () => {
  const theme = useTheme<Theme>();

  return [
    <OutlinedCircle
      key={faker.random.uuid()}
      viewProps={{
        style: {
          position: "absolute",
          top: responsivePixelSize(100),
          right: responsivePixelSize(60),
        },
      }}
      svgProps={{ stroke: theme.colors.secondary }}
    />,
    <X
      key={faker.random.uuid()}
      viewProps={{
        style: {
          position: "absolute",
          top: responsivePixelSize(164),
          right: responsivePixelSize(68),
        },
      }}
      svgProps={{ stroke: theme.colors.secondary }}
    />,
    <X
      key={faker.random.uuid()}
      viewProps={{
        style: {
          position: "absolute",
          top: responsivePixelSize(250),
          left: responsivePixelSize(60),
        },
      }}
      svgProps={{ stroke: theme.colors.secondary }}
    />,
    <CircleGrid
      key={faker.random.uuid()}
      rows={3}
      columns={2}
      circleColor={theme.colors.primaryLight}
      circleSize={responsivePixelSize(4)}
      {...{
        position: "absolute",
        top: responsivePixelSize(130),
        left: responsivePixelSize(34),
      }}
    />,
    <CircleGrid
      key={faker.random.uuid()}
      rows={3}
      columns={2}
      circleColor={theme.colors.primaryLight}
      circleSize={responsivePixelSize(4)}
      {...{
        position: "absolute",
        top: responsivePixelSize(230),
        right: responsivePixelSize(34),
      }}
    />,
  ];
};
