import React, { useEffect } from "react";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { Dimensions } from "react-native";
import { interpolateColor } from "react-native-redash";

import { AuthenticationNavigationProps } from "../../../routes/authentication";
import ProgressIndicator from "../../../components/animated/ProgressIndicator";
import { Box } from "../../../theme";
import { useAppContext } from "../../../context";
import { ActiveIllustrationActionTypes } from "../../../context/reducers/activeIllustrationReducer";

import useSlideData from "./hooks/useSlideData";
import { useStyles } from "./styles";
import Slide from "./components/Slide";
import LongArrowContainer from "./components/LongArrowContainer";

const { width } = Dimensions.get("window");

const OnBoarding: React.FC<AuthenticationNavigationProps<"OnBoarding">> = ({
  navigation,
}) => {
  const { state, dispatch } = useAppContext();
  const slideData = useSlideData();
  const {
    stylesheet,
    containerStyles,
    progressIndicatorContainerStyles,
  } = useStyles(slideData.length);
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const translationX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });
  const backgroundColor = useDerivedValue(() =>
    interpolateColor(
      translationX.value,
      slideData.map((_, index) => width * index),
      slideData.map((data) => data.backgroundColor)
    )
  );
  const currentIndex = useDerivedValue(() => translationX.value / width);
  const progressIndicators = slideData.map((_, index) => (
    <ProgressIndicator key={index} {...{ index, currentIndex }} />
  ));

  const buttonsContainerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value * -1 }],
  }));

  const onPress = (index: number) => {
    const isLast = index === slideData.length - 1;

    if (isLast) {
      dispatch({
        type: ActiveIllustrationActionTypes.Update,
        payload: {
          name: "loginIllustration",
        },
      });
      navigation.navigate("Login");
    } else {
      // @ts-ignore
      scrollViewRef.current?.scrollTo({
        x: width * (index + 1),
        animated: true,
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: ActiveIllustrationActionTypes.Update,
      payload: {
        name: "onBoardingIllustration",
      },
    });
    // @ts-ignore
    scrollViewRef.current?.scrollTo({
      x: 0,
      animated: true,
    });
  }, [dispatch, scrollViewRef]);

  const shouldDisplayIllustration =
    state.activeIllustration.name === "onBoardingIllustration";

  return (
    <Box {...containerStyles}>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={scrollHandler}
        scrollEventThrottle={1}
        horizontal
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
      >
        {slideData.map(
          ({ SvgComponent, svgParticleColor, descriptionText }, index) => (
            <Slide
              key={index}
              {...{
                SvgComponent,
                svgParticleColor,
                backgroundColor,
                translationX,
                descriptionText,
                index,
                shouldDisplayIllustration,
              }}
            />
          )
        )}
      </Animated.ScrollView>
      <Animated.View
        style={[stylesheet.longArrowContainer, buttonsContainerAnimatedStyle]}
      >
        {slideData.map((_, index) => (
          <LongArrowContainer
            key={index}
            onPress={() => onPress(index)}
            {...{ index, translationX }}
          />
        ))}
      </Animated.View>
      <Box {...progressIndicatorContainerStyles}>{progressIndicators}</Box>
    </Box>
  );
};

export default OnBoarding;
