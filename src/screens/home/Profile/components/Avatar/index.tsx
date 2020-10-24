import React, { useState } from "react";
import Animated, {
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

import { useStyles } from "./styles";

const { width: wWidth } = Dimensions.get("window");

const Avatar: React.FC = () => {
  const [aspectRatio, setAspectRatio] = useState(-1);
  const theme = useTheme<Theme>();
  const { IMAGE_SIZE, containerStyles } = useStyles();

  const imageScale = useSharedValue(1);
  const imageWidth = useSharedValue(IMAGE_SIZE);
  const imageHeight = useSharedValue(IMAGE_SIZE);
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
        }
      ),
    };
  });

  const onPress = () => {
    if (imageWidth.value === IMAGE_SIZE) {
      imageWidth.value = withSpring(wWidth);
      imageHeight.value = withSpring(wWidth * aspectRatio);
    } else {
      imageWidth.value = withSpring(IMAGE_SIZE);
      imageHeight.value = withSpring(IMAGE_SIZE);
    }
  };

  return (
    <Box {...containerStyles}>
      <Pressable {...{ onPress }}>
        <PinchGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View>
            <Animated.Image
              onLayout={({
                nativeEvent: {
                  layout: { width, height },
                },
              }) => {
                setAspectRatio(width / height);
              }}
              style={animatedStyle}
              source={require("../../../../../../assets/images/scorpion.jpg")}
            />
          </Animated.View>
        </PinchGestureHandler>
      </Pressable>
    </Box>
  );
};

export default Avatar;
