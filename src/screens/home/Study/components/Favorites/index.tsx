import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { useTheme } from "@shopify/restyle";
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  Extrapolate,
  withTiming,
  Easing,
  useDerivedValue,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { snapPoint } from "react-native-redash";

import { Box, Text, Theme } from "../../../../../theme";
import { TabNavigationProps } from "../../../../../routes/tabs";
import MainHeader from "../../../components/MainHeader";
import TeacherCard from "../TeacherCard";
import { useAppContext } from "../../../../../context";
import { CARD_HEIGHT } from "../TeacherCard/styles";
import Loading from "../../../../../components/static/Loading";

import { useGetFavorites } from "./hooks/useGetFavorites";
import { useStyles } from "./styles";

const { width } = Dimensions.get("window");
const ALPHA = Math.PI / 12;
const timingConfig: Animated.WithTimingConfig = {
  duration: 500,
  easing: Easing.bezier(0.65, 0, 0.35, 1),
};

const Favorites: React.FC<TabNavigationProps<"Favorites">> = () => {
  const theme = useTheme<Theme>();
  const {
    titleContainerStyles,
    pageTitleStyles,
    favoriteProffysStyles,
    cardContainerStyles,
  } = useStyles();
  const {
    state: {
      authentication: { user },
    },
  } = useAppContext();
  const {
    favoriteTeachers,
    favoriteTeachersEmoji,
    loadingTeachers,
  } = useGetFavorites();

  const [index, setIndex] = useState(0);
  const profile = favoriteTeachers[index];

  const CARD_WIDTH = width - theme.spacing.l * 2;
  const deltaX = CARD_WIDTH / 2;
  const A = Math.round(
    CARD_WIDTH * Math.cos(ALPHA) + CARD_HEIGHT * Math.sin(ALPHA)
  );
  const snapPoints = [-A, 0, A];

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  const likeOpacity = useDerivedValue(() => {
    return interpolate(translationX.value, [0, deltaX / 4], [0, 1]);
  });
  const dislikeOpacity = useDerivedValue(() => {
    return interpolate(translationX.value, [-1 * (deltaX / 4), 0], [1, 0]);
  });

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent
  >({
    onActive: (event) => {
      translationX.value = withSpring(event.translationX, {
        velocity: event.velocityX,
      });
      translationY.value = withSpring(event.translationY, {
        velocity: event.velocityY,
      });
    },
    onEnd: (event) => {
      const snapDestiny = snapPoint(
        translationX.value,
        event.velocityX,
        snapPoints
      );

      if (snapDestiny === 0) {
        translationX.value = withSpring(snapDestiny);
      } else {
        setIndex((index + 1) % favoriteTeachers.length);

        translationX.value = withTiming(snapDestiny, timingConfig, () => {
          opacity.value = 0;
          scale.value = 0;
          translationX.value = 0;

          opacity.value = withTiming(1, timingConfig);
          scale.value = withSpring(1);
        });
      }

      translationY.value = withSpring(0, {});
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const rotateZ = interpolate(
      translationX.value,
      [-1 * deltaX, deltaX],
      [ALPHA, -1 * ALPHA],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity.value,
      transform: [
        { translateX: translationX.value },
        { translateY: translationY.value },
        { rotateZ: `${rotateZ}rad` },
        { scale: scale.value },
      ],
    };
  });

  useEffect(() => {
    if (!loadingTeachers) {
      opacity.value = withTiming(1, timingConfig);
      scale.value = withSpring(1);
    }
  }, [loadingTeachers, opacity, scale]);

  return (
    <>
      <Box flex={0.46}>
        <MainHeader label="Study" />
        <Box {...titleContainerStyles}>
          <Text {...pageTitleStyles}>My Favorite{"\n"}Proffys</Text>
          <Text {...favoriteProffysStyles}>
            {`${favoriteTeachersEmoji} ${user.favoriteTeachersIds.length} Proffys`}
          </Text>
        </Box>
      </Box>
      {loadingTeachers ? (
        <Loading color="primaryDark" />
      ) : (
        <PanGestureHandler {...{ onGestureEvent }}>
          <Animated.View style={[cardContainerStyles, animatedStyle]}>
            <TeacherCard {...{ profile, likeOpacity, dislikeOpacity }} />
          </Animated.View>
        </PanGestureHandler>
      )}
    </>
  );
};

export default Favorites;
