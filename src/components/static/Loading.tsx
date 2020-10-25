import React from "react";
import { BoxProps, useTheme } from "@shopify/restyle";
import { ActivityIndicator } from "react-native";

import { Box, Theme } from "../../theme";

const Loading: React.FC = () => {
  const theme = useTheme<Theme>();
  const containerStyles: BoxProps<Theme> = {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "background1",
  };

  return (
    <Box {...containerStyles}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Box>
  );
};

export default Loading;
