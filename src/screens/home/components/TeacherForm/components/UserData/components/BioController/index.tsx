import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

import { extraContainerStyles } from "../index";
import Input from "../../../../../../../../components/animated/Input";
import { useAppContext } from "../../../../../../../../context";

interface BioControllerProps {
  control: Control;
  errors: FieldErrors;
}

const BioController: React.FC<BioControllerProps> = ({ control, errors }) => {
  const {
    state: {
      authentication: { user },
    },
  } = useAppContext();

  return (
    <Controller
      {...{ control }}
      name="bio"
      defaultValue={user.bio}
      render={({ value, onBlur, onChange }) => (
        <Input
          privateProps={{
            value,
            onBlur,
            onChange,
            extraContainerStyles,
            error: errors.bio,
            iconName: "file-text",
            placeholderText: "Biography",
          }}
        />
      )}
    />
  );
};

export default BioController;
