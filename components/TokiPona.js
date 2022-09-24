import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TokiPona = ({ text }) => {
  return (
    <View style={styles.tokiPona}>
      <Text style={styles.title}>{text.tokiPona}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tokiPona: {
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 30,
    color: "#c3c3c3",
    marginTop: 40,
    marginBottom: 20,
  },
});

export default TokiPona;
