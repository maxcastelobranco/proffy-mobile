import React from "react";
import { Controller } from "react-hook-form";

import { extraContainerStyles } from "../index";
import Input from "../../../../../../../../components/animated/Input";
import { useAppContext } from "../../../../../../../../context";
import { TeacherFormProps } from "../../../../index";

const FirstNameController: React.FC<TeacherFormProps> = ({
  control,
  errors,
  empty,
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
      defaultValue={empty ? "" : user.firstName}
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
