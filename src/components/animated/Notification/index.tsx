import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useTheme } from "@shopify/restyle";
import { Feather } from "@expo/vector-icons";
import { mix } from "react-native-redash";

import { Colors, Text, Theme } from "../../../theme";
import responsivePixelSize from "../../../utils/responsivePixelSize";

import { useStyles } from "./styles";

interface NotificationProps {
  shouldRenderNotification: Animated.SharedValue<number>;
  message: string;
  color: Colors;
  iconName: string;
}

const ICON_SIZE = responsivePixelSize(24);

const Notification: React.FC<NotificationProps> = ({
  shouldRenderNotification,
  message,
  color,
  iconName,
}) => {
  const theme = useTheme<Theme>();
  const { styleSheet, messageStyles, NOTIFICATION_WIDTH } = useStyles();
  const colorHexCode = theme.colors[color];

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = NOTIFICATION_WIDTH + theme.spacing.s * 2;

    return {
      opacity: shouldRenderNotification.value,
      transform: [
        { translateX: mix(shouldRenderNotification.value, -translateX, 0) },
      ],
    };
  });

  return (
    <Animated.View style={[styleSheet.container, animatedStyle]}>
      <Feather name={iconName} size={ICON_SIZE} color={colorHexCode} />
      <Text {...messageStyles}>{message}</Text>
    </Animated.View>
  );
};

export default Notification;
