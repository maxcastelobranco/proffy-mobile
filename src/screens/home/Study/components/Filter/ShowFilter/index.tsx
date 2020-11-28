import React from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { mix } from "react-native-redash";

import { Box, Text, Theme } from "../../../../../../theme";
import RippleButton from "../../../../../../components/static/RippleButton";
import responsivePixelSize from "../../../../../../utils/responsivePixelSize";

import { useStyles } from "./styles";

interface ShowFilterProps {
  showFilter: Animated.SharedValue<number>;
}

const ICON_SIZE = responsivePixelSize(22);
const timingConfig: Animated.WithTimingConfig = {};

const ShowFilter: React.FC<ShowFilterProps> = ({ showFilter }) => {
  const { containerStyles, descriptionStyles, extraButtonStyles } = useStyles();
  const theme = useTheme<Theme>();

  const showFilterSpringTransition = useDerivedValue(() =>
    withSpring(showFilter.value)
  );

  const animatedIconStyle = useAnimatedStyle(() => {
    const rotate = mix(showFilterSpringTransition.value, Math.PI, 0);

    return {
      transform: [{ rotate: `${rotate}rad` }],
    };
  });

  const toggleOpen = () => {
    "worklet";
    if (showFilter.value === 1) {
      showFilter.value = withTiming(0, timingConfig);
    }
    if (showFilter.value === 0) {
      showFilter.value = withTiming(1, timingConfig);
    }
  };

  return (
    <Box {...containerStyles}>
      <Feather name="filter" size={ICON_SIZE} color={theme.colors.secondary} />
      <Text {...descriptionStyles}>Filter teachers</Text>
      <RippleButton onPress={toggleOpen} {...{ extraButtonStyles }}>
        <Animated.View style={animatedIconStyle}>
          <Feather
            name="chevrons-down"
            size={ICON_SIZE}
            color={theme.colors.baseText}
          />
        </Animated.View>
      </RippleButton>
    </Box>
  );
};

export default ShowFilter;
