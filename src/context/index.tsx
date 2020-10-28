import React, {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useReducer,
} from "react";

import { activeIllustrationReducer } from "./reducers/activeIllustrationReducer";
import { authenticationReducer } from "./reducers/authenticationReducer";
import { AppActions, InitialAppState } from "./types";

const initialState: InitialAppState = {
  activeIllustration: {
    name: "onBoardingIllustration",
  },
  authentication: {
    error: "",
    loading: false,
    user: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      avatarUrl: "",
      whatsapp: "",
      bio: "",
      isTeacher: false,
    },
  },
};

const AppContext = createContext<{
  state: InitialAppState;
  dispatch: Dispatch<AppActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer: Reducer<InitialAppState, AppActions> = (
  { activeIllustration, authentication }: InitialAppState,
  action: AppActions
) => ({
  activeIllustration: activeIllustrationReducer(activeIllustration, action),
  authentication: authenticationReducer(authentication, action),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
