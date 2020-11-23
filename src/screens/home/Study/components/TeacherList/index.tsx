import React from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";

import { Box } from "../../../../../theme";
import { TabNavigationProps } from "../../../../../routes/tabs";

const TeacherList: React.FC<TabNavigationProps<"TeacherList">> = () => {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Landing");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  return <Box flex={1} backgroundColor="primary" />;
};

export default TeacherList;
