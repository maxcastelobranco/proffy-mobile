import { Reducer } from "react";

import { ActionMap, AppActions } from "../types";

export interface TeacherSchedule {
  weekday: string;
  from: number;
  to: number;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  whatsapp: string;
  bio: string;
  isTeacher: boolean;
  subject?: boolean;
  perHourCost?: boolean;
  schedule?: TeacherSchedule[];
  favoriteTeachersIds?: string[];
}

export type AuthenticationState = {
  loading: boolean;
  error: string;
  user: User;
};

enum AuthenticationActionTypes {
  Login = "LOGIN",
  LoginFailed = "LOGIN_FAILED",
  LoginSucceeded = "LOGIN_SUCCEEDED",
  UpdateUser = "UPDATE_USER",
}

type AuthenticationActionPayloads = {
  [AuthenticationActionTypes.Login]: undefined;
  [AuthenticationActionTypes.LoginFailed]: undefined;
  [AuthenticationActionTypes.LoginSucceeded]: User;
  [AuthenticationActionTypes.UpdateUser]: Partial<User>;
};

export type AuthenticationActions = ActionMap<
  AuthenticationActionPayloads
>[keyof ActionMap<AuthenticationActionPayloads>];

export const authenticationReducer: Reducer<AuthenticationState, AppActions> = (
  state,
  action
) => {
  switch (action.type) {
    case AuthenticationActionTypes.Login:
      return {
        ...state,
        loading: true,
      };
    case AuthenticationActionTypes.LoginFailed:
      return {
        ...state,
        loading: false,
        error: "Invalid email/password combination",
      };
    case AuthenticationActionTypes.LoginSucceeded:
      return {
        ...state,
        loading: false,
        error: "",
        user: action.payload,
      };
    case AuthenticationActionTypes.UpdateUser:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
