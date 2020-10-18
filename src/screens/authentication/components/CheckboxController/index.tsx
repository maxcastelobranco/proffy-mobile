import React from "react";
import { Control, Controller } from "react-hook-form";

import { FormValues } from "../Form";
import CheckBox from "../../../../../components/animated/Checkbox";

interface CheckBoxControllerProps {
  control: Control<FormValues>;
  toggleCheckBox: (value: boolean) => void;
}

const CheckBoxController: React.FC<CheckBoxControllerProps> = ({
  control,
  toggleCheckBox,
}) => {
  return (
    <Controller
      name="remember"
      defaultValue={false}
      {...{ control }}
      render={({ value }) => (
        <CheckBox {...{ value }} onChange={() => toggleCheckBox(value)} />
      )}
    />
  );
};

export default CheckBoxController;
