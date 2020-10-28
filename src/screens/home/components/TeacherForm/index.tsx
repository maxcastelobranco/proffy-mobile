import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import * as faker from "faker";
import { FlatList } from "react-native";

import { useStyles } from "./styles";
import UserData from "./components/UserData";
import AboutTheLesson from "./components/AboutTheLesson";
import AvailableHours from "./components/AvailableHours";

interface TeacherFormProps {
  control: Control;
  errors: FieldErrors;
}

const data = [
  {
    id: faker.random.uuid(),
    Component: UserData,
  },
  {
    id: faker.random.uuid(),
    Component: AboutTheLesson,
  },
  {
    id: faker.random.uuid(),
    Component: AvailableHours,
  },
];

const TeacherForm: React.FC<TeacherFormProps> = ({ control, errors }) => {
  const { flatListStyles } = useStyles();

  return (
    <FlatList
      {...{ data }}
      style={flatListStyles}
      keyExtractor={({ id }) => id}
      renderItem={({ item: { Component } }) => (
        <Component {...{ control, errors }} />
      )}
    />
  );
};

export default TeacherForm;
