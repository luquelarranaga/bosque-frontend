import { useTheme } from "@/hooks/use-theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ViewProps } from "react-native";

interface GradientBackgroundProps extends ViewProps {
  children: React.ReactNode;
}

export function GradientBackground({
  children,
  style,
  ...props
}: GradientBackgroundProps) {
  const { palette } = useTheme();
  const { start, end, angle = 135 } = palette.backgroundGradient;

  const angleRad = (angle * Math.PI) / 180;
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);

  const startX = 0.5 + cos * 0.5;
  const startY = 0.5 + sin * 0.5;
  const endX = 0.5 - cos * 0.5;
  const endY = 0.5 - sin * 0.5;

  return (
    <LinearGradient
      colors={[start, end]}
      start={{ x: startX, y: startY }}
      end={{ x: endX, y: endY }}
      style={[{ flex: 1 }, style]}
      {...props}
    >
      {children}
    </LinearGradient>
  );
}
