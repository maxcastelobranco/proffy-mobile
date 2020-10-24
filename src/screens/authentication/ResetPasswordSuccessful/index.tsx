import React, { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";

import { AuthenticationNavigationProps } from "../../../routes/authentication";
import Success from "../../../components/animated/Success";
import { useAppContext } from "../../../context";

const ResetPasswordSuccessful: React.FC<AuthenticationNavigationProps<
  "ResetPasswordSuccessful"
>> = ({ navigation }) => {
  const { state, dispatch } = useAppContext();
  const onPress = () => {
    dispatch({
      type: "UPDATE_ACTIVE_ILLUSTRATION",
      payload: {
        name: "loginIllustration",
      },
    });
    navigation.navigate("Login");
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        dispatch({
          type: "UPDATE_ACTIVE_ILLUSTRATION",
          payload: {
            name: "forgotPasswordIllustration",
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
        name: "forgotPasswordSuccessIllustration",
      },
    });
  }, [dispatch]);

  return (
    <>
      {state.activeIllustration.name ===
        "forgotPasswordSuccessIllustration" && (
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
