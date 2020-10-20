import React from "react";
import { BoxProps } from "@shopify/restyle";

import { Box, Theme } from "../../../theme";

import Circle from "./components/Circle";

interface CircleGridProps extends BoxProps<Theme> {
  rows: number;
  columns: number;
  circleColor: string;
  circleSize?: number;
}

const CircleGrid: React.FC<CircleGridProps> = ({
  rows,
  columns,
  circleColor,
  circleSize,
  ...rest
}) => {
  const rowArray = Array.from(Array(rows).keys());
  const columnArray = Array.from(Array(columns).keys());

  return (
    <Box {...rest}>
      {rowArray.map((i) => {
        return (
          <Box key={i} flexDirection="row">
            {columnArray.map((j) => {
              return (
                <Circle
                  key={`${i}${j}`}
                  {...{ circleColor, circleSize, i, j }}
                />
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
};

export default CircleGrid;
