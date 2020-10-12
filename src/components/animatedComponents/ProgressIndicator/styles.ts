import { StyleSheet } from "react-native";
import { useTheme } from "@shopify/restyle";
import { useMemo } from "react";

import responsivePixelSize from "../../../utils/responsivePixelSize";
import { Theme } from "../../../theme";

const PROGRESS_INDICATOR_SIZE = responsivePixelSize(12);

export const useStyles = (index: number) => {
  const theme = useTheme<Theme>();

  return useMemo(
    () =>
      StyleSheet.create({
        progressIndicator: {
          width: PROGRESS_INDICATOR_SIZE,
          height: PROGRESS_INDICATOR_SIZE,
          borderRadius: PROGRESS_INDICATOR_SIZE / 4,
          marginLeft: index === 0 ? 0 : theme.spacing.xs,
        },
      }),
    [index, theme.spacing.xs]
  );
};
