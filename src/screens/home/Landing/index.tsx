import React from "react";

import { HomeNavigationProps } from "../../../routes/home";
import { Box, Text } from "../../../theme";
import responsivePixelSize from "../../../utils/responsivePixelSize";
import RippleButton from "../../../components/static/RippleButton";
import { randomBetween } from "../../../utils/randomBetween";
import Book from "../../../components/svgs/animated/Book";
import Television from "../../../components/svgs/animated/Television";

import Illustration from "./components/Illustration";
import Header from "./components/Header";
import { useStyles } from "./styles";

const ICON_SIZE = responsivePixelSize(56);

const Landing: React.FC<HomeNavigationProps<"Landing">> = ({ navigation }) => {
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

  return (
    <Box {...containerStyles}>
      <Header />
      <Illustration />
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
