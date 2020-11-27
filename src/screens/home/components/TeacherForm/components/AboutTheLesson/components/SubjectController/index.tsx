import React from "react";
import { Controller } from "react-hook-form";

import { extraContainerStyles } from "../index";
import Input from "../../../../../../../../components/animated/Input";
import { useAppContext } from "../../../../../../../../context";
import { BaseControllerProps } from "../../../../../../../../utils/types";

const SubjectController: React.FC<BaseControllerProps> = ({
  control,
  errors,
}) => {
  const {
    state: {
      authentication: { user },
    },
  } = useAppContext();

  return (
    <Controller
      {...{ control }}
      name="subject"
      defaultValue={user.subject}
      render={({ value, onBlur, onChange }) => (
        <Input
          privateProps={{
            value,
            onBlur,
            onChange,
            extraContainerStyles,
            error: errors.subject,
            iconName: "book",
            placeholderText: "Subject",
          }}
        />
      )}
    />
  );
};

export default SubjectController;
