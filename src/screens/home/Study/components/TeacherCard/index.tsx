import React from "react";
import { Image } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";

import { Box, Text, Theme } from "../../../../../theme";
import { User } from "../../../../../context/reducers/authenticationReducer";
import { Weekday } from "../../../components/TeacherForm/components/AvailableHours/components/WeekdayController/weekdays";
import responsivePixelSize from "../../../../../utils/responsivePixelSize";

import { useStyles } from "./styles";
import ScheduleDisplay from "./components/ScheduleDisplay";

interface TeacherCardProps {
  profile: User;
}

const WEEKDAYS: Weekday[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];
const ICON_SIZE = responsivePixelSize(24);

const TeacherCard: React.FC<TeacherCardProps> = ({ profile }) => {
  const theme = useTheme<Theme>();
  const {
    containerStyles,
    boxShadowStyle,
    headerStyles,
    rowStyles,
    titleContainerStyles,
    nameStyles,
    subjectStyles,
    bioStyles,
    myHourStyles,
    moneyStyles,
    buttonStyles,
    heartContainerStyles,
    heartBrokenContainerStyles,
    getInTouchStyles,
    avatarStyles,
  } = useStyles();

  const availableDays = profile.schedule.map(({ weekday }) => weekday);

  return (
    <Box {...containerStyles} style={boxShadowStyle}>
      <Box {...headerStyles}>
        <Image
          source={{
            uri: profile.avatarUrl,
          }}
          style={avatarStyles}
        />
        <Box {...titleContainerStyles}>
          <Text {...nameStyles}>{profile.firstName}</Text>
          <Text {...subjectStyles}>{profile.subject}</Text>
        </Box>
      </Box>
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
      <Box {...rowStyles} marginHorizontal="s">
        <Text {...myHourStyles}>My hour:</Text>
        <Text {...moneyStyles}>${profile.perHourCost}</Text>
      </Box>
      <Box {...rowStyles}>
        <RectButton style={heartContainerStyles}>
          <FontAwesome5
            name="heart"
            size={ICON_SIZE}
            color={theme.colors.title}
          />
        </RectButton>
        <RectButton onPress={() => true} style={buttonStyles}>
          <FontAwesome5
            name="whatsapp"
            size={ICON_SIZE}
            color={theme.colors.title}
          />
          <Text {...getInTouchStyles}>Get in touch</Text>
        </RectButton>
        <RectButton style={heartBrokenContainerStyles} onPress={() => true}>
          <FontAwesome5
            name="heart-broken"
            size={ICON_SIZE}
            color={theme.colors.title}
          />
        </RectButton>
      </Box>
    </Box>
  );
};

export default TeacherCard;
