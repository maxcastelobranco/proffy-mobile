import React, { useEffect } from "react";
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { mix, mixColor, useSpring } from "react-native-redash";
import { useTheme } from "@shopify/restyle";
import { bin } from "react-native-redash/src/Math";

import { Text, Theme } from "../../../theme";
import RippleButton from "../../static/RippleButton";
import { AnimatedFeatherIcon } from "../reanimatedAnimatedComponents";
import responsivePixelSize from "../../../utils/responsivePixelSize";

import { useStyles } from "./styles";

interface CheckboxProps {
  value: boolean;
  onChange(): void;
}

const CheckBox: React.FC<CheckboxProps> = ({ value, onChange }) => {
  const theme = useTheme<Theme>();
  const { styles, textStyles } = useStyles();

  const animationDriver = useSpring(value);

  const animatedIconContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: mixColor(
      animationDriver.value,
      theme.colors.background4,
      theme.colors.secondary
    ) as string,
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateZ: `${mix(animationDriver.value, (-Math.PI / 2) * 2, 0)}rad` },
    ],
  }));

  return (
    <RippleButton
      onPress={onChange}
      extraButtonStyles={styles.contentContainer}
    >
      <Animated.View style={[styles.checkbox, animatedIconContainerStyle]}>
        <AnimatedFeatherIcon
          name="check"
          size={responsivePixelSize(24)}
          color={theme.colors.background4}
          style={animatedIconStyle}
        />
      </Animated.View>
      <Text {...textStyles}>Remember me</Text>
    </RippleButton>
  );
};

export default CheckBox;
