import React from "react";
import { TextInput } from "react-native";
import { Controller } from "react-hook-form";

import Input from "../../../../components/animated/Input";
import { BaseControllerProps } from "../../../../utils/types";

interface PasswordControllerProps extends BaseControllerProps {
  passwordInputRef: React.RefObject<TextInput>;
}

const PasswordController: React.FC<PasswordControllerProps> = ({
  control,
  errors,
  passwordInputRef,
}) => {
  return (
    <Controller
      {...{ control }}
      render={({ value, onBlur, onChange }) => (
        <Input
          ref={passwordInputRef}
          privateProps={{
            ...{ value, onBlur, onChange },
            error: errors.password,
            iconName: "lock",
            placeholderText: "Password",
            extraContainerStyles: {
              borderTopWidth: 0,
              borderBottomRightRadius: "default",
              borderBottomLeftRadius: "default",
            },
          }}
          inputProps={{
            returnKeyType: "send",
            secureTextEntry: true,
            autoCapitalize: "none",
            autoCorrect: false,
          }}
        />
      )}
      name="password"
      defaultValue=""
      rules={{
        required: "Password is required",
        minLength: {
          message: "Minimum of 6 characters",
          value: 6,
        },
      }}
    />
  );
};

export default PasswordController;
