import React from "react";
import { Feather } from "@expo/vector-icons";
import { TextProps, useTheme } from "@shopify/restyle";
import { ViewStyle } from "react-native";

import { Text, Theme } from "../../../../../../../../theme";
import RippleButton from "../../../../../../../../components/static/RippleButton";

interface AddButtonProps {
  onPress(): void;
  iconSize: number;
}

const AddButton: React.FC<AddButtonProps> = ({ onPress, iconSize }) => {
  const theme = useTheme<Theme>();

  const containerStyles: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  };
  const buttonTextStyles: TextProps<Theme> = {
    variant: "buttons",
    marginLeft: "xs",
  };

  return (
    <RippleButton {...{ onPress }} extraButtonStyles={containerStyles}>
      <Feather
        name="plus-square"
        size={iconSize}
        color={theme.colors.primaryDark}
      />
      <Text {...buttonTextStyles} color="primaryDark">
        New
      </Text>
    </RippleButton>
  );
};

export default AddButton;
