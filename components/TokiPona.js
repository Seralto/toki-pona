import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";

const TokiPona = ({ pageTexts, screenWidth, theme }) => {
  const titleFontSize = screenWidth < 400 ? 20 : 24;
  const fontSize = screenWidth < 400 ? 15 : 18;
  const th = theme ?? {};

  return (
    <View style={styles.TokiPona}>
      <Text style={[styles.title, { fontSize: titleFontSize, color: th.textMuted }]}>
        {pageTexts.title}
      </Text>
      <Text style={[styles.content, { fontSize, color: th.textMuted }]}>
        {pageTexts.content}
      </Text>
      <Text style={[styles.info, { fontSize, color: th.textMuted }]}>
        {pageTexts.official}
      </Text>
      <Text
        style={[styles.info, { fontSize, color: th.link }]}
        onPress={() => Linking.openURL(pageTexts.siteUrl)}
      >
        {pageTexts.site}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  TokiPona: { alignItems: "center", paddingHorizontal: 20 },
  title: { marginTop: 10, textAlign: "center" },
  content: { marginTop: 20, marginBottom: 80 },
  info: { textAlign: "center", marginBottom: 8 },
});

export default TokiPona;
