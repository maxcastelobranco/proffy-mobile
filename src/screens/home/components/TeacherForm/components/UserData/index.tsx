import React from "react";
import { Control, FieldErrors } from "react-hook-form";

import Accordion from "../../../Accordion";

import NameController from "./components/NameController";
import LastNameController from "./components/LastNameController";
import EmailController from "./components/EmailController";
import WhatsappController from "./components/WhatsappController";
import BioController from "./components/BioController";

interface UserDataProps {
  control: Control;
  errors: FieldErrors;
}

const controllers = [
  NameController,
  LastNameController,
  EmailController,
  WhatsappController,
  BioController,
];

const UserData: React.FC<UserDataProps> = ({ control, errors }) => {
  return (
    <Accordion label="Your data">
      {controllers.map((Controller, index) => (
        <Controller key={index} {...{ control, errors }} />
      ))}
    </Accordion>
  );
};

export default UserData;
