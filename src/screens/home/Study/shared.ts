import { Dimensions } from "react-native";

import { CARD_HEIGHT, CARD_WIDTH } from "./components/TeacherCard/styles";

export interface FormValues {
  subject: string;
  weekday: string;
  hour: string;
}

const { height } = Dimensions.get("window");

export const HEADER_CONTAINER_HEIGHT = height * 0.42;
export const ALPHA = Math.PI / 12;
export const DELTA_X = CARD_WIDTH / 2;
export const MAX_TRANSLATE = Math.round(
  CARD_WIDTH * Math.cos(ALPHA) + CARD_HEIGHT * Math.sin(ALPHA)
);
export const SNAP_POINTS = [-MAX_TRANSLATE, 0, MAX_TRANSLATE];
