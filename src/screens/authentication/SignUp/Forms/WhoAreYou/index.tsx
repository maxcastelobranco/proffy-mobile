import React, { useRef } from "react";
import { Controller } from "react-hook-form";
import { TextInput } from "react-native";

import Input from "../../../../../components/animated/Input";
import { BaseControllerProps } from "../../../../../utils/types";

const WhoAreYou: React.FC<BaseControllerProps> = ({ control, errors }) => {
  const lastNameInputRef = useRef<TextInput>(null);

  return (
    <>
      <Controller
        {...{ control }}
        name="name"
        defaultValue=""
        rules={{ required: "Name is required" }}
        render={({ value, onBlur, onChange }) => (
          <Input
            privateProps={{
              ...{ value, onBlur, onChange },
              error: errors.name,
              iconName: "user",
              placeholderText: "Name",
              extraContainerStyles: {
                borderTopLeftRadius: "default",
                borderTopRightRadius: "default",
              },
            }}
            inputProps={{
              returnKeyType: "next",
              onSubmitEditing: () => lastNameInputRef.current?.focus(),
            }}
          />
        )}
      />
      <Controller
        {...{ control }}
        name="lastName"
        defaultValue=""
        rules={{ required: "Last name is required" }}
        render={({ value, onBlur, onChange }) => (
          <Input
            ref={lastNameInputRef}
            privateProps={{
              ...{ value, onBlur, onChange },
              error: errors.lastName,
              iconName: "user",
              placeholderText: "Last name",
              extraContainerStyles: {
                borderTopWidth: 0,
                borderBottomLeftRadius: "default",
                borderBottomRightRadius: "default",
              },
            }}
            inputProps={{
              returnKeyType: "send",
            }}
          />
        )}
      />
    </>
  );
};

export default WhoAreYou;
