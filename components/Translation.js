import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useFonts } from "expo-font";

const Translation = ({ word, text, screenWidth }) => {
  const fontSize = screenWidth < 400 ? 15 : 18;
  const sitelenPonaFontSize = screenWidth < 400 ? 22 : 26;

  const [loaded] = useFonts({
    "sitelen-pona": require("../assets/fonts/sitelen-pona.otf"),
  });

  return (
    <View style={styles.translationBox}>
      <View style={styles.wordBox}>
        <Text style={[styles.word, { fontSize: fontSize }]}>{word}</Text>
        <Text style={[styles.sitelenPona, { fontSize: sitelenPonaFontSize }]}>
          {word === "ale/ali" ? "ale" : word}
        </Text>
      </View>
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
  wordBox: {
    flexDirection: "row",
    // display: "flex",
    // alignItems: "center",
  },
  sitelenPona: {
    // marginTop: 5,
    marginLeft: 5,
    color: "#42455a",
    fontFamily: "sitelen-pona",
  },
});

export default Translation;
