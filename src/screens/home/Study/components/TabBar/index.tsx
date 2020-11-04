import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BoxProps, TextProps, useTheme } from "@shopify/restyle";
import { RectButton } from "react-native-gesture-handler";

import responsivePixelSize from "../../../../../utils/responsivePixelSize";
import { Box, Text, Theme } from "../../../../../theme";

import { useStyles } from "./styles";

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const theme = useTheme<Theme>();
  const { containerStyles, focusedUnderlayStyles, buttonStyles } = useStyles();
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <Box {...containerStyles}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const { tabBarAccessibilityLabel, tabBarTestID, tabBarIcon } = options;
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const tabStyles: BoxProps<Theme> = {
          flex: 1,
          backgroundColor: isFocused ? "background2" : "background3",
          position: "relative",
        };
        const labelStyles: TextProps<Theme> = {
          color: isFocused ? "complementText" : "inputText",
          marginLeft: "m",
        };

        return (
          <Box key={route.name} {...tabStyles}>
            {isFocused && <Box {...focusedUnderlayStyles} />}
            <RectButton
              accessibilityLabel={tabBarAccessibilityLabel}
              activeOpacity={0.6}
              testID={tabBarTestID}
              style={buttonStyles}
              {...{ onPress }}
            >
              {tabBarIcon &&
                tabBarIcon({
                  focused: isFocused,
                  color: isFocused
                    ? theme.colors.primaryLight
                    : theme.colors.inputText,
                  size: responsivePixelSize(24),
                })}
              <Text {...labelStyles}>{label}</Text>
            </RectButton>
          </Box>
        );
      })}
    </Box>
  );
};

export default TabBar;
