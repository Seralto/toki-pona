import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Translation = (props) => {
  return (
    <View style={styles.translationBox}>
      <Text style={styles.word}>{props.word}</Text>
      <Text style={styles.translation}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  translationBox: {
    backgroundColor: "#d6e2ec",
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    width: "100%",
  },
  word: {
    fontSize: 20,
    color: "#42455a",
    fontWeight: "bold",
  },
  translation: {
    fontSize: 20,
  },
});

export default Translation;
