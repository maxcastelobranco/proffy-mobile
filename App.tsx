import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@shopify/restyle";

import { fonts } from "./assets/fonts";
import LoadAssets from "./src/components/static/LoadAssets";
import { AppProvider } from "./src/context";
import theme from "./src/theme";
import AppStackNavigator from "./src/routes";

export default function App() {
  return (
    <LoadAssets {...{ fonts }}>
      <AppProvider>
        <ThemeProvider {...{ theme }}>
          <StatusBar hidden />
          <AppStackNavigator />
        </ThemeProvider>
      </AppProvider>
    </LoadAssets>
  );
}
