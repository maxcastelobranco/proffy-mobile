import React from "react";
import { Controller } from "react-hook-form";

import { extraContainerStyles } from "../index";
import Input from "../../../../../../../../components/animated/Input";
import { useAppContext } from "../../../../../../../../context";
import { TeacherFormProps } from "../../../../index";

const WhatsappController: React.FC<TeacherFormProps> = ({
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
      name="whatsapp"
      defaultValue={empty ? "" : user.whatsapp}
      render={({ value, onBlur, onChange }) => (
        <Input
          privateProps={{
            value,
            onBlur,
            onChange,
            extraContainerStyles,
            error: errors.whatsapp,
            iconName: "phone-call",
            placeholderText: "Whatsapp",
          }}
        />
      )}
    />
  );
};

export default WhatsappController;
