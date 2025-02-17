import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { getDetails } from "../api/tmdb";

const DetailsScreen = ({ route, navigation }) => {
  const { id, type } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDetails(id, type).then((response) => {
      setDetails(response.data);
      setLoading(false);
      navigation.setOptions({ title: response.data.title || response.data.name });
    });
  }, [id, type, navigation]);

  if (loading) return <ActivityIndicator size="large" color="blue" style={styles.loading} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{details.title || details.name}</Text>

      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${details.poster_path}` }}
        style={styles.image}
      />

      <View style={styles.textContainer}>
        <Text style={styles.description}>{details.overview || "No description available."}</Text>
        <Text style={styles.info}>
          Popularity: {details.popularity.toFixed(2)} | Release Date:{" "}
          {details.release_date || details.first_air_date || "N/A"}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
    gap: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 30,
    textAlign: "center",
  },
  image: {
    width: 270,
    height: 270,
    resizeMode: "cover",
    marginBottom: 15,
  },
  textContainer: {
    width: "90%",
    alignItems: "flex-start",
    gap: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    color: "#333",
    marginBottom: 15,
  },
  info: {
    fontSize: 14,
    color: "#555",
  },
});

export default DetailsScreen;
