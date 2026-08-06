import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useFonts } from "expo-font";

const Translation = ({ word, text, screenWidth, theme }) => {
  const fontSize = screenWidth < 400 ? 15 : 18;
  const sitelenPonaFontSize = screenWidth < 400 ? 22 : 26;
  const th = theme ?? {};

  const [loaded] = useFonts({
    "sitelen-pona": require("../assets/fonts/linja-pona.otf"),
  });

  return (
    <View style={[styles.translationBox, { backgroundColor: th.cardBg }]}>
      <View style={styles.wordBox}>
        <Text style={[styles.word, { fontSize, color: th.cardText }]}>{word}</Text>
        {loaded && (
          <Text style={[styles.sitelenPona, { fontSize: sitelenPonaFontSize, color: th.cardText }]}>
            {word === "ale/ali" ? "ale" : word}
          </Text>
        )}
      </View>
      <Text style={[styles.translation, { fontSize, color: th.textMuted }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  translationBox: {
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    width: "100%",
  },
  word: { fontWeight: "bold" },
  wordBox: { flexDirection: "row" },
  sitelenPona: { marginLeft: 5, fontFamily: "sitelen-pona" },
  translation: { marginTop: 4 },
});

export default Translation;
