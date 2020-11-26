import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Dimensions, StyleSheet } from "react-native";
import { useTheme } from "@shopify/restyle";

import LongArrow from "../../../../../components/svgs/static/LongArrow";
import RippleButton from "../../../../../components/static/RippleButton";
import { Theme } from "../../../../../theme";

interface LongArrowContainerProps {
  onPress(): void;
  index: number;
  translationX: Animated.SharedValue<number>;
}

const { width } = Dimensions.get("window");

const LongArrowContainer: React.FC<LongArrowContainerProps> = ({
  onPress,
  index,
  translationX,
}) => {
  const theme = useTheme<Theme>();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translationX.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [0, 1, 0]
      ),
    };
  });

  const { containerStyle } = StyleSheet.create({
    containerStyle: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
  });

  return (
    <Animated.View style={[containerStyle, animatedStyle]}>
      <RippleButton
        {...{ onPress }}
        extraButtonStyles={{
          padding: theme.spacing.m,
        }}
      >
        <LongArrow />
      </RippleButton>
    </Animated.View>
  );
};

export default LongArrowContainer;
