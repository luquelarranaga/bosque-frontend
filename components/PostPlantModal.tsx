import { ImagePickerList } from "@/components/ImagePickerList";
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
  const [coordinates, setCoordinates] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selected, setSelected] = useState<boolean>(false);

  const handlePostPlant = async () => {
    if (!species || images.length === 0) {
      alert("Por favor, añade una especie y al menos una foto.");
      return;
    }

    setIsSubmitting(true);
    try {
      await postPlant({ species, coordinates, body, images });
      alert("¡Planta guardada con éxito!");
    } catch (error) {
      alert("Hubo un error al guardar la planta.");
    } finally {
      setIsSubmitting(false);
    }
  };

  //self closing component
  //contentContainerSTyle={}
  //data=log
  //numColumns={1} (is this necessary?)
  //keyExtractor = {(item) => item.log_id.toString()}
  //rendeerItem={({item}) => (INCLUDE EVERYTHING IN HERE !! )}

  return (
    <View style={styles.centeredView}>
      <View style={[styles.modal, { backgroundColor: palette.modal }]}>
        <Pressable
          onPress={() => {
            setModalVisible(false);
          }}
        >
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
            { backgroundColor: palette.textbox, color: palette.text },
          ]}
          onChangeText={setSpecies}
          value={species}
          placeholder="especie"
          placeholderTextColor={palette.placeholderText}
        />

        <TextInput
          style={[
            styles.input,
            { backgroundColor: palette.textbox, color: palette.text },
          ]}
          onChangeText={setCoordinates}
          value={coordinates}
          placeholder="coordinados"
          placeholderTextColor={palette.placeholderText}
        />

        <TextInput
          style={[
            styles.multiline,
            { backgroundColor: palette.textbox, color: palette.text },
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
