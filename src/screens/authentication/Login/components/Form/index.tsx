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
import { useAppContext } from "../../../../../context";

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

  const { dispatch } = useAppContext();

  const focusPasswordInput = () => {
    passwordInputRef.current?.focus();
  };
  const toggleCheckBox = (value: boolean) => {
    setValue("remember", !value);
  };
  const navigateToResetPassword = () => {
    dispatch({
      type: "UPDATE_ACTIVE_ILLUSTRATION",
      payload: {
        name: "forgotPasswordIllustration",
      },
    });
    navigation.navigate("ResetPassword");
  };
  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    dispatch({
      type: "UPDATE_ACTIVE_ILLUSTRATION",
      payload: {
        name: "homeIllustration",
      },
    });
    navigation.navigate("Home");
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
