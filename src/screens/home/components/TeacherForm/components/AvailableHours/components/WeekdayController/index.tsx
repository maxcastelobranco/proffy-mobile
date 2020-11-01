import React from "react";
import { Control, Controller } from "react-hook-form";

import Select from "../../../../../../../../components/animated/Select";

import { Weekday, weekdays } from "./weekdays";

interface WeekdayControllerProps {
  control: Control;
  id: string;
  defaultValue: Weekday;
}

const WeekdayController: React.FC<WeekdayControllerProps> = ({
  control,
  id,
  defaultValue,
}) => {
  return (
    <Controller
      {...{ control, defaultValue }}
      name={`weekday:${id}`}
      render={({ onChange }) => (
        <Select
          options={weekdays}
          label="Weekday"
          {...{ onChange, defaultValue }}
        />
      )}
    />
  );
};

export default WeekdayController;
