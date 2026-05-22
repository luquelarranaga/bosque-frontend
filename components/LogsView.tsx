import { useTheme } from "@/hooks/use-theme";
import axios from "axios";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { PatchLogModal } from "./PatchLogModal";
import { IconSymbol } from "./ui/icon-symbol";

interface PlantLog {
  log_id: number;
  plant_id: number;
  log_date: string;
  body: string;
}

interface LogsViewProps {
  logs: PlantLog[];
  setLogs: React.Dispatch<React.SetStateAction<PlantLog[]>>;
}

export default function LogsView({ logs, setLogs }: LogsViewProps) {
  const { palette } = useTheme();

  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleDelete(log_id: number) {
    setIsLoading(true);
    try {
      await axios.delete(
        `https://bosque-comestible-backend.onrender.com/api/logs/${log_id}`,
      );

      const updatedLogs = logs.filter(
        (currentLog) => currentLog.log_id !== log_id,
      );

      setLogs(updatedLogs);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  const renderRightActions = (item: PlantLog) => {
    return (
      <View style={styles.actionContainer}>
        <Pressable
          onPress={() => {
            setEditModalVisible(true);
          }}
          style={[styles.button, { backgroundColor: "#294eab" }]}
        >
          <IconSymbol size={28} name="pencil" color="white" />
        </Pressable>

        <Pressable
          onPress={() => {
            handleDelete(item.log_id);
          }}
          style={[styles.button, { backgroundColor: "#a41b1b" }]}
        >
          <IconSymbol size={28} name="bin.xmark" color="white" />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={palette.tint} />
        </View>) :
      (
      <FlatList<PlantLog>
        data={logs}
        numColumns={1}
        keyExtractor={(item) => item.log_id.toString()}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={() => renderRightActions(item)}>
            <View style={styles.log}>
              <Text
                style={[
                  {
                    color: palette.text2,
                    fontWeight: "bold",
                    marginBottom: "1%",
                  },
                ]}
              >
                {new Date(item.log_date).toLocaleDateString("en-GB")}
              </Text>

              <Text style={[{ color: palette.text2 }]}>{item.body}</Text>

              <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
              >
                <PatchLogModal
                  setModalVisible={setEditModalVisible}
                  log={item}
                  logs={logs}
                  setLogs={setLogs}
                />
              </Modal>
            </View>
          </Swipeable>
        )}
        ItemSeparatorComponent={() => <View style={[styles.separator, {backgroundColor: palette.tint2}]} />}
      />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    flex: 1,
    borderRadius: 8,
    marginTop: "2.5%",
  },
  log: {
    marginVertical: "3%",
    paddingVertical: "2%",
    paddingHorizontal: "3%",
  },
  actionContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
    paddingVertical: "2%",
  },
  button: {
    borderRadius: 25,
    width: 60,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  separator: {
    height: 1,
    width: "95%",
    backgroundColor: "gray",
    alignSelf: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
