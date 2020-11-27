import React from "react";
import { useSharedValue } from "react-native-reanimated";

import Accordion from "../../../Accordion";
import { INPUT_HEIGHT } from "../../../../../../components/animated/Input";
import { BaseControllerProps } from "../../../../../../utils/types";

import SubjectController from "./components/SubjectController";
import PerHourController from "./components/PerHourController";

const controllers = [SubjectController, PerHourController];

const AboutTheLesson: React.FC<BaseControllerProps> = ({ control, errors }) => {
  const height = useSharedValue(0);
  const childrenHeight = INPUT_HEIGHT * (controllers.length + 0.2);

  return (
    <Accordion label="About the lesson" {...{ height, childrenHeight }}>
      {controllers.map((Controller, index) => (
        <Controller key={index} {...{ control, errors }} />
      ))}
    </Accordion>
  );
};

export default AboutTheLesson;
