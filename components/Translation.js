import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const Translation = ({ word, text, screenWidth, theme }) => {
  const fontSize = screenWidth < 400 ? 15 : 17;
  const th = theme ?? {};

  const [fontsLoaded] = useFonts({
    "sitelen-pona": require("../assets/fonts/linja-pona.otf"),
  });

  const glyph = word === "ale/ali" ? "ale" : word.split("/")[0];

  return (
    <View style={[styles.row, { backgroundColor: th.surface ?? th.cardBg, borderColor: th.surfaceBorder }]}>
      {/* Glyph */}
      {fontsLoaded && (
        <Text style={[styles.glyph, { color: th.accent }]}>{glyph}</Text>
      )}

      {/* Word + definition */}
      <View style={styles.textBlock}>
        <Text style={[styles.word, { fontSize, color: th.accent }]}>{word}</Text>
        <Text style={[styles.translation, { fontSize: fontSize - 1, color: th.textMuted }]}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 12,
    width: "100%",
  },
  glyph:      { fontFamily: "sitelen-pona", fontSize: 36, width: 44, textAlign: "center", color: "#fff" },
  textBlock:  { flex: 1 },
  word:       { fontWeight: "600", marginBottom: 3 },
  translation:{ lineHeight: 20 },
});

export default Translation;
