import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

import { extraContainerStyles } from "../index";
import Input from "../../../../../../../../components/animated/Input";

interface BioControllerProps {
  control: Control;
  errors: FieldErrors;
}

const BioController: React.FC<BioControllerProps> = ({ control, errors }) => {
  return (
    <Controller
      {...{ control }}
      name="bio"
      defaultValue="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid at atque beatae commodi corporis delectus dignissimos, ducimus eaque eius error et eum ex excepturi exercitationem explicabo odio pariatur perspiciatis placeat quaerat, quam qui ratione rem repellendus reprehenderit, sed soluta voluptatum? Ad aliquam dolore dolores ea eius excepturi, exercitationem fugiat ipsum laboriosam magni praesentium quia saepe, ut. Aperiam asperiores consequatur culpa, dolore doloribus dolorum, ducimus eaque eius eligendi enim, illum impedit in magnam maxime minima nulla obcaecati provident quam quasi rem reprehenderit repudiandae suscipit vel veniam vitae voluptas voluptatem voluptatum? Ab atque iure nostrum. Alias esse magni sint veritatis voluptates."
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
