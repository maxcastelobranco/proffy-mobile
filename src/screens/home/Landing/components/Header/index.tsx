import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import theme, { Box, Text } from "../../../../../theme";
import responsivePixelSize from "../../../../../utils/responsivePixelSize";
import RippleButton from "../../../../../components/static/RippleButton";
import { useAppContext } from "../../../../../context";

import { useStyles } from "./styles";

const Header: React.FC = () => {
  const { dispatch } = useAppContext();
  const navigation = useNavigation();

  const {
    AVATAR_SIZE,
    containerStyles,
    userStyles,
    avatarStyles,
    usernameStyles,
    logoutButtonStyles,
  } = useStyles();

  const onPress = () => {
    dispatch({
      type: "UPDATE_ACTIVE_ILLUSTRATION",
      payload: {
        name: "profileIllustration",
      },
    });
    navigation.navigate("Profile");
  };

  return (
    <Box {...containerStyles}>
      <RippleButton {...{ onPress }}>
        <Box {...userStyles}>
          <Box
            {...avatarStyles}
            style={{
              borderRadius: AVATAR_SIZE / 2,
            }}
          />
          <Text {...usernameStyles}>Max Branco</Text>
        </Box>
      </RippleButton>
      <Box {...logoutButtonStyles}>
        <Feather
          name="power"
          size={responsivePixelSize(20)}
          color={theme.colors.title}
        />
      </Box>
    </Box>
  );
};

export default Header;
