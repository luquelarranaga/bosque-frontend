import { GradientBackground } from "@/components/GradientBackground";
import { PlantImage } from "@/components/PlantImage";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface DisplayImage {
  plant_id: number;
  species: string;
  date_taken: string;
  img_url: string;
}

export default function Plantas() {
  const arrayholder = React.useRef<DisplayImage[]>([]);

  const [plantImages, setPlantImages] = useState<DisplayImage[]>([]);
  const [search, setSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      async function getPlantImages() {
        try {
          const { data } = await axios<{ displayImages: DisplayImage[] }>(
            "https://bosque-comestible-backend.onrender.com/api/images/display_images",
          );
          const { displayImages } = data;
          setPlantImages(displayImages);
          arrayholder.current = data.displayImages;
        } catch (err) {
          console.log(err);
        }
      }
      getPlantImages();
    }, []),
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    const updatedData = arrayholder.current.filter((item) => {
      return item.species.toUpperCase().includes(text.toUpperCase());
    });
    setPlantImages(updatedData);
  };

  return (
    <SafeAreaProvider>
      <GradientBackground>
        <SafeAreaView style={styles.safeArea}>
          <TextInput
            style={styles.searchBar}
            placeholder="Buscar especies..."
            value={search}
            onChangeText={handleSearch}
          />
          <FlatList<DisplayImage>
            contentContainerStyle={styles.plantContainer}
            data={plantImages}
            numColumns={2}
            keyExtractor={(item) => item.plant_id.toString()}
            renderItem={({ item }) => (
              <View>
                <PlantImage imageUrl={item.img_url} plantId={item.plant_id} />
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
  searchBar: {
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "white",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 50,
  },
});
