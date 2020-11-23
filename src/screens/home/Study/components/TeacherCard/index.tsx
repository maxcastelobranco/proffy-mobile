import React from "react";
import Animated from "react-native-reanimated";

import { Box, Text } from "../../../../../theme";
import { User } from "../../../../../context/reducers/authenticationReducer";
import { Weekday } from "../../../components/TeacherForm/components/AvailableHours/components/WeekdayController/weekdays";

import { useStyles } from "./styles";
import ScheduleDisplay from "./components/ScheduleDisplay";
import CardFooter from "./components/CardFooter";
import CardHeader from "./components/CardHeader";

interface TeacherCardProps {
  profile: User;
  isFavorite: boolean;
  favoriteButtonOpacity: Animated.SharedValue<number>;
}

const WEEKDAYS: Weekday[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

const TeacherCard: React.FC<TeacherCardProps> = ({
  profile,
  isFavorite,
  favoriteButtonOpacity,
}) => {
  const { containerStyles, boxShadowStyle, bioStyles } = useStyles();

  const availableDays = profile.schedule.map(({ weekday }) => weekday);

  return (
    <Box {...containerStyles} style={boxShadowStyle}>
      <CardHeader
        avatarUrl={profile.avatarUrl}
        firstName={profile.firstName}
        subject={profile.subject}
      />
      <Text {...bioStyles}>{profile.bio}</Text>
      {WEEKDAYS.map((weekday) => {
        const available = availableDays.includes(weekday);
        const currentSchedule = profile.schedule.find(
          (schedule) => schedule.weekday === weekday
        );
        const from = available ? currentSchedule?.from : undefined;
        const to = available ? currentSchedule?.to : undefined;

        return (
          <ScheduleDisplay
            key={weekday}
            {...{ available, weekday, from, to }}
          />
        );
      })}
      <CardFooter
        perHourCost={profile.perHourCost}
        {...{ isFavorite, favoriteButtonOpacity }}
      />
    </Box>
  );
};

export default TeacherCard;
