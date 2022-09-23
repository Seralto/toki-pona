import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Dictionary = () => {
  return (
    <View style={styles.dictionary}>
      <Text style={styles.title}>Dic</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dictionary: {
    // alignItems: "center",
    // padding: 30,
  },
});

export default Dictionary;
