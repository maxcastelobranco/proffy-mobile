import React, { ReactNode, useState } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { mix } from "react-native-redash";
import { Feather } from "@expo/vector-icons";

import theme, { Box, Text } from "../../../../theme";
import RippleButton from "../../../../components/static/RippleButton";
import responsivePixelSize from "../../../../utils/responsivePixelSize";

import { useStyles } from "./styles";

interface AccordionProps {
  label: string;
  labelButton?: ReactNode;
}
const ICON_SIZE = responsivePixelSize(24);

const Accordion: React.FC<AccordionProps> = ({
  label,
  labelButton,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const openTimingTransition = useSharedValue(0);
  const openSpringTransition = useSharedValue(0);

  const animatedChildrenContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: openTimingTransition.value,
    };
  });
  const animatedIconStyle = useAnimatedStyle(() => {
    const rotate = mix(openSpringTransition.value, Math.PI, 0);

    return {
      transform: [{ rotate: `${rotate}rad` }],
    };
  });

  const timingConfig: Animated.WithTimingConfig = {
    duration: 250,
    easing: Easing.bezier(0.85, 0, 0.15, 1),
  };

  const toggleOpen = () => {
    if (open) {
      openTimingTransition.value = withTiming(0, timingConfig, () => {
        setOpen(false);
      });
      openSpringTransition.value = withSpring(0);
    } else {
      setOpen(true);
      openTimingTransition.value = withTiming(1, timingConfig);
      openSpringTransition.value = withSpring(1);
    }
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
        {open && children}
      </Animated.View>
    </>
  );
};

export default Accordion;
