import { StyleSheet } from "react-native";

import { GradientBackground } from "@/components/GradientBackground";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Map() {
  return (
    <SafeAreaProvider>
      <GradientBackground>
        <SafeAreaView style={styles.safeArea}></SafeAreaView>
      </GradientBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
