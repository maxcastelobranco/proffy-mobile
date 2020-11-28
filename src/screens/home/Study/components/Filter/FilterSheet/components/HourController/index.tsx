import React from "react";
import { Controller } from "react-hook-form";

import { BaseControllerProps } from "../../../../../../../../utils/types";
import Select from "../../../../../../../../components/animated/Select";

const options: string[] = [];
for (let i = 8; i <= 18; i++) {
  options.push(i.toString());
}

const HourController: React.FC<BaseControllerProps> = ({ control }) => {
  return (
    <Controller
      name="hour"
      defaultValue=""
      render={({ onChange }) => (
        <Select label="Hour" {...{ onChange, options }} />
      )}
      {...{ control }}
    />
  );
};

export default HourController;
