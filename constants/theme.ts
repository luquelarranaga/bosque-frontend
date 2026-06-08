/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

export type ThemeMode = "light" | "dark";

export interface GradientColors {
  start: string;
  end: string;
  angle?: number;
}

export interface ThemePalette {
  text: string;
  text2: string;
  background: string; // Fallback solid color
  backgroundGradient: GradientColors;
  tint: string;
  tint2: string;
  tabIconDefault: string;
  tabIconSelected: string;
  tabBar: string;
  modal: string;
  textbox: string;
  textboxBorder: string;
  textOkay: string;
  button: string;
  placeholderText: string;
}

export interface TypographyStyle {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
}

export const Fonts = Platform.select({
  ios: {
    heading: "Ovo",

    subHeading: "Inter-Italic",
    body: "Inter",

    sans: "system-ui",
    mono: "ui-monospace",
  },
  default: {
    heading: "Playfair-Display-Bold",
    subHeading: "Inter-Italic",
    body: "Inter-Regular",
    sans: "Roboto",
    mono: "monospace",
  },
  web: {
    heading: "'Playfair Display', serif",
    subHeading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    sans: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    mono: "'Courier New', monospace",
  },
}) as {
  heading: string;
  subHeading: string;
  body: string;
  sans: string;
  mono: string;
};

export const Typography: Record<string, TypographyStyle> = {
  heading: {
    fontSize: 50,
    fontFamily: "Ovo",
    lineHeight: 60,
  },
  subheading: {
    fontSize: 40,
    fontFamily: "Inter-Italic",
    lineHeight: 40,
  },
  body: {
    fontSize: 18,
    fontFamily: "Inter",
    lineHeight: 20,
  },
  label: {
    fontSize: 20,
    fontFamily: "Inter",
    lineHeight: 20,
  },
};

const LightModePalette: ThemePalette = {
  text: "#444444",
  text2: "#f3ffef",
  background: "#DEFFCE",
  backgroundGradient: {
    start: "#DEFFCE",
    end: "#589D58",
    angle: 270,
  },
  tint: "#1e361e",
  tint2: "#426042",
  tabIconDefault: "#8f8f8f",
  tabIconSelected: "#213221",
  tabBar: "#FFFFFFA6",
  modal: "#ffffffec",
  textbox: "#ffffff",
  textboxBorder: "#d4d2d2",
  textOkay: "#6e9c49",
  button: "#bdcbbd",
  placeholderText: "#757272a6",
};

const DarkModePalette: ThemePalette = {
  text: "#D4EEDB",
  text2: "#1a241a",
  background: "#232e1f",
  backgroundGradient: {
    start: "#232e1f",
    end: "#0c1409",
    angle: 270,
  },
  tint: "#4e8c4e",
  tint2: "#395c39",
  tabIconDefault: "#526852",
  tabIconSelected: "#a8d4a8",
  tabBar: "#1e2b1ecc",
  modal: "#101210",
  textbox: "#2a3828",
  textboxBorder: "#3d4e3a",
  textOkay: "#b6eb8a",
  button: "#3a4e3acc",
  placeholderText: "#6a826a99",
};

export function getThemePalette(colorMode: ThemeMode): ThemePalette {
  return colorMode === "light" ? LightModePalette : DarkModePalette;
}

export const Colors = {
  light: LightModePalette,
  dark: DarkModePalette,
};
