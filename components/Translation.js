import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Translation = ({ word, text }) => {
  return (
    <View style={styles.translationBox}>
      <Text style={styles.word}>{word}</Text>
      <Text style={styles.translation}>{text}</Text>
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
    fontSize: 18,
    color: "#42455a",
    fontWeight: "bold",
  },
  translation: {
    fontSize: 18,
  },
});

export default Translation;
