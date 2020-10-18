import React from "react";
import { BackHandler, KeyboardAvoidingView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { AuthenticationNavigationProps } from "../../../routes/authentication";
import { useDisplayOnBoardingIllustration } from "../../../hooks/useDisplayOnBoardingIllustration";

import Illustration from "./components/Illustration";
import Form from "./components/Form";

const Login: React.FC<AuthenticationNavigationProps<"Login">> = () => {
  const { setShouldDisplayIllustration } = useDisplayOnBoardingIllustration();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setShouldDisplayIllustration(true);
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [setShouldDisplayIllustration])
  );

  return (
    <KeyboardAvoidingView behavior="position">
      <Illustration />
      <Form />
    </KeyboardAvoidingView>
  );
};

export default Login;
