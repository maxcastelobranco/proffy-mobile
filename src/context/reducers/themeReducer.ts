import { Reducer } from "react";

import { ActionMap, AppActions } from "../types";

export enum ThemeOptions {
  Light = "LIGHT",
  Dark = "DARK",
}

export type ThemeState = {
  current: ThemeOptions;
};

export enum ThemeActionTypes {
  Toggle = "TOGGLE",
}

type ThemeActionPayloads = {
  [ThemeActionTypes.Toggle]: undefined;
};

export type ThemeActions = ActionMap<ThemeActionPayloads>[keyof ActionMap<
  ThemeActionPayloads
>];

export const themeReducer: Reducer<ThemeState, AppActions> = (
  state,
  action
) => {
  switch (action.type) {
    case ThemeActionTypes.Toggle:
      return {
        current:
          state.current === ThemeOptions.Dark
            ? ThemeOptions.Light
            : ThemeOptions.Dark,
      };
    default:
      return state;
  }
};
