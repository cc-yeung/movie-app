import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Card = ({ media }) => {
  const navigation = useNavigation();
  const isMovie = media.title !== undefined;
  const mediaType = isMovie ? "movie" : "tv";

  const [isHovered, setIsHovered] = useState(false);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${media.poster_path}` }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.title}>{media.title || media.name}</Text>
        <Text style={styles.info}>Popularity: {media.popularity.toFixed(2)}</Text>
        <Text style={styles.info}>
          Release Date: {media.release_date || media.first_air_date || "N/A"}
        </Text>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: isHovered ? "#1A6784" : "#24A7C5" },
          ]}
          onPress={() => navigation.navigate("Details", { id: media.id, type: mediaType })}
          onPressIn={() => setIsHovered(true)}
          onPressOut={() => setIsHovered(false)}
        >
          <Text style={styles.buttonText}>More Details</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "cover",
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "none",
  },
});

export default Card;
