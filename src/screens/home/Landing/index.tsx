import React, { useEffect, useState } from "react";

import { HomeNavigationProps } from "../../../routes/home";
import { Box, Text } from "../../../theme";
import responsivePixelSize from "../../../utils/responsivePixelSize";
import RippleButton from "../../../components/static/RippleButton";
import Book from "../../../components/svgs/animated/Book";
import Television from "../../../components/svgs/animated/Television";
import { useAppContext } from "../../../context";
import { ActiveIllustrationActionTypes } from "../../../context/reducers/activeIllustrationReducer";
import { api } from "../../../services/api";
import { User } from "../../../context/reducers/authenticationReducer";
import Loading from "../../../components/static/Loading";

import Illustration from "./components/Illustration";
import Header from "./components/Header";
import { useStyles } from "./styles";

const ICON_SIZE = responsivePixelSize(56);

const Landing: React.FC<HomeNavigationProps<"Landing">> = ({ navigation }) => {
  const {
    state: { authentication, activeIllustration },
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
  const [connections, setConnections] = useState(0);

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
    api.get<User[]>("users").then(({ data }) => {
      const { numberOfLikes } = data.reduce(
        (acc, curr) => {
          if (curr.favoriteTeachersIds?.includes(authentication.user.id)) {
            acc.numberOfLikes += 1;
          }

          return acc;
        },
        {
          numberOfLikes: 0,
        }
      );

      const numberOfConnections = authentication.user.favoriteTeachersIds
        ? numberOfLikes + authentication.user.favoriteTeachersIds.length
        : numberOfLikes;

      setConnections(numberOfConnections);
    });
  }, [authentication.user.favoriteTeachersIds, authentication.user.id]);

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
