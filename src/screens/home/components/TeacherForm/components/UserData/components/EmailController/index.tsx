import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

import { extraContainerStyles } from "../index";
import Input from "../../../../../../../../components/animated/Input";

interface EmailControllerProps {
  control: Control;
  errors: FieldErrors;
}

const EmailController: React.FC<EmailControllerProps> = ({
  control,
  errors,
}) => {
  return (
    <Controller
      {...{ control }}
      name="email"
      defaultValue="max_castelo_branco@hotmail.com"
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
        />
      )}
    />
  );
};

export default EmailController;
