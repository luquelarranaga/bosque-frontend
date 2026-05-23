import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";

import { GradientBackground } from "@/components/GradientBackground";
import { useTheme } from "@/hooks/use-theme";
import axios from "axios";
import { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface PlantLocation {
  latitude: number;
  longitude: number;
}

export default function Map() {
  const { palette } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [markers, setMarkers] = useState<PlantLocation[]>([]);

  useEffect(() => {
    setIsLoading(true);
    async function getLocations() {
      try {
        const { data } = await axios<any>(
          "https://bosque-comestible-backend.onrender.com/api/plants/locations",
        );
        const { locations } = data;
        setMarkers(locations);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    getLocations();
  }, []);

  return (
    <SafeAreaProvider>
      {isLoading ? (
        <GradientBackground>
          <ActivityIndicator size="large" color={palette.tint} />
        </GradientBackground>
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
          {markers.map((marker) => {
            return (
              <Marker
                key={markers.indexOf(marker)}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
              >
                <Image
                  source={require("@/assets/images/3D-tree.png")}
                  style={styles.marker}
                />
              </Marker>
            );
          })}
        </MapView>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  marker: {
    width: 40,
    height: 40,
  },
});
