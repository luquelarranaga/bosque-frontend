import { getThemePalette } from "@/constants/theme";
import { useColorScheme as useRNColorScheme } from "react-native";

export function useTheme() {
  const colorScheme = useRNColorScheme() ?? "light";
  const palette = getThemePalette(colorScheme);

  return {
    palette,
    colorScheme,
  };
}
