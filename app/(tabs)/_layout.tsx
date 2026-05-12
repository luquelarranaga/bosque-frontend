import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@/hooks/use-theme";

export default function TabLayout() {
  // const colorScheme = useColorScheme();
  const { palette, colorScheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: palette.tabIconSelected,
        tabBarInactiveTintColor: palette.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: palette.tabBar,
          backdropFilter: "blur(20px)",
          borderTopWidth: 1,
          borderTopColor: colorScheme === "light" ? "#FFFFFF80" : "#14141E99",
          elevation: 0,
          position: "absolute",
          height: 50,
          borderRadius: 40,
          marginBottom: 40,
          marginLeft: 30,
          marginRight: 30,
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="plantas"
        options={{
          title: "Plantas",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="tree.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Mapa",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="map.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
