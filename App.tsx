import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@shopify/restyle";

import { fonts } from "./assets/fonts";
import LoadAssets from "./src/components/static/LoadAssets";
import { AppStackNavigator } from "./src/routes";
import { AppProvider, useAppContext } from "./src/context";
import { ThemeOptions } from "./src/context/reducers/themeReducer";
import theme, { darkTheme } from "./src/theme";

export default function App() {
  const {
    state: {
      theme: { current },
    },
  } = useAppContext();

  return (
    <LoadAssets {...{ fonts }}>
      <AppProvider>
        <ThemeProvider
          theme={current === ThemeOptions.Dark ? darkTheme : theme}
        >
          <StatusBar hidden />
          <AppStackNavigator />
        </ThemeProvider>
      </AppProvider>
    </LoadAssets>
  );
}
