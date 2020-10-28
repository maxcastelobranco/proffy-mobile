import React, { useState } from "react";
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { useVector } from "react-native-redash";
import { useTheme } from "@shopify/restyle";
import { Dimensions, Pressable } from "react-native";

import { Box, Theme } from "../../../../../theme";
import { transformOrigin } from "../../../../../utils/transformOrigin";
import { useAppContext } from "../../../../../context";

import { useStyles } from "./styles";

const { width: wWidth } = Dimensions.get("window");

interface AvatarProps {
  isFullScreen: Animated.SharedValue<number>;
}

const Avatar: React.FC<AvatarProps> = ({ isFullScreen }) => {
  const {
    state: {
      authentication: { user },
    },
  } = useAppContext();
  const [aspectRatio, setAspectRatio] = useState(-1);
  const theme = useTheme<Theme>();
  const { IMAGE_SIZE, containerStyles } = useStyles();

  const imageScale = useSharedValue(1);
  const imageWidth = useSharedValue(IMAGE_SIZE);
  const imageHeight = useSharedValue(IMAGE_SIZE);
  const translateY = useSharedValue(0);
  const borderRadius = useSharedValue(IMAGE_SIZE / 2);
  const origin = useVector();

  const gestureHandler = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent
  >({
    onStart: ({ focalX, focalY }) => {
      origin.x.value = focalX;
      origin.y.value = focalY;
    },
    onActive: ({ scale }) => {
      imageScale.value = withSpring(scale);
      borderRadius.value = withTiming(theme.borderRadii.default);
    },
    onEnd: () => {
      imageScale.value = withSpring(1);
      borderRadius.value = withTiming(IMAGE_SIZE / 2);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const { x, y } = origin;

    return {
      width: imageWidth.value,
      height: imageHeight.value,
      borderRadius: borderRadius.value,
      transform: transformOrigin(
        { x: x.value, y: y.value },
        {
          scale: imageScale.value,
        },
        { translateY: translateY.value }
      ),
    };
  });

  const timingConfig = { easing: Easing.bezier(0.22, 1, 0.36, 1) };

  const onPress = () => {
    isFullScreen.value =
      isFullScreen.value === 1 ? withTiming(0) : withTiming(1);

    if (imageWidth.value === IMAGE_SIZE) {
      translateY.value = withSpring(48);
      imageWidth.value = withTiming(wWidth, timingConfig);
      imageHeight.value = withTiming(wWidth * aspectRatio, timingConfig);
    } else {
      translateY.value = withSpring(0);
      imageWidth.value = withTiming(IMAGE_SIZE, timingConfig);
      imageHeight.value = withTiming(IMAGE_SIZE, timingConfig);
    }
  };

  return (
    <Box {...containerStyles}>
      <Pressable {...{ onPress }}>
        <PinchGestureHandler
          enabled={!!isFullScreen.value}
          onGestureEvent={gestureHandler}
        >
          <Animated.View>
            {!!user.avatarUrl && (
              <Animated.Image
                onLayout={({
                  nativeEvent: {
                    layout: { width, height },
                  },
                }) => {
                  setAspectRatio(width / height);
                }}
                style={animatedStyle}
                source={{
                  uri: user.avatarUrl,
                }}
              />
            )}
          </Animated.View>
        </PinchGestureHandler>
      </Pressable>
    </Box>
  );
};

export default Avatar;
