import React, { useEffect } from "react";
import { BackHandler, KeyboardAvoidingView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { AuthenticationNavigationProps } from "../../../routes/authentication";
import { useManageIllustrations } from "../../../hooks/useManageIllustrations";

import Illustration from "./components/Illustration";
import Form from "./components/Form";

const Login: React.FC<AuthenticationNavigationProps<"Login">> = ({
  navigation,
}) => {
  const { setOnBoarding, login, setLogin } = useManageIllustrations();

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

  useEffect(() => {
    setLogin(navigation.isFocused());
  }, [navigation, setLogin]);

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
