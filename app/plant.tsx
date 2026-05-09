import { StyleSheet } from "react-native";

import { GradientBackground } from "@/components/GradientBackground";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface Plant {
  plant_id: number;
  species: string;
  coordinates: string;
  created_at: Date;
}

interface PlantImage {
  plant_id: number;
  species: string;
  date_taken: string;
  img_url: string;
}

interface PlantLogs {
  log_id: number;
  plant_id: number;
  created_at: string;
  body: string;
}

type RootStackParamList = {
  plant: { plantId: number };
};

export default function Plant() {
  const route = useRoute<RouteProp<RootStackParamList, "plant">>();

  const { plantId } = route.params;

  const [plant, setPlant] = useState<Plant | null>(null);
  const [images, setImages] = useState<PlantImage[]>([]);
  const [logs, setLogs] = useState<PlantLogs[]>([]);

  useEffect(() => {
    async function getPlant() {
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
      }
    }
    getPlant();
  }, []);

  if (images && plant) {
    return (
      <SafeAreaProvider>
        <GradientBackground>
          <View style={styles.safeArea}>
            <Image
              source={{ uri: images[0].img_url }}
              style={styles.plantImage}
            />
          </View>
        </GradientBackground>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#574f4941",
    width: 350,
    height: 100,
    marginTop: 30,
    borderRadius: 8,
  },
  plantImage: {
    resizeMode: "cover",
    width: 300,
    height: 300,
    borderRadius: 8,
    marginTop: 25,
  },
});
