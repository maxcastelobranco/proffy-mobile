import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";

import Landing from "../screens/home/Landing";

import { Tabs } from "./tabs";

export type HomeRoutes = {
  Landing: undefined;
  Profile: undefined;
  Study: undefined;
  Teach: undefined;
  TeacherRegistrationSuccessful: undefined;
};

export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<HomeRoutes, RouteName>,
    BottomTabNavigationProp<Tabs, "TeacherList">
  >;
  route: RouteProp<HomeRoutes, RouteName>;
}

const HomeStack = createStackNavigator<HomeRoutes>();

const HomeNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Landing" component={Landing} />
      {/*<HomeStack.Screen name="Profile" component={Profile} />*/}
      {/*<HomeStack.Screen name="Study" component={StudyTabsNavigator} />*/}
      {/*<HomeStack.Screen name="Teach" component={Teach} />*/}
      {/*<HomeStack.Screen*/}
      {/*    name="TeacherRegistrationSuccessful"*/}
      {/*    component={TeacherRegistrationSuccessful}*/}
      {/*/>*/}
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
