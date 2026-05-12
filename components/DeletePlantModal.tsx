import { useTheme } from "@/hooks/use-theme";
import { deletePlant } from "@/utils/deletePlant";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface DeletePlantModalProps {
  plantId: number;
  setDeletePlantVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DeletePlantModal({
  setDeletePlantVisible,
  plantId,
}: DeletePlantModalProps) {
  const { palette } = useTheme();
  const navigation = useNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDeletePlant = async () => {
    setIsSubmitting(true);
    try {
      await deletePlant(plantId);

      alert("planta eliminia con éxito!");

      navigation.goBack();
      setDeletePlantVisible(false);
    } catch (error) {
      alert("Hubo un error al guardar la nota.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.centeredView}>
      <View style={[styles.modal, { backgroundColor: palette.modal }]}>
        <Text>¿Seguro que quieres proceder?</Text>

        {isSubmitting ? (
          <ActivityIndicator size="large" color={palette.tint} />
        ) : (
          <Pressable onPress={handleDeletePlant}>
            <Text
              style={[
                styles.buttonText,
                { backgroundColor: palette.button, color: palette.text },
              ]}
            >
              Si
            </Text>
          </Pressable>
        )}
        <Pressable
          onPress={() => {
            setDeletePlantVisible(false);
          }}
        >
          <Text
            style={[
              styles.buttonText,
              { backgroundColor: palette.button, color: palette.text },
            ]}
          >
            Cancelar
          </Text>
        </Pressable>
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
    width: "85%",
    margin: 50,
    borderRadius: 5,
    paddingTop: 10,
  },
  input: {
    height: 20,
    width: "90%",
    fontStyle: "italic",
    margin: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  multiline: {
    height: 170,
    width: "90%",
    fontStyle: "italic",
    margin: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  imagePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignContent: "center",
  },
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    fontSize: 15,
    padding: 0,
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 15,
  },
  imagePreviewContainer: {
    width: "90%",
    maxHeight: 40,
    marginVertical: 10,
    marginHorizontal: 2.5,
  },
  image: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 8,
  },
});
