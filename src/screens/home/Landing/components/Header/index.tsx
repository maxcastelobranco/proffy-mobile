import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Image } from "react-native";

import theme, { Box, Text } from "../../../../../theme";
import responsivePixelSize from "../../../../../utils/responsivePixelSize";
import RippleButton from "../../../../../components/static/RippleButton";
import { useAppContext } from "../../../../../context";
import { ActiveIllustrationActionTypes } from "../../../../../context/reducers/activeIllustrationReducer";

import { useStyles } from "./styles";

const Header: React.FC = () => {
  const {
    state: {
      authentication: { user },
    },
    dispatch,
  } = useAppContext();
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
      type: ActiveIllustrationActionTypes.Update,
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
          >
            <Image
              source={{ uri: user.avatarUrl }}
              style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
            />
          </Box>
          <Text
            {...usernameStyles}
          >{`${user.firstName} ${user.lastName}`}</Text>
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
