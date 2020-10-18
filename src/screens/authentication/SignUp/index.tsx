import React, { useCallback } from "react";
import { BackHandler, Dimensions, KeyboardAvoidingView } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { Control, SubmitHandler, useForm, FieldErrors } from "react-hook-form";
import { useFocusEffect } from "@react-navigation/native";

import { AuthenticationNavigationProps } from "../../../routes/authentication";
import { Box, Text, Theme } from "../../../theme";
import AnimatedBackgroundButton from "../../../components/animated/AnimatedBackgroundButton";
import ProgressIndicator from "../../../components/animated/ProgressIndicator";
import Button from "../../../components/static/Button";
import { useManageIllustrations } from "../../../hooks/useManageIllustrations";

import useSlideData from "./hooks/useSlideData";
import { useStyles } from "./styles";

export interface SlideFormProps {
  control: Control;
  errors: FieldErrors;
}

interface FormValues {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

const { width } = Dimensions.get("window");

const SignUp: React.FC<AuthenticationNavigationProps<"SignUp">> = ({
  navigation,
}) => {
  const { setLogin, setSignUpSuccess } = useManageIllustrations();
  const theme = useTheme<Theme>();
  const {
    headerStyles,
    descriptionContainerStyles,
    slideStyles,
    progressIndicatorContainerStyles,
    titleStyles,
    descriptionStyles,
    slideTitleStyles,
  } = useStyles();
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const translationX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });
  const { control, errors, formState, handleSubmit } = useForm<FormValues>({
    mode: "onBlur",
    criteriaMode: "all",
  });
  const scrollEnabled =
    (formState.touched.name &&
      formState.touched.lastName &&
      !errors.name &&
      !errors.lastName) ||
    false;
  const submitEnabled =
    (formState.touched.email &&
      formState.touched.password &&
      !errors.email &&
      !errors.password) ||
    false;

  const slideData = useSlideData(scrollEnabled, submitEnabled);

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data) => {
      console.log(data);
      setSignUpSuccess(true);
      navigation.navigate("SignUpSuccessful");
    },
    [navigation, setSignUpSuccess]
  );
  const onPress = useCallback(
    (index: number) => {
      const last = index === slideData.length - 1;

      if (last) {
        handleSubmit(onSubmit)();
      } else {
        // @ts-ignore
        scrollViewRef.current?.scrollTo({
          x: width * (index + 1),
          animated: true,
        });
      }
    },
    [handleSubmit, onSubmit, scrollViewRef, slideData.length]
  );
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const currentIndex = useDerivedValue(() => translationX.value / width);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setLogin(true);
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [setLogin])
  );

  return (
    <KeyboardAvoidingView behavior="position">
      <Box {...headerStyles}>
        <Button onPress={handleGoBack} extraButtonStyles={{ paddingLeft: 0 }}>
          <Feather
            name="chevrons-left"
            size={24}
            color={theme.colors.complementTextDark}
          />
        </Button>
        <Box {...progressIndicatorContainerStyles}>
          {slideData.map((_, index) => (
            <ProgressIndicator key={index} {...{ index, currentIndex }} />
          ))}
        </Box>
      </Box>
      <Animated.ScrollView
        ref={scrollViewRef}
        scrollEnabled={scrollEnabled}
        onScroll={scrollHandler}
        horizontal
        snapToInterval={width}
        decelerationRate="fast"
        bounces={false}
        showsHorizontalScrollIndicator={false}
      >
        {slideData.map(
          (
            { title, Form, buttonBackgroundColor, buttonLabel, enabled },
            index
          ) => (
            <Box
              key={title}
              {...slideStyles}
              style={{ marginTop: theme.spacing.xxl * 3 }}
            >
              <Text {...slideTitleStyles}>{`0${index + 1}. ${title}`}</Text>
              <Form {...{ control, errors }} />
              <AnimatedBackgroundButton
                {...{ enabled }}
                onPress={() => onPress(index)}
                label={buttonLabel}
                disabledBackgroundColor={theme.colors.background5}
                enabledBackgroundColor={buttonBackgroundColor}
                disabledLabelColor={theme.colors.complementTextDark}
                enabledLabelColor={theme.colors.title}
                extraStyles={{ marginTop: theme.spacing.ml }}
              />
            </Box>
          )
        )}
      </Animated.ScrollView>
      <Box {...descriptionContainerStyles} pointerEvents="none">
        <Text {...titleStyles}>Create a free account</Text>
        <Text {...descriptionStyles}>
          Fill out the form and you'll {"\n"}soon be with us.
        </Text>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
