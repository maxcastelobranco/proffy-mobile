import React from "react";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Feather, FontAwesome } from "@expo/vector-icons";

import TabBar from "../screens/home/Study/components/TabBar";
import TeacherList from "../screens/home/Study/TeacherList";
import Favorites from "../screens/home/Study/Favorites";

import { HomeRoutes } from "./home";

export type Tabs = {
  TeacherList: undefined;
  Favorites: undefined;
};

export interface TabNavigationProps<RouteName extends keyof Tabs> {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<Tabs, RouteName>,
    StackNavigationProp<HomeRoutes, "Landing">
  >;
  route: RouteProp<Tabs, RouteName>;
}

const StudyTabs = createBottomTabNavigator<Tabs>();

const StudyTabsNavigator: React.FC = () => {
  return (
    <StudyTabs.Navigator tabBar={(props) => <TabBar {...props} />}>
      <StudyTabs.Screen
        name="TeacherList"
        component={TeacherList}
        options={{
          tabBarLabel: "Proffys",
          tabBarIcon: ({ size, color }) => (
            <Feather name="tv" {...{ size, color }} />
          ),
        }}
      />
      <StudyTabs.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <FontAwesome name="heart" {...{ size, color }} />
            ) : (
              <Feather name="heart" {...{ size, color }} />
            ),
        }}
      />
    </StudyTabs.Navigator>
  );
};

export default StudyTabsNavigator;
