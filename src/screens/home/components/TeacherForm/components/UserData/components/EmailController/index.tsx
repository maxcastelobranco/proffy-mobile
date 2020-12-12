import React from "react";
import { Controller } from "react-hook-form";

import { extraContainerStyles } from "../index";
import Input from "../../../../../../../../components/animated/Input";
import { useAppContext } from "../../../../../../../../context";
import { TeacherFormProps } from "../../../../index";

const EmailController: React.FC<TeacherFormProps> = ({
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
      name="email"
      defaultValue={empty ? "" : user.email}
      render={({ value, onBlur, onChange }) => (
        <Input
          privateProps={{
            value,
            onBlur,
            onChange,
            extraContainerStyles,
            error: errors.email,
            iconName: "mail",
            placeholderText: "Email",
          }}
          inputProps={{
            autoCorrect: false,
            autoCapitalize: "none",
            keyboardType: "email-address",
            returnKeyType: "next",
          }}
        />
      )}
    />
  );
};

export default EmailController;
