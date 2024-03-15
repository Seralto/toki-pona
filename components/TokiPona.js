import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";

const TokiPona = ({ pageTexts, screenWidth }) => {
  const titleFontSize = screenWidth < 400 ? 20 : 24;
  const fontSize = screenWidth < 400 ? 15 : 18;

  return (
    <View style={styles.TokiPona}>
      <Text style={[styles.title, { fontSize: titleFontSize }]}>
        {pageTexts.title}
      </Text>

      <Text style={[styles.content, { fontSize: fontSize }]}>
        {pageTexts.content}
      </Text>

      <Text style={[styles.info, { fontSize: fontSize }]}>
        {pageTexts.official}
      </Text>

      <Text
        style={[styles.info, { fontSize: fontSize }]}
        onPress={() => {
          Linking.openURL(pageTexts.siteUrl);
        }}
      >
        {pageTexts.site}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  TokiPona: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#c3c3c3",
    marginTop: 10,
    textAlign: "center",
  },
  content: {
    color: "#c3c3c3",
    marginTop: 20,
    marginBottom: 80,
  },
  info: {
    textAlign: "center",
    color: "#c3c3c3",
  },
});

export default TokiPona;
