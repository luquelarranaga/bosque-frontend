import { Pressable, StyleSheet } from "react-native";

import { GradientBackground } from "@/components/GradientBackground";
import { PostPlantModal } from "@/components/PostPlantModal";
import { Typography } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import { Image, Modal, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { palette } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);

  const currentTime = new Date().getHours();
  const greeting = currentTime < 12 ? "Buenos dias" : currentTime < 20 ? "Buenas tardes" : "Buenas noches";

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
              {greeting}, Bernardo
            </Text>
          </View>
          <View style={styles.addPlant}>
            <Pressable onPress={() => setModalVisible(true)}>
              <Image
                source={require("@/assets/images/seed.png")}
                style={styles.seed}
              />
            </Pressable>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <PostPlantModal setModalVisible={setModalVisible} />
          </Modal>
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
    marginHorizontal: 30,
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
  modal: {
    width: 200,
    height: 200,
  },
});
