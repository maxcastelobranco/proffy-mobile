import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { format } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RectButton } from "react-native-gesture-handler";

import { Box, Text } from "../../../../../../../../theme";

import { useStyles } from "./styles";

interface HourControllerProps {
  control: Control;
  label: string;
  defaultValue: number;
}

const HourController: React.FC<HourControllerProps> = ({
  control,
  label,
  defaultValue,
}) => {
  const DEFAULT_DATE = new Date(2020, 0, 1, defaultValue);
  const [value, setValue] = useState(DEFAULT_DATE);
  const [show, setShow] = useState(false);

  const handleChange = (
    date: Date | undefined,
    onChange: (date: Date) => void
  ) => {
    setShow(false);
    if (date) {
      onChange(date);
      setValue(date);
    }
  };

  const { labelStyles, chooseTextStyles, valueContainerStyles } = useStyles();

  return (
    <Controller
      {...{ control }}
      name={label.toLowerCase()}
      defaultValue={DEFAULT_DATE}
      render={({ onChange }) => (
        <Box marginVertical="s">
          <RectButton onPress={() => setShow(true)}>
            <Text {...labelStyles}>{label.split(":")[0]}</Text>
            <Box {...valueContainerStyles}>
              <Text {...chooseTextStyles}>{format(value, "p")}</Text>
            </Box>
          </RectButton>
          {show && (
            <DateTimePicker
              {...{ value }}
              mode="time"
              display="spinner"
              onChange={(_, date) => handleChange(date, onChange)}
            />
          )}
        </Box>
      )}
    />
  );
};

export default HourController;
