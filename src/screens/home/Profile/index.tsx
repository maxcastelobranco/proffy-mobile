import React, { useEffect } from "react";
import { useTheme } from "@shopify/restyle";
import { useForm } from "react-hook-form";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";

import MainHeader from "../components/MainHeader";
import { Box, Theme } from "../../../theme";
import responsivePixelSize from "../../../utils/responsivePixelSize";
import CircleGrid from "../../../components/animated/CircleGrid";
import X from "../../../components/svgs/animated/X";
import OutlinedCircle from "../../../components/svgs/animated/OutlinedCircle";
import TeacherForm from "../components/TeacherForm";
import { useAppContext } from "../../../context";

import Avatar from "./components/Avatar";

const Profile: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const theme = useTheme<Theme>();

  const { control, errors } = useForm();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        dispatch({
          type: "UPDATE_ACTIVE_ILLUSTRATION",
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
      type: "UPDATE_ACTIVE_ILLUSTRATION",
      payload: {
        name: "profileIllustration",
      },
    });
  }, [dispatch]);

  return (
    <Box flex={1}>
      <MainHeader label="My profile" />
      <Avatar />
      {state.activeIllustration.name === "profileIllustration" && (
        <>
          <OutlinedCircle
            viewProps={{
              style: {
                position: "absolute",
                top: responsivePixelSize(100),
                right: responsivePixelSize(60),
              },
            }}
            svgProps={{ stroke: theme.colors.secondary }}
          />
          <X
            viewProps={{
              style: {
                position: "absolute",
                top: responsivePixelSize(164),
                right: responsivePixelSize(68),
              },
            }}
            svgProps={{ stroke: theme.colors.secondary }}
          />
          <X
            viewProps={{
              style: {
                position: "absolute",
                top: responsivePixelSize(250),
                left: responsivePixelSize(60),
              },
            }}
            svgProps={{ stroke: theme.colors.secondary }}
          />
          <CircleGrid
            rows={3}
            columns={2}
            circleColor={theme.colors.primaryLight}
            circleSize={responsivePixelSize(4)}
            {...{
              position: "absolute",
              top: responsivePixelSize(130),
              left: responsivePixelSize(34),
            }}
          />
          <CircleGrid
            rows={3}
            columns={2}
            circleColor={theme.colors.primaryLight}
            circleSize={responsivePixelSize(4)}
            {...{
              position: "absolute",
              top: responsivePixelSize(230),
              right: responsivePixelSize(34),
            }}
          />
        </>
      )}
      <TeacherForm {...{ control, errors }} />
    </Box>
  );
};

export default Profile;
