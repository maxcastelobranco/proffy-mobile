import React, { useEffect } from "react";

import { HomeNavigationProps } from "../../../routes/home";
import { Box, Text } from "../../../theme";
import responsivePixelSize from "../../../utils/responsivePixelSize";
import RippleButton from "../../../components/static/RippleButton";
import Book from "../../../components/svgs/animated/Book";
import Television from "../../../components/svgs/animated/Television";
import { useAppContext } from "../../../context";

import Illustration from "./components/Illustration";
import Header from "./components/Header";
import { useStyles } from "./styles";

const ICON_SIZE = responsivePixelSize(56);

const Landing: React.FC<HomeNavigationProps<"Landing">> = ({ navigation }) => {
  const { state, dispatch } = useAppContext();
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

  const navigateToStudyPage = () => {
    navigation.navigate("Study");
  };
  const navigateToTeachPage = () => {
    navigation.navigate("Teach");
  };

  useEffect(() => {
    dispatch({
      type: "UPDATE_ACTIVE_ILLUSTRATION",
      payload: {
        name: "homeIllustration",
      },
    });
  }, [dispatch]);

  return (
    <Box {...containerStyles}>
      <Header />
      {state.activeIllustration.name === "homeIllustration" && <Illustration />}
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
        <Text {...connectionTextStyles}>
          Total of 999{"\n"} connections made 😎
        </Text>
      </Box>
    </Box>
  );
};

export default Landing;
