import React, {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useReducer,
} from "react";

import {
  ActiveIllustrationState,
  ActiveIllustrationAction,
  activeIllustrationReducer,
} from "./reducers/activeIllustrationReducer";

type AppActions = ActiveIllustrationAction;
type InitialAppState = {
  activeIllustration: ActiveIllustrationState;
};

const initialState: InitialAppState = {
  activeIllustration: {
    name: "onBoardingIllustration",
  },
};

const AppContext = createContext<{
  state: InitialAppState;
  dispatch: Dispatch<ActiveIllustrationAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer: Reducer<InitialAppState, AppActions> = (
  { activeIllustration }: InitialAppState,
  action: ActiveIllustrationAction
) => ({
  activeIllustration: activeIllustrationReducer(activeIllustration, action),
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
