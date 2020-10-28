import React, { useState } from "react";
import { useTheme } from "@shopify/restyle";
import { mix } from "react-native-redash";
import { ScrollView, TouchableOpacity } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import responsivePixelSize from "../../../utils/responsivePixelSize";
import { Box, Text, Theme } from "../../../theme";
import { AnimatedFeatherIcon } from "../reanimatedAnimatedComponents";

import FocusIndicator from "./components/FocusIndicator";
import { useStyles } from "./styles";

interface SelectProps {
  options: string[];
  label: string;
  onChange(value: string): void;
}

const ICON_SIZE = responsivePixelSize(24);

const Select: React.FC<SelectProps> = ({ options, label, onChange }) => {
  const theme = useTheme<Theme>();
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const openTimingTransition = useSharedValue(0);

  const animatedIconStyle = useAnimatedStyle(() => {
    const rotate = mix(openTimingTransition.value, 0, Math.PI);

    return { transform: [{ rotate: `${rotate}rad` }] };
  });

  const toggleOpen = () => {
    if (open) {
      openTimingTransition.value = withTiming(0, {}, () => {
        setOpen(false);
      });
    } else {
      setOpen(true);
      openTimingTransition.value = withTiming(1);
    }
  };
  const updateOption = (option: string) => {
    onChange(option);
    setSelectedOption(option);
  };

  const {
    containerStyles,
    contentContainerStyle,
    labelStyles,
    chooseTextStyles,
    optionTextStyles,
    selectedOptionTextStyles,
  } = useStyles(open);

  return (
    <Box>
      <Text {...labelStyles}>{label}</Text>
      <TouchableOpacity onPress={toggleOpen}>
        <Box {...containerStyles}>
          <Text {...chooseTextStyles}>
            {selectedOption === "" ? "Choose" : selectedOption}
          </Text>
          <AnimatedFeatherIcon
            name="chevrons-up"
            size={ICON_SIZE}
            color={theme.colors.titleDark}
            style={animatedIconStyle}
          />
        </Box>
      </TouchableOpacity>
      {open && (
        <ScrollView {...{ contentContainerStyle }}>
          {options.map((option, index) => {
            const isSelected = option === selectedOption;
            const isLast = index === options.length - 1;

            return (
              <TouchableOpacity
                key={option}
                onPress={() => updateOption(option)}
              >
                <Box
                  {...containerStyles}
                  borderRadius="zero"
                  borderTopWidth={0}
                  borderBottomRightRadius={isLast ? "default" : "zero"}
                  borderBottomLeftRadius={isLast ? "default" : "zero"}
                >
                  {isSelected ? (
                    <Text {...selectedOptionTextStyles}>{option}</Text>
                  ) : (
                    <Text {...optionTextStyles}>{option}</Text>
                  )}
                </Box>
                {isSelected && <FocusIndicator />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </Box>
  );
};

export default Select;
