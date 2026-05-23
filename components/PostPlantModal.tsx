import { ImagePickerList } from "@/components/ImagePickerList";
import LocationPicker from "@/components/LocationPicker";
import { useTheme } from "@/hooks/use-theme";
import { postPlant } from "@/utils/postPlant";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface PostPlantModalProp {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PostPlantModal({ setModalVisible }: PostPlantModalProp) {
  const { palette } = useTheme();

  const [species, setSpecies] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selected, setSelected] = useState(false);

  const handlePostPlant = async () => {
    if (
      !species ||
      images.length === 0 ||
      latitude === null ||
      longitude === null
    ) {
      alert("Por favor, añade una especie, una ubicación y al menos una foto.");
      return;
    }

    setIsSubmitting(true);
    try {
      await postPlant({
        species,
        latitude,
        longitude,
        body,
        images,
      });
      alert("¡Planta guardada con éxito!");
      setModalVisible(false);
    } catch {
      alert("Hubo un error al guardar la planta.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.centeredView}>
      <View style={[styles.modal, { backgroundColor: palette.modal }]}>
        <Pressable onPress={() => setModalVisible(false)}>
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

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: palette.textbox,
              color: palette.text,
              borderColor:
                species.length === 0 ? palette.textboxBorder : palette.textOkay,
            },
          ]}
          onChangeText={setSpecies}
          value={species}
          placeholder="especie"
          placeholderTextColor={palette.placeholderText}
        />

        <LocationPicker setLatitude={setLatitude} setLongitude={setLongitude} />

        <TextInput
          style={[
            styles.multiline,
            {
              backgroundColor: palette.textbox,
              color: palette.text,
              borderColor:
                species.length === 0 ? palette.textboxBorder : palette.textOkay,
            },
          ]}
          onChangeText={setBody}
          value={body}
          placeholder="descripcion"
          placeholderTextColor={palette.placeholderText}
          multiline
          numberOfLines={4}
        />
        {selected && (
          <ScrollView horizontal style={[styles.imagePreviewContainer]}>
            {images.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.image} />
            ))}
          </ScrollView>
        )}
        <View style={styles.imagePickerContainer}>
          <ImagePickerList
            images={images}
            onImagesSelected={setImages}
            setSelected={setSelected}
          />

          {isSubmitting ? (
            <ActivityIndicator size="large" color={palette.tint} />
          ) : (
            <Pressable onPress={handlePostPlant}>
              <Text
                style={[
                  styles.buttonText,
                  { backgroundColor: palette.button, color: palette.text },
                ]}
              >
                guardar
              </Text>
            </Pressable>
          )}
        </View>
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
    width: "95%",
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
    borderWidth: 1,
  },
  multiline: {
    height: 170,
    width: "90%",
    fontStyle: "italic",
    margin: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
  },
  imagePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignContent: "center",
  },
  buttonText: {
    fontSize: 15,
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
    // marginBottom: 15,
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
  locationSection: {
    width: "90%",
    marginVertical: 5,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    // gap: 8,
  },
  mapWrapper: {
    marginTop: 8,
  },
});
