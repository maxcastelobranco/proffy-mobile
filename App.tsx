import "react-native-gesture-handler";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@shopify/restyle";

import { fonts } from "./assets/fonts";
import { assets } from "./assets/images";
import LoadAssets from "./src/components/static/LoadAssets";
import theme, { darkTheme } from "./src/theme";
import { AppStackNavigator } from "./src/routes";
import { DisplayOnBoardingIllustrationProvider } from "./src/hooks/useDisplayOnBoardingIllustration";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <LoadAssets {...{ fonts, assets }}>
      <ThemeProvider theme={darkMode ? darkTheme : theme}>
        <DisplayOnBoardingIllustrationProvider>
          <StatusBar hidden />
          <AppStackNavigator />
        </DisplayOnBoardingIllustrationProvider>
      </ThemeProvider>
    </LoadAssets>
  );
}
