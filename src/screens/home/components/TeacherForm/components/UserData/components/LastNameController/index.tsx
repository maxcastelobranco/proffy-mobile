import React from "react";
import { Controller } from "react-hook-form";

import { extraContainerStyles } from "../index";
import Input from "../../../../../../../../components/animated/Input";
import { useAppContext } from "../../../../../../../../context";
import { BaseControllerProps } from "../../../../../../../../utils/types";

const LastNameController: React.FC<BaseControllerProps> = ({
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
      name="lastName"
      defaultValue={user.lastName}
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
