import {
  ActiveIllustrationActions,
  ActiveIllustrationState,
} from "./reducers/activeIllustrationReducer";
import {
  AuthenticationActions,
  AuthenticationState,
} from "./reducers/authenticationReducer";

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

export type AppActions = ActiveIllustrationActions | AuthenticationActions;
export type InitialAppState = {
  activeIllustration: ActiveIllustrationState;
  authentication: AuthenticationState;
};
