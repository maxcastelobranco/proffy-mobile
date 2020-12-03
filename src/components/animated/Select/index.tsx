import React, { useState } from "react";
import { useTheme } from "@shopify/restyle";
import { mix, useSpring, useTiming } from "react-native-redash";
import { ScrollView, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

import responsivePixelSize from "../../../utils/responsivePixelSize";
import { Box, Text, Theme } from "../../../theme";
import { INPUT_HEIGHT } from "../Input";
import { Weekday } from "../../../screens/home/components/TeacherForm/components/AvailableHours/components/WeekdayController/weekdays";
import RippleButton from "../../static/RippleButton";

import FocusIndicator from "./components/FocusIndicator";
import { useStyles } from "./styles";
import OptionText from "./components/OptionText";

interface SelectProps {
  options: string[];
  label: string;
  onChange(value: string): void;
  defaultValue?: Weekday;
}

const ICON_SIZE = responsivePixelSize(24);

const Select: React.FC<SelectProps> = ({
  options,
  label,
  onChange,
  defaultValue,
}) => {
  const theme = useTheme<Theme>();
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    defaultValue ? defaultValue : ""
  );

  const {
    rectButtonStyles,
    containerStyles,
    labelStyles,
    chooseTextStyles,
  } = useStyles();

  const openTimingTransition = useTiming(open);
  const openSpringTransition = useSpring(open);

  const animatedIconStyle = useAnimatedStyle(() => {
    const rotate = mix(openSpringTransition.value, 0, Math.PI);

    return { transform: [{ rotate: `${rotate}rad` }] };
  });
  const animatedOptionsStyle = useAnimatedStyle(() => {
    return {
      height: mix(openTimingTransition.value, 0, INPUT_HEIGHT / 2),
      transform: [
        { translateY: mix(openSpringTransition.value, -INPUT_HEIGHT / 3, 0) },
        { scale: mix(openTimingTransition.value, 0, 1) },
      ],
    };
  });

  const toggleOpen = () => {
    setOpen((prevState) => !prevState);
  };
  const updateOption = (option: string) => {
    onChange(option);
    setSelectedOption(option);
  };

  return (
    <>
      <Text {...labelStyles}>{label}</Text>
      <Box overflow="hidden" borderRadius="default">
        <RectButton onPress={toggleOpen}>
          <Box {...containerStyles}>
            <Text {...chooseTextStyles}>
              {selectedOption === "" ? "Choose" : selectedOption}
            </Text>
            <Animated.View style={animatedIconStyle}>
              <Feather
                name="chevrons-up"
                size={ICON_SIZE}
                color={
                  open ? theme.colors.primary : theme.colors.complementTextDark
                }
              />
            </Animated.View>
          </Box>
        </RectButton>
      </Box>
      <Animated.View style={animatedOptionsStyle}>
        <ScrollView
          horizontal
          style={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          {options.map((option) => {
            const focused = option === selectedOption;

            return (
              <TouchableOpacity
                key={option}
                onPress={() => updateOption(option)}
              >
                <Box
                  {...containerStyles}
                  height={INPUT_HEIGHT * 0.6}
                  backgroundColor="background4"
                >
                  <OptionText {...{ focused, option }} />
                </Box>
                <FocusIndicator {...{ focused }} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>
    </>
  );
};

export default Select;
