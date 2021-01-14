import React, { useEffect } from "react";
import { BackHandler, KeyboardAvoidingView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";

import { AuthenticationNavigationProps } from "../../../routes/authentication";
import { useAppContext } from "../../../context";
import { ActiveIllustrationActionTypes } from "../../../context/reducers/activeIllustrationReducer";
import { Box, Theme } from "../../../theme";
import Loading from "../../../components/static/Loading";

import Illustration from "./components/Illustration";
import Form from "./components/Form";

const Login: React.FC<AuthenticationNavigationProps<"Login">> = ({
  navigation,
}) => {
  const { state, dispatch } = useAppContext();
  const theme = useTheme<Theme>();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        dispatch({
          type: ActiveIllustrationActionTypes.Update,
          payload: {
            name: "onBoardingIllustration",
          },
        });
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [dispatch])
  );
  useEffect(() => {
    dispatch({
      type: ActiveIllustrationActionTypes.Update,
      payload: {
        name: "loginIllustration",
      },
    });
  }, [dispatch, navigation]);

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{ flex: 1, backgroundColor: theme.colors.background3 }}
    >
      {state.activeIllustration.name === "loginIllustration" ? (
        <Illustration />
      ) : (
        <Box padding="l" alignItems="center" justifyContent="center">
          <Loading color="primaryDark" />
        </Box>
      )}
      <Form />
    </KeyboardAvoidingView>
  );
};

export default Login;
