import React, { useEffect } from "react";
import { useTheme } from "@shopify/restyle";
import { useForm } from "react-hook-form";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler, StyleSheet } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { mix } from "react-native-redash";

import MainHeader from "../components/MainHeader";
import { Box, Theme } from "../../../theme";
import responsivePixelSize from "../../../utils/responsivePixelSize";
import CircleGrid from "../../../components/animated/CircleGrid";
import X from "../../../components/svgs/animated/X";
import OutlinedCircle from "../../../components/svgs/animated/OutlinedCircle";
import TeacherForm from "../components/TeacherForm";
import { useAppContext } from "../../../context";
import { ActiveIllustrationActionTypes } from "../../../context/reducers/activeIllustrationReducer";

import Avatar from "./components/Avatar";
import { useStyles } from "./styles";
import { useParticles } from "./hooks/useParticles";

const Profile: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const theme = useTheme<Theme>();

  const { control, errors } = useForm();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        dispatch({
          type: ActiveIllustrationActionTypes.Update,
          payload: {
            name: "homeIllustration",
          },
        });
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [dispatch])
  );
  useEffect(() => {
    dispatch({
      type: ActiveIllustrationActionTypes.Update,
      payload: {
        name: "profileIllustration",
      },
    });
  }, [dispatch]);

  const isFullScreen = useSharedValue(0);
  const animatedFormContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: mix(isFullScreen.value, 1, 0),
      transform: [
        { scale: mix(isFullScreen.value, 1, 0) },
        { translateY: mix(isFullScreen.value, 0, 500) },
      ],
    };
  });
  const animatedParticlesContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: mix(isFullScreen.value, 1, 0),
    };
  });

  const { teacherFormContainerStyles } = useStyles();

  const particles = useParticles();

  return (
    <Box flex={1}>
      <MainHeader label="My profile" />
      <Avatar {...{ isFullScreen }} />
      {state.activeIllustration.name === "profileIllustration" && (
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, animatedParticlesContainerStyle]}
        >
          {particles.map((Particle) => Particle)}
        </Animated.View>
      )}
      <Animated.View
        style={[teacherFormContainerStyles, animatedFormContainerStyle]}
      >
        <TeacherForm {...{ control, errors }} />
      </Animated.View>
    </Box>
  );
};

export default Profile;
