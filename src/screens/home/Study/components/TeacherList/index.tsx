import React from "react";

import { Box } from "../../../../../theme";
import { TabNavigationProps } from "../../../../../routes/tabs";

const TeacherList: React.FC<TabNavigationProps<"TeacherList">> = () => {
  return <Box flex={1} backgroundColor="primary" />;
};

export default TeacherList;
