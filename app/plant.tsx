import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

import { DeletePlantModal } from "@/components/DeletePlantModal";
import { GradientBackground } from "@/components/GradientBackground";
import LogsView from "@/components/LogsView";
import { PlantImageCarousel } from "@/components/PlantImageCarousel";
import { PostLogModal } from "@/components/PostLogModal";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@/hooks/use-theme";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface Plant {
  plant_id: number;
  species: string;
  latitude: number;
  longitude: number;
  created_at: Date;
}

interface PlantImage {
  plant_id: number;
  species: string;
  image_date: string;
  img_url: string;
}

interface PlantLogs {
  log_id: number;
  plant_id: number;
  log_date: string;
  body: string;
}

type RootStackParamList = {
  plant: {
    plantId: number;
  };
};

export default function Plant() {
  const { palette } = useTheme();

  const route = useRoute<RouteProp<RootStackParamList, "plant">>();

  const { plantId } = route.params;

  const [plant, setPlant] = useState<Plant | null>(null);
  const [images, setImages] = useState<PlantImage[]>([]);
  const [logs, setLogs] = useState<PlantLogs[]>([]);
  const [postLogVisible, setPostLogVisible] = useState<boolean>(false);
  const [deletePlantVisible, setDeletePlantVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPlant() {
      setIsLoading(true);
      try {
        const [plantRes, imageRes, plantLogs] = await Promise.all([
          axios<{ plant: Plant }>(
            `https://bosque-comestible-backend.onrender.com/api/plants/${plantId}`,
          ),
          axios<{ images: PlantImage[] }>(
            `https://bosque-comestible-backend.onrender.com/api/plants/${plantId}/images`,
          ),
          axios<{ logs: PlantLogs[] }>(
            `https://bosque-comestible-backend.onrender.com/api/plants/${plantId}/logs`,
          ),
        ]);
        const { plant } = plantRes.data;
        const { images } = imageRes.data;
        const { logs } = plantLogs.data;

        setPlant(plant);
        setImages(images);
        setLogs(logs);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    getPlant();
  }, [plantId]);

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <GradientBackground>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={palette.tint} />
          </View>
        </GradientBackground>
      </SafeAreaProvider>
    );
  }

  if (plant) {
    return (
      <SafeAreaProvider>
        <GradientBackground>
          <Pressable
            onPress={() => {
              setDeletePlantVisible(true);
            }}
            style={styles.deleteButton}
          >
            <IconSymbol size={28} name="bin.xmark" color="white" />
          </Pressable>

          <View style={styles.safeArea}>
            <PlantImageCarousel images={images} />

            <LogsView logs={logs} setLogs={setLogs} />
            <Pressable
              onPress={() => {
                setPostLogVisible(true);
              }}
              style={{ position: "absolute", bottom: "4%", left: "65%" }}
            >
              <Text
                style={[
                  styles.button,
                  { backgroundColor: palette.button, color: palette.text },
                ]}
              >
                +
              </Text>
            </Pressable>
            <Modal
              animationType="slide"
              visible={postLogVisible}
              transparent={true}
            >
              <PostLogModal
                setPostLogVisible={setPostLogVisible}
                plantId={plant.plant_id}
                setLogs={setLogs}
                logs={logs}
              />
            </Modal>
            <Modal
              animationType="slide"
              visible={deletePlantVisible}
              transparent={true}
            >
              <DeletePlantModal
                setDeletePlantVisible={setDeletePlantVisible}
                plantId={plant.plant_id}
              />
            </Modal>
          </View>
        </GradientBackground>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#574f4941",
    width: "90%",
    height: 100,
    marginTop: "2.5%",
    borderRadius: 8,
  },
  button: {
    paddingHorizontal: "10%",
    paddingVertical: "0.5%",
    borderRadius: 10,
    fontSize: 40,
  },
  deleteButton: {
    backgroundColor: "#a41b1b",
    borderRadius: 25,
    width: 60,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    alignSelf: "flex-end",
    marginRight: "5%",
    marginTop: "2.5%",
  },
  deleteText: {
    color: "white",
    textAlign: "center",
  },
});
