import React, { ReactNode } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
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
export const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
const ICON_SIZE = responsivePixelSize(24);

const Accordion: React.FC<AccordionProps> = ({
  label,
  labelButton,
  children,
}) => {
  const open = useSharedValue(0);

  const animatedChildrenContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: open.value,
      transform: [
        {
          scale: open.value,
        },
      ],
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const rotate = mix(open.value, Math.PI, 0);

    return {
      transform: [{ rotate: `${rotate}rad` }],
    };
  });

  const toggleOpen = () => {
    open.value = open.value === 1 ? withSpring(0) : withSpring(1);
  };

  const { headerStyles, labelStyles, childrenContainerStyles } = useStyles();

  return (
    <Box flex={1}>
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
          <AnimatedFeatherIcon
            name="chevrons-down"
            size={ICON_SIZE}
            color={theme.colors.titleDark}
            style={animatedIconStyle}
          />
        </RippleButton>
      </Box>
      <Animated.View
        style={[childrenContainerStyles, animatedChildrenContainerStyle]}
      >
        {children}
      </Animated.View>
    </Box>
  );
};

export default Accordion;
