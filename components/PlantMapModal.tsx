import { Typography } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

export interface MapPlant {
  plant_id: number;
  created_at: string;
  species: string;
  latitude: number;
  longitude: number;
}

interface PlantMapModalProps {
  plant: MapPlant;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PlantMapModal({ plant, setModalVisible }: PlantMapModalProps) {
  const { palette } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleViewPlant = () => {
    setLoading(true);
    // Defer navigation so React can paint the spinner before the modal unmounts.
    setTimeout(() => {
      setModalVisible(false);
      router.push({
        pathname: "/plant",
        params: { plantId: plant.plant_id },
      });
    }, 0);
  };

  return (
    <View style={styles.centeredView}>
      <View style={[styles.modal, { backgroundColor: palette.modal }]}>
        <Pressable onPress={() => setModalVisible(false)} disabled={loading}>
          <Text
            style={{
              color: palette.text,
              fontWeight: "bold",
              padding: 7,
            }}
          >
            X
          </Text>
        </Pressable>

        <View
          style={[
            styles.infoField,
            {
              backgroundColor: palette.textbox,
            },
          ]}
        >
          <Text
            style={[
              Typography.labelHeading,
              { fontStyle: "italic", color: palette.text },
            ]}
          >
            {plant.species}
          </Text>

          <Text
            style={[
              Typography.body,
              { color: palette.text, marginTop: 5, fontSize: 14 },
            ]}
          >
            {new Date(plant.created_at).toLocaleDateString("en-GB")}
          </Text>
        </View>

        {/* {loading ? (
          <ActivityIndicator
            size="large"
            color={palette.tint}
            style={styles.buttonSpinner}
          />
        ) : ( */}
        <Pressable onPress={handleViewPlant}>
          <Text
            style={[
              styles.buttonText,
              { backgroundColor: palette.button, color: palette.text },
            ]}
          >
            ver planta
          </Text>
        </Pressable>
        {/* )} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    alignItems: "center",
    width: "60%",
    margin: 50,
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 15,
  },
  infoField: {
    width: "90%",
    margin: 5,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 12,
    // alignItems: "center",
    // borderWidth: 1,
  },
  label: {
    fontStyle: "italic",
    fontSize: 12,
    marginBottom: 4,
  },
  buttonText: {
    fontSize: 15,
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonSpinner: {
    marginTop: 10,
    marginBottom: 5,
  },
});
