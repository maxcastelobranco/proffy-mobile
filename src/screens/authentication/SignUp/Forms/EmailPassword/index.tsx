import React, { useRef } from "react";
import { TextInput } from "react-native";

import PasswordController from "../../../components/PasswordController";
import EmailController from "../../../components/EmailController";
import { BaseControllerProps } from "../../../../../utils/types";

const EmailPassword: React.FC<BaseControllerProps> = ({ control, errors }) => {
  const passwordInputRef = useRef<TextInput>(null);

  return (
    <>
      <EmailController
        {...{ control, errors }}
        onSubmitEditing={() => passwordInputRef.current?.focus()}
        sharpBottom={true}
      />
      <PasswordController {...{ control, errors, passwordInputRef }} />
    </>
  );
};

export default EmailPassword;
