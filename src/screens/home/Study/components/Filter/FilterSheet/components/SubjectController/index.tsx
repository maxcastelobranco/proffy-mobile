import React from "react";
import { Controller } from "react-hook-form";

import { BaseControllerProps } from "../../../../../../../../utils/types";
import Input from "../../../../../../../../components/animated/Input";

const SubjectController: React.FC<BaseControllerProps> = ({ control }) => {
  return (
    <Controller
      name="subject"
      defaultValue=""
      render={({ onChange, value, onBlur }) => (
        <Input
          privateProps={{
            iconName: "book",
            value,
            onBlur,
            onChange,
            placeholderText: "Subject",
            extraContainerStyles: {
              borderRadius: "default",
            },
          }}
        />
      )}
      {...{ control }}
    />
  );
};

export default SubjectController;
