import React from "react";
import { Image } from "react-native";

import { Box, Text } from "../../../../../../../theme";

import { useStyles } from "./styles";

interface CardHeaderProps {
  avatarUrl: string;
  firstName: string;
  subject?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  avatarUrl,
  firstName,
  subject = "",
}) => {
  const {
    containerStyles,
    avatarStyles,
    titleContainerStyles,
    nameStyles,
    subjectStyles,
  } = useStyles();

  return (
    <Box {...containerStyles}>
      <Image
        source={{
          uri: avatarUrl,
        }}
        style={avatarStyles}
      />
      <Box {...titleContainerStyles}>
        <Text {...nameStyles}>{firstName}</Text>
        <Text {...subjectStyles}>{subject}</Text>
      </Box>
    </Box>
  );
};

export default CardHeader;
