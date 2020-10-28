import React from "react";
import { Control, Controller } from "react-hook-form";

import Select from "../../../../../../../../components/animated/Select";

import { weekdays } from "./weekdays";

interface WeekdayControllerProps {
  control: Control;
}

const WeekdayController: React.FC<WeekdayControllerProps> = ({ control }) => {
  return (
    <Controller
      {...{ control }}
      name="weekday"
      defaultValue={weekdays[0]}
      render={({ onChange }) => (
        <Select options={weekdays} label="Weekday" {...{ onChange }} />
      )}
    />
  );
};

export default WeekdayController;
