import { createBox, createText, createTheme } from "@shopify/restyle";

import responsivePixelSize from "../utils/responsivePixelSize";

const palette = {
  lightPurple: "#9871F5",
  purple: "#8257E5",
  mediumPurple: "#774DD6",
  darkPurple: "#6842C2",
  green: "#04D361",
  lightGreen: "#24EF7F",
  red: "#E33D3D",
  athensGray: "#E6E6F0",
  whisper: "#EBEBF5",
  lightWhisper: "#F0F0F7",
  white: "#FFFFFF",
  almostWhite: "#FAFAFA",
  mischka: "#DCDCE5",
  martinique: "#32264D",
  dolphin: "#6A6180",
  santasGray: "#9C98A6",
  graySuit: "#C1BCCC",
  melrose: "#D4C2FF",
  portage: "#A380F6",
};

const theme = createTheme({
  colors: {
    primary: palette.purple,
    primaryMedium: palette.mediumPurple,
    primaryLight: palette.lightPurple,
    primaryDark: palette.darkPurple,
    secondary: palette.green,
    secondaryLight: palette.lightGreen,
    danger: palette.red,
    title: palette.white,
    titleDark: palette.martinique,
    baseText: palette.melrose,
    baseTextDark: palette.dolphin,
    complementText: palette.portage,
    complementTextDark: palette.santasGray,
    inputText: palette.graySuit,
    background1: palette.athensGray,
    background2: palette.whisper,
    background3: palette.lightWhisper,
    background4: palette.almostWhite,
    background5: palette.mischka,
  },
  spacing: {
    zero: 0,
    xxs: responsivePixelSize(4),
    xs: responsivePixelSize(8),
    s: responsivePixelSize(16),
    ms: responsivePixelSize(24),
    m: responsivePixelSize(28),
    ml: responsivePixelSize(32),
    l: responsivePixelSize(40),
    xl: responsivePixelSize(80),
    xxl: responsivePixelSize(96),
  },
  borderRadii: {
    zero: 0,
    default: responsivePixelSize(8),
  },
  textVariants: {
    onBoardingNumeration: {
      fontFamily: "Poppins-Medium",
      fontSize: responsivePixelSize(40),
      color: "baseTextDark",
      opacity: 0.16,
    },
    onBoardingTitle: {
      fontFamily: "Poppins-Medium",
      fontSize: responsivePixelSize(24),
      lineHeight: responsivePixelSize(34),
      color: "baseTextDark",
    },
    logo: {
      fontFamily: "Archivo-SemiBold",
      fontSize: responsivePixelSize(20),
      color: "melrose",
    },
    successTitle: {
      fontFamily: "Archivo-Bold",
      fontSize: responsivePixelSize(32),
      lineHeight: responsivePixelSize(37),
      textAlign: "center",
      color: "title",
    },
    headerTitle: {
      fontFamily: "Archivo-Medium",
      fontSize: responsivePixelSize(16),
      color: "baseText",
    },
    regularTitle: {
      fontFamily: "Poppins-SemiBold",
      fontSize: responsivePixelSize(28),
      lineHeight: responsivePixelSize(34),
      color: "title",
    },
    smallTitle: {
      fontFamily: "Archivo-Bold",
      fontSize: responsivePixelSize(16),
      lineHeight: responsivePixelSize(21),
      color: "title",
    },
    buttons: {
      fontFamily: "Archivo-SemiBold",
      fontSize: responsivePixelSize(20),
      lineHeight: responsivePixelSize(24),
      color: "title",
    },
    regularTextSmall: {
      fontFamily: "Poppins-Regular",
      fontSize: responsivePixelSize(14),
      lineHeight: responsivePixelSize(24),
    },
    regularTextMedium: {
      fontFamily: "Poppins-Regular",
      fontSize: responsivePixelSize(16),
    },
    regularTextBig: {
      fontFamily: "Poppins-Regular",
      fontSize: responsivePixelSize(20),
    },
    usernameSmall: {
      fontFamily: "Poppins-Medium",
      fontSize: responsivePixelSize(14),
      lineHeight: responsivePixelSize(22),
      color: "baseText",
    },
    usernameBig: {
      fontFamily: "Archivo-Bold",
      fontSize: responsivePixelSize(24),
      lineHeight: responsivePixelSize(25),
      color: "title",
    },
  },
  breakpoints: {},
  zIndices: {},
});

export type Colors = keyof typeof theme.colors;
export type Theme = typeof theme;

export const darkTheme: Theme = {
  ...theme,
};

export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export default theme;
