import React, { useState } from "react";
import { View, TextInput, FlatList, Text, Pressable, StyleSheet } from "react-native";
import { searchMedia } from "../api/tmdb";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import { Ionicons } from "@expo/vector-icons";

const searchTypes = ["movie", "multi", "tv"];

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [type, setType] = useState("multi");
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);

  const handleSearch = () => {
    if (query.trim() === "") return;
    setSearchInitiated(true);
    searchMedia(query, type).then((response) => setResults(response.data.results));
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>
          Search Movie/TV Show Name
          <Text style={styles.required}>*</Text>
        </Text>

        <View
          style={[
            styles.searchBar,
            { borderColor: isFocused ? "#24A7C5" : "#f0f0f0" },
          ]}
        >
          <Ionicons name="search" size={18} color="#555" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="i.e. James Bond, CSI"
            placeholderTextColor="#555"
            value={query}
            onChangeText={setQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>

        <Text style={styles.label}>
          Choose Search Type
          <Text style={styles.required}>*</Text>
        </Text>

        <View style={styles.row}>
          <Dropdown
            options={searchTypes}
            selectedValue={type}
            onValueChange={setType}
          />
          <Pressable
            style={[
              styles.button,
              { backgroundColor: isHovered ? "#1A6784" : "#24A7C5" },
            ]}
            onPress={handleSearch}
            onPressIn={() => setIsHovered(true)}
            onPressOut={() => setIsHovered(false)}
          >
            <Ionicons name="search" size={18} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Search</Text>
          </Pressable>
        </View>

        <Text style={styles.helperText}>
          Please select a search type
        </Text>
      </View>

      {results.length === 0 && !searchInitiated && (
        <View style={styles.centeredContainer}>
          <Text style={styles.placeholderText}>Please initiate a search</Text>
        </View>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card media={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  formContainer: {
    width: "80%",
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  required: {
    color: "red",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "100%",
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 30,
    color: "#000",
    borderWidth: 0,
    outlineStyle: "none",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    width: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  icon: {
    marginRight: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "none",
  },
  helperText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%", 
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 0,
  },
});

export default SearchScreen;
