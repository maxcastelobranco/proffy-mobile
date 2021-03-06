import React from "react";
import { useSharedValue } from "react-native-reanimated";

import Accordion from "../../../Accordion";
import { INPUT_HEIGHT } from "../../../../../../components/animated/Input";
import { TeacherFormProps } from "../../index";

import FirstNameController from "./components/FirstNameController";
import LastNameController from "./components/LastNameController";
import EmailController from "./components/EmailController";
import WhatsappController from "./components/WhatsappController";
import BioController from "./components/BioController";

const controllers = [
  FirstNameController,
  LastNameController,
  EmailController,
  WhatsappController,
  BioController,
];

interface UserDataProps extends TeacherFormProps {
  openByDefault?: boolean;
}

const UserData: React.FC<UserDataProps> = ({
  control,
  errors,
  empty,
  openByDefault,
}) => {
  const height = useSharedValue(0);
  const childrenHeight = INPUT_HEIGHT * (controllers.length + 0.8);

  return (
    <Accordion label="Your data" {...{ height, childrenHeight, openByDefault }}>
      {controllers.map((Controller, index) => (
        <Controller key={index} {...{ control, errors, empty }} />
      ))}
    </Accordion>
  );
};

export default UserData;
