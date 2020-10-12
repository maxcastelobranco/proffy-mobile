import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useTheme } from "@shopify/restyle";

import LongArrow from "../../../../../components/svgs/LongArrow";
import Button from "../../../../../components/Button";
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

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
        },
        animatedStyle,
      ]}
    >
      <Button {...{ onPress }}>
        <LongArrow />
      </Button>
    </Animated.View>
  );
};

export default LongArrowContainer;
