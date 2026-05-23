import { useTheme } from "@/hooks/use-theme";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

interface LocationPickerProps {
  setLatitude: React.Dispatch<React.SetStateAction<number | null>>;
  setLongitude: React.Dispatch<React.SetStateAction<number | null>>;
  height?: number;
}

export default function LocationPicker({
  setLatitude,
  setLongitude,
  height = 180,
}: LocationPickerProps) {
  const { palette } = useTheme();
  const [region, setRegion] = useState<Region | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const initialRegion: Region = {
        latitude: 38.13108,
        longitude: -4.776098,
        latitudeDelta: 0.0005,
        longitudeDelta: 0.0005,
      };
      setRegion(initialRegion);
      setLatitude(initialRegion.latitude);
      setLongitude(initialRegion.longitude);
    })();
  }, []);

  const onRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
    setLatitude(newRegion.latitude);
    setLongitude(newRegion.longitude);
  };

  if (!region) {
    return (
      <View style={[styles.loading, { height }]}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      <Text style={[styles.hint, { color: palette.text }]}>
        Mueve el mapa para seleccionar tu ubicacion
      </Text>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
        mapType="satellite"
        zoomEnabled={true}
        scrollEnabled={true}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    borderRadius: 8,
    overflow: "hidden",
    height: "45%",
  },
  map: {
    flex: 1,
    marginVertical: 2,
    borderRadius: 8,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  hint: {
    fontSize: 12,
    marginTop: 8,
    opacity: 0.8,
    textAlign: "center",
  },
});
