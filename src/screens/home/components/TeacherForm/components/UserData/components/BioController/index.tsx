import React from "react";
import { Controller } from "react-hook-form";

import { extraContainerStyles } from "../index";
import Input from "../../../../../../../../components/animated/Input";
import { useAppContext } from "../../../../../../../../context";
import { BaseControllerProps } from "../../../../../../../../utils/types";

const BioController: React.FC<BaseControllerProps> = ({ control, errors }) => {
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
