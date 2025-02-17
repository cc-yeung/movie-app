import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { getMovies } from "../api/tmdb";
import Dropdown from "../components/Dropdown";
import Card from "../components/Card";

const categories = ["now_playing", "popular", "top_rated", "upcoming"];

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMovies(selectedCategory).then((response) => {
      setMovies(response.data.results);
      setLoading(false);
    });
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <Dropdown options={categories} selectedValue={selectedCategory} onValueChange={setSelectedCategory} />
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Card media={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
  },
});

export default MoviesScreen;
