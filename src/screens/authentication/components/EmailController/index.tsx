import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

import Input from "../../../../components/animated/Input";

interface EmailControllerProps {
  control: Control;
  errors: FieldErrors;
  onSubmitEditing?: () => void;
  sharpBottom?: boolean;
}

const EmailController: React.FC<EmailControllerProps> = ({
  control,
  errors,
  onSubmitEditing,
  sharpBottom = false,
}) => {
  return (
    <Controller
      {...{ control }}
      render={({ value, onBlur, onChange }) => (
        <Input
          privateProps={{
            ...{ value, onBlur, onChange },
            error: errors.email,
            iconName: "mail",
            placeholderText: "Email",
            extraContainerStyles: {
              borderTopRightRadius: "default",
              borderTopLeftRadius: "default",
              borderBottomRightRadius: sharpBottom ? 0 : "default",
              borderBottomLeftRadius: sharpBottom ? 0 : "default",
            },
          }}
          inputProps={{
            onSubmitEditing,
            autoCorrect: false,
            autoCapitalize: "none",
            keyboardType: "email-address",
            returnKeyType: "next",
          }}
        />
      )}
      name="email"
      defaultValue=""
      rules={{
        required: "Email is required",
        pattern: {
          message: "Invalid email",
          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        },
      }}
    />
  );
};

export default EmailController;
