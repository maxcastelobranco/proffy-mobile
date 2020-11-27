import React, { useRef } from "react";
import { FlatList } from "react-native";

import { BaseControllerProps } from "../../../../utils/types";

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

const TeacherForm: React.FC<BaseControllerProps> = ({ control, errors }) => {
  const flatListRef = useRef<FlatList>(null);
  const { flatListStyles } = useStyles();

  const renderItem = React.useCallback(
    ({ item: { Component } }) => (
      <Component {...{ control, errors, flatListRef }} />
    ),
    [control, errors]
  );

  return (
    <FlatList
      {...{ data, renderItem }}
      ref={flatListRef}
      initialNumToRender={3}
      windowSize={3}
      style={flatListStyles}
      keyExtractor={({ id }) => id}
    />
  );
};

export default TeacherForm;
