import React, { useLayoutEffect } from "react";
import { BackHandler, KeyboardAvoidingView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFocusEffect } from "@react-navigation/native";

import { AuthenticationNavigationProps } from "../../../routes/authentication";
import Illustration from "../Login/components/Illustration";
import { Box, Text, Theme } from "../../../theme";
import RippleButton from "../../../components/static/RippleButton";
import EmailController from "../components/EmailController";
import AnimatedBackgroundButton from "../../../components/animated/AnimatedBackgroundButton";
import { useManageIllustrations } from "../../../hooks/useManageIllustrations";

import { useStyles } from "./styles";

type FormValues = {
  email: string;
};
const ResetPassword: React.FC<AuthenticationNavigationProps<
  "ResetPassword"
>> = ({ navigation }) => {
  const theme = useTheme<Theme>();
  const {
    containerStyles,
    chevronContainerStyles,
    pageDescriptionStyles,
    titleStyles,
    descriptionStyles,
  } = useStyles();

  const {
    forgotPassword,
    setForgotPassword,
    setForgotPasswordSuccess,
    setLogin,
  } = useManageIllustrations();

  const { control, errors, formState, handleSubmit } = useForm<FormValues>({
    mode: "onBlur",
    criteriaMode: "all",
  });
  const enabled =
    Object.keys(formState.touched).length === 1 && !Object.keys(errors).length;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    setForgotPasswordSuccess(true);
    navigation.navigate("ResetPasswordSuccessful");
    setForgotPassword(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setLogin(true);
        setForgotPassword(false);
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [setForgotPassword, setLogin])
  );

  useLayoutEffect(() => {
    setForgotPassword(navigation.isFocused());
  }, [navigation, setForgotPassword]);

  return (
    <>
      {forgotPassword && (
        <KeyboardAvoidingView behavior="position">
          <Illustration />
          <Box {...containerStyles}>
            <Box {...chevronContainerStyles}>
              <RippleButton
                onPress={() => navigation.goBack()}
                extraButtonStyles={{ paddingLeft: 0 }}
              >
                <Feather
                  name="chevrons-left"
                  size={24}
                  color={theme.colors.complementTextDark}
                />
              </RippleButton>
            </Box>
            <Box {...pageDescriptionStyles}>
              <Text {...titleStyles}>Forgot your password?</Text>
              <Text {...descriptionStyles}>Chill, we can fix that.</Text>
            </Box>
            <EmailController {...{ control, errors }} />
            <AnimatedBackgroundButton
              {...{ enabled }}
              enabledBackgroundColor={theme.colors.secondary}
              disabledBackgroundColor={theme.colors.background5}
              enabledLabelColor={theme.colors.title}
              disabledLabelColor={theme.colors.complementTextDark}
              label="Reset password"
              disabledLabel="Fill out your email"
              extraStyles={{ marginTop: theme.spacing.m }}
              onPress={handleSubmit(onSubmit)}
            />
          </Box>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default ResetPassword;
