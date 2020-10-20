import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthenticationNavigator from "./authentication";
import HomeNavigator from "./home";

export type AppRoutes = {
  Authentication: undefined;
  Home: undefined;
};

const AppStack = createStackNavigator<AppRoutes>();

export const AppStackNavigator = () => {
  return (
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen
        name="Authentication"
        component={AuthenticationNavigator}
      />
      <AppStack.Screen name="Home" component={HomeNavigator} />
    </AppStack.Navigator>
  );
};
