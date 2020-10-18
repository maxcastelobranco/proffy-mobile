import React, { useCallback, useRef } from "react";
import { useTheme } from "@shopify/restyle";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Box, Text, Theme } from "../../../../../theme";
import Button from "../../../../../components/static/Button";
import AnimatedBackgroundButton from "../../../../../components/animated/AnimatedBackgroundButton";
import EmailController from "../../../components/EmailController";
import CheckBoxController from "../../../components/CheckboxController";
import PasswordController from "../../../components/PasswordController";
import { useManageIllustration } from "../../../../../hooks/useManageIllustration";

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

  const { setLogin } = useManageIllustration();

  const focusPasswordInput = useCallback(() => {
    passwordInputRef.current?.focus();
  }, []);
  const toggleCheckBox = useCallback(
    (value: boolean) => {
      setValue("remember", !value);
    },
    [setValue]
  );
  const navigateToResetPassword = useCallback(
    () => navigation.navigate("ResetPassword"),
    [navigation]
  );
  const navigateToSignUp = useCallback(() => {
    navigation.navigate("SignUp");
    setLogin(false);
  }, [navigation, setLogin]);

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data) => {
      console.log(data);
      setLogin(false);
      navigation.navigate("Home");
    },
    [navigation, setLogin]
  );

  const enabled =
    Object.keys(formState.touched).length === 2 && !Object.keys(errors).length;

  return (
    <Box {...containerStyles}>
      <Box {...rowStyles}>
        <Text variant="regularTitleDark">Login</Text>
        <Button onPress={navigateToSignUp}>
          <Text {...createAccountStyles}>Create an account</Text>
        </Button>
      </Box>
      <EmailController
        {...{ control, errors }}
        onSubmitEditing={focusPasswordInput}
        sharpBottom
      />
      <PasswordController {...{ control, errors, passwordInputRef }} />
      <Box {...rowStyles}>
        <CheckBoxController {...{ control, toggleCheckBox }} />
        <Button
          onPress={navigateToResetPassword}
          extraButtonStyles={{
            marginTop: theme.spacing.s,
          }}
        >
          <Text {...forgotPasswordStyles}>Forgot password?</Text>
        </Button>
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
