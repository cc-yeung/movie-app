import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Dropdown = ({ options, selectedValue, onValueChange }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [pressedItem, setPressedItem] = useState(null);

  const handleSelect = (option) => {
    onValueChange(option);
    setModalVisible(false);
    setPressedItem(null);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>{selectedValue}</Text>
        <Ionicons name="chevron-down" size={18} color="#555" />
      </Pressable>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay} onTouchEnd={() => setModalVisible(false)} />
        <View style={styles.modalContainer}>
          <View style={styles.modalHandle} />
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.optionItem,
                  item === selectedValue
                    ? styles.selectedOption
                    : pressedItem === item
                    ? styles.pressedOption
                    : null,
                ]}
                onPress={() => handleSelect(item)}
                onPressIn={() => setPressedItem(item)}
                onPressOut={() => setPressedItem(null)}
              >
                <Text
                  style={[
                    styles.optionText,
                    item === selectedValue ? styles.selectedText : null,
                  ]}
                >
                  {item}
                </Text>
                {item === selectedValue && (
                  <Ionicons name="checkmark" size={20} color="white" />
                )}
              </Pressable>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    alignSelf: "center",
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#f0f0f0",
    minHeight: 32,
  },
  dropdownText: {
    fontSize: 14,
    color: "black",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: width,
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  modalHandle: {
    width: 50,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: width - 30,
    marginHorizontal: 15,
    borderRadius: 5,
    gap: 5,
  },
  selectedOption: {
    backgroundColor: "#176F65",
    borderRadius: 8,
  },
  pressedOption: {
    backgroundColor: "#f0f0f0",
  },
  optionText: {
    fontSize: 14,
  },
  selectedText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Dropdown;
