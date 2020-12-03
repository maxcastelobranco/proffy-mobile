import React, { ReactNode, useState } from "react";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { mix } from "react-native-redash";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";

import { Box, Text, Theme } from "../../../../theme";
import RippleButton from "../../../../components/static/RippleButton";
import responsivePixelSize from "../../../../utils/responsivePixelSize";

import { useStyles } from "./styles";

interface AccordionProps {
  label: string;
  labelButton?: ReactNode;
  height: Animated.SharedValue<number>;
  childrenHeight: number;
  openByDefault?: boolean;
}
const ICON_SIZE = responsivePixelSize(24);

const timingConfig: Animated.WithTimingConfig = {
  duration: 250,
  easing: Easing.bezier(0.85, 0, 0.15, 1),
};

const Accordion: React.FC<AccordionProps> = ({
  label,
  labelButton,
  height,
  childrenHeight,
  openByDefault,
  children,
}) => {
  const theme = useTheme<Theme>();
  const open = useSharedValue<boolean>(!!openByDefault);
  const openTimingTransition = useDerivedValue(() => {
    return open.value
      ? withTiming(1, timingConfig)
      : withTiming(0, timingConfig);
  });
  const openSpringTransition = useDerivedValue(() => {
    return open.value ? withSpring(1) : withSpring(0);
  });

  const animatedChildrenContainerStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      opacity: openTimingTransition.value,
    };
  });
  const animatedIconStyle = useAnimatedStyle(() => {
    const rotate = mix(openSpringTransition.value, Math.PI, 0);

    return {
      transform: [{ rotate: `${rotate}rad` }],
    };
  });

  const toggleOpen = () => {
    "worklet";
    open.value = !open.value;
    height.value = open.value ? withTiming(0) : withTiming(childrenHeight);
  };

  const { headerStyles, labelStyles, childrenContainerStyles } = useStyles();

  return (
    <>
      <Box {...headerStyles}>
        {labelButton ? (
          <>
            <Text {...labelStyles}>{label}</Text>
            {labelButton}
          </>
        ) : (
          <Text {...labelStyles}>{label}</Text>
        )}
        <RippleButton onPress={toggleOpen}>
          <Animated.View style={animatedIconStyle}>
            <Feather
              name="chevrons-down"
              size={ICON_SIZE}
              color={theme.colors.titleDark}
            />
          </Animated.View>
        </RippleButton>
      </Box>
      <Animated.View
        style={[childrenContainerStyles, animatedChildrenContainerStyle]}
      >
        {children}
      </Animated.View>
    </>
  );
};

export default Accordion;
