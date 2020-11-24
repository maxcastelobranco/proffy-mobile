import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { RectButton } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";

import responsivePixelSize from "../../../../../../../utils/responsivePixelSize";
import { Box, Text, Theme } from "../../../../../../../theme";

import { useStyles } from "./styles";

interface CardFooterProps {
  favoriteButtonAnimationDriver: Animated.SharedValue<number>;
  isFavorite: boolean;
  perHourCost?: number;
}

const ICON_SIZE = responsivePixelSize(24);

const CardFooter: React.FC<CardFooterProps> = ({
  favoriteButtonAnimationDriver,
  isFavorite,
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

  const animatedFavoriteButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: favoriteButtonAnimationDriver.value,
    };
  });

  return (
    <>
      <Box {...rowStyles} marginHorizontal="s">
        <Text {...myHourStyles}>My hour:</Text>
        <Text {...moneyStyles}>${perHourCost}</Text>
      </Box>
      <Box {...rowStyles}>
        <RectButton onPress={() => true} style={buttonStyles}>
          <FontAwesome5
            name="whatsapp"
            size={ICON_SIZE}
            color={theme.colors.title}
          />
          <Text {...getInTouchStyles}>Get in touch</Text>
        </RectButton>
        {isFavorite ? (
          <Animated.View
            style={[heartBrokenContainerStyles, animatedFavoriteButtonStyle]}
          >
            <FontAwesome5
              name="heart-broken"
              size={ICON_SIZE}
              color={theme.colors.title}
            />
          </Animated.View>
        ) : (
          <Animated.View
            style={[heartContainerStyles, animatedFavoriteButtonStyle]}
          >
            <FontAwesome5
              name="heart"
              size={ICON_SIZE}
              color={theme.colors.title}
            />
          </Animated.View>
        )}
      </Box>
    </>
  );
};

export default CardFooter;
