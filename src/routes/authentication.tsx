import React from "react";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

import OnBoarding from "../screens/authentication/OnBoarding";
import Login from "../screens/authentication/Login";

import { HomeRoutes } from "./home";

export type AuthenticationRoutes = {
  OnBoarding: undefined;
  Login: undefined;
  SignUp: undefined;
  SignUpSuccessful: undefined;
  ResetPassword: undefined;
  ResetPasswordSuccessful: undefined;
};

export interface AuthenticationNavigationProps<
  RouteName extends keyof AuthenticationRoutes
> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthenticationRoutes, RouteName>,
    StackNavigationProp<HomeRoutes, "Landing">
  >;
  route: RouteProp<AuthenticationRoutes, RouteName>;
}

const AuthenticationStack = createStackNavigator<AuthenticationRoutes>();

const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="OnBoarding" component={OnBoarding} />
      <AuthenticationStack.Screen name="Login" component={Login} />
      {/*<AuthenticationStack.Screen name="SignUp" component={SignUp} />*/}
      {/*<AuthenticationStack.Screen*/}
      {/*    name="SignUpSuccessful"*/}
      {/*    component={SignUpSuccessful}*/}
      {/*/>*/}
      {/*<AuthenticationStack.Screen*/}
      {/*    name="ResetPassword"*/}
      {/*    component={ResetPassword}*/}
      {/*/>*/}
      {/*<AuthenticationStack.Screen*/}
      {/*    name="ResetPasswordSuccessful"*/}
      {/*    component={ResetPasswordSuccessful}*/}
      {/*/>*/}
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationNavigator;
