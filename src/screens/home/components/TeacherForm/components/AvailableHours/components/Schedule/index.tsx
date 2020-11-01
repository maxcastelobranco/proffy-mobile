import React from "react";
import { BoxProps } from "@shopify/restyle";
import { Control } from "react-hook-form";

import WeekdayController from "../WeekdayController";
import { Box, Theme } from "../../../../../../../../theme";
import HourController from "../HourController";
import { Weekday } from "../WeekdayController/weekdays";

interface ScheduleProps {
  control: Control;
  id: string;
  weekday: Weekday;
  from: number;
  to: number;
}

const Schedule: React.FC<ScheduleProps> = ({
  control,
  id,
  weekday,
  from,
  to,
}) => {
  const hourControllerContainerStyles: BoxProps<Theme> = {
    flexDirection: "row",
    justifyContent: "space-between",
  };

  return (
    <Box>
      <Box {...hourControllerContainerStyles}>
        <HourController
          label={`From:${id}`}
          defaultValue={from}
          {...{ control }}
        />
        <HourController label={`To:${id}`} defaultValue={to} {...{ control }} />
      </Box>
      <WeekdayController defaultValue={weekday} {...{ control, id }} />
    </Box>
  );
};

export default Schedule;
