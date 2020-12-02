import React, { useEffect } from "react";

import { HomeNavigationProps } from "../../../routes/home";
import { Box, Text } from "../../../theme";
import responsivePixelSize from "../../../utils/responsivePixelSize";
import RippleButton from "../../../components/static/RippleButton";
import Book from "../../../components/svgs/animated/Book";
import Television from "../../../components/svgs/animated/Television";
import { useAppContext } from "../../../context";
import { ActiveIllustrationActionTypes } from "../../../context/reducers/activeIllustrationReducer";
import Loading from "../../../components/static/Loading";

import Illustration from "./components/Illustration";
import Header from "./components/Header";
import { useStyles } from "./styles";
import { useConnections } from "./hooks/useConnections";

const ICON_SIZE = responsivePixelSize(56);

const Landing: React.FC<HomeNavigationProps<"Landing">> = ({ navigation }) => {
  const {
    state: { activeIllustration },
    dispatch,
  } = useAppContext();
  const {
    containerStyles,
    welcomeStyles,
    titleStyles,
    semiBoldTitleStyles,
    optionContainerStyles,
    studyOptionStyles,
    teachOptionStyles,
    optionTitle,
    connectionTextStyles,
  } = useStyles();
  const connections = useConnections();

  const navigateToStudyPage = () => {
    dispatch({
      type: ActiveIllustrationActionTypes.Update,
      payload: {
        name: "empty",
      },
    });
    navigation.navigate("Study");
  };
  const navigateToTeachPage = () => {
    dispatch({
      type: ActiveIllustrationActionTypes.Update,
      payload: {
        name: "empty",
      },
    });
    navigation.navigate("Teach");
  };

  useEffect(() => {
    dispatch({
      type: ActiveIllustrationActionTypes.Update,
      payload: {
        name: "homeIllustration",
      },
    });
  }, [dispatch]);

  return (
    <Box {...containerStyles}>
      <Header />
      {activeIllustration.name === "homeIllustration" ? (
        <Illustration />
      ) : (
        <Loading />
      )}
      <Box {...welcomeStyles}>
        <Text {...titleStyles}>Welcome.</Text>
        <Text {...semiBoldTitleStyles}>What you wanna do?</Text>
        <Box {...optionContainerStyles}>
          <RippleButton onPress={navigateToStudyPage}>
            <Box {...studyOptionStyles}>
              <Book
                viewProps={{
                  style: {
                    width: ICON_SIZE,
                    height: ICON_SIZE,
                  },
                }}
                svgProps={{ width: ICON_SIZE, height: ICON_SIZE }}
              />
              <Text {...optionTitle}>Study</Text>
            </Box>
          </RippleButton>
          <RippleButton onPress={navigateToTeachPage}>
            <Box {...teachOptionStyles}>
              <Television
                reverse
                viewProps={{
                  style: {
                    width: ICON_SIZE,
                    height: ICON_SIZE,
                  },
                }}
                svgProps={{ width: ICON_SIZE, height: ICON_SIZE }}
              />
              <Text {...optionTitle}>Teach</Text>
            </Box>
          </RippleButton>
        </Box>
        {connections ? (
          <Text {...connectionTextStyles}>
            {`Total of ${connections}\n connections made 😎`}
          </Text>
        ) : (
          <Loading color="primary" />
        )}
      </Box>
    </Box>
  );
};

export default Landing;
