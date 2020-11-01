import React from "react";
import { Feather } from "@expo/vector-icons";
import { TextProps, useTheme } from "@shopify/restyle";
import { ViewStyle } from "react-native";

import { Text, Theme } from "../../../../../../../../theme";
import RippleButton from "../../../../../../../../components/static/RippleButton";

interface DeleteButtonProps {
  onPress(): void;
  iconSize: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onPress, iconSize }) => {
  const theme = useTheme<Theme>();

  const containerStyles: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.m,
    marginHorizontal: theme.spacing.l,
  };
  const buttonTextStyles: TextProps<Theme> = {
    variant: "buttons",
    marginLeft: "xs",
  };

  return (
    <RippleButton {...{ onPress }} extraButtonStyles={containerStyles}>
      <Feather name="trash-2" size={iconSize} color={theme.colors.danger} />
      <Text {...buttonTextStyles} color="danger">
        Delete
      </Text>
    </RippleButton>
  );
};

export default DeleteButton;
