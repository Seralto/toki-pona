import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Translation = ({ word, text, screenWidth }) => {
  const fontSize = screenWidth < 400 ? 15 : 18;

  return (
    <View style={styles.translationBox}>
      <Text style={[styles.word, { fontSize: fontSize }]}>{word}</Text>
      <Text style={[styles.translation, { fontSize: fontSize }]}>{text}</Text>
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
    color: "#42455a",
    fontWeight: "bold",
  },
});

export default Translation;
