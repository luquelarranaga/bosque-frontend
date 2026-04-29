import { StyleSheet } from "react-native";

import { GradientBackground } from "@/components/GradientBackground";
import { Typography } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Link } from "@react-navigation/native";
import { Image, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { palette } = useTheme();
  return (
    <SafeAreaProvider>
      <GradientBackground>
        <SafeAreaView style={styles.safeArea}>
          <View>
            <Text
              style={[
                Typography.heading,
                styles.greeting,
                { color: palette.text },
              ]}
            >
              Buenos dias, Bernardo
            </Text>
          </View>
          <View style={styles.addPlant}>
            <Link screen="map">
              <Image
                source={require("@/assets/images/seed.png")}
                style={styles.seed}
              />
            </Link>
          </View>
        </SafeAreaView>
      </GradientBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  greeting: {
    marginTop: 40,
    marginLeft: 40,
  },
  addPlant: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  seed: {
    resizeMode: "contain",
    height: 200,
  },
});
