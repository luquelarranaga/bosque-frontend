import { StyleSheet, View } from "react-native";

interface PlantCard {
  plantId: number;
}

export function PlantCard({ plantId }: PlantCard) {
  return (
    <View style={styles.cardContainer}>
      {/* <Image source={{ uri: imageUrl }} style={styles.displayImage} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#574f4941",
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
    marginHorizontal: 10,
    width: 170,
    height: 170,
    padding: 5,
  },
  displayImage: {
    resizeMode: "cover",
    width: 165,
    height: 165,
    borderRadius: 8,
  },
});
