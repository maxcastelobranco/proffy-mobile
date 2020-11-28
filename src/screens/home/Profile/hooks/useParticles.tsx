import React from "react";
import { useTheme } from "@shopify/restyle";

import OutlinedCircle from "../../../../components/svgs/animated/OutlinedCircle";
import responsivePixelSize from "../../../../utils/responsivePixelSize";
import X from "../../../../components/svgs/animated/X";
import CircleGrid from "../../../../components/animated/CircleGrid";
import { Theme } from "../../../../theme";

export const useParticles = () => {
  const theme = useTheme<Theme>();

  return [
    <OutlinedCircle
      key="0"
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
      key="1"
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
      key="2"
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
      key="3"
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
      key="4"
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
