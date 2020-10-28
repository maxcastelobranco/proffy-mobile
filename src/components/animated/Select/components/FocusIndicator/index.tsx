import { BoxProps } from "@shopify/restyle";
import React, { useMemo } from "react";

import { Box, Theme } from "../../../../../theme";

const FocusIndicator: React.FC = () => {
  const focusIndicatorStyles: BoxProps<Theme> = useMemo(
    () => ({
      flex: 1,
      position: "absolute",
      top: 12,
      bottom: 12,
      left: 0,
      width: 2,
      backgroundColor: "primary",
      borderRadius: "default",
    }),
    []
  );

  return <Box {...focusIndicatorStyles} />;
};

export default FocusIndicator;
