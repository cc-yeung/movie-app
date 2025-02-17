import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import MoviesScreen from "../screens/MoviesScreen";
import TVScreen from "../screens/TVScreen";
import SearchScreen from "../screens/SearchScreen";

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Movies App</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 16 },
          tabBarIndicatorStyle: { backgroundColor: "black", height: 3 },
        }}
      >
        <Tab.Screen name="Movies" component={MoviesScreen} />
        <Tab.Screen name="Search Results" component={SearchScreen} />
        <Tab.Screen name="TV Shows" component={TVScreen} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2C3E50",
    paddingTop: 30,
    paddingVertical: 12,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    color: "white",
  },
});

export default TopTabNavigator;
