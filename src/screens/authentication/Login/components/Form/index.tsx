import React, { useRef } from "react";
import { useTheme } from "@shopify/restyle";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSharedValue, withSpring } from "react-native-reanimated";
import AsyncStorage from "@react-native-community/async-storage";

import { Box, Text, Theme } from "../../../../../theme";
import RippleButton from "../../../../../components/static/RippleButton";
import AnimatedBackgroundButton from "../../../../../components/animated/AnimatedBackgroundButton";
import EmailController from "../../../components/EmailController";
import CheckBoxController from "../../../components/CheckboxController";
import PasswordController from "../../../components/PasswordController";
import { useAppContext } from "../../../../../context";
import { ActiveIllustrationActionTypes } from "../../../../../context/reducers/activeIllustrationReducer";
import { api } from "../../../../../services/api";
import {
  AuthenticationActionTypes,
  User,
} from "../../../../../context/reducers/authenticationReducer";
import Notification from "../../../../../components/animated/Notification";
import responsivePixelSize from "../../../../../utils/responsivePixelSize";

import { useStyles } from "./styles";

export type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const Form: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const navigation = useNavigation();
  const theme = useTheme<Theme>();
  const passwordInputRef = useRef<TextInput>(null);
  const { control, errors, setValue, formState, handleSubmit } = useForm<
    FormValues
  >({
    mode: "onChange",
    criteriaMode: "all",
  });
  const enabled =
    Object.keys(formState.touched).length === 2 && !Object.keys(errors).length;

  const {
    containerStyles,
    rowStyles,
    createAccountStyles,
    forgotPasswordStyles,
  } = useStyles();

  const focusPasswordInput = () => {
    passwordInputRef.current?.focus();
  };
  const toggleCheckBox = (value: boolean) => {
    setValue("remember", !value);
  };
  const navigateToResetPassword = () => {
    dispatch({
      type: ActiveIllustrationActionTypes.Update,
      payload: {
        name: "forgotPasswordIllustration",
      },
    });
    navigation.navigate("ResetPassword");
  };
  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const shouldRenderNotification = useSharedValue(0);

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    dispatch({
      type: AuthenticationActionTypes.Login,
    });

    const { email, password, remember } = formData;

    const { data } = await api.get<User[] | []>("users", {
      params: {
        email,
        password,
      },
    });

    if (data.length) {
      const [user] = data;

      dispatch({
        type: AuthenticationActionTypes.LoginSucceeded,
        payload: user,
      });
      dispatch({
        type: ActiveIllustrationActionTypes.Update,
        payload: {
          name: "homeIllustration",
        },
      });

      if (remember) {
        await AsyncStorage.setItem("@proffy:user", JSON.stringify(user));
      }
    } else {
      dispatch({
        type: AuthenticationActionTypes.LoginFailed,
      });
      shouldRenderNotification.value = withSpring(1);
      setTimeout(() => {
        shouldRenderNotification.value = withSpring(0);
      }, 3000);
    }
  };

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
        <RippleButton onPress={navigateToResetPassword}>
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
        loading={state.authentication.loading}
      />
      <Notification
        {...{ shouldRenderNotification }}
        position={{ top: -responsivePixelSize(379) + theme.spacing.s }}
        message={state.authentication.error}
        iconName="alert-triangle"
        iconColor="title"
        backgroundColor="danger"
      />
    </Box>
  );
};

export default Form;
