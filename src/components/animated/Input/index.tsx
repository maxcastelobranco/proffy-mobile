import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { BoxProps, useTheme } from "@shopify/restyle";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { FieldError } from "react-hook-form";
import { Feather } from "@expo/vector-icons";
import { bin, useSpring } from "react-native-redash";

import responsivePixelSize from "../../../utils/responsivePixelSize";
import RippleButton from "../../static/RippleButton";
import { Theme, Box } from "../../../theme";

import Placeholder from "./components/Placeholder";
import Tooltip from "./components/Tooltip";
import FocusIndicator from "./components/FocusIndicator";

interface InputProps {
  privateProps: {
    value: string;
    onChange(text: string): void;
    onBlur(): void;
    error: FieldError | undefined;
    iconName: string;
    placeholderText: string;
    extraContainerStyles?: BoxProps<Theme>;
  };
  inputProps?: TextInputProps;
}
interface InputRef {
  focus(): void;
}

export const INPUT_HEIGHT = responsivePixelSize(70);

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { privateProps, inputProps },
  ref
) => {
  const {
    value,
    onChange,
    onBlur,
    error,
    iconName,
    extraContainerStyles,
    placeholderText,
  } = privateProps;
  const theme = useTheme<Theme>();

  const [focused, setFocused] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [iconColor, setIconColor] = useState(theme.colors.complementTextDark);

  const inputRef = useRef<TextInput>(null);
  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
  }));

  const containerStyles: BoxProps<Theme> = {
    width: "100%",
    height: INPUT_HEIGHT,
    flexDirection: "row",
    backgroundColor: "background4",
    borderWidth: 1,
    borderColor: "background1",
    ...extraContainerStyles,
  };
  const styles = StyleSheet.create({
    input: {
      ...theme.textVariants.regularTextMedium,
      flex: 1,
      height: INPUT_HEIGHT * 0.8,
      alignSelf: "flex-end",
      color: theme.colors.baseTextDark,
      marginLeft: theme.spacing.m,
    },
  });

  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
    onBlur();
  };
  const toggleTooltip = () => {
    if (error) {
      setShowTooltip((prevState) => !prevState);
    }
  };

  const placeholderAnimationDriver = useSpring(focused || value ? 1 : 0);

  useEffect(() => {
    if (!focused && !error) {
      setIconColor(theme.colors.complementTextDark);
    } else if (focused && !error) {
      setIconColor(theme.colors.primary);
    } else if (error) {
      setIconColor(theme.colors.danger);
    }
  }, [
    error,
    focused,
    theme.colors.complementTextDark,
    theme.colors.danger,
    theme.colors.primary,
  ]);

  const binError = bin(!!error);

  return (
    <Box {...containerStyles}>
      <FocusIndicator {...{ focused }} error={binError} />
      <Tooltip errorMessage={error?.message} {...{ showTooltip }} />
      <Placeholder
        animationDriver={placeholderAnimationDriver}
        {...{ placeholderText }}
      />
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChangeText={onChange}
        {...inputProps}
      />
      <RippleButton
        onPress={toggleTooltip}
        extraButtonStyles={{
          padding: theme.spacing.s,
        }}
      >
        <Feather
          name={iconName}
          size={responsivePixelSize(24)}
          color={iconColor}
        />
      </RippleButton>
    </Box>
  );
};

export default forwardRef(Input);
