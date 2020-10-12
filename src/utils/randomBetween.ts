export const randomBetween = (min: number, max: number) => {
  "worklet";
  return Math.floor(Math.random() * (max - min + 1) + min);
};
