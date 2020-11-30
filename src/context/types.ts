import {
  ActiveIllustrationActions,
  ActiveIllustrationState,
} from "./reducers/activeIllustrationReducer";
import {
  AuthenticationActions,
  AuthenticationState,
} from "./reducers/authenticationReducer";
import { ThemeActions, ThemeState } from "./reducers/themeReducer";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AppActions =
  | AuthenticationActions
  | ActiveIllustrationActions
  | ThemeActions;
export type InitialAppState = {
  activeIllustration: ActiveIllustrationState;
  authentication: AuthenticationState;
  theme: ThemeState;
};
