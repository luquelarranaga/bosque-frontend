import { Link } from "@react-navigation/native";
import { Image, StyleSheet, View } from "react-native";

// Define the shape of the props this component expects
interface PlantCardProps {
  imageUrl: string;
  plantId: number;
}

// Destructure 'species' from the props object
export function PlantCard({ imageUrl, plantId }: PlantCardProps) {
  return (
    <View style={styles.cardContainer}>
      <Link screen="plant" params={{ plantId: plantId }}>
        <Image source={{ uri: imageUrl }} style={styles.displayImage} />
      </Link>
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
