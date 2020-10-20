import React, { useLayoutEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";

import { AuthenticationNavigationProps } from "../../../routes/authentication";
import Success from "../../../components/animated/Success";
import { useManageIllustrations } from "../../../hooks/useManageIllustrations";

const SignUpSuccessful: React.FC<AuthenticationNavigationProps<
  "SignUpSuccessful"
>> = ({ navigation }) => {
  const {
    signUpSuccess,
    setSignUpSuccess,
    setLogin,
  } = useManageIllustrations();

  const onPress = () => {
    setLogin(true);
    navigation.navigate("Login");
    setSignUpSuccess(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      setSignUpSuccess(true);

      const onBackPress = () => {
        setSignUpSuccess(false);
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        setSignUpSuccess(false);
      };
    }, [setSignUpSuccess])
  );

  useLayoutEffect(() => {
    setSignUpSuccess(navigation.isFocused());
  }, [navigation, setSignUpSuccess]);

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

export default SignUpSuccessful;
