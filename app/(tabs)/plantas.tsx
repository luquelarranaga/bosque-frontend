import { StyleSheet } from "react-native";

import { GradientBackground } from "@/components/GradientBackground";
import { PlantCard } from "@/components/PlantCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface DisplayImage {
  plant_id: number;
  date_taken: string;
  img_url: string;
}

export default function Plantas() {
  const [plantImages, setPlantImages] = useState<DisplayImage[]>([]);

  useEffect(() => {
    async function getPlants() {
      try {
        const { data } = await axios<{ displayImages: DisplayImage[] }>(
          "https://bosque-comestible-backend.onrender.com/api/images/display_images",
        );
        const { displayImages } = data;
        console.log("display images >> ", displayImages);
        setPlantImages(displayImages);
      } catch (err) {
        console.log(err);
      }
    }
    getPlants();
  }, []);

  return (
    <SafeAreaProvider>
      <GradientBackground>
        <SafeAreaView style={styles.safeArea}>
          <FlatList<DisplayImage>
            contentContainerStyle={styles.plantContainer}
            data={plantImages}
            numColumns={2}
            keyExtractor={(item) => item.plant_id.toString()}
            renderItem={({ item }) => (
              <View>
                <PlantCard imageUrl={item.img_url} plantId={item.plant_id} />
              </View>
            )}
          />
        </SafeAreaView>
      </GradientBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  plantContainer: {
    alignItems: "center",
  },
});
