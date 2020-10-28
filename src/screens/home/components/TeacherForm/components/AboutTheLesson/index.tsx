import React from "react";
import { Control, FieldErrors } from "react-hook-form";

import Accordion from "../../../Accordion";

import SubjectController from "./components/SubjectController";
import PerHourController from "./components/PerHourController";

interface AboutTheLessonProps {
  control: Control;
  errors: FieldErrors;
}

const controllers = [SubjectController, PerHourController];

const AboutTheLesson: React.FC<AboutTheLessonProps> = ({ control, errors }) => {
  return (
    <Accordion label="About the lesson">
      {controllers.map((Controller, index) => (
        <Controller key={index} {...{ control, errors }} />
      ))}
    </Accordion>
  );
};

export default AboutTheLesson;
