import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { RectButton } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";

import responsivePixelSize from "../../../../../../../utils/responsivePixelSize";
import { Box, Text, Theme } from "../../../../../../../theme";

import { useStyles } from "./styles";

interface CardFooterProps {
  likeOpacity: Animated.SharedValue<number>;
  dislikeOpacity: Animated.SharedValue<number>;
  perHourCost?: number;
}

const ICON_SIZE = responsivePixelSize(24);

const CardFooter: React.FC<CardFooterProps> = ({
  likeOpacity,
  dislikeOpacity,
  perHourCost = 0,
}) => {
  const theme = useTheme<Theme>();
  const {
    rowStyles,
    myHourStyles,
    moneyStyles,
    buttonStyles,
    getInTouchStyles,
    heartContainerStyles,
    heartBrokenContainerStyles,
  } = useStyles();

  const animatedLikeStyle = useAnimatedStyle(() => {
    return {
      opacity: likeOpacity.value,
    };
  });
  const animatedDislikeStyle = useAnimatedStyle(() => {
    return {
      opacity: dislikeOpacity.value,
    };
  });

  return (
    <>
      <Box {...rowStyles} marginHorizontal="s">
        <Text {...myHourStyles}>My hour:</Text>
        <Text {...moneyStyles}>${perHourCost}</Text>
      </Box>
      <Box {...rowStyles}>
        <Animated.View style={[heartContainerStyles, animatedLikeStyle]}>
          <FontAwesome5
            name="heart"
            size={ICON_SIZE}
            color={theme.colors.title}
          />
        </Animated.View>
        <RectButton onPress={() => true} style={buttonStyles}>
          <FontAwesome5
            name="whatsapp"
            size={ICON_SIZE}
            color={theme.colors.title}
          />
          <Text {...getInTouchStyles}>Get in touch</Text>
        </RectButton>
        <Animated.View
          style={[heartBrokenContainerStyles, animatedDislikeStyle]}
        >
          <FontAwesome5
            name="heart-broken"
            size={ICON_SIZE}
            color={theme.colors.title}
          />
        </Animated.View>
      </Box>
    </>
  );
};

export default CardFooter;
