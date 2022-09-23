import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TokiPona = () => {
  return (
    <View style={styles.tokiPona}>
      <Text style={styles.title}>Toki</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tokiPona: {
    // alignItems: "center",
    // padding: 30,
  },
});

export default TokiPona;
