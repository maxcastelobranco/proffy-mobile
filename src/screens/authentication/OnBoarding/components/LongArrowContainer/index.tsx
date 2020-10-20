import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { useTheme } from "@shopify/restyle";

import LongArrow from "../../../../../components/svgs/static/LongArrow";
import RippleButton from "../../../../../components/static/RippleButton";
import { Theme } from "../../../../../theme";

interface LongArrowContainerProps {
  onPress(): void;
  opacity: Animated.SharedValue<number>;
}

const LongArrowContainer: React.FC<LongArrowContainerProps> = ({
  onPress,
  opacity,
}) => {
  const theme = useTheme<Theme>();
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

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
