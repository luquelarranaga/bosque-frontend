import { useTheme } from "@/hooks/use-theme";
import patchLog from "@/utils/patchLog";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface EditLogModalProp {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  log: PlantLog;
  logs: PlantLog[];
  setLogs: React.Dispatch<React.SetStateAction<PlantLog[]>>;
}

interface PlantLog {
  log_id: number;
  plant_id: number;
  log_date: string;
  body: string;
}

export function PatchLogModal({
  setModalVisible,
  log,
  logs,
  setLogs,
}: EditLogModalProp) {
  const { palette } = useTheme();

  const [body, setBody] = useState(log.body);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePatchLog = async () => {
    if (!body) {
      alert("Por favor, añade una fecha y una descripcion.");
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedLogs = await patchLog(log, body, logs);

      setLogs(updatedLogs);
      setModalVisible(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <Pressable onPress={handlePatchLog}>
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
