import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

import { extraContainerStyles } from "../index";
import Input from "../../../../../../../../components/animated/Input";

interface NameControllerProps {
  control: Control;
  errors: FieldErrors;
}

const NameController: React.FC<NameControllerProps> = ({ control, errors }) => {
  return (
    <Controller
      {...{ control }}
      name="name"
      defaultValue="Max"
      render={({ value, onBlur, onChange }) => (
        <Input
          privateProps={{
            value,
            onBlur,
            onChange,
            extraContainerStyles,
            error: errors.name,
            iconName: "user",
            placeholderText: "Name",
          }}
        />
      )}
    />
  );
};

export default NameController;
