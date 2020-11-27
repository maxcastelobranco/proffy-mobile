import React, { useEffect, useState } from "react";
import * as faker from "faker";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { FlatList } from "react-native";

import Accordion from "../../../Accordion";
import { Box } from "../../../../../../theme";
import responsivePixelSize from "../../../../../../utils/responsivePixelSize";
import SlideInView, {
  MountState,
} from "../../../../../../components/animated/SlideInView";
import { BaseControllerProps } from "../../../../../../utils/types";

import Schedule from "./components/Schedule";
import { useStyles } from "./styles";
import { Weekday } from "./components/WeekdayController/weekdays";
import AddButton from "./components/AddButton";
import DeleteButton from "./components/DeleteButton";

interface AvailableHoursProps extends BaseControllerProps {
  flatListRef: React.RefObject<FlatList>;
}

export interface ScheduleItem {
  id: string;
  mountState: MountState;
  weekday: Weekday;
  from: number;
  to: number;
}

const ICON_SIZE = responsivePixelSize(24);

const AvailableHours: React.FC<AvailableHoursProps> = ({
  control,
  flatListRef,
}) => {
  // const {
  //   state: {
  //     authentication: { user },
  //   },
  // } = useAppContext();
  // user.schedule
  //     ? user.schedule.map(({ weekday, from, to }) => ({
  //       id: faker.random.uuid(),
  //       mountState: "mounting",
  //       weekday,
  //       from,
  //       to,
  //     }))
  //     : [
  //       {
  //         id: faker.random.uuid(),
  //         mountState: "mounting",
  //         weekday: "monday",
  //         from: 8,
  //         to: 18,
  //       },
  //     ]
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    {
      id: faker.random.uuid(),
      mountState: "mounting",
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

  useEffect(() => {
    setScheduleItems((prevState) =>
      prevState.filter(({ mountState }) => mountState !== "unmounted")
    );
  }, []);

  useEffect(() => {
    const toValue =
      scheduleItems.filter(({ mountState }) => mountState !== "unmounted")
        .length * CONTAINER_HEIGHT;

    height.value = withTiming(toValue);
  }, [CONTAINER_HEIGHT, height, scheduleItems, scheduleItems.length]);

  return (
    <Accordion
      label="Available hours"
      labelButton={<AddButton onPress={addScheduleItem} iconSize={ICON_SIZE} />}
      {...{ height, childrenHeight }}
    >
      {scheduleItems.map(({ id, mountState, weekday, from, to }) => (
        <Box key={id}>
          {mountState !== "unmounted" && (
            <SlideInView<ScheduleItem>
              state={scheduleItems}
              setState={setScheduleItems}
              viewHeight={CONTAINER_HEIGHT}
              {...{ id, flatListRef }}
            >
              <Box {...containerStyles}>
                <Schedule {...{ control, id, weekday, from, to }} />
                <DeleteButton
                  onPress={() => deleteScheduleItem(id)}
                  iconSize={ICON_SIZE}
                />
              </Box>
            </SlideInView>
          )}
        </Box>
      ))}
    </Accordion>
  );
};

export default AvailableHours;
