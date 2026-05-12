import { useTheme } from "@/hooks/use-theme";
import postLog from "@/utils/postLog";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface PlantLog {
  log_id: number;
  plant_id: number;
  log_date: string;
  body: string;
}

interface PostLogModalProps {
  plantId: number;
  setPostLogVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setLogs: React.Dispatch<React.SetStateAction<PlantLog[]>>;
  logs: PlantLog[];
}

export function PostLogModal({
  setPostLogVisible,
  plantId,
  setLogs,
  logs,
}: PostLogModalProps) {
  const { palette } = useTheme();

  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostLog = async () => {
    if (!body) {
      alert("Por favor, esrcibe algo.");
      return;
    }

    setIsSubmitting(true);
    try {
      const newLog = await postLog(plantId, body);

      alert("¡nota guardada con éxito!");

      setLogs([...logs, newLog]);
      setPostLogVisible(false);
    } catch (error) {
      alert("Hubo un error al guardar la nota.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.centeredView}>
      <View style={[styles.modal, { backgroundColor: palette.modal }]}>
        <Pressable
          onPress={() => {
            setPostLogVisible(false);
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

        {isSubmitting ? (
          <ActivityIndicator size="large" color={palette.tint} />
        ) : (
          <Pressable onPress={handlePostLog}>
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
