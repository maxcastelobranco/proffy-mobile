import React from "react";
import { useTheme } from "@shopify/restyle";

import { Theme, Box, Text } from "../../../theme";
import CircleGrid from "../CircleGrid";
import Search from "../../svgs/animated/Search";
import OutlinedCircle from "../../svgs/animated/OutlinedCircle";
import X from "../../svgs/animated/X";
import Button from "../../static/Button";
import OutlinedCheck from "../../svgs/animated/OutlinedCheck";

import { useStyles } from "./styles";

interface SuccessProps {
  title: string;
  description: string;
  buttonLabel: string;
  onPress(): void;
}

const Success: React.FC<SuccessProps> = ({
  title,
  description,
  buttonLabel,
  onPress,
}) => {
  const theme = useTheme<Theme>();

  const {
    stylesheet,
    containerStyles,
    titleStyles,
    descriptionStyles,
    buttonLabelStyles,
  } = useStyles();

  return (
    <Box {...containerStyles}>
      <OutlinedCircle
        viewProps={{ style: { position: "absolute", top: 60, right: 108 } }}
        svgProps={{ stroke: theme.colors.secondaryLight }}
      />
      <OutlinedCircle
        viewProps={{ style: { position: "absolute", top: 270, right: 39 } }}
        svgProps={{ stroke: theme.colors.secondaryLight }}
      />
      <OutlinedCircle
        viewProps={{ style: { position: "absolute", top: 390, left: 38 } }}
        svgProps={{ stroke: theme.colors.secondaryLight }}
      />
      <X
        viewProps={{ style: { position: "absolute", top: 160, right: 142 } }}
        svgProps={{
          stroke: theme.colors.secondaryLight,
          fill: theme.colors.secondaryLight,
        }}
      />
      <X
        viewProps={{ style: { position: "absolute", top: 200, left: 52 } }}
        svgProps={{
          stroke: theme.colors.secondaryLight,
          fill: theme.colors.secondaryLight,
        }}
      />
      <X
        viewProps={{ style: { position: "absolute", bottom: 180, left: 164 } }}
        svgProps={{
          stroke: theme.colors.secondaryLight,
          fill: theme.colors.secondaryLight,
        }}
      />
      <Search
        viewProps={{ style: { position: "absolute", bottom: 160, right: 116 } }}
        svgProps={{ stroke: theme.colors.secondaryLight }}
      />
      <CircleGrid
        rows={3}
        columns={2}
        circleColor={theme.colors.primaryLight}
        {...{ position: "absolute", bottom: 150, right: 50 }}
      />
      <CircleGrid
        rows={3}
        columns={2}
        circleColor={theme.colors.primaryLight}
        {...{ position: "absolute", top: 190, right: 54 }}
      />
      <CircleGrid
        rows={6}
        columns={4}
        circleColor={theme.colors.primaryLight}
        {...{ position: "absolute", top: 88, left: 100 }}
      />
      <CircleGrid
        rows={4}
        columns={6}
        circleColor={theme.colors.primaryLight}
        {...{ position: "absolute", bottom: 170, left: 40 }}
      />
      <OutlinedCheck />
      <Text {...titleStyles}>{title}</Text>
      <Text {...descriptionStyles}>{description}</Text>
      <Button {...{ onPress }} extraButtonStyles={stylesheet.button}>
        <Text {...buttonLabelStyles}>{buttonLabel}</Text>
      </Button>
    </Box>
  );
};

export default React.memo(Success);
