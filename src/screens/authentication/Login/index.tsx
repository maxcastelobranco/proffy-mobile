import React, { useLayoutEffect } from "react";
import { BackHandler, KeyboardAvoidingView } from "react-native";
import { useFocusEffect, useNavigationState } from "@react-navigation/native";

import { AuthenticationNavigationProps } from "../../../routes/authentication";
import { useManageIllustration } from "../../../hooks/useManageIllustration";

import Illustration from "./components/Illustration";
import Form from "./components/Form";

const Login: React.FC<AuthenticationNavigationProps<"Login">> = () => {
  const { setOnBoarding, login, setLogin } = useManageIllustration();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setOnBoarding(true);
        setLogin(false);
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [setLogin, setOnBoarding])
  );

  const navigationIndex = useNavigationState((state) => state.index);

  useLayoutEffect(() => {
    if (navigationIndex === 1) {
      setLogin(true);
    }
  }, [navigationIndex, setLogin]);

  return (
    <>
      {login && (
        <KeyboardAvoidingView behavior="position">
          <Illustration />
          <Form />
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default Login;
