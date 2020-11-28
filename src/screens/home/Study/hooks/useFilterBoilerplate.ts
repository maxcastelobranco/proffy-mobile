import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { AxiosResponse } from "axios";

import { FormValues } from "../shared";
import { User } from "../../../../context/reducers/authenticationReducer";

interface FilterBoilerplateParams {
  opacity: Animated.SharedValue<number>;
  scale: Animated.SharedValue<number>;
  skeletonOpacity: Animated.SharedValue<number>;
  timingConfig: Animated.WithTimingConfig;
  getAllTeachers?(): Promise<AxiosResponse<User[]>>;
  getFavoriteTeachers?(): Promise<AxiosResponse<User[]>[]>;
  updateTeachers: React.Dispatch<React.SetStateAction<User[]>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const useFilterBoilerplate = ({
  opacity,
  scale,
  skeletonOpacity,
  timingConfig,
  getAllTeachers,
  getFavoriteTeachers,
  updateTeachers,
  setIndex,
}: FilterBoilerplateParams) => {
  const showFilter = useSharedValue(0);
  const { control, errors, handleSubmit } = useForm({
    mode: "onSubmit",
    criteriaMode: "all",
  });
  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    showFilter.value = withTiming(0, timingConfig);
    opacity.value = withTiming(0, timingConfig);
    scale.value = withSpring(0);
    skeletonOpacity.value = withTiming(1, timingConfig);

    if (getAllTeachers) {
      const { data } = await getAllTeachers();

      const filteredTeachers = data
        .filter((teacher) => {
          if (formData.subject === "") {
            return true;
          }
          return teacher.subject
            ?.toLowerCase()
            .includes(formData.subject.toLowerCase());
        })
        .filter((teacher) => {
          if (formData.weekday === "") {
            return true;
          }
          return teacher.schedule.find(
            (schedule) => schedule.weekday === formData.weekday
          );
        })
        .filter((teacher) => {
          if (formData.hour === "") {
            return true;
          }
          return teacher.schedule.find(
            (schedule) => schedule.from === Number(formData.hour)
          );
        });
      updateTeachers(filteredTeachers);
    } else if (getFavoriteTeachers) {
      const responses = await getFavoriteTeachers();

      const filteredTeachers = responses
        .map((response) => response.data[0])
        .filter((teacher) => {
          if (formData.subject === "") {
            return true;
          }
          return teacher.subject
            ?.toLowerCase()
            .includes(formData.subject.toLowerCase());
        })
        .filter((teacher) => {
          if (formData.weekday === "") {
            return true;
          }
          return teacher.schedule.find(
            (schedule) => schedule.weekday === formData.weekday
          );
        })
        .filter((teacher) => {
          if (formData.hour === "") {
            return true;
          }
          return teacher.schedule.find(
            (schedule) => schedule.from === Number(formData.hour)
          );
        });
      updateTeachers(filteredTeachers);
    }
    setIndex(0);

    skeletonOpacity.value = withTiming(0, timingConfig, () => {
      opacity.value = withTiming(1, timingConfig);
      scale.value = withSpring(1);
    });
  };

  return {
    showFilter,
    control,
    errors,
    filterTeachers: handleSubmit(onSubmit),
  };
};
