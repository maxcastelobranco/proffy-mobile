import { Reducer } from "react";

import { ActionMap, AppActions } from "../types";

type IllustrationNames =
  | "onBoardingIllustration"
  | "loginIllustration"
  | "signUpSuccessIllustration"
  | "forgotPasswordIllustration"
  | "forgotPasswordSuccessIllustration"
  | "homeIllustration"
  | "profileIllustration"
  | "teacherSignUpIllustration";

export type ActiveIllustrationState = {
  name: IllustrationNames;
};

enum ActiveIllustrationActionTypes {
  Update = "UPDATE_ACTIVE_ILLUSTRATION",
}

type ActiveIllustrationActionPayloads = {
  [ActiveIllustrationActionTypes.Update]: {
    name: IllustrationNames;
  };
};

export type ActiveIllustrationActions = ActionMap<
  ActiveIllustrationActionPayloads
>[keyof ActiveIllustrationActionPayloads];

export const activeIllustrationReducer: Reducer<
  ActiveIllustrationState,
  AppActions
> = (state, action) => {
  switch (action.type) {
    case ActiveIllustrationActionTypes.Update:
      return {
        name: action.payload.name,
      };
    default:
      return state;
  }
};
