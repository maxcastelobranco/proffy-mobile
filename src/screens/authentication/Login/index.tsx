import React, { useEffect } from "react";
import { BackHandler, KeyboardAvoidingView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { AuthenticationNavigationProps } from "../../../routes/authentication";
import { useAppContext } from "../../../context";

import Illustration from "./components/Illustration";
import Form from "./components/Form";

const Login: React.FC<AuthenticationNavigationProps<"Login">> = ({
  navigation,
}) => {
  const { state, dispatch } = useAppContext();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        dispatch({
          type: "UPDATE_ACTIVE_ILLUSTRATION",
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
      type: "UPDATE_ACTIVE_ILLUSTRATION",
      payload: {
        name: "loginIllustration",
      },
    });
  }, [dispatch, navigation]);

  return (
    <>
      {state.activeIllustration.name === "loginIllustration" && (
        <KeyboardAvoidingView behavior="position">
          <Illustration />
          <Form />
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default Login;
