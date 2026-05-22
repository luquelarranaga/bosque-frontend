import { useEffect } from "react";
import { Image, StyleSheet } from "react-native";

import axios from "axios";
import { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface PlantLocation {
  latitude: number;
  longitude: number;
}

export default function Map() {
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
                source={require("@/assets/images/tree_marker.png")}
                style={styles.marker}
              />
            </Marker>
          );
        })}
      </MapView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  marker: {
    width: 30,
    height: 30,
  },
});
