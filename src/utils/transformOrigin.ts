import { Vector } from "react-native-redash";
import { Transforms2d } from "react-native-redash/lib/typescript/v1";

export const transformOrigin = (
  { x, y }: Vector,
  ...transformations: Transforms2d
): Transforms2d => {
  "worklet";
  return [
    { translateX: x },
    { translateY: y },
    ...transformations,
    { translateX: x * -1 },
    { translateY: y * -1 },
  ];
};
