import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import Success from "../../../components/animated/Success";
import { useAppContext } from "../../../context";
import { ActiveIllustrationActionTypes } from "../../../context/reducers/activeIllustrationReducer";

const TeacherAlready: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const navigation = useNavigation();
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
        name: "proffyAlready",
      },
    });
  }, [dispatch]);

  return (
    <>
      {state.activeIllustration.name === "proffyAlready" && (
        <Success
          title="No need to sign up!"
          description="You're already a Proffy!"
          buttonLabel="Back to the landing page"
          {...{ onPress }}
        />
      )}
    </>
  );
};

export default TeacherAlready;
