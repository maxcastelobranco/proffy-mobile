import React from "react";
import { BoxProps, useTheme } from "@shopify/restyle";
import { ActivityIndicator } from "react-native";

import { Box, Colors, Theme } from "../../theme";

interface LoadingProps {
  color?: Colors;
}

const Loading: React.FC<LoadingProps> = ({ color }) => {
  const theme = useTheme<Theme>();
  const containerStyles: BoxProps<Theme> = {
    alignItems: "center",
    justifyContent: "center",
  };

  const activityIndicatorColor = color
    ? theme.colors[color]
    : theme.colors.title;

  return (
    <Box {...containerStyles}>
      <ActivityIndicator size="large" color={activityIndicatorColor} />
    </Box>
  );
};

export default Loading;
