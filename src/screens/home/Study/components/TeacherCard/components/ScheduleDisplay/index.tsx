import React from "react";

import LongArrow from "../../../../../../../components/svgs/static/LongArrow";
import { Weekday } from "../../../../../components/TeacherForm/components/AvailableHours/components/WeekdayController/weekdays";
import { Box, Text } from "../../../../../../../theme";

import { useStyles } from "./styles";

interface ScheduleDisplayProps {
  available: boolean;
  weekday: Weekday;
  from?: number;
  to?: number;
}

const ScheduleDisplay: React.FC<ScheduleDisplayProps> = ({
  available,
  weekday,
  from,
  to,
}) => {
  const { containerStyles, textStyles } = useStyles();

  return (
    <Box
      {...containerStyles}
      opacity={available ? 1 : 0.4}
      pointerEvents="none"
    >
      <Text {...textStyles}>{weekday}</Text>
      <LongArrow />
      {from && to ? (
        <>
          <Text {...textStyles}>
            {from}h - {to}h
          </Text>
        </>
      ) : (
        <Text>X</Text>
      )}
    </Box>
  );
};

export default ScheduleDisplay;
