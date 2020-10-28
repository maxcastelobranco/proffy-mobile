import React, { useState } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import * as faker from "faker";

import Accordion from "../../../Accordion";
import { Theme, Text, Box } from "../../../../../../theme";
import responsivePixelSize from "../../../../../../utils/responsivePixelSize";
import RippleButton from "../../../../../../components/static/RippleButton";

import Schedule from "./components/Schedule";
import { useStyles } from "./styles";

interface AvailableHoursProps {
  control: Control;
  errors: FieldErrors;
}

const ICON_SIZE = responsivePixelSize(24);
const initialId = faker.random.uuid();

const AvailableHours: React.FC<AvailableHoursProps> = ({ control }) => {
  const theme = useTheme<Theme>();
  const { containerStyles, buttonStyles, buttonTextStyles } = useStyles();

  const [scheduleItemIds, setScheduleItemIds] = useState([initialId]);

  const addScheduleItem = () => {
    const newScheduleItemId = faker.random.uuid();
    setScheduleItemIds((prevState) => [...prevState, newScheduleItemId]);
  };
  const deleteScheduleItem = (id: string) => {
    setScheduleItemIds((prevState) =>
      prevState.filter((prevId) => prevId !== id)
    );
  };

  const labelButton = (
    <RippleButton onPress={addScheduleItem} extraButtonStyles={buttonStyles}>
      <Feather
        name="plus-square"
        size={ICON_SIZE}
        color={theme.colors.primaryDark}
      />
      <Text {...buttonTextStyles} color="primaryDark">
        New
      </Text>
    </RippleButton>
  );

  return (
    <Accordion label="Available hours" {...{ labelButton }}>
      {scheduleItemIds.map((id) => (
        <Box key={id} {...containerStyles}>
          <Schedule {...{ control, id }} />
          <RippleButton
            onPress={() => deleteScheduleItem(id)}
            extraButtonStyles={buttonStyles}
          >
            <Feather
              name="trash-2"
              size={ICON_SIZE}
              color={theme.colors.danger}
            />
            <Text {...buttonTextStyles} color="danger">
              Delete
            </Text>
          </RippleButton>
        </Box>
      ))}
    </Accordion>
  );
};

export default AvailableHours;
