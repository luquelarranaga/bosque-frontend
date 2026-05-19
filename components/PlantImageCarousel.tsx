import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";

export interface PlantCarouselImage {
  image_date: string;
  img_url: string;
}

interface PlantImageCarouselProps {
  images: PlantCarouselImage[];
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const SLIDE_WIDTH = SCREEN_WIDTH * 0.9;

export function PlantImageCarousel({ images }: PlantImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SLIDE_WIDTH);
    setActiveIndex(index);
  };

  const renderItem: ListRenderItem<PlantCarouselImage> = ({ item }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.img_url }} style={styles.image} />
    </View>
  );

  if (images.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.image_date}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        getItemLayout={(_, index) => ({
          length: SLIDE_WIDTH,
          offset: SLIDE_WIDTH * index,
          index,
        })}
      />
      {images.length > 1 && (
        <View style={styles.dots}>
          {images.map((image, index) => (
            <View
              key={image.image_date}
              style={[styles.dot, index === activeIndex && styles.dotActive]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SLIDE_WIDTH,
    marginTop: "1%",
  },
  slide: {
    width: SLIDE_WIDTH,
    alignItems: "center",
    padding: 5,
  },
  image: {
    resizeMode: "cover",
    width: SLIDE_WIDTH,
    aspectRatio: 1,
    borderRadius: 8,
    paddingHorizontal: "2.5%",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  dotActive: {
    backgroundColor: "rgba(255,255,255,0.95)",
  },
});
