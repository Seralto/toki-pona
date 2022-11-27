import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";

const TokiPona = ({ pageTexts }) => {
  return (
    <View style={styles.TokiPona}>
      <Text style={styles.title}>{pageTexts.title}</Text>
      <Text style={styles.content}>{pageTexts.content}</Text>

      <Text style={styles.info}>{pageTexts.official}</Text>
      <Text
        style={styles.info}
        onPress={() => {
          Linking.openURL(pageTexts.site);
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
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: "#c3c3c3",
    marginTop: 40,
    textAlign: "center",
  },
  content: {
    fontSize: 18,
    color: "#c3c3c3",
    marginTop: 20,
    marginBottom: 80,
  },
  info: {
    fontSize: 18,
    textAlign: "center",
    color: "#c3c3c3",
  },
});

export default TokiPona;
