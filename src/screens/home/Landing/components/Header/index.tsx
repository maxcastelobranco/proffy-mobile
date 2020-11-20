import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Image, Pressable } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useTheme } from "@shopify/restyle";

import { Box, Text, Theme } from "../../../../../theme";
import responsivePixelSize from "../../../../../utils/responsivePixelSize";
import RippleButton from "../../../../../components/static/RippleButton";
import { useAppContext } from "../../../../../context";
import { ActiveIllustrationActionTypes } from "../../../../../context/reducers/activeIllustrationReducer";
import { AuthenticationActionTypes } from "../../../../../context/reducers/authenticationReducer";

import { useStyles } from "./styles";

const Header: React.FC = () => {
  const theme = useTheme<Theme>();
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

  const navigateToProfile = () => {
    dispatch({
      type: ActiveIllustrationActionTypes.Update,
      payload: {
        name: "profileIllustration",
      },
    });
    navigation.navigate("Profile");
  };
  const logout = async () => {
    await AsyncStorage.clear();
    dispatch({
      type: AuthenticationActionTypes.Logout,
    });
  };

  return (
    <Box {...containerStyles}>
      <RippleButton onPress={navigateToProfile}>
        <Box {...userStyles}>
          <Box
            {...avatarStyles}
            style={{
              borderRadius: AVATAR_SIZE / 2,
            }}
          >
            {!!user.avatarUrl && (
              <Image
                source={{ uri: user.avatarUrl }}
                style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
              />
            )}
          </Box>
          <Text
            {...usernameStyles}
          >{`${user.firstName} ${user.lastName}`}</Text>
        </Box>
      </RippleButton>
      <Pressable onPress={logout}>
        <Box {...logoutButtonStyles}>
          <Feather
            name="power"
            size={responsivePixelSize(20)}
            color={theme.colors.title}
          />
        </Box>
      </Pressable>
    </Box>
  );
};

export default Header;
