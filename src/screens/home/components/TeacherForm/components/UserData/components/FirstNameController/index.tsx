import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

import { extraContainerStyles } from "../index";
import Input from "../../../../../../../../components/animated/Input";
import { useAppContext } from "../../../../../../../../context";

interface FirstNameControllerProps {
  control: Control;
  errors: FieldErrors;
}

const FirstNameController: React.FC<FirstNameControllerProps> = ({
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
      name="firstName"
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

export default FirstNameController;
