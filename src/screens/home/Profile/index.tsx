import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { mix } from "react-native-redash";
import { useTheme } from "@shopify/restyle";

import MainHeader from "../components/MainHeader";
import { Box, Theme } from "../../../theme";
import TeacherForm from "../components/TeacherForm";
import { useAppContext } from "../../../context";
import { ActiveIllustrationActionTypes } from "../../../context/reducers/activeIllustrationReducer";
import AnimatedBackgroundButton from "../../../components/animated/AnimatedBackgroundButton";
import { Weekday } from "../components/TeacherForm/components/AvailableHours/components/WeekdayController/weekdays";
import {
  AuthenticationActionTypes,
  TeacherSchedule,
} from "../../../context/reducers/authenticationReducer";
import Loading from "../../../components/static/Loading";

import Avatar from "./components/Avatar";
import { useStyles } from "./styles";
import { useParticles } from "./hooks/useParticles";

export type ProfileFormValues = {
  bio: string;
  email: string;
  firstName: string;
  lastName: string;
  perHour: string;
  subject: string;
  whatsapp: string;
  [key: string]: Date | Weekday | string;
};

const Profile: React.FC = () => {
  const theme = useTheme<Theme>();
  const { state, dispatch } = useAppContext();
  const { control, errors, handleSubmit } = useForm();
  const { teacherFormContainerStyles } = useStyles();
  const particles = useParticles();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        dispatch({
          type: ActiveIllustrationActionTypes.Update,
          payload: {
            name: "homeIllustration",
          },
        });
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [dispatch])
  );
  useEffect(() => {
    dispatch({
      type: ActiveIllustrationActionTypes.Update,
      payload: {
        name: "profileIllustration",
      },
    });
  }, [dispatch]);

  const isFullScreen = useSharedValue(0);
  const animatedFormContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: mix(isFullScreen.value, 1, 0),
      transform: [
        { scale: mix(isFullScreen.value, 1, 0) },
        { translateY: mix(isFullScreen.value, 0, 500) },
      ],
    };
  });
  const animatedParticlesContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: mix(isFullScreen.value, 1, 0),
    };
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    const scheduleIds = Array.from(
      new Set(
        Object.entries(data)
          .filter(
            (value) =>
              value[0].startsWith("from") ||
              value[0].startsWith("to") ||
              value[0].startsWith("weekday")
          )
          .map((value) => value[0].split(":")[1])
      )
    );

    const schedule: TeacherSchedule[] = [];

    scheduleIds.forEach((id) => {
      const weekdayKey = `weekday:${id}`;
      const fromKey = `from:${id}`;
      const toKey = `to:${id}`;

      const weekday = data[weekdayKey] as Weekday;
      const from = data[fromKey] as Date;
      const to = data[toKey] as Date;

      schedule.push({
        weekday,
        from: from.getHours(),
        to: to.getHours(),
      });
    });

    dispatch({
      type: AuthenticationActionTypes.UpdateUser,
      payload: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        bio: data.bio,
        subject: data.subject,
        whatsapp: data.whatsapp,
        perHourCost: Number(data.perHour.replace("$", "")),
        schedule,
      },
    });
  };

  return (
    <Box flex={1}>
      <MainHeader label="My profile" />
      <Avatar {...{ isFullScreen }} />
      {state.activeIllustration.name === "profileIllustration" ? (
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, animatedParticlesContainerStyle]}
        >
          {particles.map((Particle) => Particle)}
        </Animated.View>
      ) : (
        <Loading />
      )}
      <Animated.View
        style={[teacherFormContainerStyles, animatedFormContainerStyle]}
      >
        <TeacherForm {...{ control, errors }} />
        <AnimatedBackgroundButton
          extraStyles={{
            marginHorizontal: theme.spacing.xl,
            marginVertical: theme.spacing.m,
          }}
          enabled={true}
          enabledBackgroundColor={theme.colors.secondary}
          disabledBackgroundColor={theme.colors.background5}
          enabledLabelColor={theme.colors.title}
          disabledLabelColor={theme.colors.complementTextDark}
          label="Save changes"
          onPress={handleSubmit(onSubmit)}
        />
      </Animated.View>
    </Box>
  );
};

export default Profile;
