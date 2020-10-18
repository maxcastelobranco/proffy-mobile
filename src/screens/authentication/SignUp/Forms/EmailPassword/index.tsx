import React, { useRef } from "react";
import { TextInput } from "react-native";

import { SlideFormProps } from "../../index";
import PasswordController from "../../../components/PasswordController";
import EmailController from "../../../components/EmailController";

const EmailPassword: React.FC<SlideFormProps> = ({ control, errors }) => {
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
