import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

import { extraContainerStyles } from "../index";
import Input from "../../../../../../../../components/animated/Input";

interface WhatsappControllerProps {
  control: Control;
  errors: FieldErrors;
}

const WhatsappController: React.FC<WhatsappControllerProps> = ({
  control,
  errors,
}) => {
  return (
    <Controller
      {...{ control }}
      name="whatsapp"
      defaultValue="(22) 99994-6599"
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
