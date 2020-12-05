import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { useTheme } from "@shopify/restyle";

import MainHeader from "../components/MainHeader";
import { Box, Text, Theme } from "../../../theme";
import { useAppContext } from "../../../context";
import { ActiveIllustrationActionTypes } from "../../../context/reducers/activeIllustrationReducer";
import { Weekday } from "../components/TeacherForm/components/AvailableHours/components/WeekdayController/weekdays";
import {
  AuthenticationActionTypes,
  TeacherSchedule,
} from "../../../context/reducers/authenticationReducer";
import TeacherForm from "../components/TeacherForm";
import AnimatedBackgroundButton from "../../../components/animated/AnimatedBackgroundButton";
import TeacherAlready from "../TeacherAlready";
import { api } from "../../../services/api";

import { useStyles } from "./styles";

export type TeachFormValues = {
  bio: string;
  email: string;
  firstName: string;
  lastName: string;
  perHour: string;
  subject: string;
  whatsapp: string;
  [key: string]: Date | Weekday | string;
};

const Teach: React.FC = () => {
  const theme = useTheme<Theme>();
  const {
    state: {
      authentication: { user },
    },
    dispatch,
  } = useAppContext();
  const navigation = useNavigation();
  const { control, errors, handleSubmit, formState } = useForm();
  const {
    containerStyles,
    teacherRegistrationContainerStyles,
    pageDescriptionContainerStyles,
    pageTitleStyles,
    pageDescriptionStyles,
  } = useStyles();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

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

  const enabled = Object.keys(formState.touched).length > 0;

  const onSubmit: SubmitHandler<TeachFormValues> = async (data) => {
    setLoadingSubmit(true);

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

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      bio: data.bio,
      subject: data.subject,
      whatsapp: data.whatsapp,
      perHourCost: Number(data.perHour.replace("$", "")),
      schedule,
    };

    await api.patch(`users/${user.id}`, payload);

    dispatch({
      type: AuthenticationActionTypes.UpdateUser,
      payload,
    });
    dispatch({
      type: ActiveIllustrationActionTypes.Update,
      payload: {
        name: "teacherSignUpIllustration",
      },
    });

    navigation.navigate("TeacherRegistrationSuccessful");
    setLoadingSubmit(false);
  };

  return (
    <Box {...containerStyles}>
      {user.isTeacher ? (
        <TeacherAlready />
      ) : (
        <Box flex={1}>
          <MainHeader label="Teach" />
          <Box {...pageDescriptionContainerStyles}>
            <Text {...pageTitleStyles}>
              It's awesome that you wanna{"\n"}be a Proffy.
            </Text>
            <Text {...pageDescriptionStyles}>
              First step is to fill out this form.
            </Text>
          </Box>
          <Box {...teacherRegistrationContainerStyles}>
            <TeacherForm empty {...{ control, errors }} />
            <AnimatedBackgroundButton
              extraStyles={{
                marginHorizontal: theme.spacing.xl,
                marginVertical: theme.spacing.m,
              }}
              {...{ enabled }}
              label="Save registration"
              loading={loadingSubmit}
              enabledBackgroundColor={theme.colors.secondary}
              disabledBackgroundColor={theme.colors.background5}
              enabledLabelColor={theme.colors.title}
              disabledLabelColor={theme.colors.complementTextDark}
              onPress={handleSubmit(onSubmit)}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Teach;
