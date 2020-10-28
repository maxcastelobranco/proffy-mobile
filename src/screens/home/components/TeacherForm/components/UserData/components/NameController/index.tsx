import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

import { extraContainerStyles } from "../index";
import Input from "../../../../../../../../components/animated/Input";
import { useAppContext } from "../../../../../../../../context";

interface NameControllerProps {
  control: Control;
  errors: FieldErrors;
}

const NameController: React.FC<NameControllerProps> = ({ control, errors }) => {
  const {
    state: {
      authentication: { user },
    },
  } = useAppContext();

  return (
    <Controller
      {...{ control }}
      name="name"
      defaultValue={user.firstName}
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
