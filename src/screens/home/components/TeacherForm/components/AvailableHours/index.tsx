import React, { useEffect, useState } from "react";
import * as faker from "faker";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { FlatList } from "react-native";

import Accordion from "../../../Accordion";
import { Box } from "../../../../../../theme";
import responsivePixelSize from "../../../../../../utils/responsivePixelSize";
import { TeacherFormProps } from "../../index";

import Schedule from "./components/Schedule";
import { useStyles } from "./styles";
import { Weekday } from "./components/WeekdayController/weekdays";
import AddButton from "./components/AddButton";
import DeleteButton from "./components/DeleteButton";

interface AvailableHoursProps extends TeacherFormProps {
  flatListRef: React.RefObject<FlatList>;
}

export interface ScheduleItem {
  id: string;
  weekday: Weekday;
  from: number;
  to: number;
}

const ICON_SIZE = responsivePixelSize(24);

const AvailableHours: React.FC<AvailableHoursProps> = ({
  control,
  flatListRef,
}) => {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    {
      id: faker.random.uuid(),
      weekday: "monday",
      from: 8,
      to: 18,
    },
  ]);

  const addScheduleItem = () => {
    setScheduleItems((prevState) => [
      ...prevState,
      {
        id: faker.random.uuid(),
        mountState: "mounting",
        weekday: "monday",
        from: 8,
        to: 18,
      },
    ]);
  };
  const deleteScheduleItem = (id: string) => {
    setScheduleItems((prevState) =>
      prevState?.map((item) =>
        item.id === id
          ? {
              ...item,
              mountState: "unmounting",
            }
          : item
      )
    );
  };

  const { containerStyles, CONTAINER_HEIGHT } = useStyles();

  const childrenHeight = scheduleItems.length * CONTAINER_HEIGHT;
  const height = useSharedValue(0);

  return (
    <Accordion
      label="Available hours"
      labelButton={<AddButton onPress={addScheduleItem} iconSize={ICON_SIZE} />}
      {...{ height, childrenHeight }}
    >
      {scheduleItems.map(({ id, weekday, from, to }) => (
        <Box key={id} {...containerStyles}>
          <Schedule {...{ control, id, weekday, from, to }} />
          <DeleteButton
            onPress={() => deleteScheduleItem(id)}
            iconSize={ICON_SIZE}
          />
        </Box>
      ))}
    </Accordion>
  );
};

export default AvailableHours;
