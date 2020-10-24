import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

import { extraContainerStyles } from "../index";
import Input from "../../../../../../../../components/animated/Input";

interface LastNameControllerProps {
  control: Control;
  errors: FieldErrors;
}

const LastNameController: React.FC<LastNameControllerProps> = ({
  control,
  errors,
}) => {
  return (
    <Controller
      {...{ control }}
      name="lastName"
      defaultValue="Branco"
      render={({ value, onBlur, onChange }) => (
        <Input
          privateProps={{
            value,
            onBlur,
            onChange,
            extraContainerStyles,
            error: errors.lastName,
            iconName: "user",
            placeholderText: "Last name",
          }}
        />
      )}
    />
  );
};

export default LastNameController;
