import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { useTheme } from "@shopify/restyle";

import MainHeader from "../components/MainHeader";
import { Box, Text, Theme } from "../../../theme";
import TeacherForm from "../components/TeacherForm";
import { useAppContext } from "../../../context";
import { ActiveIllustrationActionTypes } from "../../../context/reducers/activeIllustrationReducer";
import AnimatedBackgroundButton from "../../../components/animated/AnimatedBackgroundButton";
import { Weekday } from "../components/TeacherForm/components/AvailableHours/components/WeekdayController/weekdays";
import {
  AuthenticationActionTypes,
  TeacherSchedule,
} from "../../../context/reducers/authenticationReducer";

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
  const { dispatch } = useAppContext();
  const navigation = useNavigation();
  const { control, errors, handleSubmit } = useForm();
  const {
    teacherRegistrationContainerStyles,
    pageDescriptionContainerStyles,
    pageTitleStyles,
    pageDescriptionStyles,
  } = useStyles();

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

  const onSubmit: SubmitHandler<TeachFormValues> = (data) => {
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
    dispatch({
      type: ActiveIllustrationActionTypes.Update,
      payload: {
        name: "teacherSignUpIllustration",
      },
    });

    navigation.navigate("TeacherRegistrationSuccessful");
  };

  return (
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
          label="Save registration"
          onPress={handleSubmit(onSubmit)}
        />
      </Box>
    </Box>
  );
};

export default Teach;
