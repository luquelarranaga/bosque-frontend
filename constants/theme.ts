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
  background: string; // Fallback solid color
  backgroundGradient: GradientColors;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
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
  background: "#DEFFCE",
  backgroundGradient: {
    start: "#DEFFCE", // Pure white
    end: "#589D58", // Very light blue-gray
    angle: 270, // Top to bottom
  },
  tint: "#020202",
  icon: "#070707",
  tabIconDefault: "#687076",
  tabIconSelected: "#232423",
};

const DarkModePalette: ThemePalette = {
  text: "#D4EEDB",
  background: "#2B3525",
  backgroundGradient: {
    start: "#2B3525", // Pure white
    end: "#0E190E", // Very light blue-gray
    angle: 270, // Top to bottom
  },
  tint: "#0a7ea4",
  icon: "#687076",
  tabIconDefault: "#687076",
  tabIconSelected: "#0a7ea4",
};

// const tintColorLight = "#0a7ea4";
// const tintColorDark = "#fff";

export function getThemePalette(colorMode: ThemeMode): ThemePalette {
  return colorMode === "light" ? LightModePalette : DarkModePalette;
}

export const Colors = {
  light: LightModePalette,
  dark: DarkModePalette,
};
