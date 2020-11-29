import React from "react";
import { Controller } from "react-hook-form";

import { extraContainerStyles } from "../index";
import Input from "../../../../../../../../components/animated/Input";
import { useAppContext } from "../../../../../../../../context";
import { TeacherFormProps } from "../../../../index";

const BioController: React.FC<TeacherFormProps> = ({
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
      name="bio"
      defaultValue={empty ? "" : user.bio}
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
