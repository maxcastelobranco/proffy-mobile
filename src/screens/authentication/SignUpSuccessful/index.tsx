import React, { useEffect } from "react";
import { useFocusEffect, useNavigationState } from "@react-navigation/native";
import { BackHandler } from "react-native";

import { AuthenticationNavigationProps } from "../../../routes/authentication";
import Success from "../../../components/animated/Success";
import { useManageIllustration } from "../../../hooks/useManageIllustration";

const SignUpSuccessful: React.FC<AuthenticationNavigationProps<
  "SignUpSuccessful"
>> = ({ navigation }) => {
  const { signUpSuccess, setSignUpSuccess, setLogin } = useManageIllustration();

  const navigationIndex = useNavigationState((state) => state.index);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setLogin(true);
        setSignUpSuccess(false);
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [setLogin, setSignUpSuccess])
  );

  useEffect(() => {
    if (navigationIndex === 3) {
      setSignUpSuccess(true);
    }
  }, [navigationIndex, setSignUpSuccess]);

  const onPress = () => {
    setLogin(true);
    navigation.navigate("Login");
    setSignUpSuccess(false);
  };

  return (
    <>
      {signUpSuccess && (
        <Success
          {...{ onPress }}
          title="Registration completed!"
          description="Now you're a member of the Proffy platform"
          buttonLabel="Back to Login"
        />
      )}
    </>
  );
};

export default React.memo(SignUpSuccessful);
