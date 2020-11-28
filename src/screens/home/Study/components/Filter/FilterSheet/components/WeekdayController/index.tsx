import React from "react";
import { Controller } from "react-hook-form";

import { BaseControllerProps } from "../../../../../../../../utils/types";
import Select from "../../../../../../../../components/animated/Select";
import { WEEKDAYS } from "../../../../../../components/TeacherForm/components/AvailableHours/components/WeekdayController/weekdays";

const WeekdayController: React.FC<BaseControllerProps> = ({ control }) => {
  return (
    <Controller
      name="weekday"
      defaultValue=""
      render={({ onChange }) => (
        <Select label="weekday" options={WEEKDAYS} {...{ onChange }} />
      )}
      {...{ control }}
    />
  );
};

export default WeekdayController;
