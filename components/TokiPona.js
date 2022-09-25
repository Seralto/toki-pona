import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";

const TokiPona = ({ text }) => {
  return (
    <View style={styles.TokiPona}>
      <Text style={styles.title}>{text.title}</Text>
      <Text style={styles.content}>{text.content}</Text>

      <Text
        style={styles.info}
        onPress={() => {
          Linking.openURL(text.site);
        }}
      >
        {text.site}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  TokiPona: {
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 28,
    color: "#c3c3c3",
    marginTop: 40,
    textAlign: "center",
  },
  content: {
    fontSize: 20,
    color: "#c3c3c3",
    marginTop: 20,
    marginBottom: 80,
  },
  info: {
    textAlign: "center",
    fontSize: 20,
    color: "#c3c3c3",
    marginBottom: 10,
  },
});

export default TokiPona;
