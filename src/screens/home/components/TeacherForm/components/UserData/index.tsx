import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { useTheme } from "@shopify/restyle";
import { useSharedValue } from "react-native-reanimated";

import Accordion from "../../../Accordion";
import { INPUT_HEIGHT } from "../../../../../../components/animated/Input";
import { Theme } from "../../../../../../theme";

import FirstNameController from "./components/FirstNameController";
import LastNameController from "./components/LastNameController";
import EmailController from "./components/EmailController";
import WhatsappController from "./components/WhatsappController";
import BioController from "./components/BioController";

interface UserDataProps {
  control: Control;
  errors: FieldErrors;
}

const controllers = [
  FirstNameController,
  LastNameController,
  EmailController,
  WhatsappController,
  BioController,
];

const UserData: React.FC<UserDataProps> = ({ control, errors }) => {
  const height = useSharedValue(0);
  const childrenHeight = INPUT_HEIGHT * (controllers.length + 0.8);

  return (
    <Accordion label="Your data" {...{ height, childrenHeight }}>
      {controllers.map((Controller, index) => (
        <Controller key={index} {...{ control, errors }} />
      ))}
    </Accordion>
  );
};

export default UserData;
