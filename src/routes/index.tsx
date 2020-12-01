import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";

import { useAppContext } from "../context";
import { AuthenticationActionTypes } from "../context/reducers/authenticationReducer";
import Loading from "../components/static/Loading";
import { Box } from "../theme";

import AuthenticationNavigator from "./authentication";
import HomeNavigator from "./home";

export type AppRoutes = {
  Authentication: undefined;
  Home: undefined;
};

const AppStack = createStackNavigator<AppRoutes>();

export const AppStackNavigator = () => {
  const { state, dispatch } = useAppContext();
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("@proffy:user").then((user) => {
      if (user) {
        dispatch({
          type: AuthenticationActionTypes.UpdateUser,
          payload: JSON.parse(user),
        });

        setLoadingUser(false);
      }

      setLoadingUser(false);
    });
  }, [dispatch]);

  return (
    <>
      {loadingUser ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Loading color="primaryDark" />
        </Box>
      ) : state.authentication.user.id.length ? (
        <AppStack.Navigator headerMode="none">
          <AppStack.Screen name="Home" component={HomeNavigator} />
        </AppStack.Navigator>
      ) : (
        <AppStack.Navigator headerMode="none">
          <AppStack.Screen
            name="Authentication"
            component={AuthenticationNavigator}
          />
        </AppStack.Navigator>
      )}
    </>
  );
};
