import React, { useEffect } from "react";

import { AuthenticationNavigationProps } from "../../../routes/authentication";
import Success from "../../../components/animated/Success";
import { useAppContext } from "../../../context";
import { ActiveIllustrationActionTypes } from "../../../context/reducers/activeIllustrationReducer";

const SignUpSuccessful: React.FC<AuthenticationNavigationProps<
  "SignUpSuccessful"
>> = ({ navigation }) => {
  const { state, dispatch } = useAppContext();

  const onPress = () => {
    dispatch({
      type: ActiveIllustrationActionTypes.Update,
      payload: {
        name: "loginIllustration",
      },
    });
    navigation.navigate("Login");
  };

  useEffect(() => {
    dispatch({
      type: ActiveIllustrationActionTypes.Update,
      payload: {
        name: "signUpSuccessIllustration",
      },
    });
  }, [dispatch]);

  return (
    <>
      {state.activeIllustration.name === "signUpSuccessIllustration" && (
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
