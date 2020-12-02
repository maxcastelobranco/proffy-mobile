import React, { useState } from "react";
import Animated, {
  Easing,
  interpolate,
  useDerivedValue,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  Extrapolate,
  useAnimatedGestureHandler,
  runOnJS,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@shopify/restyle";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { snapPoint } from "react-native-redash";

import { Box, Text, Theme } from "../../../../../theme";
import { TabNavigationProps } from "../../../../../routes/tabs";
import MainHeader from "../../../components/MainHeader";
import { useStyles } from "../../styles";
import { ALPHA, DELTA_X, MAX_TRANSLATE, SNAP_POINTS } from "../../shared";
import TeacherCard from "../../components/TeacherCard";
import { useOnTabRenderEffect } from "../../hooks/useOnTabRenderEffect";
import TeacherCardSkeleton from "../../components/TeacherCardSkeleton";
import Notification from "../../../../../components/animated/Notification";
import { useAppContext } from "../../../../../context";
import {
  AuthenticationActionTypes,
  User,
} from "../../../../../context/reducers/authenticationReducer";
import { api } from "../../../../../services/api";
import ShowFilter from "../../components/Filter/ShowFilter";
import FilterSheet from "../../components/Filter/FilterSheet";
import Overlay from "../../components/Overlay";
import { useFilterBoilerplate } from "../../hooks/useFilterBoilerplate";

import { useGetTeachers } from "./hooks/useGetTeachers";

const timingConfig: Animated.WithTimingConfig = {
  duration: 500,
  easing: Easing.bezier(0.65, 0, 0.35, 1),
};

const TeacherList: React.FC<TabNavigationProps<"TeacherList">> = () => {
  const theme = useTheme<Theme>();
  const {
    headerContainerStyles,
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
    loadingTeachers,
    teachersEmoji,
    teachers,
    setTeachers,
  } = useGetTeachers();

  const [index, setIndex] = useState(0);
  const profile = teachers[index];

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const skeletonOpacity = useSharedValue(1);
  const successNotification = useSharedValue(0);
  const likeAnimationDriver = useDerivedValue(() => {
    return interpolate(translationX.value, [0, DELTA_X / 4], [0, 1]);
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

  const addToFavorites = () => {
    const updatedFavoriteTeacherIds = [...user.favoriteTeachersIds, profile.id];
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
  const updateIndex = () => {
    setIndex((index + 1) % teachers.length);
  };
  const removeNotification = () => {
    setTimeout(() => {
      successNotification.value = withSpring(0);
    }, 2000);
  };
  const animateNextCard = () => {
    setTimeout(() => {
      skeletonOpacity.value = withTiming(0, timingConfig, () => {
        opacity.value = withTiming(1, timingConfig);
        scale.value = withSpring(1);
      });
    }, 500);
  };

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent
  >({
    onActive: (event) => {
      translationX.value = event.translationX;
      translationY.value = event.translationY;
    },
    onEnd: (event) => {
      const destiny = snapPoint(
        translationX.value,
        event.velocityX,
        SNAP_POINTS
      );

      if (destiny === 0) {
        translationX.value = withSpring(destiny, {
          velocity: event.velocityX,
        });
      } else if (destiny === MAX_TRANSLATE) {
        runOnJS(updateIndex)();
        runOnJS(addToFavorites)();
        successNotification.value = withSpring(1);
        runOnJS(removeNotification)();
        translationX.value = withTiming(destiny, timingConfig, () => {
          opacity.value = 0;
          scale.value = 0;
          translationX.value = 0;
        });
        skeletonOpacity.value = withTiming(1, timingConfig);
        runOnJS(animateNextCard)();
      } else if (destiny === -MAX_TRANSLATE) {
        runOnJS(updateIndex)();
        translationX.value = withTiming(destiny, timingConfig, () => {
          opacity.value = 0;
          scale.value = 0;
          translationX.value = 0;
          opacity.value = withTiming(1, timingConfig);
          scale.value = withSpring(1);
        });
      }

      translationY.value = withSpring(0);
    },
  });

  const { showFilter, control, errors, filterTeachers } = useFilterBoilerplate({
    scale,
    opacity,
    skeletonOpacity,
    setIndex,
    timingConfig,
    getAllTeachers: () => api.get<User[]>("users"),
    updateTeachers: setTeachers,
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
      <Box {...headerContainerStyles}>
        <MainHeader label="Study" />
        <Box {...titleContainerStyles}>
          <Text {...pageTitleStyles}>Available{"\n"}Proffys</Text>
          <Text {...favoriteProffysStyles}>
            {`${teachersEmoji} ${teachers.length} Proffys`}
          </Text>
        </Box>
        <ShowFilter {...{ showFilter }} />
      </Box>
      <Animated.View style={[skeletonContainerStyle, animatedSkeletonStyle]}>
        <TeacherCardSkeleton />
      </Animated.View>
      {!loadingTeachers && teachers.length > 0 && (
        <PanGestureHandler {...{ onGestureEvent }}>
          <Animated.View style={[animatedStyle, cardContainerStyles]}>
            <TeacherCard
              {...{ profile }}
              isFavorite={false}
              favoriteButtonAnimationDriver={likeAnimationDriver}
            />
          </Animated.View>
        </PanGestureHandler>
      )}
      <Notification
        shouldRenderNotification={successNotification}
        message="Teacher added to favorites"
        iconName="check-circle"
        iconColor="title"
        backgroundColor="secondary"
        position={{
          top: theme.spacing.s,
          right: theme.spacing.m,
        }}
      />
      <FilterSheet
        onPress={filterTeachers}
        {...{ showFilter, control, errors }}
      />
      <Overlay show={showFilter} />
    </>
  );
};

export default TeacherList;
