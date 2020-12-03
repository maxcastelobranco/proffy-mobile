import React, { useRef } from "react";
import { FlatList } from "react-native";

import { BaseControllerProps } from "../../../../utils/types";
import { useAppContext } from "../../../../context";

import { useStyles } from "./styles";
import UserData from "./components/UserData";
import AboutTheLesson from "./components/AboutTheLesson";
import AvailableHours from "./components/AvailableHours";

const data = [
  {
    id: "UserData",
    Component: UserData,
  },
  {
    id: "AboutTheLesson",
    Component: AboutTheLesson,
  },
  {
    id: "AvailableHours",
    Component: AvailableHours,
  },
];

export interface TeacherFormProps extends BaseControllerProps {
  empty?: boolean;
}

const TeacherForm: React.FC<TeacherFormProps> = ({
  control,
  errors,
  empty,
}) => {
  const {
    state: {
      authentication: { user },
    },
  } = useAppContext();
  const flatListRef = useRef<FlatList>(null);
  const { flatListStyles } = useStyles();

  const renderItem = React.useCallback(
    ({ item: { Component } }) => (
      <Component {...{ control, errors, flatListRef, empty }} />
    ),
    [control, empty, errors]
  );

  return (
    <>
      {user.isTeacher ? (
        <FlatList
          {...{ data, renderItem }}
          ref={flatListRef}
          style={flatListStyles}
          keyExtractor={({ id }) => id}
        />
      ) : (
        <UserData openByDefault {...{ control, errors }} />
      )}
    </>
  );
};

export default TeacherForm;
