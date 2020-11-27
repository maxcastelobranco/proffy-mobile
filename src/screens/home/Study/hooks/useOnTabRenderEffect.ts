import React, { useEffect } from "react";
import Animated, { withSpring, withTiming } from "react-native-reanimated";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";

import { ActiveIllustrationActionTypes } from "../../../../context/reducers/activeIllustrationReducer";
import { useAppContext } from "../../../../context";

interface OnTabRenderParams {
  loadingTeachers: boolean;
  skeletonOpacity: Animated.SharedValue<number>;
  scale: Animated.SharedValue<number>;
  opacity: Animated.SharedValue<number>;
  timingConfig: Animated.WithTimingConfig;
}

export const useOnTabRenderEffect = ({
  loadingTeachers,
  skeletonOpacity,
  scale,
  opacity,
  timingConfig,
}: OnTabRenderParams) => {
  const { dispatch } = useAppContext();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch({
      type: ActiveIllustrationActionTypes.Update,
      payload: {
        name: "empty",
      },
    });
  }, [dispatch]);
  useEffect(() => {
    if (!loadingTeachers) {
      skeletonOpacity.value = withTiming(0, timingConfig, () => {
        scale.value = withSpring(1);
        opacity.value = withTiming(1, timingConfig);
      });
    }
  }, [loadingTeachers, opacity, scale, skeletonOpacity, timingConfig]);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        dispatch({
          type: ActiveIllustrationActionTypes.Update,
          payload: {
            name: "homeIllustration",
          },
        });
        navigation.navigate("Landing");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [dispatch, navigation])
  );
};
