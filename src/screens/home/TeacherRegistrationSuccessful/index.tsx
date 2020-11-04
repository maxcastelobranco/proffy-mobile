import React, { useEffect } from "react";

import Success from "../../../components/animated/Success";
import { useAppContext } from "../../../context";
import { ActiveIllustrationActionTypes } from "../../../context/reducers/activeIllustrationReducer";
import { HomeNavigationProps } from "../../../routes/home";

const TeacherRegistrationSuccessful: React.FC<HomeNavigationProps<
  "TeacherRegistrationSuccessful"
>> = ({ navigation }) => {
  const { state, dispatch } = useAppContext();
  const onPress = () => {
    dispatch({
      type: ActiveIllustrationActionTypes.Update,
      payload: {
        name: "homeIllustration",
      },
    });
    navigation.navigate("Landing");
  };

  useEffect(() => {
    dispatch({
      type: ActiveIllustrationActionTypes.Update,
      payload: {
        name: "teacherSignUpIllustration",
      },
    });
  }, [dispatch]);

  return (
    <>
      {state.activeIllustration.name === "teacherSignUpIllustration" && (
        <Success
          title="Registration saved!"
          description="You can now proudly call yourself a Proffy!"
          buttonLabel="Back to the landing page"
          {...{ onPress }}
        />
      )}
    </>
  );
};

export default TeacherRegistrationSuccessful;
