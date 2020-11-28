import React from "react";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@shopify/restyle";
import { Feather } from "@expo/vector-icons";
import { mix } from "react-native-redash";

import { BaseControllerProps } from "../../../../../../utils/types";
import { Theme, Text } from "../../../../../../theme";
import RippleButton from "../../../../../../components/static/RippleButton";
import responsivePixelSize from "../../../../../../utils/responsivePixelSize";

import { useStyles } from "./styles";
import SubjectController from "./components/SubjectController";
import WeekdayController from "./components/WeekdayController";
import HourController from "./components/HourController";

interface FilterSheetProps extends BaseControllerProps {
  showFilter: Animated.SharedValue<number>;
  onPress(): void;
}

const CLOSE_ICON_SIZE = responsivePixelSize(32);
const SEARCH_ICON_SIZE = responsivePixelSize(28);

const FilterSheet: React.FC<FilterSheetProps> = ({
  showFilter,
  onPress,
  control,
  errors,
}) => {
  const theme = useTheme<Theme>();
  const {
    SHEET_HEIGHT,
    containerStyles,
    extraButtonStyles,
    buttonStyles,
    buttonTextStyles,
  } = useStyles();
  const closeThisShitDown = () => {
    showFilter.value = withTiming(0);
  };
  const showFilterSpringTransition = useDerivedValue(() =>
    withSpring(showFilter.value)
  );
  const animatedStyle = useAnimatedStyle(() => {
    return {
      translateY: mix(
        showFilterSpringTransition.value,
        SHEET_HEIGHT,
        SHEET_HEIGHT * 0.32
      ),
    };
  });
  return (
    <Animated.View style={[containerStyles, animatedStyle]}>
      <RippleButton onPress={closeThisShitDown} {...{ extraButtonStyles }}>
        <Feather
          name="x-circle"
          color={theme.colors.primaryDark}
          size={CLOSE_ICON_SIZE}
        />
      </RippleButton>
      <SubjectController {...{ control, errors }} />
      <WeekdayController {...{ control, errors }} />
      <HourController {...{ control, errors }} />
      <RippleButton {...{ onPress }} extraButtonStyles={buttonStyles}>
        <Feather
          name="search"
          size={SEARCH_ICON_SIZE}
          color={theme.colors.title}
        />
        <Text {...buttonTextStyles}>Search</Text>
      </RippleButton>
    </Animated.View>
  );
};

export default FilterSheet;
