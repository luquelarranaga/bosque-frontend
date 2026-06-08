import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { GradientBackground } from "@/components/GradientBackground";
import { MapPlant, PlantMapModal } from "@/components/PlantMapModal";
import { useTheme } from "@/hooks/use-theme";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Map() {
  const { palette } = useTheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [plants, setPlants] = useState<MapPlant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<MapPlant | null>(null);

  useEffect(() => {
    async function getPlants() {
      setIsLoading(true);
      try {
        const { data } = await axios<{ plants: MapPlant[] }>(
          "https://bosque-comestible-backend.onrender.com/api/plants",
        );
        setPlants(data.plants);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    getPlants();
  }, []);

  return (
    <SafeAreaProvider>
      <GradientBackground>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={palette.tint} />
          </View>
        ) : (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 38.13108,
              longitude: -4.776098,
              latitudeDelta: 0.002,
              longitudeDelta: 0.001,
            }}
            mapType="satellite"
          >
            {plants.map((plant) => (
              <Marker
                key={plant.plant_id}
                coordinate={{
                  latitude: plant.latitude,
                  longitude: plant.longitude,
                }}
                tracksViewChanges={false}
              >
                <Pressable onPress={() => setSelectedPlant(plant)}>
                  <Image
                    source={require("@/assets/images/3D-tree.png")}
                    style={styles.marker}
                  />
                </Pressable>
              </Marker>
            ))}
          </MapView>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={selectedPlant !== null}
          onRequestClose={() => setSelectedPlant(null)}
        >
          {selectedPlant && (
            <PlantMapModal
              plant={selectedPlant}
              setModalVisible={(visible) => {
                if (!visible) setSelectedPlant(null);
              }}
            />
          )}
        </Modal>
      </GradientBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  marker: {
    width: 70,
    height: 70,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
