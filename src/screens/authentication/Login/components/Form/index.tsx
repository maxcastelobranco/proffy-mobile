import React, { useRef } from "react";
import { useTheme } from "@shopify/restyle";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Box, Text, Theme } from "../../../../../theme";
import RippleButton from "../../../../../components/static/RippleButton";
import AnimatedBackgroundButton from "../../../../../components/animated/AnimatedBackgroundButton";
import EmailController from "../../../components/EmailController";
import CheckBoxController from "../../../components/CheckboxController";
import PasswordController from "../../../components/PasswordController";
import { useManageIllustrations } from "../../../../../hooks/useManageIllustrations";

import { useStyles } from "./styles";

export type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const Form: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme<Theme>();
  const passwordInputRef = useRef<TextInput>(null);
  const { control, errors, setValue, formState, handleSubmit } = useForm<
    FormValues
  >({
    mode: "onBlur",
    criteriaMode: "all",
  });

  const {
    containerStyles,
    rowStyles,
    createAccountStyles,
    forgotPasswordStyles,
  } = useStyles();

  const {
    setLogin,
    setForgotPassword,
    setHome,
    setForgotPasswordSuccess,
    setSignUpSuccess,
    setOnBoarding,
    setProfile,
    setTeacherSignUp,
  } = useManageIllustrations();

  const focusPasswordInput = () => {
    passwordInputRef.current?.focus();
  };
  const toggleCheckBox = (value: boolean) => {
    setValue("remember", !value);
  };
  const navigateToResetPassword = () => {
    setForgotPassword(true);
    navigation.navigate("ResetPassword");
    setLogin(false);
  };
  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
    setLogin(false);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    setHome(true);
    navigation.navigate("Home");
    setLogin(false);
    setForgotPassword(false);
    setForgotPasswordSuccess(false);
    setSignUpSuccess(false);
    setOnBoarding(false);
    setProfile(false);
    setTeacherSignUp(false);
  };

  const enabled =
    Object.keys(formState.touched).length === 2 && !Object.keys(errors).length;

  return (
    <Box {...containerStyles}>
      <Box {...rowStyles}>
        <Text variant="regularTitleDark">Login</Text>
        <RippleButton onPress={navigateToSignUp}>
          <Text {...createAccountStyles}>Create an account</Text>
        </RippleButton>
      </Box>
      <EmailController
        {...{ control, errors }}
        onSubmitEditing={focusPasswordInput}
        sharpBottom
      />
      <PasswordController {...{ control, errors, passwordInputRef }} />
      <Box {...rowStyles}>
        <CheckBoxController {...{ control, toggleCheckBox }} />
        <RippleButton
          onPress={navigateToResetPassword}
          extraButtonStyles={{
            marginTop: theme.spacing.s,
          }}
        >
          <Text {...forgotPasswordStyles}>Forgot password?</Text>
        </RippleButton>
      </Box>
      <AnimatedBackgroundButton
        {...{ enabled }}
        enabledBackgroundColor={theme.colors.secondary}
        disabledBackgroundColor={theme.colors.background5}
        enabledLabelColor={theme.colors.title}
        disabledLabelColor={theme.colors.complementTextDark}
        label="Login"
        disabledLabel="Fill out your credentials to login"
        onPress={handleSubmit(onSubmit)}
      />
    </Box>
  );
};

export default Form;
