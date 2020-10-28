import React from "react";
import { BoxProps } from "@shopify/restyle";
import { Control } from "react-hook-form";

import WeekdayController from "../WeekdayController";
import { Box, Theme } from "../../../../../../../../theme";

interface ScheduleProps {
  control: Control;
  id: string;
}

const Schedule: React.FC<ScheduleProps> = ({ control, id }) => {
  // const hourControllerContainerStyles: BoxProps<Theme> = {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  // };

  return (
    <Box>
      <WeekdayController {...{ control }} />
      {/*<Box {...hourControllerContainerStyles}>*/}
      {/*  <HourController label={`From:${id}`} {...{ control }} />*/}
      {/*  <HourController label={`To:${id}`} {...{ control }} />*/}
      {/*</Box>*/}
    </Box>
  );
};

export default Schedule;
