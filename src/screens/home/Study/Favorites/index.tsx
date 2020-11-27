import React, { useState } from "react";
import { useTheme } from "@shopify/restyle";
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  Extrapolate,
  Easing,
  useDerivedValue,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { snapPoint } from "react-native-redash";

import { Box, Text, Theme } from "../../../../theme";
import { TabNavigationProps } from "../../../../routes/tabs";
import MainHeader from "../../components/MainHeader";
import TeacherCard from "../components/TeacherCard";
import { useAppContext } from "../../../../context";
import { api } from "../../../../services/api";
import { AuthenticationActionTypes } from "../../../../context/reducers/authenticationReducer";
import Notification from "../../../../components/animated/Notification";
import TeacherCardSkeleton from "../components/TeacherCardSkeleton";
import { useStyles } from "../styles";
import {
  ALPHA,
  animateNextCard,
  animateNextCardLoading,
  DELTA_X,
  HEADER_CONTAINER_HEIGHT,
  MAX_TRANSLATE,
  showSuccessNotification,
  SNAP_POINTS,
} from "../shared";
import { useOnTabRenderEffect } from "../hooks/useOnTabRenderEffect";

import { useGetFavorites } from "./hooks/useGetFavorites";

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
    skeletonContainerStyle,
  } = useStyles();
  const {
    state: {
      authentication: { user },
    },
    dispatch,
  } = useAppContext();
  const {
    favoriteTeachers,
    setFavoriteTeachers,
    favoriteTeachersEmoji,
    loadingTeachers,
  } = useGetFavorites();

  const [index, setIndex] = useState(0);
  const profile = favoriteTeachers[index];

  const opacity = useSharedValue(0);
  const skeletonOpacity = useSharedValue(1);
  const scale = useSharedValue(0);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  const dislikeAnimationDriver = useDerivedValue(() => {
    return interpolate(translationX.value, [-1 * (DELTA_X / 4), 0], [1, 0]);
  });

  const removeFromFavorites = () => {
    setFavoriteTeachers((prevState) =>
      prevState.filter(({ id }) => id !== profile.id)
    );
    const updatedFavoriteTeacherIds = user.favoriteTeachersIds.filter(
      (id) => id !== profile.id
    );
    dispatch({
      type: AuthenticationActionTypes.UpdateUser,
      payload: {
        favoriteTeachersIds: updatedFavoriteTeacherIds,
      },
    });
    api.patch(`users/${user.id}`, {
      favoriteTeachersIds: updatedFavoriteTeacherIds,
    });
  };

  const successNotification = useSharedValue(0);

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
      const destiny = snapPoint(
        translationX.value,
        event.velocityX,
        SNAP_POINTS
      );

      if (destiny === 0) {
        translationX.value = withSpring(destiny, { velocity: event.velocityX });
      } else if (destiny === -MAX_TRANSLATE) {
        removeFromFavorites();
        showSuccessNotification(successNotification);
        animateNextCardLoading({
          destiny,
          scale,
          opacity,
          skeletonOpacity,
          translationX,
          timingConfig,
        });
      } else if (destiny === MAX_TRANSLATE) {
        animateNextCard({
          index,
          setIndex,
          length: favoriteTeachers.length,
          translationX,
          scale,
          opacity,
          destiny,
          timingConfig,
        });
      }

      translationY.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const rotateZ = interpolate(
      translationX.value,
      [-1 * DELTA_X, DELTA_X],
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
  const animatedSkeletonStyle = useAnimatedStyle(() => {
    return {
      opacity: skeletonOpacity.value,
    };
  });

  useOnTabRenderEffect({
    loadingTeachers,
    opacity,
    scale,
    skeletonOpacity,
    timingConfig,
  });

  return (
    <>
      <Box height={HEADER_CONTAINER_HEIGHT}>
        <MainHeader label="Study" />
        <Box {...titleContainerStyles}>
          <Text {...pageTitleStyles}>My Favorite{"\n"}Proffys</Text>
          <Text {...favoriteProffysStyles}>
            {`${favoriteTeachersEmoji} ${user.favoriteTeachersIds.length} Proffys`}
          </Text>
        </Box>
      </Box>
      <Animated.View style={[skeletonContainerStyle, animatedSkeletonStyle]}>
        <TeacherCardSkeleton />
      </Animated.View>
      {!loadingTeachers && (
        <PanGestureHandler {...{ onGestureEvent }}>
          <Animated.View style={[cardContainerStyles, animatedStyle]}>
            <TeacherCard
              {...{ profile }}
              isFavorite
              favoriteButtonAnimationDriver={dislikeAnimationDriver}
            />
          </Animated.View>
        </PanGestureHandler>
      )}
      <Notification
        shouldRenderNotification={successNotification}
        message="Teacher removed from favorites"
        iconName="check-circle"
        iconColor="title"
        backgroundColor="secondary"
        position={{
          top: theme.spacing.s,
          right: theme.spacing.m,
        }}
      />
    </>
  );
};

export default Favorites;
