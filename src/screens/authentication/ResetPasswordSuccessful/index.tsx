import React, { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";

import { AuthenticationNavigationProps } from "../../../routes/authentication";
import Success from "../../../components/animated/Success";
import { useManageIllustrations } from "../../../hooks/useManageIllustrations";

const ResetPasswordSuccessful: React.FC<AuthenticationNavigationProps<
  "ResetPasswordSuccessful"
>> = ({ navigation }) => {
  const {
    forgotPasswordSuccess,
    setForgotPasswordSuccess,
    setLogin,
    setForgotPassword,
  } = useManageIllustrations();
  const onPress = () => {
    setLogin(true);
    navigation.navigate("Login");
    setForgotPasswordSuccess(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setForgotPassword(true);
        setForgotPasswordSuccess(false);
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [setForgotPassword, setForgotPasswordSuccess])
  );

  useEffect(() => {
    setForgotPasswordSuccess(navigation.isFocused());
  }, [navigation, setForgotPasswordSuccess]);

  return (
    <>
      {forgotPasswordSuccess && (
        <Success
          title="Reset password email successfully sent!"
          description="Nice, now just heck your inbox to reset your password and enjoy your studies."
          buttonLabel="Back to Login"
          {...{ onPress }}
        />
      )}
    </>
  );
};

export default ResetPasswordSuccessful;
