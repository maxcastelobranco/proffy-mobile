import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

import { extraContainerStyles } from "../index";
import Input from "../../../../../../../../components/animated/Input";
import { useAppContext } from "../../../../../../../../context";

interface PerHourControllerProps {
  control: Control;
  errors: FieldErrors;
}

const PerHourController: React.FC<PerHourControllerProps> = ({
  control,
  errors,
}) => {
  const {
    state: {
      authentication: { user },
    },
  } = useAppContext();

  return (
    <Controller
      {...{ control }}
      name="perHour"
      defaultValue={`$${user.perHourCost}`}
      render={({ value, onBlur, onChange }) => (
        <Input
          privateProps={{
            value,
            onBlur,
            onChange,
            extraContainerStyles,
            error: errors.perHour,
            iconName: "dollar-sign",
            placeholderText: "Per hour",
          }}
        />
      )}
    />
  );
};

export default PerHourController;
