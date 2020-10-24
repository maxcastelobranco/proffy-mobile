import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import * as faker from "faker";
import { FlatList } from "react-native";

import { Box } from "../../../../theme";

import { useStyles } from "./styles";
import UserData from "./components/UserData";

interface TeacherFormProps {
  control: Control;
  errors: FieldErrors;
}

const data = [
  {
    id: faker.random.uuid(),
    Component: UserData,
  },
];

const TeacherForm: React.FC<TeacherFormProps> = ({ control, errors }) => {
  const { containerStyles, flatListStyles } = useStyles();

  return (
    <Box {...containerStyles}>
      <FlatList
        {...{ data }}
        style={flatListStyles}
        keyExtractor={({ id }) => id}
        renderItem={({ item: { Component } }) => (
          <Component {...{ control, errors }} />
        )}
      />
    </Box>
  );
};

export default TeacherForm;
