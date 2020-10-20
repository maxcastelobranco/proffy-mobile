import React from "react";
import Animated, {
  Easing,
  repeat,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { mix } from "react-native-redash";
import { useTheme } from "@shopify/restyle";

import { Theme } from "../../../theme";

import { AnimatedSvgProps } from "./types";

const Gear: React.FC<AnimatedSvgProps> = ({ viewProps, svgProps }) => {
  const theme = useTheme<Theme>();
  const animationDriver = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    const rotate = mix(animationDriver.value, -Math.PI, Math.PI);

    return {
      transform: [{ rotate: `${rotate}rad` }],
    };
  });

  const stylesheet = StyleSheet.create({
    container: {
      width: 14.43,
      height: 14.42,
      backgroundColor: theme.colors.primaryDark,
      borderRadius: theme.borderRadii.default / 2,
    },
  });

  runOnUI(() => {
    "worklet";
    animationDriver.value = repeat(
      withTiming(1, {
        duration: 3000,
        easing: Easing.bezier(0.76, 0, 0.24, 1),
      }),
      -1,
      true
    );
  })();

  return (
    <Animated.View
      style={[viewProps?.style, stylesheet.container, animatedStyles]}
    >
      <Svg width={14.43} height={14.42} viewBox="0 0 14.43 14.42" {...svgProps}>
        <Path
          d="M12.13 6.47l-.22-1a.35.35 0 00-.41-.26l-.56.13a.33.33 0 01-.37-.16 4.015 4.015 0 00-.79-.91.34.34 0 01-.1-.42l.32-.52a.35.35 0 00-.16-.46l-.87-.42a.35.35 0 00-.46.16l-.3.62a.36.36 0 01-.37.19c-.19-.01-.38-.01-.57 0-.19-.01-.38-.01-.57 0a.34.34 0 01-.36-.19L6 2.61a.35.35 0 00-.46-.16l-.88.42a.34.34 0 00-.152.456l.002.004.27.57a.35.35 0 01-.09.42 4.338 4.338 0 00-.8.91.33.33 0 01-.37.16L3 5.26a.36.36 0 00-.42.26l-.21 1a.35.35 0 00.26.41L3.3 7v.29c.002.46.083.917.24 1.35a.35.35 0 01-.1.39l-.28.22a.34.34 0 000 .48l.57.77a.36.36 0 00.49.05l.19-.15a.351.351 0 01.43 0c.401.315.859.55 1.35.69a.36.36 0 01.26.34v.19a.35.35 0 00.34.35h1a.35.35 0 00.21-.31v-.19a.36.36 0 01.26-.34 3.93 3.93 0 001.35-.69.35.35 0 01.44 0l.18.15a.36.36 0 00.49-.05l.6-.76a.34.34 0 000-.48L11 9.08a.359.359 0 01-.11-.4c.161-.428.242-.882.24-1.34v-.3l.71-.16a.35.35 0 00.292-.4l-.002-.01zM7.22 9.79a2.46 2.46 0 11-.001-4.919A2.46 2.46 0 017.22 9.79z"
          fill="#fff"
        />
      </Svg>
    </Animated.View>
  );
};

export default Gear;
