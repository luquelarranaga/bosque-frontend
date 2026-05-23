import { useTheme } from "@/hooks/use-theme";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ImagePickerListProps {
  images: string[];
  onImagesSelected: (uris: any[]) => void;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ImagePickerList({
  images,
  onImagesSelected,
  setSelected,
}: ImagePickerListProps) {
  const { palette } = useTheme();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newUris = result.assets.map((asset) => asset.uri);
      onImagesSelected([...images, ...newUris]);
    }
    setSelected(true);
  };

  return (
    <View>
      <Pressable onPress={pickImage}>
        <Text
          style={[
            styles.buttonText,
            { backgroundColor: palette.button, color: palette.text },
          ]}
        >
          añadir fotos
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 15,
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
